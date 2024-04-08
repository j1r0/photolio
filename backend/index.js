import express from "express";
import mysql from "mysql2";
import cors from "cors";
import multer from "multer";
import path from "path";
import imageSize from "image-size";
import fs from "fs";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/images", express.static("public/images"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const type = file.mimetype;
    let photoType = "";
    if (type === "image/jpeg") {
      photoType = ".jpg";
    } else if (type === "image/png") {
      photoType = ".png";
    } else if (type === "image/gif") {
      photoType = ".gif";
    }

    cb(null, file.originalname.split(".")[0] + photoType);
  },
});

const upload = multer({
  storage: storage,
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
  const query = "SELECT * FROM Photos";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/Photos/:photoID", (req, res) => {
  const photoID = req.params.photoID;
  const query = "SELECT * FROM Photos WHERE photoID = ?";

  db.query(query, [photoID], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
// Get fileName from all photos
app.get("/Photos/fileName", (req, res) => {

  const query = "SELECT fileName, photoID FROM Photos";

  db.query(query, (err, data) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    
    if (data.length === 0) {
      console.log("No photo found with the given photoID");
      return res.status(404).json({ Message: "No photo found" });
    }
    
    const photos = data.map((photo) => ({
      fileName: photo.fileName,
      photoID: photo.photoID
    }));
    console.log("Photos fetched successfully:", photos);
    return res.json({ photos });
  });
});


// Update Photos
app.put("/Photos/:photoID", (req, res) => {
  const { photoID } = req.params;
  const newFileName = req.body.fileName;

  // if newFileName is not null, update the filename in the database
  if (newFileName) {
    const queryCheck = "SELECT * FROM Photos WHERE fileName = ?";
    db.query(queryCheck, [newFileName], (err, data) => {
      if (err) {
        return res.json({ Message: "Error" });
      } else {
        if (data.length > 0) {
          return res.json({ Message: "Photo already exists" });
        } else {
          // get the old file name and file type
          const selectQuery =
            "SELECT fileName, fileType FROM Photos WHERE photoID = ?";
          db.query(selectQuery, [photoID], (err, selected) => {
            if (err) return res.json({ Message: "Error" });
            const { fileName: oldFileName, fileType: fileExtension } =
              selected[0];

            // change file name in storage
            const filePath = [
              path.join(`public/images/${oldFileName + fileExtension}`),
              path.join(`public/images/${newFileName + fileExtension}`),
            ];

            fs.rename(filePath[0], filePath[1], (err, result) => {
              if (err) return res.json({ Message: "Error" });
              // check if the new file name already exists
              else {
                // update the file name in the database
                const updateQuery =
                  "UPDATE Photos SET fileName = ? WHERE photoID = ?";
                db.query(updateQuery, [newFileName, photoID], (err, result) => {
                  if (err) return res.json({ Message: "Error" });
                  return res.json({ Status: "Success" });
                });
              }
            });
          });
        }
      }
    });
  }
});

// Upload Photos
app.post("/upload", upload.single("image"), (req, res) => {
  const image = req.file;
  const photoName = image.originalname.split(".")[0];
  const dimensions = imageSize(`public/images/` + image.filename);

  // check the type of the photo
  const type = image.mimetype;
  let photoType = "";
  if (type === "image/jpeg") {
    photoType = ".jpg";
  } else if (type === "image/png") {
    photoType = ".png";
  } else if (type === "image/gif") {
    photoType = ".gif";
  }

  // check if the photo already exists
  const queryCheck = "SELECT * FROM Photos WHERE fileName = ?";
  db.query(queryCheck, [photoName], (err, data) => {
    if (err) {
      return res.json({ Message: "Error" });
    } else {
      if (data.length > 0) {
        return res.json({ Message: "Photo already exists" });
      } else {
        const insertQuery =
          "INSERT INTO Photos (fileName, fileSize, fileType, height, width) VALUES (?, ?, ?, ?, ?)";
        const values = [
          photoName,
          image.size,
          photoType,
          dimensions.height,
          dimensions.width,
        ];
        db.query(insertQuery, [...values], (err, result) => {
          if (err) {
            return res.json({ Message: "Error" });
          } else {
            return res.json({ Status: "Success" });
          }
        });
      }
    }
  });
});

app.delete("/Photos/:photoID", (req, res) => {
  const photoID = req.params.photoID;
  const selectQuery = "SELECT fileName, fileType FROM Photos WHERE photoID = ?";
  db.query(selectQuery, [photoID], (err, selected) => {
    
    // delete the photo from the storage
    if (err) return res.json({ Message: "Error" });
    const { fileName, fileType } = selected[0];
    const filePath = path.join(`public/images/${fileName + fileType}`);
    fs.unlink(filePath, (err, result) => {
      if (err) return res.json({ Message: "Error" });

      // delete the photo from the database
      const deleteQuery = "DELETE FROM Photos WHERE (photoID = ?)";
      db.query(deleteQuery, [photoID], (err, result) => {
        if (err) {
          return res.json({ Message: "Error" });
        } else {
          return res.json({ Status: "Success" });
        }
      });
    });
  });
});

// Delete all photos
app.delete("/Photos", (req, res) => {
  const imagesPath = "public/images";
  fs.readdir(imagesPath, (err, files) => {
    if (err) {
      return res.json({ Message: "Error" });
    } else {
      for (const file of files) {
        fs.unlink(path.join(imagesPath, file), (err) => {
          if (err) {
            return res.json({ Message: "Error" });
          }
        });
      }
    }
  });
  const query = "DELETE FROM Photos";
  db.query(query, (err, result) => {
    if (err) {
      return res.json({ Message: "Error" });
    } else {
      return res.json({ Status: "Success" });
    }
  });
});

// Insert Data
app.post("/Photos", (req, res) => {
  const query = "INSERT INTO Photos (fileName, fileSize, fileType) VALUES (?)";
  const values = [req.body.fileName, req.body.fileSize, req.body.fileType];

  db.query(query, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Photo has been inserted");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});
