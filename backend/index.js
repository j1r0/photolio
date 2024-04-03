import express from "express";
import mysql from "mysql2";
import cors from "cors";
import multer from "multer";
import path from "path";
import imageSize from "image-size";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/images", express.static("public/images"));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images")
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  }
});

const upload = multer({  
  storage: storage 
});

// Create database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "photolio",
});

app.get("/", (req, res) => {
  res.json("ooga booga");
});

// Retrieve Photos
app.get("/Photos", (req, res) => {
  const q = "SELECT * FROM Photos";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get("/Photos/:photoID", (req, res) => {
  const photoID = req.params.photoID;
  const sql = "SELECT * FROM Photos WHERE photoID = ?";

  db.query(sql, [photoID], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
    })
});


// Upload Photos
app.post("/upload", upload.single('image'), (req, res) => {
  const image = req.file;
  const dimensions = imageSize(`public/images/` + image.filename);

  const sqlCheck = "SELECT * FROM Photos WHERE fileName = ?";
  db.query(sqlCheck, [image.filename], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ Message: "Error" });
    } else {
      if (data.length > 0) {
        return res.json({ Message: "Photo already exists" });
      } else {
        const sql = "INSERT INTO Photos (fileName, fileSize, fileType, height, width) VALUES (?, ?, ?, ?, ?)";
        db.query(sql, [image.filename, image.size, dimensions.type, dimensions.height, dimensions.width], (err, result) => {
          if (err) {
            console.log(err);
            return res.json({ Message: "Error" });
          } else {
            console.log(result);
            return res.json({ Status: "Success" });
          }
        });
      }
    }
  });
});

  

  app.delete("/Photos/:photoID", (req, res) => {
    const photoID = req.params.photoID;
    const sql = "DELETE FROM Photos WHERE (photoID = ?)";
    db.query(sql, [photoID], (err, result) => {
      if (err) {
        console.log(err);
        return res.json({Message: "Error"})}
      else {
        console.log(result);
        return res.json({Status: "Success"});
        
      }
  })
  });

// Insert Data
app.post("/Photos", (req, res) => {
  const image = "INSERT INTO Photos (fileName, fileSize, fileType) VALUES (?)";
  const values = [req.body.fileName, req.body.fileSize, req.body.fileType];

  db.query(image, [values], (err, data) => {
    if (err) return res.json(err);
    console.log(res);
    return res.json("Photo has been inserted");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});

