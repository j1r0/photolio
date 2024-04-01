import React, { useState } from "react";
import axios from "axios";

function FileUpload() {
  const [file, setFile] = useState();
  const [data, setData] = useState([]);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', file);

    axios.post("http://localhost:8800/upload", formData)
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.Status);
        } else {
            console.log(res.data.Message);
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="container">
      <input type="file" onChange={handleFile} />
      <button onClick={handleUpload}>Upload Photo</button>
      <br />
      <img src = {`http://localhost:8800/images/` + data.image} alt = "" />
    </div>
  );
}

export default FileUpload;
