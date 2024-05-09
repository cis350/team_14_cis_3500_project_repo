const { MongoMemoryServer } = require('mongodb-memory-server');
const MongoClient = require('mongodb').MongoClient;
const { addEvent, updateEventPot, updateEventBuyIn, getEventParty, addMemberToEventParty } = require('./event');
const { addUser } = require('./user'); // Required if adding members to events

describe('Event Model', () => {
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
    await db.collection('events').deleteMany({});
    await db.collection('users').deleteMany({});
  });

  test('addEvent successfully adds an event', async () => {
    const newEvent = {
      eventName: "Test Event",
      eventQueuePos: 1,
      eventParty: [],
      eventPot: 500,
      eventBuyIn: 50,
      eventPassword: "secret"
    };
    const eventId = await addEvent(newEvent);
    expect(eventId).toBeDefined();
    const storedEvent = await db.collection('events').findOne({_id: eventId});
    expect(storedEvent.eventName).toEqual(newEvent.eventName);
    expect(storedEvent.eventPot).toEqual(500);
  });

  test('updateEventPot updates the pot amount of an event', async () => {
    const newEvent = {
      eventName: "Event for Update",
      eventQueuePos: 2,
      eventParty: [],
      eventPot: 1000,
      eventBuyIn: 100,
      eventPassword: "updatePot"
    };
    const eventId = await addEvent(newEvent);
    const updated = await updateEventPot(eventId, 1500);
    expect(updated.modifiedCount).toBe(1);
    const updatedEvent = await db.collection('events').findOne({_id: eventId});
    expect(updatedEvent.eventPot).toBe(1500);
  });

  test('updateEventBuyIn updates the buy-in amount of an event', async () => {
    const newEvent = {
      eventName: "Event for Buy-In Update",
      eventQueuePos: 3,
      eventParty: [],
      eventPot: 1000,
      eventBuyIn: 100,
      eventPassword: "updateBuyIn"
    };
    const eventId = await addEvent(newEvent);
    const updated = await updateEventBuyIn(eventId, 200);
    expect(updated.modifiedCount).toBe(1);
    const updatedEvent = await db.collection('events').findOne({_id: eventId});
    expect(updatedEvent.eventBuyIn).toBe(200);
  });

  test('getEventParty retrieves the party list of an event', async () => {
    const userId = await addUser({ username: "eventuser", email: "eventuser@example.com", password: "pass123" });
    const newEvent = {
      eventName: "Event with Party",
      eventQueuePos: 4,
      eventParty: [userId],
      eventPot: 1500,
      eventBuyIn: 150,
      eventPassword: "partyTime"
    };
    const eventId = await addEvent(newEvent);
    const party = await getEventParty(eventId);
    expect(party).toContainEqual(userId);
  });

  test('addMemberToEventParty adds a user to the event party', async () => {
    const userId = await addUser({ username: "partyMember", email: "party@example.com", password: "pass456" });
    const newEvent = {
      eventName: "Event Adding Member",
      eventQueuePos: 5,
      eventParty: [],
      eventPot: 2000,
      eventBuyIn: 200,
      eventPassword: "addMember"
    };
    const eventId = await addEvent(newEvent);
    const success = await addMemberToEventParty(eventId, "partyMember");
    expect(success).toBeTruthy();
    const updatedEvent = await db.collection('events').findOne({_id: eventId});
    expect(updatedEvent.eventParty).toContainEqual(userId);
  });

});
