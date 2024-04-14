const assert = require('assert');
const auth = require('./auth');

describe('Authentication Module', () => {
  describe('authenticateUser', () => {
    it('should generate a valid JWT token for a valid username', () => {
      const token = auth.authenticateUser('valid_username');
      assert.strictEqual(typeof token, 'string');
    });
  });

  describe('verifyUser', () => {
    it('should return 0 for a valid token with existing user', async () => {
      const token = auth.authenticateUser('existing_user');
      const result = await auth.verifyUser(token);
      assert.strictEqual(result, 0);
    });

    it('should return 1 for an expired token', async () => {
      const result = await auth.verifyUser('expired_token');
      assert.strictEqual(result, 1);
    });

    it('should return 2 for a token with non-existing user', async () => {
      const result = await auth.verifyUser('non_existing_user_token');
      assert.strictEqual(result, 2);
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
  });

  describe('blacklistJWT', () => {
    it('should add the token to the blacklist', () => {
      const token = 'token_to_be_blacklisted';
      auth.blacklistJWT(token);
      assert.ok(auth.jwtBlacklist.has(token));
    });
  });
});
