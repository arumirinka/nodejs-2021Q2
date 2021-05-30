/**
 * Board service
 * @module board/service
 */

import Board from "./board.model";
import boardsRepo from './board.memory.repository';

/**
 * Get all boards from the repo
 * @returns {Promise<Board[]>} array of all boards
 */
const getAllBoards = (): Promise<Board[]> => boardsRepo.getAllBoards();

/**
 * Get a board with the provided id
 * @param {string} id - id of the board
 * @returns {Promise<Board|undefined>} the board
 */
const getBoardById = (id: string): Promise<Board|undefined> => boardsRepo.getBoardById(id);

/**
 * Add a board to db
 * @param {Object<Board>} data - data to create the board
 * @returns {Promise<Board>} newly created board
 */
const addBoard = (data: Board): Promise<Board> => boardsRepo.addBoard(data);

/**
 * Update a board
 * @param {string} id - id of the board
 * @param {Object<Board>} data - data to update in the board
 * @returns {Promise<string>} updated board id
 */
const updateBoard = (id: string, data: Board): Promise<string> => boardsRepo.updateBoard(id, data);

/**
 * Delete a board with provided id
 * @param {string} id - id of the board
 */
const deleteBoard = (id: string): Promise<void> => boardsRepo.deleteBoard(id);

export default {
  getAllBoards,
  getBoardById,
  addBoard,
  updateBoard,
  deleteBoard
};
