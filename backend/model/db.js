/**
* This module contains MongoDB connection operations
*/

require('dotenv').config();

// import the mongodb driver
const { MongoClient } = require('mongodb');

/** 
 * @todo fix dbURL so we can use the .env file
*/

// the mongodb server URL
const dbURL = process.env.DB_URL;

// MongoDB database connection
let MongoConnection;

/**
* SRP: connects to MongoDB and return the connection handle
*/

// connection to the db
// eslint-disable-next-line consistent-return
const connect = async () => {
  // always use try/catch to handle any exception
  try {
    MongoConnection = (await MongoClient.connect(
      dbURL,
    )); // we return the entire connection, not just the DB
    // check that we are connected to the db
    return MongoConnection;
  } catch (err) {
    throw new Error('Cannot connect to the database');
  }
};

/**
*
* @returns the database attached to this MongoDB connection
*/
const getDB = async () => {
  // test if there is an active connection
  if (!MongoConnection) {
    await connect();
  }
  return MongoConnection.db();
};

/**
*
* Close the mongodb connection
*/
const closeMongoDBConnection = async () => {
  await MongoConnection.close();
};

getDB();

// export the functions
module.exports = {
  closeMongoDBConnection,
  getDB,
};
