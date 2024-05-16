const { MongoMemoryServer } = require('mongodb-memory-server');
const MongoClient = require('mongodb').MongoClient;
const { addUser, getAllUsers, getUser, updateUser, deleteUser } = require('./user');

describe('User Model', () => {
  let mongoServer;
  let db;
  let client;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    client = new MongoClient(mongoServer.getUri());
    await client.connect();
    db = client.db(await mongoServer.getDbName());
    // Override the getDB function to use our in-memory DB
    jest.mock('./db', () => ({
      getDB: () => db
    }));
  });

  afterAll(async () => {
    await client.close();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany({});
  });

  test('addUser successfully adds a user', async () => {
    const newUser = { username: "newuser", email: "newuser@example.com", password: "password123" };
    const userId = await addUser(newUser);
    expect(userId).toBeDefined();
    const storedUser = await db.collection('users').findOne({_id: userId});
    expect(storedUser.username).toEqual(newUser.username);
    expect(storedUser.email).toEqual(newUser.email);
  });

  test('getAllUsers retrieves all users', async () => {
    const users = [
      { username: "user1", email: "user1@example.com", password: "password1" },
      { username: "user2", email: "user2@example.com", password: "password2" }
    ];
    for (const user of users) {
      await addUser(user);
    }
    const retrievedUsers = await getAllUsers();
    expect(retrievedUsers.length).toBe(2);
    expect(retrievedUsers.map(u => u.username)).toEqual(expect.arrayContaining(users.map(u => u.username)));
  });

  test('getUser retrieves a specific user by ID', async () => {
    const newUser = { username: "specificuser", email: "specific@example.com", password: "password123" };
    const userId = await addUser(newUser);
    const retrievedUser = await getUser(userId);
    expect(retrievedUser.username).toBe(newUser.username);
  });

  test('updateUser updates user information', async () => {
    const newUser = { username: "updateuser", email: "update@example.com", password: "oldpassword" };
    const userId = await addUser(newUser);
    const updated = await updateUser(userId, "newpassword");
    expect(updated.modifiedCount).toBe(1);
    const updatedUser = await getUser(userId);
    expect(updatedUser.password).toBe("newpassword");
  });

  test('deleteUser removes a user', async () => {
    const newUser = { username: "deleteuser", email: "delete@example.com", password: "password" };
    const userId = await addUser(newUser);
    const deleteResult = await deleteUser(userId);
    expect(deleteResult.deletedCount).toBe(1);
    const deletedUser = await getUser(userId);
    expect(deletedUser).toBeNull();
  });

});
