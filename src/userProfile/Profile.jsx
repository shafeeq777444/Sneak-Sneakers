import React, { useContext, useEffect } from "react";
import { CartContext } from "../cart/CartContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { userData } = useContext(CartContext);
    const navigate = useNavigate();  // useNavigate hook should be initialized here
    const handleLogout = () => {
        localStorage.clear();
        navigate('/');  // Redirect to the login or home page after logout
    };
    console.log(userData,"hello");
if(userData){
    return (
        <div>
            <div>
                <p>{userData?.id}</p>
                <p>{userData?.name}</p>
                <p>{userData?.email}</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )}
    else{
        return(<div><button onClick={handleLogout}>logIn</button></div>)
    }
};

export default Profile;
