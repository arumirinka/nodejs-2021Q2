/**
 * Board repo
 * @module board/repo
 */

const Board = require('./board.model');
const { deleteTasksOnBoardDeletion } = require('../tasks/task.memory.repository');

/**
 * Array of boards (in-memory boards db)
 */
const boardData = [];

/**
 * Get all boards
 * @async
 * @returns {Promise<Board[]>} array of all boards
 */
const getAllBoards = async () => boardData;

/**
 * Get a board by id
 * @async
 * @param {string} id - id of the board
 * @returns {Promise<Board|undefined>} board or undefined in case of no board
 */
const getBoardById = async id => {
  const res = await boardData.find(board => board.id === id);
  return res;
};

/**
 * Create a board
 * @async
 * @param {Board} data - data to create the board
 * @returns {Promise<Board>} newly created board
 */
const addBoard = async data => {
  const newBoard = new Board(data);
  boardData.push(newBoard);
  return newBoard;
};

/**
 * Update a board
 * @async
 * @param {string} boardId - id of the board
 * @param {Board} data - data to update in the board
 * @returns {Promise<string>} updated board id
 */
const updateBoard = async (boardId, data) => {
  const { id, title, columns } = data;
  boardData.forEach((board, i) => {
    if (board.id === boardId) {
      boardData[i].id = id;
      boardData[i].title = title;
      boardData[i].columns = columns;
    }
  });
  return boardId;
};

/**
 * Delete a board with provided id
 * @async
 * @param {string} id - id of the board
 */
const deleteBoard = async id => {
  const i = boardData.findIndex(board => board.id === id);
  if (i >= 0) {
    boardData.splice(i, 1);
    await deleteTasksOnBoardDeletion(id);
  }
};

module.exports = {
  getAllBoards,
  getBoardById,
  addBoard,
  updateBoard,
  deleteBoard
};
