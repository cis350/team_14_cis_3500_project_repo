import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from './UserContext';

function BettingRoom() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [participants, setParticipants] = useState([]);
    const [roomPassword, setRoomPassword] = useState('');
    const [isParticipant, setIsParticipant] = useState(false); // State to track if user is a participant
    const { user } = useUser();


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
                fetchParticipants(data.eventParty);
            } catch (error) {
                console.error('Failed to fetch event:', error);
            } finally {
                setLoading(false);
            }
        }
        console.log(user);
        fetchEvent();
    }, [id]);

    const handleJoin = async () => {
        try {
            const response = await fetch(`http://localhost:8001/event/${id}/add-member`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ eventID: id, username: user.username })
            });
            console.log(user);
            console.log(JSON.stringify({ eventID: id, username: user.username }));
            const data = await response.json();
            if (response.ok) {
                console.log('User added successfully:', data);
                setIsParticipant(true); // Set participant status to true
            } else {
                throw new Error(data.message || 'Failed to add user to event');
            }
        } catch (error) {
            console.error('Error joining the event:', error);
        }
    };

    const handleEndGame = async () => {
        console.log("Ending the game...");
        try {
            const response = await fetch('http://localhost:8001/award-winner', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ eventID: id })
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Winner has been awarded successfully:', data);
                alert('Winner has been awarded the event pot.');
            } else {
                throw new Error(data.message || 'Failed to award winner');
            }
        } catch (error) {
            console.error('Error awarding event winner:', error);
            alert('Error awarding event winner: ' + error.message);
        }
    };
    

    const fetchParticipants = async () => {
        try {
            const response = await fetch(`http://localhost:8001/event/${id}/party`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ eventID: id })
            });

            const data = response.json();
            console.log(data);
            setParticipants(participants);
        } catch (error) {
            console.error('Error fetching party', error);
            alert('Error awarding event winner: ' + error.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!event) return <p>No event found.</p>;

    return (
        <div>
            <h1>{event.eventName}</h1>
            <p>Pot: ${event.eventPot}</p>
            <p>Buy-In: ${event.eventBuyIn}</p>
            {isParticipant ? (
                <button style={buttonStyle} onClick={handleEndGame}>End Game</button>
            ) : (
                <>
                    <input
                        type="password"
                        placeholder="Room Password"
                        value={roomPassword}
                        onChange={(e) => setRoomPassword(e.target.value)}
                        style={{ margin: '10px 0', padding: '10px', borderRadius: '10px' }}
                    />
                    <button style={buttonStyle} onClick={handleJoin}>Join Event</button>
                </>
            )}
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
