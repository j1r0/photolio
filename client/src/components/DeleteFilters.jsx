import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  useToast,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";

function DeleteFilters() {
  const [tags, setTags] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [camera, setCamera] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);
  const [checkedAlbums, setCheckedAlbums] = useState([]);
  const [checkedCamera, setCheckedCamera] = useState([]);
  const toast = useToast();
  const toasts = (res, id) => {
    {
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
    }
  };

  const formatParams = () => {
    const params = [];
    checkedTags.forEach((tag, index) => {
      if (tag) {
        params.push(`Tags/${tags[index].value}`);
      }
    });
    checkedAlbums.forEach((album, index) => {
      if (album) {
        params.push(`Albums/${albums[index].value}`);
      }
    });
    checkedCamera.forEach((cam, index) => {
      if (cam) {
        params.push(
          `Cameras/${camera[index].value[0]}/${camera[index].value[1]}`
        );
      }
    });
    return params;
  };

  const handleDeleteFilter = () => {
    const params = formatParams();
    params.forEach((param) => {
      axios
        .delete(`http://localhost:8800/${param}`)
        .then((res) => {
          toasts(res, "deleteFilters");
        })
        .catch((err) => console.error(err));
    });
  };

  const populateDropdown = () => {
    axios
      .get("http://localhost:8800/Tags")
      .then((res) => {
        setTags(
          res.data.map((tag) => ({ label: tag.tagName, value: tag.tagName }))
        );

        formatParams(tags);
      })
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:8800/Albums")
      .then((res) => {
        setAlbums(
          res.data.map((album) => ({
            label: album.albumName,
            value: album.albumName,
          }))
        );
      })
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:8800/Cameras")
      .then((res) => {
        setCamera(
          res.data.map((camera) => ({
            label: camera.make + " " + camera.model,
            value: [camera.make, camera.model],
          }))
        );
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Button
            boxShadow="md"
            size="sm"
            colorScheme="red"
            onClick={populateDropdown}
          >
            Delete Filters
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader textAlign={"center"}>Delete</PopoverHeader>
          <PopoverBody>
            <Stack spacing={4}>

                <Select
                  options={tags}
                  onChange={(selected) => {
                    const newCheckedTags = new Array(tags.length).fill(false);
                    selected.forEach((tag) => {
                      newCheckedTags[tags.indexOf(tag)] = true;
                    });
                    setCheckedTags(newCheckedTags);
                  }}
                  isMulti
                  placeholder="Select Tags"
                />

                <Select
                  options={albums}
                  onChange={(selected) => {
                    const newCheckedAlbums = new Array(albums.length).fill(
                      false
                    );
                    selected.forEach((album) => {
                      newCheckedAlbums[albums.indexOf(album)] = true;
                    });
                    setCheckedAlbums(newCheckedAlbums);
                  }}
                  isMulti
                  placeholder="Select Albums"
                />

                <Select
                  options={camera}
                  onChange={(selected) => {
                    const newCheckedCamera = new Array(camera.length).fill(
                      false
                    );
                    selected.forEach((cam) => {
                      newCheckedCamera[camera.indexOf(cam)] = true;
                    });
                    setCheckedCamera(newCheckedCamera);
                  }}
                  isMulti
                  placeholder="Select Cameras"
                />
            </Stack>
          </PopoverBody>
          <PopoverFooter>
            <Button onClick={handleDeleteFilter} size="md" w="100%">
              Delete
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DeleteFilters;
