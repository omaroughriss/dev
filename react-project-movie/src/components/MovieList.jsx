import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useWishlist } from '../context/WishlistProvider';
import MovieItem from './MovieItem';
import MovieSearch from './MovieSearch';
import "../css/MovieList.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [category, setCategory] = useState('popular');
    const [searchQuery, setSearchQuery] = useState('');
    const { wishlist, addToWishlist } = useWishlist(); // Ajout de wishlist pour vérification

    useEffect(() => {
        const fetchMovies = async () => {
            const endpoint = searchQuery
                ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`
                : `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}`;
            const response = await fetch(endpoint);
            const data = await response.json();
            setMovies(data.results || []);
        };

        fetchMovies();
    }, [category, searchQuery]);

    return (
        <div className='home-page'>
            <MovieSearch onSearch={setSearchQuery} />
            <select onChange={(e) => setCategory(e.target.value)} value={category}>
                <option value="popular">Populaires</option>
                <option value="now_playing">En cours</option>
                <option value="top_rated">Les mieux notés</option>
                <option value="upcoming">À venir</option>
            </select>
            <div className='movie-list'>
                {movies.map((movie) => (
                    <MovieItem
                        key={movie.id}
                        movie={movie}
                        isInWishlist={wishlist.some((item) => item.id === movie.id)}
                        onAddToWishlist={() => addToWishlist(movie)}
                    />

                ))}
            </div>
        </div>
    );
};

export default MovieList;
