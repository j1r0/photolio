import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverFooter,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  useToast,
  Stack,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";

function FileUpdate(photo) {
  const [photoID] = useState(photo.photoID);
  const [updateName, setName] = React.useState({});
  const toast = useToast();

  const [tags, setTags] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);
  const [checkedAlbums, setCheckedAlbums] = useState([]);
  const [checkedCamera, setCheckedCamera] = useState([]);
  const [album, setAlbum] = useState([]);
  const [camera, setCamera] = useState([]);

  const toasts = (res, id) => {
    {
      if (!toast.isActive(id)) {
      if (res.data.Status === "Success") {
        console.log(res.data.Message);
        toast({
          id,
          title: res.data.Status,
          description: res.data.Message + ". " + "Please reload the page to see changes.",
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
  }
  };

  const handleChangeName = (e) => {
    setName({ fileName: e.target.value });
  };

  const handleUpdateName = () => {
    axios
      .put(`http://localhost:8800/Photos/${photoID}`, updateName)
      .then((res) => toasts(res, "updateName"))
      .catch((err) => console.error(err));
  };

  const handleUpdateTags = () => {
    checkedTags.map((tag) => {
      axios
        .post(`http://localhost:8800/Photos/${photoID}/tags`, {
          tagName: tag.value,
        })
        .then((res) => toasts(res, "updateTags"))
        .catch((err) => console.error(err));
    });
  };
  const handleUpdateAlbums = () => {
    checkedAlbums.map((album) => {
      axios
        .post(`http://localhost:8800/Photos/${photoID}/albums`, {
        photoID: photoID,
        albumID: album.value,
        })
        .then((res) => toasts(res, "updateAlbums"))
        .catch((err) => console.error(err));
    });
  };

  const handleUpdateCamera = () => {
    axios
      .put(`http://localhost:8800/Photos/${photoID}/camera`, {
        make: checkedCamera.value[0],
        model: checkedCamera.value[1],
      })
      .then((res) => {if (res.data.Status === "Error"){
        axios.post(`http://localhost:8800/Photos/${photoID}/camera`, {
          make: checkedCamera.value[0],
          model: checkedCamera.value[1],
        })
        .then((res) => toasts(res , "updateCamera"))
        .catch((err) => console.error(err));
      } else {
        toasts(res , "updateCamera");
      }
      })
      .catch((err) => console.error(err));
};


  const populateDropdown = () => {
    axios
      .get("http://localhost:8800/Tags")
      .then((res) => {
        setTags(
          res.data.map((tag) => ({ label: tag.tagName, value: tag.tagName }))
        );
      })
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:8800/Albums")
      .then((res) => {
        setAlbum(res.data.map((album) => ({ label: album.albumName, value: album.albumID})));
      })
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:8800/Cameras")
      .then((res) => {

        setCamera(
          res.data.map((camera) => ({
            label: camera.make + " " + camera.model,
            value:[camera.make, camera.model],
          }))
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className='container'>
      <Popover>
        <PopoverTrigger>
          <Button colorScheme="blue" boxShadow="md" onClick={populateDropdown}>
            UPDATE
          </Button>
        </PopoverTrigger>
        <PopoverContent>
        <PopoverArrow />
          <PopoverHeader textAlign='center'>Update Photo Metadata</PopoverHeader>
          <PopoverBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Photo Name</FormLabel>
                <Input
                  type="text"
                  placeholder={photo.fileName}
                  onChange={handleChangeName}
                />
                <FormHelperText>Update the photo name.</FormHelperText>
              </FormControl>

              <Select
                isMulti={true}
                options={tags}
                placeholder="Select Tags"
                menuPlacement="top"
                value={checkedTags}
                onChange={setCheckedTags}
              />
              <Select
                isMulti={true}
                options={album}
                placeholder="Select Albums"
                menuPlacement="top"
                value={checkedAlbums}
                onChange={setCheckedAlbums}
              />
              <Select
                isMulti={false}
                options={camera}
                placeholder="Select Camera"
                menuPlacement="top"

                onChange={setCheckedCamera}
              />
              
            </Stack>
          </PopoverBody>
          <PopoverFooter justifyContent={"center"}>
            <Button
              mr={3}
              width='100%'
              onClick={() => {
                if (updateName.length > 0) {
                  handleUpdateName();
                }
                if (checkedTags.length > 0) {
                  handleUpdateTags();
                }
                if (checkedAlbums.length > 0) {
                  handleUpdateAlbums();
                }
                if (checkedCamera.value !== undefined) {
                  handleUpdateCamera();
                }
                
              }}

            >
              Update
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default FileUpdate;
