import React, { useState } from "react";
import axios from "axios";
import { Button, useToast } from "@chakra-ui/react";

function FileDelete(photo) {
    const [photoID] = useState(photo.photoID); 
    const toast = useToast();
    const handleDelete = () => {
        axios
            .delete(`http://localhost:8800/Photos/${photoID}`)
            .then((res) => {
                if (res.data.Status === "Success") {
                    console.log(res.data.Status);
                    toast(({
                        title: "Photo Deleted",
                        status: 'success',
                        duration:1000,
                        position: 'top-left'
                      }))

                } else {
                    console.log(res.data.Message);
                    toast(({
                        title: "Photo Not Deleted",
                        status: 'error',
                        duration:1000,
                        position: 'top-left'
                      }))
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="container">
            <Button onClick={handleDelete} colorScheme="red" boxShadow='md'>DELETE</Button>
        </div>
    );
}

export default FileDelete;