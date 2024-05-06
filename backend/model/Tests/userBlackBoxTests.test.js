// const User = require('../user');

// describe('User Module (Black-Box Tests)', () => {
//   describe('Positive Test Cases', () => {
//     test('should add a new user to the collection', async () => {
//       const newUser = { username: 'test_user', password: 'test_password' };
//       const userId = await User.addUser(newUser);
//       expect(userId).toBeTruthy();
//     });

//     test('should retrieve all users from the collection', async () => {
//       const users = await User.getAllUsers();
//       expect(Array.isArray(users)).toBe(true);
//     });

//     test('should retrieve a user by their ID', async () => {
//       // Assuming userId is a valid user ID in the collection
//       const userId = 'valid_user_id';
//       const user = await User.getUser(userId);
//       expect(user).toBeTruthy();
//     });

//     test('should retrieve a user by their username', async () => {
//       const username = 'test_user';
//       const user = await User.getUserByUName(username);
//       expect(user).toBeTruthy();
//     });

//     test('should update a user\'s password', async () => {
//       // Assuming userId is a valid user ID and newPassword is a new password
//       const userId = 'valid_user_id';
//       const newPassword = 'new_test_password';
//       const result = await User.updateUser(userId, newPassword);
//       expect(result.modifiedCount).toBeGreaterThan(0);
//     });

//     test('should delete a user by their ID', async () => {
//       // Assuming userId is a valid user ID in the collection
//       const userId = 'valid_user_id';
//       const result = await User.deleteUser(userId);
//       expect(result.deletedCount).toBeGreaterThan(0);
//     });
//   });

//   describe('Negative Test Cases', () => {
//     test('should throw an error when adding a user with missing fields', async () => {
//       const incompleteUser = { username: 'incomplete_user' }; // Missing password field
//       await expect(User.addUser(incompleteUser)).rejects.toThrow();
//     });

//     test('should throw an error when retrieving a user with an invalid ID', async () => {
//       // Assuming invalidUserId is not a valid user ID in the collection
//       const invalidUserId = 'invalid_user_id';
//       await expect(User.getUser(invalidUserId)).rejects.toThrow();
//     });

//     test('should throw an error when retrieving a user with a non-existing username', async () => {
//       // Assuming nonExistingUsername is not an existing username in the collection
//       const nonExistingUsername = 'non_existing_username';
//       const user = await User.getUserByUName(nonExistingUsername);
//       expect(user).toBeNull();
//     });

//     test('should throw an error when updating a user with an invalid ID', async () => {
//       // Assuming invalidUserId is not a valid user ID in the collection
//       const invalidUserId = 'invalid_user_id';
//       await expect(User.updateUser(invalidUserId, 'new_password')).rejects.toThrow();
//     });

//     test('should throw an error when deleting a user with an invalid ID', async () => {
//       // Assuming invalidUserId is not a valid user ID in the collection
//       const invalidUserId = 'invalid_user_id';
//       await expect(User.deleteUser(invalidUserId)).rejects.toThrow();
//     });
//   });
// });

const User = require('../user');

describe('User Module (Black-Box Tests)', () => {
  describe('Positive Test Cases', () => {
    test('should add a new user to the collection', async () => {
      const newUser = { username: 'test_user', password: 'test_password' };
      const userId = await User.addUser(newUser);
      expect(userId).toBeTruthy();
    });

    test('should retrieve all users from the collection', async () => {
      const users = await User.getAllUsers();
      expect(Array.isArray(users)).toBe(true);
    });

    test('should retrieve a user by their ID', async () => {
      const newUser = { username: 'test_user_id', password: 'test_password' };
      const userId = await User.addUser(newUser);
      const user = await User.getUser(userId.toString());
      expect(user).toBeTruthy();
    });

    test('should retrieve a user by their username', async () => {
      const username = 'test_user';
      const user = await User.getUserByUName(username);
      expect(user).toBeTruthy();
    });

    test('should update a user\'s password', async () => {
      const newUser = { username: 'test_update', password: 'old_password' };
      const userId = await User.addUser(newUser);
      const newPassword = 'new_test_password';
      const result = await User.updateUser(userId.toString(), newPassword);
      expect(result.modifiedCount).toBeGreaterThan(0);
    });

    test('should delete a user by their ID', async () => {
      const newUser = { username: 'test_delete', password: 'password' };
      const userId = await User.addUser(newUser);
      const result = await User.deleteUser(userId.toString());
      expect(result.deletedCount).toBeGreaterThan(0);
    });
  });

  describe('Negative Test Cases', () => {
    test('should throw an error when adding a user with missing fields', async () => {
      const incompleteUser = { username: 'incomplete_user' };
      await expect(User.addUser(incompleteUser)).rejects.toThrow('Missing fields');
    });

    test('should throw an error when retrieving a user with an invalid ID', async () => {
      const invalidUserId = 'invalid_user_id';
      await expect(User.getUser(invalidUserId)).rejects.toThrow('Invalid user ID');
    });

    test('should throw an error when retrieving a user with a non-existing username', async () => {
      const nonExistingUsername = 'non_existing_username';
      const user = await User.getUserByUName(nonExistingUsername);
      expect(user).toBeNull();
    });

    test('should throw an error when updating a user with an invalid ID', async () => {
      const invalidUserId = 'invalid_user_id';
      await expect(User.updateUser(invalidUserId, 'new_password')).rejects.toThrow('Invalid user ID');
    });

    test('should throw an error when deleting a user with an invalid ID', async () => {
      const invalidUserId = 'invalid_user_id';
      await expect(User.deleteUser(invalidUserId)).rejects.toThrow('Invalid user ID');
    });
  });
});