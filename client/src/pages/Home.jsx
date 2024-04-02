import React, { useEffect } from "react";
import axios from "axios";
import FileUpload from "../components/FileUpload";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/modal";


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


  



  const modalPhoto = (photo) => {
    return (
      <div
        className="modal fade"
        id="imgModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <img
                src={`http://localhost:8800/images/` + photo.fileName}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const deletePhoto = async (photoID) => {
    try {
      await axios.delete('http://localhost:8800/Photos/' + photoID);
      window.location.reload();
    }catch (err) {
        console.error("err");
    }
  }

  const PhotosLayout = ({ }) => {
    return (
      <div className="photos-layout">
        {photos.map((photo) => (
            <div className="photo" key={photo.photoID}> 
              <img
                src={`http://localhost:8800/images/` + photo.fileName}
                alt=""
                data-bs-toggle="modal"
                className = 'cursor-pointer'
                data-bs-target="#imgModal"
              />
              {modalPhoto(photo)}

              
              

            </div>

        ))}

      </div>
    );
  };

  return (
    <div>
      <h1>Photolio</h1>
      <FileUpload />
      <PhotosLayout />
      <button onClick={() => deletePhoto(photos.at(0).photoID)}>Delete</button>
              {console.log(photos.at(0))}

    </div>
  );
};

export default Home;
