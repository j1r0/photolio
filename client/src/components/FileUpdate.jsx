import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";

function FileUpdate(photo) {
  const [photoID] = useState(photo.photoID);
  const [updateData, setUpdateData] = React.useState({});
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const handleChange = (e) => { 
    setUpdateData({ fileName: e.target.value });
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:8800/Photos/${photoID}`, updateData)
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.Status);
          return res.data.Status;
        } else {
          console.log(res.data.Message);
          return res.data.Message;
        } 
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Button onClick={onOpen} colorScheme="red">
        UPDATE
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Photo Name</FormLabel>
              <Input
                type="text"
                placeholder={photo.fileName}
                onChange={handleChange}
              />
              <FormHelperText>Update the photo name.</FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => {
                handleUpdate();
                onClose();
            }}>
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
            
          </ModalFooter>
        </ModalContent>
        
      </Modal>
    </div>
    
  );
}

export default FileUpdate;

