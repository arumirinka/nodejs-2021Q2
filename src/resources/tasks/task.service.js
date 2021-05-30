/**
 * Task service
 * @module task/service
 */

const tasksRepo = require('./task.memory.repository');

/**
 * Get all tasks from the board with provided id
 * @param {string} boardId - id of the board
 * @returns {Promise<Task[]|undefined>} array of all tasks or undefined in case of no tasks
 */
const getAllTasksBID = boardId => tasksRepo.getAllTasksBID(boardId);

/**
 * Get a task by id from the board with provided id
 * @param {string} boardId - id of the board
 * @param {string} id - id of the task
 * @returns {Promise<Task>} task
 */
const getTaskById = (boardId, id) => tasksRepo.getTaskById(boardId, id);

/**
 * Add a task to the board with provided id
 * @param {Object<Task>} task - task details
 * @param {string} boardId - id of the board
 * @returns {Promise<Task>} newly created task
 */
const addTask = (task, boardId) => tasksRepo.addTask(task, boardId);

/**
 * Update a task
 * @param {string} id - id of the task
 * @param {Object<Task>} task - task details
 * @returns {Promise<string>} updated task id
 */
const updateTask = (id, task) => tasksRepo.updateTask(id, task);

/**
 * Delete a task with provided id and board id
 * @param {string} boardId - id of the board
 * @param {string} taskId - id of the task
 */
const deleteTask = (boardId, taskId) => tasksRepo.deleteTask(boardId, taskId);

module.exports = {
  getAllTasksBID,
  getTaskById,
  addTask,
  updateTask,
  deleteTask
};
