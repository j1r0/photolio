import React, { useEffect } from "react";
import axios from "axios";
import FileUpload from "../components/FileUpload";
import ToggleOverlay from "../components/ToggleOverlay";

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
  const PhotosLayout = ({ photo }) => {
    return (
      <div className="photos-layout">
        
        {photos.map((photo) => (
          <div className="img" key={photo.id}>
            <div
              className="photo"
              key={photo.id}
          
            >
              {photo.img && <img src={photo.img} alt="" />}

              <img
                src={`http://localhost:8800/images/` + photo.fileName}
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>Photolio</h1>
      <FileUpload />
      <PhotosLayout> </PhotosLayout>
      <ToggleOverlay />
    </div>
  );
};

export default Home;