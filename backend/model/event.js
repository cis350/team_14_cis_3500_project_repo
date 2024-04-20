/* eslint-disable no-console */
//const { ObjectId } = require('mongodb');

// function Event(eventName, eventID, eventParty, eventPot, eventBuyIn, eventPassword) {
//     this.eventName = eventName; // Name of the event, type string 
//     this.eventID = eventID; // ID of the event, type number
//     this.eventParty = eventParty; // Party (a group of users), type array
//     this.eventPot = eventPot; // Pot (the amount of money in the bet), type number
//     this.eventBuyIn = eventBuyIn; // Buy-in amount, type number
//     this.eventPassword = eventPassword; // Password to enter the event, type string
// }func

// // Example Event:
// let myEvent = new Event(
//     "HAILS BET ROUND 1",
//     1,
//     ["Albert", "Lincoln", "Ida", "Sean", "Hughes"],
//     1000,
//     100,
//     "securePassword123"
// );
// function Feed(Event){
    
// }

// console.log(myEvent);

/* eslint-disable no-console */
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
    return result.insertedId;
  } catch (err) {
    console.error(err);
    throw new Error('Could not add event');
  }
};

addEvent({eventName: "HAILS BET ROUND 1",
          eventQueuePos: 1,
          eventParty: ["","","","",""],
          eventPot: 500,
          eventBuyIn: 200,
          eventPassword: "secretPassword123"})

module.exports = {
  addEvent
};
