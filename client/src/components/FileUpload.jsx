import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  useToast,
  Stack
} from "@chakra-ui/react";
import components from "./components.css";
import FileUpdate from "./FileUpdate";

function FileUpload() {
  const [files, setFiles] = useState([]);
  const [data, setData] = useState([]);
  const [photoIDs, setPhotoIDs] = useState([]);
  const toast = useToast();

  const toasts = (res, id) => {
    if (!toast.isActive(id)) {
      if (res.data.Status === "Success") {
        console.log(res.data.Message);
        toast({
          id,
          title: res.data.Status,
          description: res.data.Message + ". " + "Reloading the page...",
          status: "success",
          duration: 1000,
          position: "top-left",
        });
      } else {
        console.log(res.data.Message);
        toast({
          id,
          title: res.data.Status,
          description: res.data.Message,
          status: "error",
          duration: 1000,
          position: "top-left",
        });
      }
    }
  };

  const handleUpload = () => {
    files.forEach((file, index) => {
      const formData = new FormData();
      formData.append("image", file);

      axios
        .post("http://localhost:8800/upload", formData)
        .then((res) => {
          if (res.data.Status === "Success") {
            const newPhotoIDs = [...photoIDs];
            newPhotoIDs[index] = res.data.photoID;
            setPhotoIDs(newPhotoIDs);
            toasts(res, `uploadPhoto${index}`);
          } else {
            toasts(res, `uploadPhoto${index}`);
          }
        })
        .catch((err) => console.error(err));
    });
  };



  const handleFiles = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles([...files, ...selectedFiles]);
  };

  return (
<>
  <Popover size='sm'>
    <PopoverTrigger>
      <Button className='upload-button' mr="30" size="md" bgColor={'black'} color='white'>
        UPLOAD
      </Button>
    </PopoverTrigger>
    <PopoverContent>
      <PopoverArrow />
      <PopoverHeader textAlign='center'>Upload Photos</PopoverHeader>
      <PopoverBody justifyContent="center" alignItems='center'>
        <Stack pt= '10px'>
          <label>
            <input type="file" accept="image/*" onChange={handleFiles} multiple />
          </label>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {files.map((file, index) => (
              <img key={index} src={URL.createObjectURL(file)} alt={`Preview ${index}`} style={{ width: "100%", marginTop: "10px", borderRadius:"5px"}} />
            ))}
          </div>
        </Stack>
      </PopoverBody>
      <PopoverFooter>
        <Button onClick={handleUpload} width='100%'>Upload</Button>
      </PopoverFooter>
    </PopoverContent>
  </Popover>
</>

  );
}

export default FileUpload;
