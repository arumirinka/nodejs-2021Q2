/**
 * User service
 * @module user/service
 */

const usersRepo = require('./user.memory.repository');

/**
 * Get all users
 * @returns {Promise<User[]>} array of all users
 */
const getAll = () => usersRepo.getAll();

/**
 * Get a user by id
 * @param {string} id - id of the user
 * @returns {Promise<User>} the user
 */
const getUserId = id => usersRepo.getUserId(id);

/**
 * Add a user
 * @param {Object<User>} user - data to create the user
 * @returns {Promise<User>} newly created user
 */
const addUser = user => usersRepo.addUser(user);

/**
 * Update a user
 * @param {string} id - id of the user
 * @param {Object<User>} data - data to update in the user
 * @returns {Promise<string>} updated user id
 */
const updateUser = (id, data) => usersRepo.updateUser(id, data);

/**
 * Delete a user with provided id
 * @param {string} id - id of the user
 * @returns {null} null
 */
const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, getUserId, addUser, updateUser, deleteUser };
