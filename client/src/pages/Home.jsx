import React, { useEffect } from 'react'
import axios from 'axios'

const Home = () => {
  const [photos, setPhotos] = React.useState([])

  useEffect(() => {
    const fetchPhotos = async () => {
      try{
        const res = await axios.get("http://localhost:8800/Photos");
        setPhotos(res.data);

      }catch(err){
        console.error(err)
      }
    }
    fetchPhotos();
  }, [])
  return (
    <div>
      <h1>Photolio</h1>
      <div className="photos">
      {photos.map((photo) => (
        <div className="photo" key={photo.id}>
          
          <h3>{photo.fileName}</h3>
          <p>{photo.fileSize}</p>
          <p>{photo.fileType}</p>
        </div>
      ))}
    </div>
    </div>
  )
}

export default Home