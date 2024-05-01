// test event functions
const { getDB, closeMongoDBConnection } = require('../db');
const eventFunc = require('../event');

// declare db object
let db;

// declare test data
const newEvent = {
    name: "eventName",
    queuePos: 0,
    party: [],
    pot: 200,
    buyIn: 10,
    password: "bruh"
};

beforeAll(async () => {
    // Connect to the db
    db = await getDB();
});

afterAll(async () => {
    try {
        await closeMongoDBConnection();
    } catch (err) {
        console.error('Error when closing the database:', err);
    }
});

test('addEvent', async () => {
    // Insert the event using the addEvent function from your event module
    const insertedId = await eventFunc.addEvent(newEvent);
    // Retrieve the newly added event from the database
    const insertedEvent = await db.collection('events').findOne({_id: insertedId});
    // Test that newEvent's properties match
    expect(insertedEvent.name).toEqual(newEvent.name);
    expect(insertedEvent.queuePos).toEqual(newEvent.queuePos);
    expect(insertedEvent.pot).toEqual(newEvent.pot);
    expect(insertedEvent.buyIn).toEqual(newEvent.buyIn);
    expect(insertedEvent.password).toEqual(newEvent.password);
});
