import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Import necessary icons
import sneakLogo from '/assets/extra/logo.png';
import './NavBar.css';

const NavBar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleScroll = () => {
        const scrollY = window.scrollY;

        // If scrolling down, hide the navbar
        if (scrollY > lastScrollY) {
            setIsVisible(false);
        } else {
            // If scrolling up, show the navbar
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
        <div className={` sticky top-0 z-20 bg-gray-100 shadow transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
            <header className="flex items-center justify-between h-16 px-3 md:px-16 max-w-full overflow-hidden">
                <img className="w-24" src={sneakLogo} alt="SNEAK" />

                <div className="  flex items-center space-x-3 md:space-x-8">
                    <NavLink 
                        to="/home" 
                        className={({ isActive }) => 
                            `font-semibold ${isActive && window.location == "http://localhost:5173/home" ? 'text-black' : 'text-gray-500'}`
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
                    <div className="flex items-center space-x-4">
                        <NavLink className="flex items-center justify-center p-2 border border-gray-300 rounded-lg">
                            <FaSearch className="text-gray-600" />
                        </NavLink>
                        <Link to='/home/cart'>
                            <img className="w-6" src="/assets/extra/cart.png" alt="cart" />
                        </Link>
                        <Link>
                            <img className="w-6" src="/assets/extra/user-profile.png" alt="user-profile" />
                        </Link>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default NavBar;
