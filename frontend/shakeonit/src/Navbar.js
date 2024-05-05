import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const navbarStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 20px',
        backgroundColor: '#333',
        color: '#fff'
    };

    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        marginRight: '20px'
    };

    useEffect(() => {
        const email = localStorage.getItem('userEmail'); // Assuming the user's email is stored in localStorage upon login
        if (email) {
            setUserEmail(email);
            setIsLoggedIn(true);
        }
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('userEmail'); // Remove the stored email
        setIsLoggedIn(false);
    };

    return (
        <nav style={navbarStyle}>
            <div>
                <Link to="/" style={linkStyle}>Home</Link>
                <Link to="/join-room" style={linkStyle}>Join Room</Link>
                <Link to="/create-room" style={linkStyle}>Create Room</Link>
            </div>
            <div>
                {isLoggedIn ? (
                    <div>
                        Welcome, {userEmail} <a href="#" onClick={handleSignOut} style={linkStyle}>Sign Out</a>
                    </div>
                ) : (
                    <Link to="/signin" style={linkStyle}>Sign In / Sign Up</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
