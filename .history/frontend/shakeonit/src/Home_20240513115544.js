import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import EventGrid from './EventCard';  // Assuming EventGrid is the default export

function Home() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            // Make sure the URL matches your API endpoint for fetching events
            const response = await fetch('http://localhost:8001/events');
            const data = await response.json();
            setEvents(data.events); // Assuming the data is structured { events: [...]}
        } catch (error) {
            console.error('Failed to fetch events:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-page">
            <h1>Available Betting Rooms</h1>
            {loading ? (
                <p>Loading events...</p>
            ) : (
                <EventGrid events={events} />
            )}
        </div>
    );
}

export default Home;
