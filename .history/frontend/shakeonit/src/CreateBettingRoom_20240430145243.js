import React, { useState } from 'react';
import axios from 'axios';

function CreateBettingRoom() {
    const [gameName, setGameName] = useState('');
    const [gameDescription, setGameDescription] = useState('');
    const [participants, setParticipants] = useState([
        { name: "John Doe", img: "https://placekitten.com/g/200/300" },
        { name: "Jane Smith", img: "https://placekitten.com/g/200/300" }
    ]);
    const [gameTimeLimit, setGameTimeLimit] = useState('');
    const [eventQueuePos, setEventQueuePos] = useState('');
    const [eventPot, setEventPot] = useState('');
    const [eventBuyIn, setEventBuyIn] = useState('');
    const [eventPassword, setEventPassword] = useState('');
    const [participants, setParticipants] = useState([]);
    const [error, setError] = useState('');
    const [eventName, setEventName] = useState('');

    const handleAddParticipant = (name) => {
        const img = `https://placekitten.com/g/${Math.floor(200 + Math.random() * 100)}/${Math.floor(300 + Math.random() * 100)}`;
        setParticipants(prev => [...prev, { name, img }]);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            const eventDetails = {
                eventName,
                eventQueuePos: parseInt(eventQueuePos, 10),
                eventParty: participants,
                eventPot: parseFloat(eventPot),
                eventBuyIn: parseFloat(eventBuyIn),
                eventPassword
            };

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
                            Game Name:
                            <input
                                type="text"
                                value={gameName}
                                onChange={e => setGameName(e.target.value)}
                                required
                                style={{ display: 'block', width: '80%', margin: 'auto', padding: '8px', borderRadius: '8px' }}
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>
                            Game Description:
                            <textarea
                                value={gameDescription}
                                onChange={e => setGameDescription(e.target.value)}
                                required
                                style={{ display: 'block', width: '80%', margin: 'auto', padding: '8px', borderRadius: '8px', height: '80px' }}
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>
                            Game Time Limit (in minutes):
                            <input
                                type="number"
                                value={gameTimeLimit}
                                onChange={e => setGameTimeLimit(e.target.value)}
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
            </div>

            <h2>Participants</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {participants.map((participant, index) => (
                    <div key={index} style={{ padding: '10px', border: '1px solid black', borderRadius: '5px', textAlign: 'center' }}>
                        <img src={participant.img} alt="Participant" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                        <div>{participant.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CreateBettingRoom;
