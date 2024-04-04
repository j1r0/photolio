import React from 'react'
import axios from 'axios'
import { Button } from '@chakra-ui/react'

function DeleteAll() {
    const handleDeleteAll = () => {
        axios.delete(`http://localhost:8800/Photos`).then((res) => {
            if (res.data.Status === "Success") {
                console.log(res.data.Status);
                window.location.reload();
            } else {
                console.log(res.data.Message);
            }
        }
        ).catch((err) => console.error(err));
    }
  return (
    <div>
        <Button onClick={handleDeleteAll} colorScheme="red" size='sm' top ='200px' right='0px'>DELETE ALL</Button>
    </div>
  )
}

export default DeleteAll;