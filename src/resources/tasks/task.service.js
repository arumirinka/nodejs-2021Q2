const tasksRepo = require('./task.memory.repository');

const getAllTasksBID = boardId => tasksRepo.getAllTasksBID(boardId);

const getTaskById = (boardId, id) => tasksRepo.getTaskById(boardId, id);

const addTask = (task, boardId) => tasksRepo.addTask(task, boardId);

const updateTask = (id, task) => tasksRepo.updateTask(id, task);

const deleteTask = (boardId, taskId) => tasksRepo.deleteTask(boardId, taskId);

module.exports = {
  getAllTasksBID,
  getTaskById,
  addTask,
  updateTask,
  deleteTask
};
