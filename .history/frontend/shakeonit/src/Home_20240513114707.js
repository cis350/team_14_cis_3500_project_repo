import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import EventCard from './EventCard';

function Home() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            setLoading(true);
            // Replace the URL with your API endpoint
            const response = await fetch('http://localhost:8001/events');
            const data = await response.json();
            console.log(data)
            setRooms(data);
        } catch (error) {
            console.error('Failed to fetch rooms:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        
        <div className="home-page">
            <h1>Available Betting Rooms</h1>
            {loading ? (
                <p>Loading rooms...</p>
            ) : (
                <div className="rooms-list">
                    {rooms.length > 0 ? (
                        rooms.map(room => (
                            <div key={room.id} className="room">
                                <h2>{room.name}</h2>
                                <p>{room.description}</p>
                            </div>
                        ))
                    ) : (
                        <p>No rooms available at the moment.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Home;
