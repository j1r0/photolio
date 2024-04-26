import React, { useState } from "react";
import axios from "axios";
import { Button, useToast } from "@chakra-ui/react";
import {componentsCSS} from "./components.css";

function FileDelete(photo) {
  const [photoID] = useState(photo.photoID);
  const toast = useToast();

  const toasts = (res, id) => {
    {
      if (!toast.isActive(id)) {
        if (res.data.Status === "Success") {
          console.log(res.data.Message);
          toast({
            id,
            title: res.data.Status,
            description: res.data.Message + ". " + "Reloading the page...",
            status: "success",
            duration: 1000,
            position: "top-left",
          });
        } else {
          console.log(res.data.Message);
          toast({
            id,
            title: res.data.Status,
            description: res.data.Message,
            status: "error",
            duration: 1000,
            position: "top-left",
          });
        }
      }
    }
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8800/Photos/${photoID}`)
      .then((res) => {
        toasts(res, "deletePhoto");
        setTimeout(() => {
            window.location.reload();
          }, 1000);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <Button onClick={handleDelete} colorScheme="red" boxShadow="md" >
        DELETE
      </Button>
    </div>
  );
}

export default FileDelete;
