import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import FileUpload from "../components/FileUpload";
import PhotoPopup from "../components/PhotoPopup";
import DeleteAll from "../components/DeleteAll";
import PhotosLayout from "../components/PhotosLayout";
import { Input, Button, InputGroup, InputRightElement } from "@chakra-ui/react";
import FilterPopover from "../components/FilterPopover";

const Home = () => {
  const [photos, setPhotos] = React.useState([]);

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

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const results = photos.filter((photo) => {
      return photo.fileName.toLowerCase().includes(e.toLowerCase());
    });
    setSearchResults(results);
  };

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value); // Call handleSearch with the updated search input value
  };

  return (
    <>
      <div className="navbar">
        <h1>Photolio</h1>

        {/* Search Bar */}
        <div>
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
              <FilterPopover />
            </InputRightElement>
          </InputGroup>
        </div>
        <FileUpload />
      </div>
      {searchResults.length > 0 ? (
        <PhotosLayout photos={searchResults} />
      ) : (
        <PhotosLayout photos={photos} />
      )}
      <DeleteAll />
    </>
  );
};

export default Home;
