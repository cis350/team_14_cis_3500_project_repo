/* eslint-disable no-console */
const { ObjectId } = require('mongodb');
const { getDB } = require('./db');

/**
* Add a new user to the collection
* @param {*} newUser - new user to add
* @returns
*/
const addUser = async (newUser) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').insertOne(newUser);
    // print the id of the user
    console.log(`New user created with id: ${result.insertedId}`);
    // return the result
    return result.insertedId;
  } catch (err) {
    console.error(err);
    throw new Error('could not add a user');
  }
};

/**
  * get all users in a collection
  * @returns
  */
const getAllUsers = async () => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').find({}).toArray();
    // print the results
    console.log(`Users: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('could not get all users');
  }
};

/**
  * GET/READ a user given their ID
  * @param {*} userID - user id of a user
  * @returns
  */
const getUser = async (userID) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').findOne({ _id: new ObjectId(userID) });
    // print the result
    console.log(`User: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('could not get the user');
  }
};

const getUser2 = async (user, pass) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').findOne({ username: user, password: pass});
    // print the result
    console.log(`User: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('could not get the user');
  }
};

/**
  * get a user by username
  * @param {*} username - the username of a user
  * @returns
  */
const getUserByUName = async (username) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').findOne({ username });
    // print the result
    console.log(`User: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('could not get the user');
  }
};

/**
* Update a user's username
* @param {*} userID - the id of a user
* @param {*} newPassword - new password for a user
* @returns
*/
const updateUser = async (userID, newPassword) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(userID) },
      { $set: { password: newPassword } },
    );
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('could not update the user');
  }
};

/**
* Delete a user with userID
* @param {*} userID - the userID to delete
* @returns
*/
const deleteUser = async (userID) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').deleteOne(
      { _id: new ObjectId(userID) },
    );
    // print the result
    console.log(`User: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('could not delete the user');
  }
};

// export the functions
module.exports = {
  addUser,
  getAllUsers,
  getUser,
  getUser2,
  getUserByUName,
  updateUser,
  deleteUser,
};
