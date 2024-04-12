const dbModule = require('../model/db');

// import dbOperations
const userFunc = require('../model/user');

// declare db object
let db;

// declare test data
const user = {
    username: 'testuser',
    email: 'testEmail@',
};

test('addUser inserts a new user', async () =>{
    // connect to the db
    db = await dbModule.getDB();
    //call addPlayer
    await userFunc.addUser(db, user);
    // find testplayer in the DB
    const newUser = await db.collection('users').findOne({user: 'testuser'});
    //test that newPlayer is testuser
    expect(newUser.user).toEqual('testuser');
});

test('addUser throws an exception', async () =>{

     // connect to the db
     db = await dbModule.getDB();

     // incorrect document
     const user1 = 'testuser';
    try{
       
    await userFunc.addUser(db, user1);

    }
    catch(err){
        // test error message
        expect(err.message).toBe('could not add user');
    }  
});

test('getPlayers retrieves all the players a new player', async () =>{
    // connect to the db
    db = await dbModule.getDB;
    //call addPlayers
    await userFunc.addUser(db, {username: 'user1', email: "user1@"});
    await userFunc.addUser(db, {username: 'user2', email: "user2@"});
    await userFunc.addUser(db, {username: 'user3', email: "user3@"});

    // call getPlayers
    const users = await userFunc.getAllUsers(db);
    // get all the playes in the DB
    const usersDB = await db.collection('users').find({}).toArray();
    //test that users matches  usersDB
    expect(users).toEqual(usersDB);
});

