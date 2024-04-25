import React, { useState } from 'react';

function CreateBettingRoom() {
    const [gameName, setGameName] = useState('');
    const [gameDescription, setGameDescription] = useState('');
    const [participants, setParticipants] = useState([]);
    const [gameTimeLimit, setGameTimeLimit] = useState('');

    const handleAddParticipant = (participant) => {
        setParticipants(prev => [...prev, participant]);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Game Created:', { gameName, gameDescription, participants, gameTimeLimit });
        // make backend call here
    }

    return (
        <div>
            <h1>Create a Group Betting Room</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Game Name:
                    <input
                        type="text"
                        value={gameName}
                        onChange={e => setGameName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Game Description:
                    <textarea
                        value={gameDescription}
                        onChange={e => setGameDescription(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Game Time Limit (in minutes):
                    <input
                        type="number"
                        value={gameTimeLimit}
                        onChange={e => setGameTimeLimit(e.target.value)}
                        required
                    />
                </label>
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
                    />
                </label>
                <button type="submit">Create Game</button>
            </form>

            <h2>Participants</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {participants.map((participant, index) => (
                    <div key={index} style={{ padding: '10px', border: '1px solid black' }}>
                        {participant}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CreateBettingRoom;
