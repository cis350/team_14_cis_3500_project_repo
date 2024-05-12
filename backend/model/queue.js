const { getUserByUName, getUser } = require('./event.js');
const { getDB } = require('./db');

/**
 * Initializes an empty queue object in the 'queue' collection
 * @returns {Object} The result of the insertion or existing queue
 */
const initializeEventQueue = async () => {
  try {
    const db = await getDB();
    // Check if the queue already exists
    const existingQueue = await db.collection('queue').findOne({ name: 'eventQueue' });
    if (existingQueue) {
      console.log('Queue already initialized.');
      return { message: 'Queue already initialized.', queue: existingQueue };
    }
    
    // Create an empty queue object
    const result = await db.collection('queue').insertOne({
      name: 'eventQueue',
      eventIDs: []  // Initialize with an empty array of event IDs
    });

    console.log('Queue initialized:', result);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to initialize event queue');
  }
};

/**
 * Updates the 'queue' collection with a current list of all event IDs in order of creation
 * @returns {Object} The updated queue document
 */
const updateEventQueue = async () => {
  try {
    const db = await getDB();
    // Fetch all event IDs from the 'events' collection sorted by creation order
    const events = await db.collection('events').find({}, { projection: { _id: 1 } }).sort({ _id: 1 }).toArray();
    
    // Extract only the event IDs
    const eventIDs = events.map(event => event._id);

    // Update the queue collection with the new list of event IDs
    const result = await db.collection('queue').updateOne(
      { name: 'eventQueue' },  // Using a unique identifier for the queue document
      { $set: { eventIDs: eventIDs } },
      { upsert: true }  // Create the document if it doesn't exist
    );

    console.log('Queue updated:', result);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to update event queue');
  }
};

// Perform the initialization and update of the queue
(async () => {
  await initializeEventQueue();
  await updateEventQueue();
})();

module.exports = { initializeEventQueue, updateEventQueue };
