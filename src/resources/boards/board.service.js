/**
 * Board service
 * @module board/service
 */

const boardsRepo = require('./board.memory.repository');

/**
 * Get all boards from the repo
 * @returns {Promise<Board[]>} array of all boards
 */
const getAllBoards = () => boardsRepo.getAllBoards();

/**
 * Get a board with the provided id
 * @param {string} id - id of the board
 * @returns {Promise<Board|undefined>} the board or undefined in case of no board
 */
const getBoardById = id => boardsRepo.getBoardById(id);

/**
 * Add a board to db
 * @param {Board} data - data to create the board
 * @returns {Promise<Board>} newly created board
 */
const addBoard = data => boardsRepo.addBoard(data);

/**
 * Update a board
 * @param {string} id - id of the board
 * @param {Board} data - data to update in the board
 * @returns {Promise<string>} updated board id
 */
const updateBoard = (id, data) => boardsRepo.updateBoard(id, data);

/**
 * Delete a board with provided id
 * @param {string} id - id of the board
 */
const deleteBoard = id => boardsRepo.deleteBoard(id);

module.exports = {
  getAllBoards,
  getBoardById,
  addBoard,
  updateBoard,
  deleteBoard
};
