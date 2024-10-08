import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; 
import sneakLogo from '/assets/extra/logo.png';
import './NavBar.css';
import { CartContext } from "../cart/CartContext";
import Profile from "../userProfile/Profile";
import Search from "./Search";

const NavBar = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [profile, setProfile] = useState(false);
    const [showSearch,setShowSearch]=useState(false);
    const { userData, cartItems } = useContext(CartContext);
    
    // Handle profile click
    const handleProfile = () => {
    
        
            setProfile(!profile);

    };

    // Handle scroll to hide or show the navbar
    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Hide navbar when scrolling down
        if (scrollY > lastScrollY) {
            setIsVisible(false);
        } else {
            // Show navbar when scrolling up
            setIsVisible(true);
        }

        // Update the last scroll position
        setLastScrollY(scrollY);
    };

    useEffect(() => {
        // Add event listener for scroll
        window.addEventListener('scroll', handleScroll);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <div className={`sticky top-0 z-20 bg-gray-100 shadow transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
            <header className="flex items-center justify-between h-16 px-3 md:px-16 max-w-full overflow-hidden">
                <img className="w-24" src={sneakLogo} alt="SNEAK" />

                <div className="flex items-center space-x-3 md:space-x-8">
                    <NavLink 
                        to="/home" 
                        className={({ isActive }) => 
                            `font-semibold ${isActive ? 'text-black' : 'text-gray-500'}`
                        }
                    >
                        Popular
                    </NavLink>
                    <NavLink
                        to="/home/women"
                        className={({ isActive }) => 
                            `font-semibold ${isActive ? 'text-black' : 'text-gray-500'}`
                        }
                    >
                        Women
                    </NavLink>
                    <NavLink
                        to="/home/men"
                        className={({ isActive }) => 
                            `font-semibold ${isActive ? 'text-black' : 'text-gray-500'}`
                        }
                    >
                        Men
                    </NavLink>

                    {/* Search, Cart, and User Profile Icons */}
                    <div  className="flex items-center space-x-4">
                        <NavLink onClick={()=>setShowSearch(!showSearch)} className="flex items-center justify-center p-2 border border-gray-300 rounded-lg">
                            <FaSearch className="text-gray-600" />
                        </NavLink>
                        <Link to='/home/cart'>
                            {cartItems.length}
                            <img className="w-6" src="/assets/extra/cart.png" alt="cart" />
                        </Link>
                        <Link to="#" onClick={handleProfile}>
                            <img className="w-6" src="/assets/extra/user-profile.png" alt="user-profile" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* Conditionally render Profile component */}
            {profile && <Profile />} 
            {showSearch&& <Search/>}
        </div>
    );
};

export default NavBar;
