// Test user functions
/* eslint-disable no-console */
/* eslint-disable no-undef */
const { closeMongoDBConnection, getDB } = require('../db');
const userFunc = require('../user');
let db;

const user = {
  username: 'testuser4',
  email: 'testEmail4@example.com',
  password: 'testPass!'
};

beforeAll(async () => {
  db = await getDB();
});

afterAll(async () => {
  try {
    await closeMongoDBConnection();
  } catch (err) {
    console.error('Error when closing the database:', err);
  }
});

test('addUser inserts a new user', async () => {
  await userFunc.addUser(user);
  const newUser = await db.collection('users').findOne({ username: 'testuser4' });
  expect(newUser.username).toEqual('testuser4');
});

test('addUser throws an exception', async () => {
  const invalidUser = { username: '' }; // Assuming this causes an error due to validation
  await expect(userFunc.addUser(invalidUser)).rejects.toThrow('could not add a user');
});

test('getPlayers retrieves all the players', async () => {
  await userFunc.addUser({ username: 'user1', email: 'user1@example.com', password: 'pass1' });
  await userFunc.addUser({ username: 'user2', email: 'user2@example.com', password: 'pass2' });
  await userFunc.addUser({ username: 'user3', email: 'user3@example.com', password: 'pass3' });

  const users = await userFunc.getAllUsers();
  const usersDB = await db.collection('users').find({}).toArray();
  expect(users).toEqual(usersDB);
});
