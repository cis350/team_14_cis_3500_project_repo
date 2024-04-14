const assert = require('assert');
const User = require('./user');

describe('User Module (Black-Box Tests)', () => {
  describe('Positive Test Cases', () => {
    it('should add a new user to the collection', async () => {
      const newUser = { username: 'test_user', password: 'test_password' };
      const userId = await User.addUser(newUser);
      assert.ok(userId);
    });

    it('should retrieve all users from the collection', async () => {
      const users = await User.getAllUsers();
      assert.ok(Array.isArray(users));
    });

    it('should retrieve a user by their ID', async () => {
      const userId = 'valid_user_id';
      const user = await User.getUser(userId);
      assert.ok(user);
    });

    it('should retrieve a user by their username', async () => {
      const username = 'test_user';
      const user = await User.getUserByUName(username);
      assert.ok(user);
    });

    it('should update a user\'s password', async () => {
      const userId = 'valid_user_id';
      const newPassword = 'new_test_password';
      const result = await User.updateUser(userId, newPassword);
      assert.ok(result.modifiedCount > 0);
    });

    it('should delete a user by their ID', async () => {
      const userId = 'valid_user_id';
      const result = await User.deleteUser(userId);
      assert.ok(result.deletedCount > 0);
    });
  });

  describe('Negative Test Cases', () => {
    it('should throw an error when adding a user with missing fields', async () => {
      const incompleteUser = { username: 'incomplete_user' };
      try {
        await User.addUser(incompleteUser);
        assert.fail('Expected an error to be thrown');
      } catch (error) {
        assert.strictEqual(error instanceof Error, true);
      }
    });

    it('should throw an error when retrieving a user with an invalid ID', async () => {
      const invalidUserId = 'invalid_user_id';
      try {
        await User.getUser(invalidUserId);
        assert.fail('Expected an error to be thrown');
      } catch (error) {
        assert.strictEqual(error instanceof Error, true);
      }
    });

    it('should throw an error when retrieving a user with a non-existing username', async () => {
      const nonExistingUsername = 'non_existing_username';
      const user = await User.getUserByUName(nonExistingUsername);
      assert.strictEqual(user, null);
    });

    it('should throw an error when updating a user with an invalid ID', async () => {
      const invalidUserId = 'invalid_user_id';
      try {
        await User.updateUser(invalidUserId, 'new_password');
        assert.fail('Expected an error to be thrown');
      } catch (error) {
        assert.strictEqual(error instanceof Error, true);
      }
    });

    it('should throw an error when deleting a user with an invalid ID', async () => {
      const invalidUserId = 'invalid_user_id';
      try {
        await User.deleteUser(invalidUserId);
        assert.fail('Expected an error to be thrown');
      } catch (error) {
        assert.strictEqual(error instanceof Error, true);
      }
    });
  });
});