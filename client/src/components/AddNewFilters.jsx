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
  useToast,
  Stack,
  Flex,
} from "@chakra-ui/react";

function AddNewFilters() {
    const [newAlbum, setNewAlbum] = useState({});
    const [newCamera, setNewCamera] = useState({});
    const [newTag, setNewTag] = useState({});
  const toast = useToast();

  const toasts = (res, id) => {
    if (!toast.isActive(id)) {
      if (res.data.Status === "Success") {
        toast({
          id,
          title: res.data.Status,
          description: res.data.Message + ". Reloading the page...",
          status: "success",
          duration: 1000,
          position: "top-left",
        });
      } else {
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

  const handleAddNewAlbum = () => {
    axios
      .post(`http://localhost:8800/Albums`, {
        albumName: newAlbum.albumName,
        creationDate: new Date().toISOString(), // Fixed creation date format
      })
      .then((res) => {
        toasts(res, "addAlbum");
      })
      .catch((err) => console.error(err));
  };

  const handleAddNewCamera = () => {
    axios
      .post(`http://localhost:8800/Cameras`, {
        make: newCamera.make,
        model: newCamera.model,
      })
      .then((res) => {
        toasts(res, "addCamera");
      })
      .catch((err) => console.error(err));
  };

  const handleAddNewTag = () => {
    axios
      .post(`http://localhost:8800/Tags`, {
        tagName: newTag.tagName,
        description: newTag.description,
      })
      .then((res) => {
        toasts(res, "addTag");
      })
      .catch((err) => console.error(err));
  };

  const handleAddNewFilters = () => {
    if (newAlbum.albumName !== undefined) {
      handleAddNewAlbum();
    }
    if (newCamera.make !== undefined && newCamera.model !== undefined) {
      handleAddNewCamera();
    }
    if (newTag.tagName !== undefined) {
      handleAddNewTag();
    }
  };

  return (
    <div className="container">
      <Popover>
        <PopoverTrigger>
          <Button colorScheme="blue" size="sm" textTransform={'uppercase'}>
            Add Filters
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader textAlign="center">Add Filters</PopoverHeader>
          <PopoverBody>
            <Stack spacing={3} direction="column">
              <FormControl id="albumName">
                <FormLabel>Album Name</FormLabel>
                <Input
                  placeholder="Album Name"
                  type="text"
                  value={newAlbum.albumName || ""}
                  onChange={(e) =>
                    setNewAlbum({ ...newAlbum, albumName: e.target.value })
                  }
                />
              </FormControl>
              <Stack direction="row" spacing={3}>
                <FormControl id="cameraMake">
                  <FormLabel>Camera Make</FormLabel>
                  <Input
                    placeholder="Make"
                    type="text"
                    value={newCamera.make || ""}
                    onChange={(e) =>
                      setNewCamera({ ...newCamera, make: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl id="cameraModel">
                  <FormLabel>Camera Model</FormLabel>
                  <Input
                    placeholder="Model"
                    type="text"
                    value={newCamera.model || ""}
                    onChange={(e) =>
                      setNewCamera({ ...newCamera, model: e.target.value })
                    }
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={3}>
                <FormControl id="tagName">
                  <FormLabel>Tag Name</FormLabel>
                  <Input
                    placeholder="Tag Name"
                    type="text"
                    value={newTag.tagName || ""}
                    onChange={(e) =>
                      setNewTag({ ...newTag, tagName: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl id="tagDescription">
                  <FormLabel>Tag Description</FormLabel>
                  <Input
                    placeholder="Description"
                    type="text"
                    value={newTag.description || ""}
                    onChange={(e) =>
                      setNewTag({ ...newTag, description: e.target.value })
                    }
                  />
                </FormControl>
              </Stack>
            </Stack>
          </PopoverBody>
          <PopoverFooter>
            <Button onClick={handleAddNewFilters} size="md" w="100%">
              Add
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default AddNewFilters;
