import React, { useState } from "react";
import axios from "axios";
import { Button } from "@chakra-ui/react";

function FileDelete(photo) {
    const [photoID] = useState(photo.photoID); 
    const handleDelete = () => {
        axios
            .delete(`http://localhost:8800/Photos/${photoID}`)
            .then((res) => {
                if (res.data.Status === "Success") {
                    console.log(res.data.Status);
                    window.location.reload();
                } else {
                    console.log(res.data.Message);
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="container">
            <Button onClick={handleDelete} colorScheme="red">DELETE</Button>
        </div>
    );
}

export default FileDelete;

