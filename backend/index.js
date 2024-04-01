import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

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

// Fetch Data
app.get("/Photos", (req, res) => {
  const q = "SELECT * FROM Photos";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Insert Data
app.post("/Photos", (req, res) => {
  const q = "INSERT INTO Photos (fileName, fileSize, fileType) VALUES (?)";
  const values = [req.body.fileName, req.body.fileSize, req.body.fileType];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Photo has been inserted");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});
