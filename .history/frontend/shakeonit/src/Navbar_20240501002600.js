import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
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

    return (
        <nav style={navbarStyle}>
            <div>
                <Link to="/" style={linkStyle}>Home</Link>
                <Link to="/join-room" style={linkStyle}>Join Room</Link>
                <Link to="/create-room" style={linkStyle}>Create Room</Link>
            </div>
            <div>
                <Link to="/signin" style={linkStyle}>Sign In / Sign Up</Link>
            </div>
        </nav>
    );
}

export default Navbar;
