/**
 * mongoADMINAPIKey: htespfnr
 * 
 */


/**
 * EVENT FUNCTIONS (MARCH 29, ALBERT):
 * - Posting an event
 *      - USER STORY: AS A USER I CAN VIEW A LIST OF EVENTS SO THAT OTHERS CAN SEE WHAT EVENTS ARE THEIR SO THEY CAN JOIN THE RIGHT ONE
 *          - Requirements:
 *              - Need a Data Structure to handle an event. @function Event() should contain:
 *                  - Name -> @var {eventName}, @type {string}
 *                  - ID -> @var {eventID}, @type {number}
 *                  - Party (a group of users) -> @var {eventParty}, @type {array}
 *                  - Pot (the amount of money in the bet) -> @var {eventPot}, @type {number}
 *                  - Buy-in (the amount of money each user needs to put into the pot to participate) -> @var {eventBuyIn}, @type {number}
 *                  - Password (that is needed to enter a event) -> @var {eventPassword}, @type {string}
 *              - An Event can be created (by the user), read (by the database), updated, and related
 *              - @function Event() -> @type {object} -> @param {ID}, @param {name}, @param {party}
 * 
 * EVENT INTERACTION FUNCTIONS (APRIL 1, ALBERT):
 * - Joining an event
 *      - USER STORY: AS A USER, I WANT TO BE ABLE TO JOIN AN EVENT SO THAT I CAN PARTICIPATE IN THE ACTIVITIES AND INTERACTIONS THAT ARE PLANNED.
 *          - Requirements:
 *              - A method for users to join an existing event. @function joinEvent() should allow:
 *                  - Event Selection -> @var {selectedEventID}, @type {number}
 *                  - Verification of event existence and open slots -> @function verifyEvent(), @return {boolean}
 *                  - Addition of the user to the event's party list -> @function addToParty(), @param {userID}, @param {eventID}
 *                  - Deduction of buy-in from user's account balance -> @function deductBuyIn(), @param {userID}, @param {eventBuyIn}
 *              - A user should be able to search and view events they are eligible to join
 *              - Events can have a maximum party size; this should be checked before allowing a join operation
 *              - @function joinEvent() -> @type {object} -> @param {userID}, @param {selectedEventID}
 * 
 * - Viewing joined events
 *      - USER STORY: AS A USER, I WANT TO VIEW A LIST OF EVENTS I HAVE JOINED SO THAT I CAN KEEP TRACK OF MY UPCOMING ACTIVITIES.
 *          - Requirements:
 *              - Need a method for users to view events they have joined. @function viewJoinedEvents() should display:
 *                  - Event Names -> @var {eventName}, @type {string}
 *                  - Event IDs -> @var {eventID}, @type {number}
 *                  - Dates of the Events -> @var {eventDate}, @type {string}
 *                  - Roles or Participation Level in the Event -> @var {eventRole}, @type {string}
 *              - This function must fetch data from the user's event participation record
 *              - Events should be displayed in chronological order
 *              - @function viewJoinedEvents() -> @type {object} -> @param {userID}
 * 
 *  
 *
 * /
 
/**
 * ADDING AN EVENT:
 * - Function to add a new event to the event management system
 *      - USER STORY: AS A USER, I WANT TO CREATE AN EVENT SO THAT OTHERS CAN SEE AND JOIN.
 *          - Requirements:
 *              - A data structure to encapsulate an event's details. @function addEvent() handles:
 *                  - Event Name -> @var {eventName}, @type {string}
 *                  - Event Queue Position -> @var {eventQueuePos}, @type {number}
 *                  - Event Party (list of participants) -> @var {eventParty}, @type {array}
 *                  - Event Pot (total money in the event) -> @var {eventPot}, @type {number}
 *                  - Event Buy-in (entry fee) -> @var {eventBuyIn}, @type {number}
 *                  - Event Password (required for entry) -> @var {eventPassword}, @type {string}
 *              - The event is stored in the database for retrieval and manipulation.
 *              - @function addEvent() -> @type {ObjectId} -> @param {newEvent}


/**
 * UPDATING EVENT POT:
 * - Function to update the pot amount of an event
 *      - USER STORY: AS AN ADMIN, I WANT TO UPDATE THE POT AMOUNT OF AN EVENT SO THAT IT REFLECTS CHANGES IN PARTICIPATION OR STAKES.
 *          - Requirements:
 *              - Fetch and update the event's pot amount in the database. @function updateEventPot() handles:
 *                  - Event ID -> @var {eventID}, @type {ObjectId}
 *                  - New Pot Amount -> @var {NewEventPot}, @type {number}
 *              - The function confirms the update and logs the new pot amount.
 *              - @function updateEventPot() -> @type {result} -> @param {eventID}, @param {NewEventPot}
 */

/**
 * UPDATING EVENT BUY-IN:
 * - Function to update the buy-in amount of an event
 *      - USER STORY: AS AN ADMIN, I WANT TO UPDATE THE BUY-IN AMOUNT OF AN EVENT TO ADJUST FOR ECONOMIC CONDITIONS OR PARTICIPANT REQUESTS.
 *          - Requirements:
 *              - Modify the buy-in amount for a specific event. @function updateEventBuyIn() involves:
 *                  - Event ID -> @var {eventID}, @type {ObjectId}
 *                  - New Buy-In Amount -> @var {NewEventBuyIn}, @type {number}
 *              - The function confirms the update and logs the new buy-in amount.
 *              - @function updateEventBuyIn() -> @type {result} -> @param {eventID}, @param {NewEventBuyIn}
 */

/**
 * RETRIEVING EVENT PARTY:
 * - Function to retrieve the list of participants for a specific event
 *      - USER STORY: AS A USER, I WANT TO SEE WHO ELSE IS PARTICIPATING IN AN EVENT TO ASSESS THE COMPETITION.
 *          - Requirements:
 *              - Access and display the list of event participants. @function getEventParty() fetches:
 *                  - Event ID -> @var {eventID}, @type {ObjectId}
 *              - The function logs and returns the participant list, or indicates if the event is not found.
 *              - @function getEventParty() -> @type {array} -> @param {eventID}
 */

/**
 * ADDING A MEMBER TO EVENT PARTY:
 * - Function to add a new member to an event's participant list
 *      - USER STORY: AS A USER, I WANT TO JOIN AN EVENT SO THAT I CAN PARTICIPATE IN ITS ACTIVITIES.
 *          - Requirements:
 *              - Verify the user exists and then add them to the event's party list. @function addMemberToEventParty() processes:
 *                  - Event ID -> @var {eventID}, @type {ObjectId}
 *                  - Username of the participant -> @var {username}, @type {string}
 *              - The function confirms the addition of the member and logs their username and ID.
 *              - @function addMemberToEventParty() -> @type {boolean} -> @param {eventID}, @param {username}
 */