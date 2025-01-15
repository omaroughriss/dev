import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistProvider';
import "../css/Navbar.css";

const Navbar = () => {
    const { wishlist } = useWishlist();

    return (
        <nav>
            <h1>Netflox</h1>
            <div className="nav-links">
                <Link to="/">Liste des films</Link>
                <Link to="/wishlist">Wishlist ({wishlist.length})</Link>
            </div>
        </nav>
    );
};

export default Navbar;

