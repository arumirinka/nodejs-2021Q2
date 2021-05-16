const boardsRepo = require('./board.memory.repository');

const getAllBoards = () => boardsRepo.getAllBoards();

const getBoardById = id => boardsRepo.getBoardById(id);

const addBoard = data => boardsRepo.addBoard(data);

const updateBoard = (id, data) => boardsRepo.updateBoard(id, data);

const deleteBoard = id => boardsRepo.deleteBoard(id);

module.exports = {
  getAllBoards,
  getBoardById,
  addBoard,
  updateBoard,
  deleteBoard
};
