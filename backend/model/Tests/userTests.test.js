/* eslint-disable no-console */
/* eslint-disable no-undef */
// test user functions

const { closeMongoDBConnection, getDB } = require('../db');
// import dbOperations
const userFunc = require('../user');
// mongo connection
// declare db object
let db;

// declare test data
const user = {
  username: 'testuser4',
  email: 'testEmail4@',
  password: 'testPass!',
};

beforeAll(async () => {
  // connect to the db
  db = await getDB();
});

/*
* Close all open connections
*/
afterAll(async () => {
  try {
    // await mongo.close();
    closeMongoDBConnection();
  } catch (err) {
    console.log('there is an error when closing the database');
  }
});

test('addUser inserts a new user', async () => {
  // call addUser
  await userFunc.addUser(db, user);
  // find testUser in the DB
  console.log('db ', db);
  const newUser = await db.collection('users').findOne({ username: 'testuser4' });
  // test that newUser is testuser
  expect(newUser.username).toEqual('testuser4');
});

test('addUser throws an exception', async () => {
  // incorrect document
  const user1 = 'testuser';
  try {
    await userFunc.addUser(db, user1);
  } catch (err) {
    // test error message
    expect(err.message).toBe('could not add a user');
  }
});

test('getPlayers retrieves all the players a new player', async () => {
  // call addPlayers
  await userFunc.addUser(db, { username: 'user1', email: 'user1@' });
  await userFunc.addUser(db, { username: 'user2', email: 'user2@' });
  await userFunc.addUser(db, { username: 'user3', email: 'user3@' });

  // call getPlayers
  const users = await userFunc.getAllUsers(db);
  // get all the playes in the DB
  const usersDB = await db.collection('users').find({}).toArray();
  // test that users matches  usersDB
  expect(users).toEqual(usersDB);
});
