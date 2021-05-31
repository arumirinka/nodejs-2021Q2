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
const getAll = (): Promise<User[]> => usersRepo.getAll();

/**
 * Get a user by id
 * @param {string} id - id of the user
 * @returns {Promise<User|undefined>} user or undefined in case of no user
 */
const getUserId = (id: string): Promise<User|undefined> => usersRepo.getUserId(id);

/**
 * Add a user
 * @param {User} user - data to create the user
 * @returns {Promise<User>} newly created user
 */
const addUser = (user: User): Promise<User> => usersRepo.addUser(user);

/**
 * Update a user
 * @param {string} id - id of the user
 * @param {User} data - data to update in the user
 * @returns {Promise<string>} updated user id
 */
const updateUser = (id: string, data: User): Promise<string> => usersRepo.updateUser(id, data);

/**
 * Delete a user with provided id
 * @param {string} id - id of the user
 */
const deleteUser = (id: string): Promise<void> => usersRepo.deleteUser(id);

export default { getAll, getUserId, addUser, updateUser, deleteUser };
