import React, { useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import FileDelete from './FileDelete';
import FileUpdate from './FileUpdate';
import ModalStyle from './ModalStyle.css';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';


export default function PhotoPopup({photo}) { 
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPhoto, setSelectedPhoto] = useState({});
  const [tags, setTags] = useState([]);

  
  const handleTags = () => {
    axios.get(`http://localhost:8800/Photos/${photo.photoID}/tags`)
    .then((res) => {
      setTags(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
  } 

  return (
    ((photo === null) ? (<></>) : (<>
    
      <div>
        <div className='close' key={photo.photoID}>
          <img
            src={`http://localhost:8800/images/` + photo.fileName + photo.fileType}
            alt=''
            onClick={() => {
              setSelectedPhoto(photo);
              handleTags();
              onOpen();
            }}
          />
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={'true'} size={'full'} scrollBehavior={'inside'}>
        <ModalOverlay bg='blackAlpha.200'
      backdropFilter='blur(10px)'/>
        <ModalContent bgColor='transparent' boxShadow='none' minWidth='70vw' minHeight='100%'>
          <ModalHeader textAlign='center' paddingBottom='0'>{selectedPhoto.fileName}</ModalHeader>
          <ModalCloseButton/>
          <ModalBody textColor='white' display='flex' justifyContent='center'mt='0'>
            <div className='modal-photo'>
            <img
              src={`http://localhost:8800/images/` + selectedPhoto.fileName + selectedPhoto.fileType}
              alt='' style={{ borderRadius: '10px'}}
            />
            
            <p>
              PhotoID: {selectedPhoto.photoID}
              <br/>
              File Type: {selectedPhoto.fileType}
              <br/>
              File Size: {((selectedPhoto.fileSize)/1000000).toPrecision(3)+ 'MB'}
              <br/>
              Height: {selectedPhoto.height}px 
              <br/>
              Width: {selectedPhoto.width}px
              <br/>
              Tags: {tags.map((tag) => tag.tagName).join(', ')}
              </p>


            </div>
          </ModalBody>
      
          <ModalFooter justifyContent='center'>
            <div className='footer'>
            {FileDelete(photo)}
            {FileUpdate(photo)}
            </div>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )));
}