/**
 * User repo
 * @module user/repo
 */

const User = require('./user.model');
const { emptyUserIdOnUserDeletion } = require('../tasks/task.memory.repository');

/**
 * Array of users (in-memory users db)
 */
const userData = [];

/**
 * Get all users
 * @async
 * @returns {Promise<User[]>} array of all users
 */
const getAll = async () => userData;

/**
 * Get a user by id
 * @async
 * @param {string} id - id of the user
 * @returns {Promise<User>} the user
 */
const getUserId = async id => userData.find(user => user.id === id);

/**
 * Add a user
 * @async
 * @param {Object<User>} user - data to create the user
 * @returns {Promise<User>} newly created user
 */
const addUser = async user => {
  const newUser = new User(user);
  userData.push(newUser);
  return newUser;
};

/**
 * Update a user
 * @async
 * @param {string} id - id of the user
 * @param {Object<User>} data - data to update in the user
 * @returns {Promise<string>} updated user id
 */
const updateUser = async (id, data) => {
  const { name, login, password } = data;
  userData.forEach((user, i) => {
    if (user.id === id) {
      userData[i].name = name;
      userData[i].login = login;
      userData[i].password = password;
    }
  });
  return id;
};

/**
 * Delete a user with provided id
 * @async
 * @param {string} id - id of the user
 * @returns {null} null
 */
const deleteUser = async id => {
  const i = userData.findIndex(user => user.id === id);
  userData.splice(i, 1);
  await emptyUserIdOnUserDeletion(id);
  return null;
};

module.exports = { getAll, getUserId, addUser, updateUser, deleteUser };
