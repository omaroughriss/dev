import React, { createContext, useContext, useEffect, useState } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        const storedWishlist = localStorage.getItem('wishlist');
        return storedWishlist ? JSON.parse(storedWishlist) : [];
    });

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (movie) => {
        if (!wishlist.some((item) => item.id === movie.id)) {
            setWishlist((prev) => [...prev, movie]);
        }
    };

    const removeFromWishlist = (id) => {
        setWishlist((prev) => prev.filter((movie) => movie.id !== id));
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};
