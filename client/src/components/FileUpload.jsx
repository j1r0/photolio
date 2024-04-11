import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Stack
} from "@chakra-ui/react";

import MultiSelect from "./MultiSelect";

function FileUpload() {
  const [file, setFile] = useState();
  const [data, setData] = useState([]);
  const [newPhotoID, setNewPhotoID] = useState([]);
  const [name, setName] = useState([]);
  const [album, setAlbum] = useState([]);
  const [camera, setCamera] = useState([]);
  const [tags, setTags] = useState([]);

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

    axios.get("http://localhost:8800/Photos/last").then((res) => {
      setNewPhotoID(res.data[0].photoID);
      console.log(res.data[0].photoID);
    }).catch((err) => console.error(err));

    axios.post(`http://localhost:8800/Photos/${newPhotoID}/Tags`, tags)
    .then((res) => {
      console.log(res.data);
    }).catch((err) => console.error(err));





  };


  const handleInputData = () => {
    axios
      .get("http://localhost:8800/Tags")
      .then((res) => {
           setTags(res.data);
      })
      .catch((err) => console.error(err));

      axios.get("http://localhost:8800/Albums")
      .then((res) => {
        setAlbum(res.data);
      })
      .catch((err) => console.error(err));
      
      axios.get("http://localhost:8800/Cameras")
      .then((res) => {
        setCamera(res.data);
      })
      .catch((err) => console.error(err));
  };


  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button mr="0.5rem" size="sm" onClick= {handleInputData}>
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
            <MultiSelect placeholder='Select Tags' options={tags} param={['tagName']} param2= '' onClick= {handleInputData}/>
            <MultiSelect placeholder='Select Albums' options={album} param={['albumName']} param2= ''/>
            <MultiSelect placeholder='Select Cameras' options={camera} param={['make']} param2= {['model']}/>
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
