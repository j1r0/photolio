import React, { useState, useEffect } from "react";
import { Checkbox, Stack } from "@chakra-ui/react";

function FilterCheckbox({ checkboxName, hasChildren, children, checkedItems, setCheckedItems }) {

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  useEffect(() => {
    setCheckedItems(Array(children.length).fill(false));
  }, [children, setCheckedItems]);
  
  return (
    <>
      {hasChildren ? (
        <>
          <Checkbox
            isChecked={allChecked}
            isIndeterminate={isIndeterminate}
            onChange={(e) =>
              setCheckedItems(Array(children.length).fill(e.target.checked))
            }
          >
            {checkboxName}
          </Checkbox>
          <Stack pl={6} mt={1} spacing={1}>
            {children.map((child, index) => (
              <Checkbox
                key={index}
                isChecked={checkedItems[index]}
                onChange={(e) => {
                  const newCheckedItems = [...checkedItems];
                  newCheckedItems[index] = e.target.checked;
                  setCheckedItems(newCheckedItems);
                }}
              >
                {child}
              </Checkbox>
            ))}
          </Stack>
        </>
      ) : null}
    </>
  );
}

export default FilterCheckbox;
