import React, { useState } from 'react'
import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react'

function FilterCheckbox(checkboxName, hasChildren, children) {

    const [checkedItems, setCheckedItems] = React.useState(Array(children.length).fill(false))


    const allChecked = checkedItems.every(Boolean)
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked
  
    return (
        <>
        {hasChildren ? (

        <><Checkbox
                    isChecked={allChecked}
                    isIndeterminate={isIndeterminate}
                    onChange={(e) => setCheckedItems(Array(children.length).fill(e.target.checked))}
                >
                    {checkboxName}
                </Checkbox>
                <Stack pl={6} mt={1} spacing={1}>
                    {children.map((child, index) => (
                        <Checkbox
                            key={index}
                            isChecked={checkedItems[index]}
                            onChange={(e) => {
                                const newCheckedItems = [...checkedItems]
                                newCheckedItems[index] = e.target.checked
                                setCheckedItems(newCheckedItems)
                            }}
                            >
                            {child}
                        </Checkbox>
                    ))}
                    </Stack></>
    ) : (
        <CheckboxGroup colorScheme="green" defaultValue={["one", "two"]}>
            <Stack spacing={2}>
            <Checkbox value="one">{checkboxName}</Checkbox>
            </Stack>
        </CheckboxGroup>
        )}
        </>
        )
    }

export default FilterCheckbox