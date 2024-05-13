import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function BettingRoom() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        async function fetchEvent() {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:8001/event/${id}/details`);
                const data = await response.json();
                console.log(data);
                setEvent(data);
                if (data.eventParty && data.eventParty.length > 0) {
                    fetchParticipants(data.eventParty);
                }
            } catch (error) {
                console.error('Failed to fetch event:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchEvent();
    }, [id]);

    const fetchParticipants = async (partyIds) => {
        // Assuming you have an endpoint to fetch user details by IDs
        const responses = await Promise.all(partyIds.map(userId =>
            fetch(`http://localhost:8001/user/${userId}`).then(res => res.json())
        ));
        setParticipants(responses);
    };

    if (loading) return <p>Loading...</p>;
    if (!event) return <p>No event found.</p>;

    return (
        <div>
            <h1>{event.eventName}</h1>
            <p>Pot: ${event.eventPot}</p>
            <p>Buy-In: ${event.eventBuyIn}</p>
            <h2>Participants</h2>
            {participants.length > 0 ? (
                <ul>
                    {participants.map(participant => (
                        <li key={participant._id}>{participant.username}</li>
                    ))}
                </ul>
            ) : (
                <p>No participants registered yet.</p>
            )}
        </div>
    );
}

export default BettingRoom;
