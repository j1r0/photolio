import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Stack
} from "@chakra-ui/react";


function FileUpload() {
  const [file, setFile] = useState();
  const [data, setData] = useState([]);
  
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", file);
    

    axios
      .post("http://localhost:8800/upload", formData)
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.Status);
          setData(res.data);
          console.log(res.data);
        } else {
          console.log(res.data.Message);
        }
      })
      .catch((err) => console.error(err));

  };



  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button mr="0.5rem" size="sm">
            UPLOAD
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>Upload Photos</PopoverHeader>
          <PopoverBody justifyContent="center">
            <Stack pt= '10px'>
            <label>
              <input type="file" accept="image/*" onChange={handleFile} />
            </label>
            </Stack>
          </PopoverBody>
          <PopoverFooter>
            <Button onClick={handleUpload}>Upload</Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default FileUpload;
