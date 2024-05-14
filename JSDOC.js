/**
 * FUNCTION DESCRIPTIONS: JSDOC
 */





/**
 *  USER FUNTCIONS
 */

/**
 * FUNCTION: @function addUser
 * Adds a new user to the database.
 *   - USER STORY: AS A NEW USER I CAN REGISTER SO THAT I CAN PARTICIPATE IN EVENTS
 *       - Requirements:
 *           - Need a Data Structure to handle a user. @function addUser() should contain:
 *               - Username -> @var {username}, @type {string}
 *               - Email -> @var {email}, @type {string}
 *               - Password -> @var {password}, @type {string}
 *           - A user can be created in the database, uniquely identified by their username
 *           - @function addUser() -> @type {Promise<ObjectId>} -> @param {newUser}, @returns {Promise<ObjectId>} Promise that resolves to the MongoDB ObjectId of the added user
 */

/**
 * FUNCTION: @function getAllUsers
 * Retrieves all users from the user collection.
 *   - USER STORY: AS AN ADMIN I CAN VIEW ALL REGISTERED USERS SO THAT I CAN MANAGE USER ACCOUNTS
 *       - Requirements:
 *           - Access to the complete list of users registered in the system
 *           - @function getAllUsers() -> @type {Promise<Array>} -> @returns {Promise<Array>} Promise that resolves to an array of user objects
 */

/**
 * FUNCTION: @function getUser
 * Retrieves a single user by their MongoDB ObjectId.
 *   - USER STORY: AS A USER I CAN VIEW MY PROFILE SO THAT I CAN SEE MY INFORMATION
 *       - Requirements:
 *           - Need to fetch a user by their database ID
 *           - @function getUser() -> @type {Promise<Object>} -> @param {userID}, @returns {Promise<Object>} Promise that resolves to the user object if found
 */

/**
 * FUNCTION: getUserByUName
 * Retrieves a single user by their MongoDB ObjectId.
 *   - USER STORY: AS A USER I CAN VIEW MY PROFILE SO THAT I CAN SEE MY INFORMATION
 *       - Requirements:
 *           - Need to fetch a user by their database ID
 *           - @function getUser() -> @type {Promise<Object>} -> @param {userID}, @returns {Promise<Object>} Promise that resolves to the user object if found
 */

/**
 * FUNCTION: @function updateUser
 * Updates a user's password in the database.
 *   - USER STORY: AS A USER I CAN UPDATE MY PASSWORD SO THAT I CAN SECURE MY ACCOUNT
 *       - Requirements:
 *           - Only the password is updated for simplicity
 *           - Must specify user's ID and the new password
 *           - @function updateUser() -> @type {Promise<UpdateWriteOpResult>} -> @param {userID}, @param {newPassword}, @returns {Promise<UpdateWriteOpResult>} Promise that resolves to the result of the update operation
 */

/**
 * FUNCTION: @function deleteUser
 * Deletes a user from the database.
 *   - USER STORY: AS AN ADMIN I CAN DELETE A USER SO THAT I CAN REMOVE INACTIVE OR PROBLEMATIC USERS
 *       - Requirements:
 *           - Needs to specify the user's ID to delete them from the database
 *           - @function deleteUser() -> @type {Promise<DeleteWriteOpResultObject>} -> @param {userID}, @returns {Promise<DeleteWriteOpResultObject>} Promise that resolves to the result of the delete operation
 */





/**
 * EVENT FUNCTIONS
 */

/**
 * FUNCTION: @function addEvent
 * Creates a new event and adds it to the database.
 *   - USER STORY: AS A USER I CAN CREATE AN EVENT SO THAT OTHER USERS CAN JOIN AND PARTICIPATE
 *       - Requirements:
 *           - An Event should have:
 *               - Name -> @var {eventName}, @type {string}
 *               - Party -> @var {eventParty}, @type {array} of user IDs
 *               - Pot -> @var {eventPot}, @type {number}
 *               - Buy-in -> @var {eventBuyIn}, @type {number}
 *               - Password -> @var {eventPassword}, @type {string}
 *           - Events can be created to facilitate user interactions and betting
 *           - @function addEvent() -> @type {Promise<ObjectId>} -> @param {newEvent}, @returns {Promise<ObjectId>} The ObjectId of the newly created event
 */

/**
 * FUNCTION: @function updateEventPot
 * Updates the pot amount of a specified event.
 *   - USER STORY: AS A USER I CAN UPDATE THE EVENT POT SO THAT THE CURRENT VALUE IS ACCURATE AFTER TRANSACTIONS
 *       - Requirements:
 *           - Event's pot can be updated to reflect the current stakes
 *           - @function updateEventPot() -> @type {Promise<UpdateWriteOpResult>} -> @param {eventID}, @param {NewEventPot}, @returns {Promise<UpdateWriteOpResult>} Promise that resolves to the result of the update operation
 */

/**
 * FUNCTION: @function updateEventBuyIn
 * Updates the buy-in amount for a specified event.
 *   - USER STORY: AS A USER I CAN ADJUST THE BUY-IN AMOUNT FOR AN EVENT SO THAT I CAN MANAGE PARTICIPATION CRITERIA
 *       - Requirements:
 *           - Allow adjustment of the event buy-in to manage how much users need to contribute to participate
 *           - @function updateEventBuyIn() -> @type {Promise<UpdateWriteOpResult>} -> @param {eventID}, @param {NewEventBuyIn}, @returns {Promise<UpdateWriteOpResult>} Promise that resolves to the result of the update operation
 */

/**
 * FUNCTION: @function getEventParty
 * Retrieves the list of participants (party) for a specific event.
 *   - USER STORY: AS A USER I CAN VIEW WHO IS PARTICIPATING IN AN EVENT SO THAT I CAN DECIDE WHETHER TO JOIN
 *       - Requirements:
 *           - Fetches the list of all participants in an event
 *           - @function getEventParty() -> @type {Promise<Array>} -> @param {eventID}, @returns {Promise<Array>} Promise that resolves to an array of participant user IDs
 */

/**
 * FUNCTION: @function addMemberToEventParty
 * Adds a new member to an event's party.
 *   - USER STORY: AS A USER I CAN JOIN AN EVENT SO THAT I CAN PARTICIPATE IN THE ACTIVITIES
 *       - Requirements:
 *           - Users can be added to an event's participant list
 *           - @function addMemberToEventParty() -> @type {Promise<boolean>} -> @param {eventID}, @param {username}, @returns {Promise<boolean>} Promise that resolves to true if the addition was successful, false otherwise
 */

/**
 * FUNCTION: @function getEventDetails
 * Retrieves comprehensive details for a specified event, including participant information.
 *   - USER STORY: AS A USER I WANT TO SEE DETAILED INFORMATION ABOUT AN EVENT SO THAT I CAN UNDERSTAND ITS STRUCTURE AND PARTICIPANTS
 *       - Requirements:
 *           - Fetch detailed information about an event, including its participants and their details
 *           - @function getEventDetails() -> @type {Promise<Object>} -> @param {eventID}, @returns {Promise<Object>} Promise that resolves to an object containing full event details
 */

/**
 * FUNCTION: @function getAllEvents
 * Retrieves all events from the database.
 *   - USER STORY: AS A USER I WANT TO VIEW ALL EVENTS SO THAT I CAN CHOOSE WHICH ONES TO JOIN
 *       - Requirements:
 *           - Fetches all events from the database to provide a comprehensive view of available activities
 *           - @function getAllEvents() -> @type {Promise<Array>} -> @returns {Promise<Array>} Promise that resolves to an array of all event objects
 */

/**
 * FUNCTION: @function getBuyIn
 * Retrieves the buy-in amount for a specified event.
 *   - USER STORY: AS A PARTICIPANT I WANT TO KNOW THE BUY-IN AMOUNT SO THAT I CAN DECIDE IF I CAN AFFORD TO JOIN
 *       - Requirements:
 *           - Provides the buy-in amount necessary to participate in an event
 *           - @function getBuyIn() -> @type {Promise<number>} -> @param {eventID}, @returns {Promise<number>} Promise that resolves to the buy-in amount of the event
 */

/**
 * FUNCTION: @function getEventPot
 * Retrieves the current pot amount of a specified event.
 *   - USER STORY: AS A PARTICIPANT I WANT TO KNOW THE CURRENT POT SO THAT I CAN GAUGE THE POTENTIAL REWARD
 *       - Requirements:
 *           - Fetches the current amount collected in the event's pot
 *           - @function getEventPot() -> @type {Promise<number>} -> @param {eventID}, @returns {Promise<number>} Promise that resolves to the current pot amount
 */




/**
 * QUEUE FUNCTIONS
 */

/**
 * FUNCTION: @function initializeEventQueue
 * Initializes an event queue if it doesn't already exist in the database.
 *   - USER STORY: AS AN ADMINISTRATOR, I WANT TO INITIATE AN EVENT QUEUE SO THAT I CAN MANAGE EVENTS SYSTEMATICALLY
 *       - Requirements:
 *           - Checks if an event queue already exists; if not, creates a new one
 *           - The event queue is intended to store event IDs in an organized manner for easy access and management
 *           - @function initializeEventQueue() -> @type {Promise<Object>} -> @returns {Promise<Object>} Promise that resolves to the creation result of the queue or the existing queue if already initialized
 */

/**
 * FUNCTION: @function updateEventQueue
 * Updates the event queue with a current list of all event IDs ordered by their creation time.
 *   - USER STORY: AS AN ADMINISTRATOR, I NEED TO UPDATE THE EVENT QUEUE REGULARLY SO THAT IT REFLECTS THE MOST CURRENT EVENT DATA
 *       - Requirements:
 *           - Retrieves all event IDs from the database and sorts them by the creation date
 *           - Updates the existing queue document with these sorted event IDs to keep the queue up-to-date
 *           - @function updateEventQueue() -> @type {Promise<UpdateWriteOpResult>} -> @returns {Promise<UpdateWriteOpResult>} Promise that resolves to the result of the update operation on the queue
 */




/**
 * CURRENCY FUNCTIONS
 */

/**
 * FUNCTION: @function initializeUserCurrency
 * Initializes currency for all registered users in the system.
 *   - USER CASE: AS AN ADMIN I WANT TO ASSIGN A STARTER CURRENCY TO ALL USERS SO THAT THEY CAN BEGIN PARTICIPATING IN EVENTS IMMEDIATELY
 *       - Requirements:
 *           - Each new user starts with a specified amount of currency, enabling them to participate in betting events.
 *           - This function adds a currency entry for each user in a separate currency collection.
 *           - @function initializeUserCurrency() -> @type {Promise<void>} -> @returns {Promise<void>} A promise that resolves when the operation is complete, indicating that all users now have a starting balance.
 */

/**
 * FUNCTION: @function processBuyIn
 * Deducts the buy-in amount from each participant's currency for a specified event and updates the event's pot accordingly.
 *   - USER CASE: AS A PARTICIPANT I WANT TO PAY A BUY-IN TO JOIN AN EVENT SO THAT I CAN COMPETE FOR THE POT
 *       - Requirements:
 *           - Subtracts the event buy-in from each participant's current currency balance.
 *           - Adds the total collected buy-in amount to the event's pot.
 *           - This transactional operation ensures that the pot is accurately reflective of the participants' contributions.
 *           - @function processBuyIn() -> @type {Promise<void>} -> @param {ObjectId} eventID - The ID of the event, @returns {Promise<void>} A promise that resolves once the buy-in process is completed for all participants.
 */

/**
 * FUNCTION: @function awardWinner
 * Selects a winner at random from an event's participants and awards them the entire pot.
 *   - USER CASE: AS A PARTICIPANT I WANT A CHANCE TO WIN THE POT AT THE END OF AN EVENT SO THAT I CAN GAIN REWARDS
 *       - Requirements:
 *           - Randomly selects one participant from the event based on their participation.
 *           - Awards the entire pot to the selected winner by updating their currency balance.
 *           - Ensures fairness and randomness in the selection process, providing excitement and incentive for participation.
 *           - @function awardWinner() -> @type {DB Update Operation Result} -> @param {ObjectId} eventID - The ID of the event, @returns {Promise<void>} A promise that resolves after the winner has been awarded the pot.
 */
