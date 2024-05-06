const { getDB, closeMongoDBConnection } = require('../db');

describe('MongoDB Connection Module', () => {
  it('should connect to MongoDB and return the database object', async () => {
    const db = await getDB();
    expect(db).toBeDefined();
    expect(db.databaseName).toBeDefined();
    expect(db.databaseName).toBeTruthy();
  });

  afterAll(async () => {
    await closeMongoDBConnection();
  });
});



