import React, { useState } from "react";
import axios from "axios";
import { Button, Icon, IconButton } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";

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
          window.location.reload();
        } else {
            console.log(res.data.Message);
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="container">
      <label>
      {file ? (
          <IconButton as="span" className='upload-button' onClick={handleUpload} aria-label="Upload Photo" icon={<DownloadIcon />} variant='solid' colorScheme="blackAlpha">
          </IconButton>
        ) : (
          <><input type="file" onChange={handleFile} style={{ display: 'none' }} /><IconButton as="span" className='upload-button' aria-label="Upload Photo" icon={<DownloadIcon />} variant='outline' colorScheme="blackAlpha"></IconButton></>
        )}
      </label>
      <br />
      <img src={`http://localhost:8800/images/` + data.image} alt="" />
    </div>
  );
}

export default FileUpload;
