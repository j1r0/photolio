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
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  useToast
} from "@chakra-ui/react";

function FileUpdate(photo) {
  const [photoID] = useState(photo.photoID);
  const [updateData, setUpdateData] = React.useState({});
  const toast = useToast();

  const handleChange = (e) => {
    setUpdateData({ fileName: e.target.value });
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:8800/Photos/${photoID}`, updateData)
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.Status);
          toast({
            title: "Photo Updated",
            status: "success",
            duration: 1000,
            position: "top-left"
          });
        } else {
          console.log(res.data.Message);
          toast(({
            title: "Photo Not Updated",
            status: 'error',
            duration:1000,
            position: 'top-left'
          }))

        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Button colorScheme="blue" boxShadow='md'>
            UPDATE
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>Update Photo Metadata</PopoverHeader>
          <PopoverBody>
            <FormControl>
              <FormLabel>Photo Name</FormLabel>
              <Input
                type="text"
                placeholder={photo.fileName}
                onChange={handleChange}
              />
              <FormHelperText>Update the photo name.</FormHelperText>
            </FormControl>
          </PopoverBody>
          <PopoverFooter justifyContent={'center'}>

            <Button mr={3} onClick={() => {
                handleUpdate();
            }}>
              Update
            </Button>

            </PopoverFooter>
            
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default FileUpdate;
