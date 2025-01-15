import React from 'react';
import { useWishlist } from '../context/WishlistProvider';
import MovieItem from './MovieItem';

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();

    return (
        <div>
            <h1>Wishlist</h1>
            {wishlist.length > 0 ? (
                <div className="movie-list">
                    {wishlist.map((movie) => (
                        <MovieItem
                            key={movie.id}
                            movie={movie}
                            isInWishlist={true}
                            onRemove={() => removeFromWishlist(movie.id)}
                        />
                    ))}
                </div>
            ) : (
                <p>Aucun film dans la wishlist.</p>
            )}
        </div>
    );
};

export default Wishlist;
