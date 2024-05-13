import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function BettingRoom() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [participants, setParticipants] = useState([]);

    const buttonStyle = {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        marginTop: '10px'
      };

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const eventData = {
            eventName: gameName,                // Corrected to: name
            eventQueuePos: participants.length, // Corrected to: queuePos
            eventParty: participants,           // Corrected to: party
            eventPot: gamePot,                  // Corrected to: pot
            eventBuyIn: gameBuyIn,              // Corrected to: buyIn
            eventPassword: gamePassword         // Corrected to: password
        };
    
        console.log(eventData);
    
        try {
            const response = await fetch('http://localhost:8001/event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    eventName: eventData.eventName,
                    eventQueuePos: eventData.eventQueuePos,
                    eventParty: eventData.eventParty,
                    eventPot: eventData.eventPot,
                    eventBuyIn: eventData.eventBuyIn,
                    eventPassword: eventData.eventPassword
                })
            });
            const data = await response.json();
            if (response.status === 200) {
                console.log('Game created successfully:', data);
                // Handle success (e.g., clear form, redirect, or notify user)
            } else {
                throw new Error(data.message || 'Failed to create game');
            }
        } catch (error) {
            console.error('Error creating game:', error);
        }
    };

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
            <button style={buttonStyle} onClick={handleJoin}>Join Event</button>
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
