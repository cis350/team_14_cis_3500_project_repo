const { MongoMemoryServer } = require('mongodb-memory-server');
const mongodb = require('./db');

describe('Database Connection', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    process.env.DB_URL = mongoServer.getUri();
  });

  afterAll(async () => {
    await mongoServer.stop();
  });

  test('connects to the database successfully', async () => {
    const dbHandle = await mongodb.connect();
    expect(dbHandle).toBeDefined();
    expect(dbHandle.serverConfig.isConnected()).toBe(true);
  });
});

