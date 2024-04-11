import React from 'react';
import PhotoPopup from './PhotoPopup';

const PhotosLayout = ({ photos }) => {

    return (
        <>
                <div className="photos-layout">
                    {photos.map((photo) => (
                        <div className="photo" key={photo.photoID}>
                            <PhotoPopup photo={photo} />
                        </div>
                    ))}
                </div>
            
        </>
    );
};

export default PhotosLayout;