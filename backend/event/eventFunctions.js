function Event(eventName, eventID, eventParty, eventPot, eventBuyIn, eventPassword) {
    this.eventName = eventName; // Name of the event, type string 
    this.eventID = eventID; // ID of the event, type number
    this.eventParty = eventParty; // Party (a group of users), type array
    this.eventPot = eventPot; // Pot (the amount of money in the bet), type number
    this.eventBuyIn = eventBuyIn; // Buy-in amount, type number
    this.eventPassword = eventPassword; // Password to enter the event, type string
}func

// Example Event:
let myEvent = new Event(
    "HAILS BET ROUND 1",
    1,
    ["Albert", "Lincoln", "Ida", "Sean", "Hughes"],
    1000,
    100,
    "securePassword123"
);
function Feed(Event){
    
}

console.log(myEvent);