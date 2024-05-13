import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from './UserContext';

function BettingRoom() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [participants, setParticipants] = useState([]);
    const [roomPassword, setRoomPassword] = useState('');
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

    const handleSubmit = async () => {
        if (!event || !user.id) {
            console.error('Event details or user details are missing');
            return;
        }
    
        try {
            // API call to add member to the event
            const response = await fetch(`http://localhost:8001/event/${id}/add-member`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: user.id, password: roomPassword })
            });
            const data = await response.json();
            if (response.ok) {
                console.log('User added successfully:', data);
            } else {
                throw new Error(data.message || 'Failed to add user to event');
            }
        } catch (error) {
            console.error('Error joining the event:', error);
        }
    };

    const fetchParticipants = async (partyIds) => {
        const responses = await Promise.all(partyIds.map(userId =>
            fetch(`http://localhost:8001/user/${userId}`).then(res => res.json())
        ));
        setParticipants(responses);
    };

    if (loading) return <p>Loading...</p>;
    if (!event) return <p>No event found.</p>;

    return (
        <div>
            <div></div>
            <h1>{event.eventName}</h1>
            <p>Pot: ${event.eventPot}</p>
            <p>Buy-In: ${event.eventBuyIn}</p>
            <input
                type="password"
                placeholder="Room Password"
                value={roomPassword}
                onChange={(e) => setRoomPassword(e.target.value)}
                style={{ margin: '10px 0', padding: '10px' }}
            />
            </div>
            <button style={buttonStyle} onClick={handleSubmit}>Join Event</button>
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
