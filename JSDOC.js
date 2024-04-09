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
 */