import React, { useEffect } from "react";
import axios from "axios";
import FileUpload from "../components/FileUpload";
import PhotoPopup from "../components/PhotoPopup";
import DeleteAll from "../components/DeleteAll";



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

  const PhotosLayout = ({ photos }) => {
    return (
      <div className="photos-layout">
        
        {photos.map((photo) => (
            <div className="photo" key={photo.photoID}> 
                {PhotoPopup(photo)}
              
            </div>
        ))}

      </div>
    );
  };



  return (
    <div>
      <h1>Photolio</h1>
      <FileUpload />
      <PhotosLayout photos = {photos}/>
      <DeleteAll />
    </div>
  );
};

export default Home;
