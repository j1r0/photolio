import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import FileDelete from "./FileDelete";
import FileUpdate from "./FileUpdate";
import ModalStyle from "./ModalStyle.css";
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
} from "@chakra-ui/react";


export default function PhotoPopup({ photo }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPhoto, setSelectedPhoto] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const [tags, setTags] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [camera, setCamera] = useState({});

  const handleTags = () => {
    axios
      .get(`http://localhost:8800/Photos/${photo.photoID}/tags`)
      .then((res) => {
        setTags(res.data);
        console.log("tags: ", res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCamera = () => {
    axios
      .get(`http://localhost:8800/Photos/${photo.photoID}/camera/TakenWith`)
      .then((res) => {
        setCamera(res.data);
        console.log("camera: ", res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAlbum = () => {
    axios
      .get(`http://localhost:8800/Photos/${photo.photoID}/albums`)
      .then((res) => {
        setAlbums(res.data);
        console.log("albums: ", res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return photo === null ? (
    <></>
  ) : (
    <>
      <div>
        <div className="close" key={photo.photoID}>
          <img
            src={
              `http://localhost:8800/images/` + photo.fileName + photo.fileType
            }
            alt=""
            onClick={() => {
              setSelectedPhoto(photo);
              handleTags();
              handleAlbum();
              handleCamera();
              onOpen();
            }}
          />
        </div>
      </div>
      <Modal
      className = "modal"
        isOpen={isOpen}
        onClose={onClose}
        isCentered={"true"}
        size={"full"}
        scrollBehavior={"inside"}
      >
        <ModalOverlay bg="blackAlpha.200" backdropFilter="blur(10px)" />
        <ModalContent
          bgColor="transparent"
          boxShadow="none"
          minWidth="70vw"
          minHeight="100%"
        >
          <ModalHeader className = 'modal-header' textAlign="center" paddingBottom="0">
            {selectedPhoto.fileName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            textColor="white"
            display="flex"
            justifyContent="center"
            mt="0"
            textAlign="center"
          >
            <div className="modal-photo">
              <img
                src={
                  `http://localhost:8800/images/` +
                  selectedPhoto.fileName +
                  selectedPhoto.fileType
                }
                alt=""
                onClick={() => {
                  setIsClicked(!isClicked);
                }}
                style={{
                  filter: isClicked ? "brightness(60%) grayscale(1) blur(2px)" : "none",
                }}
              />
              {isClicked ? (
                <p>
                  PhotoID: {selectedPhoto.photoID}
                  <br />
                  File Type: {selectedPhoto.fileType}
                  <br />
                  File Size:{" "}
                  {(selectedPhoto.fileSize / 1000000).toPrecision(3) + "MB"}
                  <br />
                  Height: {selectedPhoto.height}px
                  <br />
                  Width: {selectedPhoto.width}px
                  <br />
                  Tags: {tags.map((tag) => tag.tagName).join(", ")}
                  <br />
                  Album: {albums.map((album) => album.albumName).join(", ")}
                  <br />
                  Camera:{" "}
                  {camera[0] !== undefined
                    ? camera[0].make + " " + camera[0].model
                    : ""}
                </p>
              ): null}
              </div>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <div className="footer">
              {FileDelete(photo)}
              {FileUpdate(photo)}
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
