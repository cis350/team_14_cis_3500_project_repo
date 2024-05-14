import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './UserContext';

function Navbar() {
    const { user, setUser } = useUser();

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

    const handleSignOut = () => {
        setUser({ id: null, username: null }); // Assuming you clear the user context on sign out
        localStorage.removeItem('userEmail'); // Assuming you're using localStorage to store the user email
    };

    return (
        <nav style={navbarStyle}>
            <div>
                <Link to="/" style={linkStyle}>Home</Link>
                <Link to="/create-room" style={linkStyle}>Create Room</Link>
            </div>
            <div>
                {user && user.username ? (
                    <div>
                        Welcome, {user.username} <a href="#" onClick={handleSignOut} style={linkStyle}>Sign Out</a>
                    </div>
                ) : (
                    <Link to="/signin" style={linkStyle}>Sign In / Sign Up</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
