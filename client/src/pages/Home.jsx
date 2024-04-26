// home.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import FileUpload from "../components/FileUpload";
import PhotosLayout from "../components/PhotosLayout";
import DeleteAll from "../components/DeleteAll";
import { Input, InputGroup, InputRightElement, Stack, Button } from "@chakra-ui/react";
import FilterPopover from "../components/FilterPopover";
import AddNewFilters from "../components/AddNewFilters";
import DeleteFilters from "../components/DeleteFilters";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const  [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await axios.get("http://localhost:8800/Photos");
        setPhotos(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPhotos();
  }, []);

  const applyFilters = async (checkedTags, checkedAlbums, checkedCamera) => {
    const filtered = await Promise.all(photos.map(async (photo) => {
      const photoTags = await getFilter(photo.photoID, "tags");
      const photoAlbums = await getFilter(photo.photoID, "albums");
      const photoCamera = await getFilter(photo.photoID, "camera/TakenWith");
      const formattedPhotoCamera = (photoCamera[0] !== undefined ? ([`${photoCamera[0].make} ${photoCamera[0].model}`]) : []);
      if (
        (checkedTags.length !== 0 && photoTags.some(tag => checkedTags.includes(tag.tagName))) ||
        (checkedAlbums.length !== 0 && photoAlbums.some(album => checkedAlbums.includes(album.albumName))) ||
        (checkedCamera.length !== 0 && checkedCamera.includes(formattedPhotoCamera[0]))
      ) {
        return photo;
      }
      return null; 
    }));
  
    const validPhotos = filtered.filter(photo => photo !== null);
  
    setSearchResults([]);
    setFilteredPhotos(validPhotos);
  };
  

  const getFilter = async (photoID, url) => {
    try {
      const res = await axios.get(`http://localhost:8800/Photos/${photoID}/${url}/`);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const results = photos.filter((photo) => {
      return photo.fileName.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearchResults(results);
  };

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e);
  };

  return (
    <>
      <div className="navbar">
        <h1>Photolio</h1>
        <div className="search">
          <InputGroup size="lg">
            <Input
              pr="4.5rem"
              variant="outline"
              boxShadow={"md"}
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={onSearchChange}
            />
            <InputRightElement >
              <FilterPopover applyFilters={applyFilters} />
            </InputRightElement>
          </InputGroup>
        </div>
        <div className="upload">
        <FileUpload />
        </div>
      </div>
      <div className="photos">
      {(searchResults.length > 0 || filteredPhotos.length > 0) && (
        <PhotosLayout photos={searchResults.length > 0 ? searchResults : filteredPhotos} />
      )}
      {searchResults.length === 0 && filteredPhotos.length === 0 && (
        <PhotosLayout photos={photos} />
      )}
      </div>
      <div className='footer'>
        <Stack spacing={2} direction="row">
      <DeleteAll />
      <Button size='sm'onClick={() => handleClick()} >Edit Filters</Button> 
      { isClicked && (
        <Stack spacing={2} direction="column">
        <AddNewFilters />
        <DeleteFilters />
        </Stack>
      )

      }

      </Stack>
      </div>
    </>
  );
};

export default Home;