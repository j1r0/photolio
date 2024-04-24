import React, { useState, useEffect } from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  useToast,
  filter,
} from "@chakra-ui/react";
import axios from "axios";
import FilterCheckbox from "./FilterCheckbox";

function FilterPopover({ applyFilters }) {
  const [tags, setTags] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [camera, setCamera] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);
  const [checkedAlbums, setCheckedAlbums] = useState([]);
  const [checkedCamera, setCheckedCamera] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [filteredCamera, setFilteredCamera] = useState([]);
  const toast = useToast();

  useEffect(() => {
    getAllFilters();
  }, []);

  const getAllFilters = async () => {
    try {
      const tagsRes = await axios.get("http://localhost:8800/Tags");
      setTags(tagsRes.data.map((tag) => tag.tagName));

      const albumsRes = await axios.get("http://localhost:8800/Albums");
      setAlbums(albumsRes.data.map((album) => album.albumName));

      const camerasRes = await axios.get("http://localhost:8800/Cameras");
      setCamera(camerasRes.data.map((camera) => `${camera.make} ${camera.model}`));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    compareCheckedFilters();
  }, [checkedTags, checkedAlbums, checkedCamera]);

  const compareCheckedFilters = () => {
    const filterTags = [];
    const filterAlbums = [];
    const filterCamera = [];

    checkedTags.forEach((tag, index) => {
      if (tag) {
        filterTags.push(tags[index]);
      }
    });

    checkedAlbums.forEach((album, index) => {
      if (album) {
        filterAlbums.push(albums[index]);
      }
    });

    checkedCamera.forEach((cam, index) => {
      if (cam) {
        filterCamera.push(camera[index]);
      }
    });

    setFilteredTags(filterTags);
    setFilteredAlbums(filterAlbums);
    setFilteredCamera(filterCamera);

    applyFilters(filterTags, filterAlbums, filterCamera);
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Button h="1.75rem" mr="0.5rem" size="sm">
            FILTER
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>Filter Photos</PopoverHeader>
          <PopoverBody>
            <FilterCheckbox
              checkboxName="Camera"
              hasChildren={true}
              children={camera}
              checkedItems={checkedCamera}
              setCheckedItems={setCheckedCamera}
              onChange={compareCheckedFilters}
            />
            <FilterCheckbox
              checkboxName="Tags"
              hasChildren={true}
              children={tags}
              checkedItems={checkedTags}
              setCheckedItems={setCheckedTags}
              onChange={compareCheckedFilters}
            />
            <FilterCheckbox
              checkboxName="Albums"
              hasChildren={true}
              children={albums}
              checkedItems={checkedAlbums}
              setCheckedItems={setCheckedAlbums}
              onChange={compareCheckedFilters}
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default FilterPopover;
