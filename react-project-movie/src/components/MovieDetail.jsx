import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import MovieItem from './MovieItem';
import "../css/MovieDetail.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [actors, setActors] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);

    useEffect(() => {
        const fetchMovie = async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
            );
            const data = await response.json();
            setMovie(data);
        };

        const fetchCredits = async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
            );
            const data = await response.json();
            setActors(data.cast.slice(0, 10));
        };

        const fetchSimilarMovies = async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`
            );
            const data = await response.json();
            setSimilarMovies(data.results || []);
        };

        fetchMovie();
        fetchCredits();
        fetchSimilarMovies();
    }, [id]);

    if (!movie) return <p>Chargement...</p>;

    return (
        <div className='movie-detail'>
            <h1>{movie.title}</h1>
            <img className='img-movie'
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
            />
            <p>{movie.overview}</p>
            <p>Date de sortie : <span> {movie.release_date}</span></p>
            <p>Note moyenne : <span>{movie.vote_average}</span></p>

            <div className='actors-section'>
                <h2>Acteurs principaux</h2>
                {actors.length > 0 ? (
                    <ul>
                        {actors.map((actor) => (
                            <li key={actor.id}>
                                <img className='img-actors'
                                    src={
                                        actor.profile_path
                                            ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                                            : 'https://via.placeholder.com/150x225?text=Pas+de+photo'
                                    }
                                    alt={actor.name}
                                />
                                <p>{actor.name} (rôle : {actor.character})</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucun acteur trouvé.</p>
                )}
            </div>

            <div className='similar-movies'>
                <span className='title'><h2>Films similaires</h2></span>
                {similarMovies.length > 0 ? (
                    <div className='movie-list'>
                        {similarMovies.map((similarMovie) => (
                            <MovieItem
                                key={similarMovie.id}
                                movie={similarMovie}
                                onAddToWishlist={() => {}}
                                isInWishlist={false}
                            />
                        ))}
                    </div>
                ) : (
                    <p>Aucun film similaire trouvé.</p>
                )}
            </div>
        </div>
    );
};

export default MovieDetail;
