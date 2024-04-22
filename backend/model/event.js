const { getUserByUName, getUser } = require('./user.js');
//var pos = 0;

/* eslint-disable no-console */
const { ObjectId } = require('mongodb');
const { getDB } = require('./db');

/**
 * Add a new event to the events collection
 * @param {*} newEvent - new event to add
 * @returns
 */

const addEvent = async (newEvent) => {
  try {
    const db = await getDB();
    const result = await db.collection('events').insertOne(newEvent);
    console.log(`New event created with id: ${result.insertedId}`);
    console.log('* Note the the Event Name, Event Password, and position in Event Feed Queue cannot be altered *');
    return result.insertedId;
  } catch (err) {
    console.error(err);
    throw new Error('Could not add event');
  }
};

// /**
//   * GET/READ a user given their ID
//   * @param {*} userID - user id of a user
//   * @returns
//   */
// const getEventID = async (eventID) => {
//   try {
//     // get the db
//     const db = await getDB();
//     const result = await db.collection('events').findOne({ _id: new ObjectId(userID) });
//     // print the result
//     console.log(`User: ${JSON.stringify(result)}`);
//     return result;
//   } catch (err) {
//     console.error(err);
//     throw new Error('could not get the user');
//   }
// };

/**
* Update an event's information
* @param {*} eventID - the id of the event
* @param {*} eventName
* @param {*} eventQueuePos
* @param {*} eventParty
* @param {*} newEventPot
* @param {*} newEventBuyIn

* @returns
*/

const updateEventPot = async (eventID, NewEventPot) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('events').updateOne(
      { _id: new ObjectId(eventID) },
      { $set: { eventPot: NewEventPot } }
    );
    const name = await db.collection('events').findOne(
      { _id: new ObjectId(eventID) }
    );
    console.log('event: ' + name.eventName + " -> pot amount is now: " + NewEventPot);
    return result;
  } catch (err) {
    const name = await db.collection('events').findOne(
      { _id: new ObjectId(eventID) }
    );
    console.error(err);
    throw new Error('could not update event '+ name.eventName +'  pot amount');
  }
};

const updateEventBuyIn = async (eventID, NewEventBuyIn) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('events').updateOne(
      { _id: new ObjectId(eventID) },
      { $set: { eventBuyIn: NewEventBuyIn } }
    );
    const name = await db.collection('events').findOne(
      { _id: new ObjectId(eventID) }
    );
    console.log('event: ' + name.eventName + " -> buy-in amount is now: " + NewEventBuyIn);
    return result;
  } catch (err) {
    const name = await db.collection('events').findOne(
      { _id: new ObjectId(eventID) }
    );
    console.error(err);
    throw new Error('could not update event: '+ name.eventName +' buy-in amount');
  }
};

const getEventParty = async (eventID) => {
  try {
    const db = await getDB();
    const result = await db.collection('events').findOne({
       _id: new ObjectId(eventID) });

    if (!result) {
      console.log('No event found with that ID');
      return null; // or you might throw an error or handle it differently
    }

    console.log('event: ' +  result.eventName + ` -> event party: ${JSON.stringify(result.eventParty)}`);
    return result.eventParty;  // Assuming the array of members is stored under 'eventParty'
  } catch (err) {
    console.error(err);
    throw new Error('Could not get the event');
  }
};

const addMemberToEventParty = async (eventID, username) => {
  try {
    const db = await getDB();
    const userID = await getUserByUName(username);  // Correctly await the user ID

    if (!userID) {
      console.log('User not found');
      return false;  // Exit if no user is found
    }

    const result = await db.collection('events').updateOne(
      { _id: new ObjectId(eventID) },
      { $push: { eventParty: { userID: userID } } }  // Push the userID within an object
    );

    //console.log(result);

    if (result.modifiedCount === 0) {
      console.log('No event was updated');
      return false;
    }

    console.log(`Member: ${username} with ID: ${userID} added to event party`);
    return true;
  } catch (err) {
    console.error(err);
    throw new Error('Could not add member to event party');
  }
};

// const queuePos = async () => {
//   currentPos = pos + 1;
// }



/** 
 * updateEventPot('66244efd47341d13c2561224', 1000);
 * updateEventBuyIn('66244efd47341d13c2561224', 100);
 * getEventParty('66244efd47341d13c2561224');
*/

// addEvent({eventName: "TEST_EVENT",
//           eventQueuePos: 1,
//           eventParty: [],
//           eventPot: 100,
//           eventBuyIn: 10,
//           eventPassword: "secretPassword123"});

//addMemberToEventParty('6625742d6c7fcf66824be438', "ophera2");
//addMemberToEventParty('6625742d6c7fcf66824be438', "lincolnn");
//addMemberToEventParty('6625742d6c7fcf66824be438', "idaisugi");
//addMemberToEventParty('6625742d6c7fcf66824be438', "seanwjc");
//addMemberToEventParty('6625742d6c7fcf66824be438', "mhugues");

setTimeout(() => {
  addMemberToEventParty('6625eb2cc0c7ab0142dbb360', "ophera2");
  addMemberToEventParty('6625eb2cc0c7ab0142dbb360', "lincolnn");
  addMemberToEventParty('6625eb2cc0c7ab0142dbb360', "idaisugi");
  addMemberToEventParty('6625eb2cc0c7ab0142dbb360', "seanwjc");
  addMemberToEventParty('6625eb2cc0c7ab0142dbb360', "mhugues");
  getEventParty('6625eb2cc0c7ab0142dbb360');
}, 200);

module.exports = {
  addEvent,
  updateEventPot,
  updateEventBuyIn,
  getEventParty,
  addMemberToEventParty
};
