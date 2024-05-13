import React, { useState } from 'react';
import axios from 'axios';

function CreateBettingRoom() {
    const [eventName, setEventName] = useState('');
    const [eventQueuePos, setEventQueuePos] = useState(1); // Assuming default queue position
    const [eventPot, setEventPot] = useState('');
    const [eventBuyIn, setEventBuyIn] = useState('');
    const [eventPassword, setEventPassword] = useState('');
    const [participants, setParticipants] = useState([]);
    const [error, setError] = useState('');

    const handleAddParticipant = (name) => {
        if (name) { // Only add if name is not empty
            setParticipants(prev => [...prev, name]);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        const eventDetails = {
            eventName,
            eventQueuePos: parseInt(eventQueuePos, 10),
            eventParty: participants.map(name => ({ username: name })), // Assuming backend expects this format
            eventPot: parseFloat(eventPot),
            eventBuyIn: parseFloat(eventBuyIn),
            eventPassword
        };

        try {
            const response = await axios.post('http://localhost:5000/event', eventDetails);
            console.log('Game Created:', response.data);
        } catch (error) {
            console.error('Error creating game:', error);
            setError('Failed to create game. Please try again.');
        }
    };

    return (
        <div>
            <h1 style={{ color: 'teal' }}>Create a Group Betting Room</h1>
            <div style={{ margin: '20px', padding: '20px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '10px', backgroundColor: '#fff' }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>
                            Event Name:
                            <input
                                type="text"
                                value={eventName}
                                onChange={e => setEventName(e.target.value)}
                                required
                                style={{ display: 'block', width: '80%', margin: 'auto', padding: '8px', borderRadius: '8px' }}
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>
                            Event Pot:
                            <input
                                type="number"
                                value={eventPot}
                                onChange={e => setEventPot(e.target.value)}
                                required
                                style={{ display: 'block', width: '80%', margin: 'auto', padding: '8px', borderRadius: '8px' }}
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>
                            Event Buy-In:
                            <input
                                type="number"
                                value={eventBuyIn}
                                onChange={e => setEventBuyIn(e.target.value)}
                                required
                                style={{ display: 'block', width: '80%', margin: 'auto', padding: '8px', borderRadius: '8px' }}
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>
                            Event Password:
                            <input
                                type="password"
                                value={eventPassword}
                                onChange={e => setEventPassword(e.target.value)}
                                required
                                style={{ display: 'block', width: '80%', margin: 'auto', padding: '8px', borderRadius: '8px' }}
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>
                            Add Participant:
                            <input
                                type="text"
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleAddParticipant(e.target.value);
                                        e.target.value = ''; // Clear the input after adding
                                    }
                                }}
                                style={{ display: 'block', width: '80%', margin: 'auto', padding: '8px', borderRadius: '8px' }}
                            />
                        </label>
                    </div>
                    <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px' }}>Create Game</button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <h2>Participants</h2>
            <ul>
                {participants.map((participant, index) => (
                    <li key={index}>{participant}</li>
                ))}
            </ul>
        </div>
    );
}

export default CreateBettingRoom;
