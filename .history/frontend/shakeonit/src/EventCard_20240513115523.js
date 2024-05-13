import React from 'react';

function EventCard({ event }) {
  const cardStyle = {
    backgroundColor: '#f7f7f7',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    textAlign: 'center',
    marginBottom: '20px'
  };

  const headerStyle = {
    color: '#333',
    fontSize: '1.2em'
  };

  const detailStyle = {
    marginBottom: '10px',
    fontSize: '0.9em'
  };

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

  return (
    <div style={cardStyle}>
      <h3 style={headerStyle}>{event.eventName}</h3>
      <div style={detailStyle}><strong>Pot:</strong> ${event.eventPot}</div>
      <div style={detailStyle}><strong>Buy-In:</strong> ${event.eventBuyIn}</div>
      <div style={detailStyle}><strong>Party Size:</strong> {event.EventParty?.length ?? 0}</div>
      <button style={buttonStyle}>Join Event</button>
    </div>
  );
}

function EventGrid({ events }) {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    padding: '20px'
  };

  return (
    <div style={gridStyle}>
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}

export default EventGrid;
