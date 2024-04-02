import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/modal";


const PhotoPopup = (photo) => {
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
      };

export default PhotoPopup