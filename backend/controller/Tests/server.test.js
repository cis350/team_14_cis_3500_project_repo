const request = require('supertest');
const app = require('./server');  // Ensure this points to the correct file where your Express app is defined

describe('API Server Endpoints', () => {
  describe('GET /', () => {
    it('should return the main app message', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('CIS 3500 Betting App !!!');
    });
  });

  describe('POST /login', () => {
    it('should authenticate and return a token when credentials are valid', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'validUser', password: 'validPassword' });  // Adjust credentials as necessary
      expect(response.status).toBe(201);
      expect(response.body.apptoken).toBeDefined();
    });

    it('should return 401 when credentials are missing', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: '', password: '' });
      expect(response.status).toBe(401);
      expect(response.body.error).toContain('missing username or password');
    });
  });

  describe('POST /register', () => {
    it('should register a new user when all required fields are provided', async () => {
      const response = await request(app)
        .post('/register')
        .send({ name: 'newUser', email: 'newuser@example.com', password: 'newPassword' });
      expect(response.status).toBe(201);
      expect(response.body.data.id).toBeDefined();
    });

    it('should return 404 when required fields are missing', async () => {
      const response = await request(app)
        .post('/register')
        .send({ name: '', email: '', password: '' });
      expect(response.status).toBe(404);
      expect(response.body.message).toContain('missing name, email, or password');
    });
  });

  describe('GET /users', () => {
    it('should retrieve all users', async () => {
      const response = await request(app).get('/users');
      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Array);
    });
  });

  describe('GET /user/:id', () => {
    it('should retrieve a user when a valid id is provided', async () => {
      const response = await request(app).get('/user/validId'); // Use a mock or a setup user id
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });

    it('should return 404 when an unknown id is provided', async () => {
      const response = await request(app).get('/user/unknownId');
      expect(response.status).toBe(404);
      expect(response.body.error).toEqual('unknown user');
    });
  });

    describe('PUT /user/:id', () => {
    it('should update the user password when a valid id and new password are provided', async () => {
        const response = await request(app)
        .put('/user/validUserId')  // Use a mock or a setup user id
        .send({ password: 'newPassword' });
        expect(response.status).toBe(200);
        expect(response.body.message).toBeDefined();
    });

    it('should return 404 when an invalid id is provided', async () => {
        const response = await request(app)
        .put('/user/invalidUserId')
        .send({ password: 'newPassword' });
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual('missing password');
    });

    it('should return 404 when password is missing', async () => {
        const response = await request(app)
        .put('/user/validUserId')
        .send({});
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual('missing password');
    });
    });

    describe('DELETE /user/:id', () => {
    it('should delete the user when a valid id is provided', async () => {
        const response = await request(app)
        .delete('/user/validUserId'); // Use a mock or a setup user id
        expect(response.status).toBe(200);
        expect(response.body.message).toBeDefined();
    });

    it('should return 404 when an invalid id is provided', async () => {
        const response = await request(app)
        .delete('/user/invalidUserId');
        expect(response.status).toBe(404);
        expect(response.body.error).toEqual('user not in the system');
    });
    });

    // Additional tests for Event Endpoints
    describe('Event API Endpoints', () => {
    describe('POST /event', () => {
        it('should create an event when all required details are provided', async () => {
        const newEvent = {
            eventName: 'Super Bowl',
            eventQueuePos: 1,
            eventParty: [],
            eventPot: 1000,
            eventBuyIn: 100,
            eventPassword: 'secret123'
        };
        const response = await request(app)
            .post('/event')
            .send(newEvent);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        });

        it('should return 400 when required details are missing', async () => {
        const response = await request(app)
            .post('/event')
            .send({ eventName: 'Incomplete Event' });
        expect(response.status).toBe(400);
        expect(response.body.message).toEqual('Missing required event details');
        });
    });

    describe('PUT /event/:id', () => {
        it('should update the event pot when valid id and new pot amount are provided', async () => {
        const response = await request(app)
            .put('/event/validEventId')
            .send({ NewEventPot: 1500 });
        expect(response.status).toBe(200);
        expect(response.body.message).toContain('Event pot updated to');
        });

        it('should return 404 when an invalid event id is provided', async () => {
        const response = await request(app)
            .put('/event/invalidEventId')
            .send({ NewEventPot: 1500 });
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual('No event was updated');
        });
    });
});
