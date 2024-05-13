import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function BettingRoom() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEvent() {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:8001/event/${id}`);
                const data = await response.json();
                setEvent(data);
            } catch (error) {
                console.error('Failed to fetch event:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchEvent();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!event) return <p>No event found.</p>;

    return (
        <div>
            <h1>{event.eventName}</h1>
            <p>Pot: ${event.eventPot}</p>
            <p>Buy-In: ${event.eventBuyIn}</p>
            {/* Display more details as needed */}
        </div>
    );
}

export default BettingRoom;
