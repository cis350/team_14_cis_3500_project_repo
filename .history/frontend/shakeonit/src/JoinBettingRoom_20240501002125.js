import React, { useState } from 'react';

function JoinBettingRoom() {
    const [roomId, setRoomId] = useState('');

    const handleInputChange = (event) => {
        setRoomId(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Logic to join the room
        console.log('Joining room with ID:', roomId);
        // Ideally, replace console.log with a call to join the room via your API
    };

    return (
        <div className="join-room">
            <h1>Join a Betting Room</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="room-id">Room ID:</label>
                <input
                    type="text"
                    id="room-id"
                    value={roomId}
                    onChange={handleInputChange}
                    placeholder="Enter room ID"
                    required
                />
                <button type="submit">Join Room</button>
            </form>
        </div>
    );
}

export default JoinRoom;
