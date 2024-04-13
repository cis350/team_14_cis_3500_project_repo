/**
 * Express webserver / controller
 */

// import express
const express = require('express');

// import the cors -cross origin resource sharing- module
const cors = require('cors');

// create a new express app
const webapp = express();

// enable cors
webapp.use(cors());

// configure express to parse request bodies
webapp.use(express.urlencoded({ extended: true }));

// import the db function
const dbLib = require('../model/user');

// root endpoint route

webapp.get('/', (req, resp) => {
  resp.json({ message: 'CIS 3500 Betting App !!!' });
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
webapp.delete('/user/id', async (req, res) => {
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
webapp.put('/user/id', async (req, res) => {
  // parse the body of the request
  if (!req.body.password) {
    res.status(400).json({ message: 'missing password' });
    return;
  }
  try {
    const result = await dbLib.updateUser(req.params.id, req.body.password);
    // send the response with the appropriate status code
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

// export the webapp
module.exports = webapp;
