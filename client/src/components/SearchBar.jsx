import React, { useState } from 'react';
import axios from 'axios';
import PhotosLayout from './PhotosLayout';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const res = [];

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        axios.get(`http://localhost:8800/Photos/`)
            .then((response) => {
                // Handle the response data here
                console.log('Search results:', response.data);
                response.data.map((photo) => {
                    
                    if (photo.fileName.includes(searchTerm)) {
                        res.push(photo);   
                    }
                });
                setSearchResults([...searchResults, ...res]);
            })
            .catch((error) => {
                // Handle any errors here
                console.error('Error searching:', error);
            });
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Search</button>

            <PhotosLayout photos={searchResults} />
        
        </div>
    );
};

export default SearchBar;