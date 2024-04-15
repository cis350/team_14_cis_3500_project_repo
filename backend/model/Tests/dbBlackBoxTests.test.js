// Import the module to be tested
const { getDB, closeMongoDBConnection } = require('../db');

describe('MongoDB Connection Module', () => {
  // Test case for verifying successful database connection
  it('should connect to MongoDB and return the database object', async () => {
    const db = await getDB();
    expect(db).toBeDefined(); // Check if database object is defined
    expect(db.databaseName).toBeDefined(); // Check if database name is defined
    expect(db.databaseName).toBeTruthy(); // Check if database name is not empty
  });

  // Test case for verifying database closure
  it('should close the MongoDB connection', async () => {
    await closeMongoDBConnection();
    const db = await getDB(); // Try to get the database object after closing the connection
    expect(db).toBeNull(); // Check if database object is null indicating closed connection
  });
});
