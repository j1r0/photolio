import React, { useEffect } from "react";
import axios from "axios";
import FileUpload from "../components/FileUpload";
import PhotoPopup from "../components/PhotoPopup";
import DeleteAll from "../components/DeleteAll";
import SearchBar from "../components/SearchBar";
import PhotosLayout from "../components/PhotosLayout";



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


{<PhotosLayout photos = {photos}/>}



  return (
    <div>
      <h1>Photolio</h1>
      <SearchBar />
      <FileUpload />
      <PhotosLayout photos = {photos}/>
      <DeleteAll />
    </div>
  );
};

export default Home;
