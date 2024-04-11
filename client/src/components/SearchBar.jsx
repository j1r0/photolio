import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PhotosLayout from './PhotosLayout';
import { Input, Button, InputGroup, InputRightElement} from '@chakra-ui/react';
import { Link, NavLink } from 'react-router-dom';
const SearchBar = ({searchTerm}, {onSearchChange}) => {


    return (
        <>
<div >
            <InputGroup size ='lg'> 
            <Input pr="4.5rem"
            variant='outline'
            boxShadow= {'md'}
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={onSearchChange}

            />
                <InputRightElement w='4.5rem'>
            <Button h='1.75rem'mr='0.5rem' size ='sm' > Search
                    </Button>
                    </InputRightElement>
                    </InputGroup>

     </div>
        </>
    )
};

export default SearchBar;
