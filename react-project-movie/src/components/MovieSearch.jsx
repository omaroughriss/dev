import React, { useState } from 'react';
import "../css/MovieSearch.css"

const MovieSearch = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query);
    };

    return (
        <div className='movie-search'>
            <input
                type="text"
                placeholder="Rechercher un film..."
                value={searchQuery}
                onChange={handleSearch}
            />
        </div>
    );
};

export default MovieSearch;
