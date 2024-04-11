import express, { application } from "express";
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

// -------------- PHOTO QUERIES --------------
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

// Get the last photo inserted
app.get("/Photos/last", (req, res) => {
  const query = "SELECT * FROM Photos ORDER BY photoID DESC LIMIT 1";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
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

// Insert Photo Data
app.post("/Photos", (req, res) => {
  const query = "INSERT INTO Photos (fileName, fileSize, fileType) VALUES (?)";
  const values = [req.body.fileName, req.body.fileSize, req.body.fileType];

  db.query(query, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Photo has been inserted");
  });
});

// -------------- TAG QUERIES --------------
// retrieve all tags
app.get("/Tags", (req, res) => {
  const query = "SELECT * FROM Tags";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// retrieve a tag
app.get("/Tags/:tagName", (req, res) => {
  const tagName = req.params.tagName;
  const query = "SELECT * FROM Tags WHERE tagName = ?";
  db.query(query, [tagName], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// retrieve all tags of a photo
app.get("/Photos/:photoID/tags", (req, res) => {
  const photoID = req.params.photoID;
  const query = "SELECT tagName FROM HasTag WHERE photoID = ?";
  db.query(query, [photoID], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});


// create a new tag
app.post("/Tags", (req, res) => {
  const query = "INSERT INTO Tags (tagName, description) VALUES (?, ?)";
  const values = [req.body.tagName, req.body.description];

  db.query(query, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Tag has been inserted");
  });
});

// add tags to a photo
app.post("/Photos/:photoID/tags", (req, res) => {
  const photoID = req.params.photoID;
  const tagName = req.body.tagName;
  const query = "INSERT INTO HasTags (photoID, tagName) VALUES (?, ?)";
  const values = [photoID, tagName];

  db.query(query, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Tags have been inserted");
  });
});

// remove tags from a photo
app.delete("/Photos/:photoID/tags", (req, res) => {
  const photoID = req.params.photoID;
  const tags = req.body.tags;
  const query = "DELETE FROM HasTags WHERE photoID = ? AND tagName = ?";
  const values = tags.map((tag) => [photoID, tag]);

  db.query(query, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Tags have been deleted");
  });
});

// delete a tag
app.delete("/Tags/:tagName", (req, res) => {
  const tagName = req.params.tagName;
  const query = "DELETE FROM Tags WHERE tagName = ?";
  db.query(query, [tagID], (err, data) => {
    if (err) return res.json(err);
    return res.json("Tag has been deleted");
  });
});

// delete all tags
app.delete("/Tags", (req, res) => {
  const query = "DELETE FROM Tags";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json("All tags have been deleted");
  });
});



// -------------- ALBUM QUERIES --------------

// Retrieve all albums
app.get("/Albums", (req, res) => {
  const query = "SELECT * FROM Albums";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Retrieve an album
app.get("/Albums/:albumName", (req, res) => {
  const albumName = req.params.albumName;
  const query = "SELECT * FROM Albums WHERE albumName = ?";
  db.query(query, [albumName], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Retrieve all albums a photo is in
app.get("/Photos/:photoID/albums", (req, res) => {
  const photoID = req.params.photoID;
  const query = "SELECT albumName FROM InAlbum WHERE photoID = ?";
  db.query(query, [photoID], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Insert an album
app.post("/Albums/:albumName", (req, res) => {
  const query = "INSERT INTO Albums (albumNames, creationDate) VALUES (?, ?)";
  const albumName = req.params.albumName;
  const creationDate = currentDate();
  db.query(query, [albumName, creationDate], (err, data) => {
    if (err) return res.json(err);
    return res.json("Album has been inserted");
  });
});

// Add a photo to an album
app.post("/Photos/:photoID/albums", (req, res) => {
  const photoID = req.params.photoID;
  const albumID = req.body.albumID;
  const uploadDate = currentDate();
  const query = "INSERT INTO InAlbum (photoID, albumID, uploadDate) VALUES (?, ?, ?)";
  db.query(query, [photoID, albumID, uploadDate], (err, data) => {
    if (err) return res.json(err);
    return res.json("Album has been inserted");
  });
});

// Remove a photo from an album
app.delete("/Photos/:photoID/albums", (req, res) => {
  const photoID = req.params.photoID;
  const albumID = req.body.albumID;
  const query = "DELETE FROM InAlbum WHERE photoID = ? AND albumID = ?";
  db.query(query, [photoID, albumID], (err, data) => {
    if (err) return res.json(err);
    return res.json("Album has been deleted");
  });
});

// Delete an album
app.delete("/Albums/:albumName", (req, res) => {
  const albumName = req.params.albumName;
  const query = "DELETE FROM Albums WHERE albumName = ?";
  db.query(query, [albumName], (err, data) => {
    if (err) return res.json(err);
    return res.json("Album has been deleted");
  });
});

// Delete all albums
app.delete("/Albums", (req, res) => {
  const query = "DELETE FROM Albums";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json("All albums have been deleted");
  });
});


// -------------- CAMERA QUERIES --------------

// Retrieve all cameras
app.get("/Cameras", (req, res) => {
  const query = "SELECT * FROM Cameras";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Cameras of a specific make and model
app.get ("/Cameras/:make/:model", (req, res) => {
  const { make, model } = req.params;
  const query = "SELECT * FROM Cameras WHERE make = ? AND model = ?";
  db.query(query, [make, model], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Photos taken with a specific camera
app.get("/Photos/:make/:model", (req, res) => {
  const { make, model } = req.params;
  const query = "SELECT * FROM TakenWith WHERE make = ? AND model = ?";
  db.query(query, [make, model], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Insert a camera
app.post("/Photos/:photoID/cameras", (req, res) => {
  const photoID = req.params.photoID;
  const { make, model, dateTaken } = req.body;
  const query = "INSERT INTO TakenWith (photoID, make, model, dateTaken) VALUES (?, ?, ?, ?)";
  const values = [photoID, make, model, dateTaken];
  db.query(query, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Camera has been inserted");
  });
})

// Remove a camera from a photo
app.delete("/Photos/:photoID/cameras", (req, res) => {
  const photoID = req.params.photoID;
  const { make, model } = req.body;
  const query = "DELETE FROM TakenWith WHERE photoID = ? AND make = ? AND model = ?";
  db.query(query, [photoID, make, model], (err, data) => {
    if (err) return res.json(err);
    return res.json("Camera has been deleted");
  });
});

// Delete a camera
app.delete("/Cameras/:make/:model", (req, res) => {
  const { make, model } = req.params;
  const query = "DELETE FROM Cameras WHERE make = ? AND model = ?";
  db.query(query, [make, model], (err, data) => {
    if (err) return res.json(err);
    return res.json("Camera has been deleted");
  });
});

// Delete all cameras
app.delete("/Cameras", (req, res) => {
  const query = "DELETE FROM Cameras";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json("All cameras have been deleted");
  });
});


app.listen(8800, () => {
  console.log("Connected to backend!");
});
