/**
 * Task repo
 * @module task/repo
 */

const Task = require('./task.model');

/**
 * Array of tasks (in-memory tasks db)
 */
let taskData = [];

/**
 * Get all tasks from the board with provided id
 * @async
 * @param {string} boardId - id of the board
 * @returns {Promise<Task[]|undefined>} array of all tasks or undefined in case of no tasks
 */
const getAllTasksBID = async boardId => {
  const res = taskData.filter(task => task.boardId === boardId);
  return res.length > 0 ? res : undefined;
};

/**
 * Get a task by id from the board with provided id
 * @async
 * @param {string} boardId - id of the board
 * @param {string} id - id of the task
 * @returns {Promise<Task>} task
 */
const getTaskById = async (boardId, id) => {
  const res = await taskData.find(
    task => task.boardId === boardId && task.id === id
  );
  return res;
};

/**
 * Add a task to the board with provided id
 * @async
 * @param {Object<Task>} task - task details
 * @param {string} boardId - id of the board
 * @returns {Promise<Task>} newly created task
 */
const addTask = async (task, boardId) => {
  const newTask = new Task({ ...task, boardId });
  taskData.push(newTask);
  return newTask;
};

/**
 * Update a task
 * @async
 * @param {string} taskId - id of the task
 * @param {Object<Task>} updTask - task details
 * @returns {Promise<string>} updated task id
 */
const updateTask = async (taskId, updTask) => {
  const { id, title, order, description, userId, boardId, columnId } = updTask;
  taskData.forEach((task, i) => {
    if (task.id === taskId) {
      taskData[i].id = id;
      taskData[i].title = title;
      taskData[i].order = order;
      taskData[i].description = description;
      taskData[i].userId = userId;
      taskData[i].boardId = boardId;
      taskData[i].columnId = columnId;
    }
  });
  return taskId;
};

/**
 * Delete a task with provided id and board id
 * @async
 * @param {string} boardId - id of the board
 * @param {string} taskId - id of the task
 */
const deleteTask = async (boardId, taskId) => {
  const i = taskData.findIndex(
    task => task.boardId === boardId && task.id === taskId
  );
  taskData.splice(i, 1);
};

/**
 * Delete tasks when the board is being deleted
 * @async
 * @param {string} boardId - id of the board
 */
const deleteTasksOnBoardDeletion = async boardId => {
  taskData = taskData.filter(task => task.boardId !== boardId);
};

/**
 * Unassign tasks when the user is being deleted
 * @async
 * @param {string} userId - id of the user
 * @returns {null} null
 */
const emptyUserIdOnUserDeletion = async userId => {
  taskData.forEach((task, i) => {
    if (task.userId === userId) {
      taskData[i].userId = null;
    }
  });
  return null;
}; 

module.exports = {
  getAllTasksBID,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
  deleteTasksOnBoardDeletion,
  emptyUserIdOnUserDeletion
};
