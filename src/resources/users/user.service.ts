/**
 * User service
 * @module user/service
 */

import User from "./user.model";

import usersRepo from './user.memory.repository';

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
const getUserId = (id: string) => usersRepo.getUserId(id);

/**
 * Add a user
 * @param {Object<User>} user - data to create the user
 * @returns {Promise<User>} newly created user
 */
const addUser = (user: User) => usersRepo.addUser(user);

/**
 * Update a user
 * @param {string} id - id of the user
 * @param {Object<User>} data - data to update in the user
 * @returns {Promise<string>} updated user id
 */
const updateUser = (id: string, data: User) => usersRepo.updateUser(id, data);

/**
 * Delete a user with provided id
 * @param {string} id - id of the user
 * @returns {null} null
 */
const deleteUser = (id: string) => usersRepo.deleteUser(id);

export default { getAll, getUserId, addUser, updateUser, deleteUser };
