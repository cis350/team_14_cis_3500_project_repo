import React, { useState } from 'react';

function CreateBettingRoom() {
    const [gameName, setGameName] = useState('');
    const [gameDescription, setGameDescription] = useState('');
    const [participants, setParticipants] = useState([]);
    const [gameTimeLimit, setGameTimeLimit] = useState('');
    const [gamePot, setGamePot] = useState('');
    const [gameBuyIn, setGameBuyIn] = useState('');
    const [gamePassword, setGamePassword] = useState('');

    const handleAddParticipant = (name) => {
        const img = `https://placekitten.com/g/${Math.floor(200 + Math.random() * 100)}/${Math.floor(300 + Math.random() * 100)}`;
        setParticipants(prev => [...prev, { name, img }]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const eventData = {
            eventName: gameName,
            eventQueuePos: participants.length, // This could represent the total number of participants
            eventParty: participants,
            eventPot: gamePot,
            eventBuyIn: gameBuyIn,
            eventPassword: gamePassword
        };

        try {
            const response = await fetch('http://localhost:8002/event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventData)
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
                            Game Pot:
                            <input
                                type="number"
                                value={gamePot}
                                onChange={e => setGamePot(e.target.value)}
                                required
                                style={{ display: 'block', width: '80%', margin: 'auto', padding: '8px', borderRadius: '8px' }}
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>
                            Buy-In:
                            <input
                                type="number"
                                value={gameBuyIn}
                                onChange={e => setGameBuyIn(e.target.value)}
                                required
                                style={{ display: 'block', width: '80%', margin: 'auto', padding: '8px', borderRadius: '8px' }}
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>
                            Game Password:
                            <input
                                type="text"
                                value={gamePassword}
                                onChange={e => setGamePassword(e.target.value)}
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
