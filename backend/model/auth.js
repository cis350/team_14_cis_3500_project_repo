const { ObjectId } = require('mongodb');
const { getDB } = require('./db');

/**
 * This module contains authentication and session functions
 *
 * Errors codes:  1 expired token, 2 invalid user,
 *          3 invalid token
 */

// import JWT
const jwt = require('jsonwebtoken');

// import the env variables
require('dotenv').config();

// import DB function
const { getUserByUName } = require('../../model/users');

// blacklisted tokens
const jwtBlacklist = new Set();
//bruh

/**
 * Create a JWT containing the username
 * @param {*} userid
 * @returns the token
 */
const jwt = require('jsonwebtoken'); // Ensure JWT is installed and imported

const authenticateUser = async (username, password) => {
  try {
    // Get the database connection
    const db = await getDB();
    console.log("username: " + username);
    console.log("password: " + password);

    // Retrieve the user information using the provided credentials
    const user = await getUser2(username, password);

    // Check if user retrieval was successful
    if (user) {
      // User found, generate a JWT token
      const token = jwt.sign({ username }, process.env.KEY, { expiresIn: '120s' });
      console.log('token', token);
      const result = await db.collection('auth').insertOne({ validate: String(username) + "has been valided"});
      colsole.log(username +"has been valided");
      return token; // Return the generated token
    } else {
      // No user found with the provided credentials
      console.log('Authentication failed: No user found.');
      return null; // Indicate authentication failure
    }
  } catch (err) {
    // Log and rethrow the error to be handled by the calling function
    console.log('Authentication error:', err.message);
    throw err;
  }
};


/**
 * Verify a token. Check if the user is valid
 * @param {*} token
 * @returns 0 if the user is valid, the appropriate status code
 */
const verifyUser = async (token) => {
  try {
    // check if token blacklisted
    if (jwtBlacklist.has(token)) {
      return 3;
    }

    // decoded contains the paylod of the token
    const decoded = jwt.verify(token, process.env.KEY);
    console.log('payload', decoded);
    // check that the payload contains a valid user
    const user = await getUserByUName(decoded.username);
    if (!user) {
      // user is undefined
      return 2;
    }
    return 0; // user verified - success
  } catch (err) {
    // expired token
    if (err.name === 'TokenExpiredError') {
      console.log('error', err.message);
      return 1;
    }
    // invalid token
    console.log('error', err.message);
    return 3;
  }
};

const blacklistJWT = (token) => jwtBlacklist.add(token);


// const main = () =>{
//     const token = authenticateUser('cis3500');
//     verifyUser(token);
// }
// main();


authenticateUser("user1", "user4@pass123");



module.exports = { authenticateUser, verifyUser, blacklistJWT };