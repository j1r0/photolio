import React from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Checkbox,
  CheckboxGroup,
  Stack,
} from "@chakra-ui/react";
import FilterCheckbox from "./FilterCheckbox";

function FilterPopover() {
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Button h="1.75rem" mr="0.5rem" size="sm">
            FILTER
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>Filter Photos</PopoverHeader>
          <PopoverBody>
          {FilterCheckbox("Camera", true, ["Fujifilm X-T5", "Canon EOS Rebel T7", "Nikon Z fc"])}
          {FilterCheckbox("Tags", true, ["Wildlife", "Landscape", "Portrait", "Film"])}
          {FilterCheckbox("Albums", true, ["Vacation", "Family", "Friends", "Work"])}

          </PopoverBody>
          <PopoverFooter>
            <Button colorScheme="blue">Apply</Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default FilterPopover;
