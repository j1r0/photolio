import React from "react";
import axios from "axios";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverCloseButton,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";

function DeleteAll() {
  const { isOpen, onToggle, onClose } = useDisclosure();
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

  const handleDeleteAll = () => {
    axios
      .delete(`http://localhost:8800/Photos`)
      .then((res) => {
        toasts(res, "deleteAll");
        setTimeout(() => {
          console.log("Deleting all photos... Reloading the page...");
          window.location.reload();
        }, 2000);
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={onClose}
        placement="top"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button onClick={onToggle} colorScheme="red" size="sm" bottom="0px">
            DELETE ALL
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader textAlign={'center'}>Confirmation</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>Are you sure you want to delete all photos?</PopoverBody>
          <PopoverFooter>
              <Button colorScheme="red" onClick={handleDeleteAll} w="100%" size='md'>
                Delete
              </Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DeleteAll;
