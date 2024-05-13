import React, { useState } from 'react';

function CreateBettingRoom() {
    const [gameName, setGameName] = useState('');
    const [gameDescription, setGameDescription] = useState('');
    const [participants, setParticipants] = useState([
        { name: "John Doe", img: "https://placekitten.com/g/200/300" },
        { name: "Jane Smith", img: "https://placekitten.com/g/200/300" }
    ]);
    const [gameTimeLimit, setGameTimeLimit] = useState('');

    const handleAddParticipant = (name) => {
        const img = `https://placekitten.com/g/${Math.floor(200 + Math.random() * 100)}/${Math.floor(300 + Math.random() * 100)}`;
        setParticipants(prev => [...prev, { name, img }]);
    }

    

User
this is the backend file for creating a gambling room app (you should have previous context)

const { getUserByUName, getUser } = require('./user.js');
//var pos = 0;

/* eslint-disable no-console */
const { ObjectId } = require('mongodb');
const { getDB } = require('./db');

/**
 * Add a new event to the events collection
 * @param {*} newEvent - new event to add
 * @returns
 */

const addEvent = async (newEvent) => {
  try {
    const db = await getDB();
    const result = await db.collection('events').insertOne(newEvent);
    console.log(`New event created with id: ${result.insertedId}`);
    console.log('* Note the the Event Name, Event Password, and position in Event Feed Queue cannot be altered *');
    return result.insertedId;
  } catch (err) {
    console.error(err);
    throw new Error('Could not add event');
  }
};

// /**
//   * GET/READ a user given their ID
//   * @param {*} userID - user id of a user
//   * @returns
//   */
// const getEventID = async (eventID) => {
//   try {
//     // get the db
//     const db = await getDB();
//     const result = await db.collection('events').findOne({ _id: new ObjectId(userID) });
//     // print the result
//     console.log(`User: ${JSON.stringify(result)}`);
//     return result;
//   } catch (err) {
//     console.error(err);
//     throw new Error('could not get the user');
//   }
// };

/**
* Update an event's information
* @param {*} eventID - the id of the event
* @param {*} eventName
* @param {*} eventQueuePos
* @param {*} eventParty
* @param {*} newEventPot
* @param {*} newEventBuyIn

* @returns
*/

const updateEventPot = async (eventID, NewEventPot) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('events').updateOne(
      { _id: new ObjectId(eventID) },
      { $set: { eventPot: NewEventPot } }
    );
    const name = await db.collection('events').findOne(
      { _id: new ObjectId(eventID) }
    );
    console.log('event: ' + name.eventName + " -> pot amount is now: " + NewEventPot);
    return result;
  } catch (err) {
    const name = await db.collection('events').findOne(
      { _id: new ObjectId(eventID) }
    );
    console.error(err);
    throw new Error('could not update event '+ name.eventName +'  pot amount');
  }
};

const updateEventBuyIn = async (eventID, NewEventBuyIn) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('events').updateOne(
      { _id: new ObjectId(eventID) },
      { $set: { eventBuyIn: NewEventBuyIn } }
    );
    const name = await db.collection('events').findOne(
      { _id: new ObjectId(eventID) }
    );
    console.log('event: ' + name.eventName + " -> buy-in amount is now: " + NewEventBuyIn);
    return result;
  } catch (err) {
    const name = await db.collection('events').findOne(
      { _id: new ObjectId(eventID) }
    );
    console.error(err);
    throw new Error('could not update event: '+ name.eventName +' buy-in amount');
  }
};

const getEventParty = async (eventID) => {
  try {
    const db = await getDB();
    const result = await db.collection('events').findOne({
       _id: new ObjectId(eventID) });

    if (!result) {
      console.log('No event found with that ID');
      return null; // or you might throw an error or handle it differently
    }

    console.log('event: ' +  result.eventName + ` -> event party: ${JSON.stringify(result.eventParty)}`);
    return result.eventParty;  // Assuming the array of members is stored under 'eventParty'
  } catch (err) {
    console.error(err);
    throw new Error('Could not get the event');
  }
};

const addMemberToEventParty = async (eventID, username) => {
  try {
    const db = await getDB();
    const userID = await getUserByUName(username);  // Correctly await the user ID

    if (!userID) {
      console.log('User not found');
      return false;  // Exit if no user is found
    }

    const result = await db.collection('events').updateOne(
      { _id: new ObjectId(eventID) },
      { $push: { eventParty: { userID: userID } } }  // Push the userID within an object
    );

    //console.log(result);

    if (result.modifiedCount === 0) {
      console.log('No event was updated');
      return false;
    }

    console.log(`Member: ${username} with ID: ${userID} added to event party`);
    return true;
  } catch (err) {
    console.error(err);
    throw new Error('Could not add member to event party');
  }
};

// const queuePos = async () => {
//   currentPos = pos + 1;
// }



/** 
 * updateEventPot('66244efd47341d13c2561224', 1000);
 * updateEventBuyIn('66244efd47341d13c2561224', 100);
 * getEventParty('66244efd47341d13c2561224');
*/

// addEvent({eventName: "TEST_EVENT",
//           eventQueuePos: 1,
//           eventParty: [],
//           eventPot: 100,
//           eventBuyIn: 10,
//           eventPassword: "secretPassword123"});

//addMemberToEventParty('6625742d6c7fcf66824be438', "ophera2");
//addMemberToEventParty('6625742d6c7fcf66824be438', "lincolnn");
//addMemberToEventParty('6625742d6c7fcf66824be438', "idaisugi");
//addMemberToEventParty('6625742d6c7fcf66824be438', "seanwjc");
//addMemberToEventParty('6625742d6c7fcf66824be438', "mhugues");

setTimeout(() => {
  addMemberToEventParty('6625eb2cc0c7ab0142dbb360', "ophera2");
  addMemberToEventParty('6625eb2cc0c7ab0142dbb360', "lincolnn");
  addMemberToEventParty('6625eb2cc0c7ab0142dbb360', "idaisugi");
  addMemberToEventParty('6625eb2cc0c7ab0142dbb360', "seanwjc");
  addMemberToEventParty('6625eb2cc0c7ab0142dbb360', "mhugues");
  getEventParty('6625eb2cc0c7ab0142dbb360');
}, 200);

module.exports = {
  addEvent,
  updateEventPot,
  updateEventBuyIn,
  getEventParty,
  addMemberToEventParty
};


can you edit my frontend file to work with this backend file

import React, { useState } from 'react';

function CreateBettingRoom() {
    const [gameName, setGameName] = useState('');
    const [gameDescription, setGameDescription] = useState('');
    const [participants, setParticipants] = useState([
        { name: "John Doe", img: "https://placekitten.com/g/200/300" }, // Changed dimensions for better compatibility
        { name: "Jane Smith", img: "https://placekitten.com/g/200/300" } // Changed dimensions for better compatibility
    ]);
    const [gameTimeLimit, setGameTimeLimit] = useState('');

    const handleAddParticipant = (name) => {
        const img = `https://placekitten.com/g/${Math.floor(200 + Math.random() * 100)}/${Math.floor(300 + Math.random() * 100)}`; // More reliable dimensions
        setParticipants(prev => [...prev, { name, img }]);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Game Created:', { gameName, gameDescription, participants, gameTimeLimit });
        // You might want to send this data to your backend server here
    }

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

ChatGPT
To integrate the frontend component CreateBettingRoom with your backend, you'll need to add API calls to interact with the server for operations like creating an event, updating event details, and managing participants. Here’s how you can modify your React component to work with the backend file you provided:

Install Axios: First, you'll need a way to make HTTP requests to your server. Axios is a popular library for this. You can install it via npm:
bash
Copy code
npm install axios
Create API Helper Functions: Create functions to interact with your backend endpoints. Here’s a simple setup:
javascript
Copy code
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Adjust this URL to where your server is hosted

function createEvent(data) {
    return axios.post(`${API_URL}/addEvent`, data);
}

function addMember(eventID, username) {
    return axios.post(`${API_URL}/addMemberToEventParty`, { eventID, username });
}
Modify handleSubmit to Use the API: When the form is submitted, you should call the backend to create the event and add participants.
javascript
Copy code
const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const eventDetails = {
            eventName: gameName,
            eventDescription: gameDescription,
            eventQueuePos: 1, // You might want to manage this differently
            eventParty: [],
            eventPot: 100, // Set initial pot, adjust as necessary
            eventBuyIn: 10, // Set initial buy-in, adjust as necessary
            eventPassword: "secretPassword123" // You should handle password setting securely
        };
        const response = await createEvent(eventDetails);
        const eventID = response.data; // Adjust according to your backend response structure

        for (const participant of participants) {
            await addMember(eventID, participant.name);
        }

        console.log('Game Created:', eventID);
    } catch (error) {
        console.error('Error creating game:', error);
    }
}
Add Error Handling and State for Loading/Responses: It's good to provide feedback to the user about the status of their request.
javascript
Copy code
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
        // existing code
        setLoading(false);
    } catch (error) {
        console.error('Error creating game:', error);
        setError('Failed to create game. Please try again.');
        setLoading(false);
    }
}
Update the Return Statement: Reflect any loading states or error messages in your UI.
javascript
Copy code
<button type="submit" style={{ padding: '10px 20px', borderRadius: '8px' }} disabled={loading}>
    {loading ? 'Creating...' : 'Create Game'}
</button>
{error && <p style={{ color: 'red' }}>{error}</p>}
This is a basic integration setup. Depending on your backend API's specific needs and responses, you might need to adjust data handling and error management. Make sure your server is set up to handle CORS requests from your frontend's host if they are not served from the same domain.

User
here is the api endpoint file:

/**
 * Express webserver / controller
 */

const { ObjectId } = require('mongodb');

// import express
const express = require('express');

// import the cors -cross origin resource sharing- module
const cors = require('cors');

// create a new express app
const webapp = express();

// import authentication functions
const { authenticateUser, verifyUser, blacklistJWT } = require('./auth');

// enable cors
webapp.use(cors());

// configure express to parse request bodies
webapp.use(express.urlencoded({ extended: true }));

// import the db function
const dbLib = require('../model/user');

// Import the event handling functions
const eventLib = require('../model/event.js');

// root endpoint route

webapp.get('/', (req, resp) => {
  resp.json({ message: 'CIS 3500 Betting App !!!' });
});

/**
 * Login endpoint POST /login
 * The name is used to log in
 */
webapp.post('/login', (req, resp) => {
  // check that the name was sent in the body
  if (!req.body.username || req.body.username === '') {
    resp.status(401).json({ error: 'empty or missing username' });
    return;
  }
  if (!req.body.password || req.body.password === '') {
    resp.status(401).json({ error: 'empty or missing password' });
    return;
  }
  // authenticate the user
  try {
    const token = authenticateUser(req.body.username, req.body.password);
    resp.status(201).json({ apptoken: token });
  } catch (err) {
    resp.status(400).json({ error: 'there was an error' });
  }
});

/**
   * Logout endpoint POST /logout
   * use JWT for authentication
   * Ends the session
   */
webapp.post('/logout', async (req, resp) => {
  // verify the session
  try {
    const authResp = await verifyUser(req.headers.authorization);
    if (authResp === 1) { // expired session
      resp.status(403).json({ message: 'Session expired already' });
      return;
    }
    if (authResp === 2 || authResp === 3) { // invalid user or jwt
      resp.status(401).json({ message: 'Invalid user or session' });
      return;
    }
    // session valid blacklist the JWT
    blacklistJWT(req.headers.authorization);
    resp.status(200).json({ message: 'Session terminated' });
  } catch (err) {
    resp.status(400).json({ message: 'There was an error' });
  }
});

/**
 * route implementations POST /register
 */
webapp.post('/register', async (req, resp) => {
  // parse the body
  if (!req.body.name || !req.body.email || !req.body.password) {
    resp.status(404).json({ message: 'missing name, email, or password in the body' });
    return;
  }
  try {
    const registerUser = {
      username: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    const result = await dbLib.addUser(registerUser);
    resp.status(201).json({ data: { id: result } });
  } catch (error) {
    resp.status(400).json({ message: 'there was an error' });
  }
});

/**
 * route implementation GET /users
 */
webapp.get('/users', async (req, resp) => {
  try {
    // get the data from the database
    const users = await dbLib.getAllUsers();
    // send response
    resp.status(200).json({ data: users });
  } catch (error) {
    // send error code
    resp.status(400).json({ message: 'There was an error' });
  }
});

/**
 * route implementation GET /user/:id
 */
webapp.get('/user/:id', async (req, res) => {
  try {
    // get the data from the db
    const result = await dbLib.getUser(req.params.id);
    if (result === undefined) {
      res.status(404).json({ error: 'unknown user' });
      return;
    }
    // send the response with the appropriate status code
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(400).json({ message: 'there was error' });
  }
});

/**
 * route implementations POST /user
 */
webapp.post('/user', async (req, resp) => {
  // parse the body
  if (!req.body.name || !req.body.email || !req.body.password) {
    resp.status(404).json({ message: 'missing name, email, or password in the body' });
    return;
  }
  try {
    const newUser = {
      username: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    const result = await dbLib.addUser(newUser);
    resp.status(201).json({ data: { id: result } });
  } catch (error) {
    resp.status(400).json({ message: 'there was an error' });
  }
});

/**
 * route implementation DELETE /user/:id
 */
webapp.delete('/user/:id', async (req, res) => {
  try {
    const result = await dbLib.deleteUser(req.params.id);
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'user not in the system' });
      return;
    }
    // send the response with the appropriate status code
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(400).json({ message: 'there was error' });
  }
});

/**
   * route implementation PUT /user/:id
   */
webapp.put('/user/:id', async (req, res) => {
  // parse the body of the request
  if (!req.body.password) {
    res.status(404).json({ message: 'missing password' });
    return;
  }
  try {
    const result = await dbLib.updateUser(req.params.id, req.body.password);
    // send the response with the appropriate status code
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(400).json({ message: 'there was error' });
  }
});


/**
 * POST endpoint to add a new event
 */
webapp.post('/event', async (req, res) => {
  const { eventName, eventQueuePos, eventParty, eventPot, eventBuyIn, eventPassword } = req.body;
  if (!eventName || !eventQueuePos || !eventParty || !eventPot || !eventBuyIn || !eventPassword) {
    res.status(400).json({ message: 'Missing required event details' });
    return;
  }
  
  try {
    const newEvent = {
      name: eventName,
      queuePos: eventQueuePos,
      party: eventParty,
      pot: eventPot,
      buyIn: eventBuyIn,
      password: eventPassword
    };
    const result = await eventLib.addEvent(newEvent);
    res.status(200).json({ data: { id: result } });
  } catch (error) {
    res.status(400).json({ message: 'There was an error processing your request' });
  }
});

/**
 * PUT endpoint to update event pot
 * route implementation PUT /event/:id
 */
webapp.put('/event/:id', async (req, res) => {
  const { NewEventPot} = req.body;
  if (!NewEventPot) {
    res.status(400).json({ message: 'Missing new pot amount' });
    return;
  }

  try {
    const eventID = req.params.id; // Get event ID from URL parameter
    const eventName = "Retrieve event name if needed or modify function to avoid needing it"; // Placeholder, ideally should fetch or not needed
    const result = await eventLib.updateEventPot(eventID, NewEventPot);

    if (result.modifiedCount === 0) {
      res.status(404).json({ message: 'No event was updated' });
    } else {
      res.status(200).json({
        message: `Event pot updated to ${NewEventPot}`
      });
    }
  } catch (err) {
    res.status(500).json({ message: 'There was an error updating the event' });
  }
});

/**
 * PUT endpoint to update event buy-in
 * route implementation PUT /event/:id
 */
webapp.put('/event/:id', async (req, res) => {
  const { NewEventBuyIn} = req.body;
  if (!NewEventBuyIn) {
    res.status(400).json({ message: 'Missing new buy-in amount' });
    return;
  }

  try {
    const eventID = req.params.id; // Get event ID from URL parameter
    const eventName = "Retrieve event name if needed or modify function to avoid needing it"; // Placeholder, ideally should fetch or not needed
    const result = await eventLib.updateEventPot(eventID, NewEventBuyIn);

    if (result.modifiedCount === 0) {
      res.status(404).json({ message: 'No event was updated' });
    } else {
      res.status(200).json({
        message: `Event pot updated to ${NewEventBuyIn}`
      });
    }
  } catch (err) {
    res.status(500).json({ message: 'There was an error updating the event' });
  }
});

/**
 * Route implementation GET /event/:id/party
 * This route retrieves the party members associated with a specific event.
 */
webapp.get('/event/:id/party', async (req, res) => {
  const eventID = req.params.id;
  if (!ObjectId.isValid(eventID)) {
    return res.status(400).json({ message: 'Invalid event ID format' });
  }

  try {
    const party = await eventLib.getEventParty(eventID);
    if (party === null) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    res.status(200).json({ eventParty: party });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'There was an error processing your request' });
  }
});

/**
 * Route implementation GET /event/:id/add-member
 * This route updates the party members associated with a specific event, specifically adding a new member to a bet.
 */

webapp.put('/event/:id/add-member', async (req, res) => {
  const { username } = req.body;
  const { id: eventID } = req.params;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  try {
    const success = await eventLib.addMemberToEventParty(eventID, username);
    if (!success) {
      res.status(404).json({ message: 'No user found or no event updated' });
    } else {
      res.status(200).json({ message: `User ${username} added to event party successfully` });
    }
  } catch (error) {
    res.status(500).json({ message: 'There was an error processing your request' });
  }
});





// export the webapp
module.exports = webapp;


using this, can you edit my frontend file to 

a) have the proper form inputs for the right create game api call
b) include api call logic on subimt button press
ChatGPT
To modify your frontend CreateBettingRoom component to align with your new backend API for creating a game and integrating the API call logic upon form submission, you'll need to:

Adjust the form inputs to match the required fields for your /event POST endpoint.
Implement the API call on the form submission using Axios.
Here's how you can update your CreateBettingRoom component:

Step 1: Install Axios
Make sure Axios is installed in your project as mentioned previously:

bash
Copy code
npm install axios
Step 2: Update the Form Inputs
You need inputs for event name, event queue position, event pot, event buy-in, and event password. These are based on the requirements from your API.

Step 3: Implement API Call Logic
Here’s how you can integrate the API call into the handleSubmit function.

javascript
Copy code
import React, { useState } from 'react';
import axios from 'axios';

function CreateBettingRoom() {
    const [eventName, setEventName] = useState('');
    const [eventQueuePos, setEventQueuePos] = useState('');
    const [eventPot, setEventPot] = useState('');
    const [eventBuyIn, setEventBuyIn] = useState('');
    const [eventPassword, setEventPassword] = useState('');
    const [participants, setParticipants] = useState([]);
    const [error, setError] = useState('');

    const handleAddParticipant = (name) => {
        if (name) {
            setParticipants(prev => [...prev, name]);
        }
    };

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
