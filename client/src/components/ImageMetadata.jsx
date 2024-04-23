import React from 'react';
import EXIF from 'exif-js';

function ImageMetadata() {
  function handleChange({
    target: {
      files: [file],
    },
  }) {
    if (file && file.name) {
      EXIF.getData(file, function () {
        var exifData = EXIF.pretty(this);
        if (exifData) {
          console.log(exifData);
          console.log(EXIF.getTag(this, 'DateTimeOriginal'));
        } else {
          console.log("No EXIF data found in image '" + file.name + "'.");
        }
      });
    }
  }

  return (
    <input
      type="file"
      id="file"
      accept=".jpg, .png, .heif, .heic"
      onChange={handleChange}
    />
  );
}

export default ImageMetadata;