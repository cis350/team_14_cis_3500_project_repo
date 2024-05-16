const jwt = require('jsonwebtoken');
const { authenticateUser, verifyUser, blacklistJWT } = require('./auth');
require('dotenv').config();

jest.mock('../model/user', () => ({
  getUserByUName: jest.fn()
}));

const { getUserByUName } = require('../model/user');

describe('Authentication Functions', () => {
  const username = "testUser";
  const invalidUsername = "invalidUser";
  let validToken;

  beforeAll(() => {
    process.env.KEY = 'testSecret'; // Ensure you have a secret key for JWT
  });

  beforeEach(() => {
    getUserByUName.mockImplementation((uname) => {
      if (uname === username) return Promise.resolve({ _id: '123', username: uname });
      return Promise.resolve(null);
    });
    validToken = authenticateUser(username);
  });

  test('authenticateUser returns a valid JWT', () => {
    const token = authenticateUser(username);
    const decoded = jwt.verify(token, process.env.KEY);
    expect(decoded.username).toBe(username);
    expect(token).toBeDefined();
  });

  test('verifyUser recognizes a valid token', async () => {
    const result = await verifyUser(validToken);
    expect(result).toBe(0); // Assuming 0 is the code for a valid user
  });

  test('verifyUser detects an expired token', async () => {
    // Simulating an expired token by setting a negative expiry time
    const expiredToken = jwt.sign({ username }, process.env.KEY, { expiresIn: '-1s' });
    const result = await verifyUser(expiredToken);
    expect(result).toBe(1); // Assuming 1 is the code for expired token
  });

  test('verifyUser detects invalid token', async () => {
    const invalidToken = jwt.sign({ username: invalidUsername }, process.env.KEY);
    const result = await verifyUser(invalidToken);
    expect(result).toBe(2); // Assuming 2 is the code for invalid user
  });

  test('verifyUser recognizes a blacklisted token', async () => {
    blacklistJWT(validToken);
    const result = await verifyUser(validToken);
    expect(result).toBe(3); // Assuming 3 is the code for blacklisted token
  });

});
