import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/MovieItem.css";

const MovieItem = ({ movie, onAddToWishlist, isInWishlist, onRemove }) => {
    const navigate = useNavigate();

    return (
        <div className="movie-item">
            {isInWishlist && <div className="in-wishlist">Dans la wishlist</div>}
            <h2>{movie.title}</h2>
            <img
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                alt={movie.title}
            />
            <p>Note : <span>{movie.vote_average}</span></p>
            <button className="detail-btn" onClick={() => navigate(`/movie/${movie.id}`)}>Voir les détails</button>
            {onRemove ? (
                <button
                    className="wishlist-icon"
                    onClick={onRemove}
                    aria-label="Supprimer de la Wishlist"
                >
                    ❌
                </button>
            ) : (
                <button
                    className="wishlist-icon"
                    onClick={onAddToWishlist}
                    aria-label="Ajouter à la Wishlist"
                >
                    ➕
                </button>
            )}
        </div>
    );
};

export default MovieItem;
