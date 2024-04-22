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

/**
  * Get a user by username and return the user's ID
  * @param {*} username - the username of a user
  * @returns the ID of the user if found, otherwise returns null or throws an error
  */

const getUserByUName = async (username) => {
  try {
    const db = await getDB();
    const result = await db.collection('users').findOne({ username: username });
    if (result) {
      console.log(`User found: ID = ${result._id}`);
      return result._id;  // Return only the user's ID
    } else {
      console.log("No user found with that username.");
      return null;  // Return null if no user is found
    }
  } catch (err) {
    console.error(err);
    throw new Error('Could not retrieve the user by username');
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


// addUser({username: "ophera2", email: "ophera@seas.upenn.edu", password: "passAlbert"})
// addUser({username: "lincolnn", email: "lincolnn@seas.upenn.edu", password: "passLincoln"})
// addUser({username: "idaisugi", email: "idaisugi@seas.upenn.edu", password: "passIda"})
// addUser({username: "seanwjc", email: "seanwjc@seas.upenn.edu", password: "passSean"})
// addUser({username: "mhugues", email: "mhugues@sas.upenn.edu", password: "passHugues"})


//getUserByUName("ophera")
//getUser('661b41b9919e685bfd91f410')
//updateUser('661b41b9919e685bfd91f410', "securePass")

// export the functions
module.exports = {
  addUser,
  getAllUsers,
  getUser,
  getUserByUName,
  updateUser,
  deleteUser,
};
