import React from "react";
import './NavBar.css';
import { NavLink,Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; /* for react icons */
import sneakLogo from '/assets/extra/logo.png';
import './NavBar.css'

const NavBar = () => {
    return (
        <div className="entire-nav">
            <header>
                <img className="logo" src={sneakLogo} alt="SNEAK" />
                <div className="navbar">
                <div className="categories">
                <NavLink 
                        to="/home" 
                        className={({ isActive }) => (isActive && window.location.pathname === "/home") ? 'popular active' : 'popular'}
                    >
                        Popular
                    </NavLink>
                    <NavLink
                            to="/home/women"
                            className={({ isActive }) => isActive ? 'women active' : 'women'}
                        >
                            Women
                        </NavLink>
                    
                    
                        <NavLink
                            to="/home/men"
                            className={({ isActive }) => isActive ? 'men active' : 'men'}
                        >
                            Men
                        </NavLink>
                </div>
                    
                    
                    <NavLink className="search">
                        <div className="search-div">
                            <FaSearch className="search-icon" />
                        </div>
                    </NavLink>
                    <Link to='/home/cart' className="search">
                        <img className="cart-icon" src="/assets/extra/cart.png" alt="cart"></img>
                    </Link>
                    <Link className="search">
                        <img className="user-icon" src="/assets/extra/user-profile.png" alt="user-profile"></img>
                    </Link>
                    
                </div>
            </header>
        </div>
    );
};

export default NavBar;
