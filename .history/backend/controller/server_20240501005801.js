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

//enable json
webapp.use(express.json());

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
    const token = jwt.sign({ username: req.body.username }, process.env.KEY, { expiresIn: '1h' });
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
