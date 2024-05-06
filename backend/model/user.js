const { ObjectId } = require('mongodb');
const { getDB } = require('./db');

const addUser = async (newUser) => {
  if (!newUser.username || !newUser.password) {
    throw new Error('Missing fields');
  }
  try {
    const db = await getDB();
    const result = await db.collection('users').insertOne(newUser);
    console.log(`New user created with id: ${result.insertedId}`);
    return result.insertedId;
  } catch (err) {
    console.error(err);
    throw new Error('could not add a user');
  }
};

const getAllUsers = async () => {
  try {
    const db = await getDB();
    const result = await db.collection('users').find({}).toArray();
    console.log(`Users: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('could not get all users');
  }
};

const getUser = async (userID) => {
  if (!ObjectId.isValid(userID)) {
    throw new Error('Invalid user ID');
  }
  try {
    const db = await getDB();
    const result = await db.collection('users').findOne({ _id: new ObjectId(userID) });
    console.log(`User: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('could not get the user');
  }
};

const getUserByUName = async (username) => {
  try {
    const db = await getDB();
    const result = await db.collection('users').findOne({ username });
    console.log(`User: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('could not get the user');
  }
};

const updateUser = async (userID, newPassword) => {
  if (!ObjectId.isValid(userID)) {
    throw new Error('Invalid user ID');
  }
  try {
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

const deleteUser = async (userID) => {
  if (!ObjectId.isValid(userID)) {
    throw new Error('Invalid user ID');
  }
  try {
    const db = await getDB();
    const result = await db.collection('users').deleteOne({ _id: new ObjectId(userID) });
    console.log(`User: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('could not delete the user');
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUser,
  getUserByUName,
  updateUser,
  deleteUser,
};
