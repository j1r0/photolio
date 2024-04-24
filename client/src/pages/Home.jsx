// home.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import FileUpload from "../components/FileUpload";
import PhotosLayout from "../components/PhotosLayout";
import DeleteAll from "../components/DeleteAll";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import FilterPopover from "../components/FilterPopover";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);

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
      const formattedPhotoCamera = [`${photoCamera[0].make} ${photoCamera[0].model}`];
      console.log(checkedTags.length !== 0 && photoTags.some(tag => checkedTags.includes(tag.tagName)));
      if (
        (checkedTags.length !== 0 && photoTags.some(tag => checkedTags.includes(tag.tagName))) ||
        (checkedAlbums.length !== 0 && photoAlbums.some(album => checkedAlbums.includes(album.albumName))) ||
        (checkedCamera.length !== 0 && checkedCamera.includes(formattedPhotoCamera[0]))
      ) {
        console.log("worked!")
        return photo; // Include the photo in filtered results
      }
      return null; // Exclude the photo from filtered results
    }));
  
    const validPhotos = filtered.filter(photo => photo !== null);
  
    console.log("Checked filters", checkedAlbums, checkedCamera, checkedTags);
    console.log("Filtered photos", validPhotos);
  
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
            <InputRightElement w="4.5rem">
              <FilterPopover applyFilters={applyFilters} />
            </InputRightElement>
          </InputGroup>
        </div>
        <FileUpload />
      </div>
      {(searchResults.length > 0 || filteredPhotos.length > 0) && (
        <PhotosLayout photos={searchResults.length > 0 ? searchResults : filteredPhotos} />
      )}
      {searchResults.length === 0 && filteredPhotos.length === 0 && (
        <PhotosLayout photos={photos} />
      )}
      <DeleteAll />
    </>
  );
};

export default Home;