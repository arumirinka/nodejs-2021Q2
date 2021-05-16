const Board = require('./board.model');
const { deleteTasksOnBoardDeletion } = require('../tasks/task.memory.repository');

const boardData = [];

const getAllBoards = async () => boardData;

const getBoardById = async id => {
  const res = await boardData.find(board => board.id === id);
  return res;
};

const addBoard = async data => {
  const newBoard = new Board(data);
  boardData.push(newBoard);
  return newBoard;
};

const updateBoard = async (boardId, data) => {
  const { id, title, columns } = data;
  boardData.forEach((board, i) => {
    if (board.id === boardId) {
      boardData[i].id = id;
      boardData[i].title = title;
      boardData[i].columns = columns;
    }
  });
  return data;
};

const deleteBoard = async id => {
  const i = boardData.findIndex(board => board.id === id);
  if (i >= 0) {
    boardData.splice(i, 1);
    await deleteTasksOnBoardDeletion(id);
  }
  return null;
};

module.exports = {
  getAllBoards,
  getBoardById,
  addBoard,
  updateBoard,
  deleteBoard
};
