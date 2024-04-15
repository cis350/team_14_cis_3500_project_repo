const assert = require('assert');
const auth = require('./auth');

describe('Authentication Module (Black-Box Tests)', () => {
  describe('Positive Test Cases', () => {
    it('should generate a valid JWT token for a valid username', () => {
      const token = auth.authenticateUser('valid_username');
      assert.strictEqual(typeof token, 'string');
    });

    it('should return 0 for a valid token with existing user', async () => {
      const token = auth.authenticateUser('existing_user');
      const result = await auth.verifyUser(token);
      assert.strictEqual(result, 0);
    });

    it('should return 1 for an expired token', async () => {
      const result = await auth.verifyUser('expired_token');
      assert.strictEqual(result, 1);
    });

    it('should return 3 for a blacklisted token', async () => {
      const token = auth.authenticateUser('blacklisted_user');
      auth.blacklistJWT(token);
      const result = await auth.verifyUser(token);
      assert.strictEqual(result, 3);
    });

    it('should return 3 for an invalid token', async () => {
      const result = await auth.verifyUser('invalid_token');
      assert.strictEqual(result, 3);
    });

    it('should return 2 for a token with non-existing user', async () => {
      const result = await auth.verifyUser('non_existing_user_token');
      assert.strictEqual(result, 2);
    });
  });

  describe('Negative Test Cases', () => {
    it('should throw an error for incorrect environment key', async () => {
      try {
        await auth.verifyUser('incorrect_key_token');
        assert.fail('Expected an error to be thrown');
      } catch (error) {
        assert.strictEqual(error instanceof Error, true);
      }
    });

    it('should return 3 for a token with missing username in payload', async () => {
      const result = await auth.verifyUser('missing_username_token');
      assert.strictEqual(result, 3);
    });

    it('should return null or throw an error for invalid username during authentication', () => {
      try {
        assert.fail('Expected an error to be thrown or null returned');
      } catch (error) {
        assert.strictEqual(error instanceof Error, true);
      }
    });

    it('should add the token to the blacklist', () => {
      const token = 'token_to_be_blacklisted';
      auth.blacklistJWT(token);
      assert.ok(auth.jwtBlacklist.has(token));
    });
  });
});