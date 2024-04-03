import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import FileDelete from './FileDelete';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure
} from '@chakra-ui/react';


export default function PhotoPopup(photo) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPhoto, setSelectedPhoto] = useState({});


  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.200'
      backdropFilter='blur(10px)'
    />
  )
  const [overlay, setOverlay] = useState(<OverlayOne />);

 

  return (
    <>
      <div>
        <div className='close' key={photo.id}>
          <img
            src={`http://localhost:8800/images/` + photo.fileName}
            alt=''
            onClick={() => {
              setSelectedPhoto(photo);
              setOverlay(<OverlayOne />);
              onOpen();
            }}
          />
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={'true'} size={'xl'} scrollBehavior={'inside'}>
        <ModalOverlay bg='blackAlpha.200'
      backdropFilter='blur(10px)'/>
        <ModalContent>
          <ModalHeader>{selectedPhoto.fileName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <img
              className='modal-image'
              src={`http://localhost:8800/images/` + selectedPhoto.fileName}
              alt='' style={{ width: '1000px'}}
            />
            <p>{selectedPhoto.photoID}</p>
            <p>{selectedPhoto.fileType}</p>
            <p>{((selectedPhoto.fileSize)/1000000).toPrecision(3)+ 'MB'}</p>
            <p>{selectedPhoto.height +'px ' + 'x ' + selectedPhoto.width + 'px'}</p>
          </ModalBody>
          <ModalFooter >
            {FileDelete(photo)}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}