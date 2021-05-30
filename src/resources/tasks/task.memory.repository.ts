/**
 * Task repo
 * @module task/repo
 */

import Task from './task.model';

type TTask = {
  id: any;
  title: string;
  order: string;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
};

/**
 * Array of tasks (in-memory tasks db)
 */
let taskData: Array<Task> = [];

/**
 * Get all tasks from the board with provided id
 * @async
 * @param {string} boardId - id of the board
 * @returns {Promise<Task[]|undefined>} array of all tasks or undefined in case of no tasks
 */
const getAllTasksBID = async (boardId: string): Promise<Task[] | undefined> => {
  const res = taskData.filter(task => task.boardId === boardId);
  return res.length > 0 ? res : undefined;
};

/**
 * Get a task by id from the board with provided id
 * @async
 * @param {string} boardId - id of the board
 * @param {string} id - id of the task
 * @returns {Promise<Task|undefined>} task
 */
const getTaskById = async (boardId: string, id: string): Promise<Task | undefined> => {
  const res = taskData.find(
    task => task.boardId === boardId && task.id === id
  );
  return res;
};

/**
 * Add a task to the board with provided id
 * @async
 * @param {Task} task - task details
 * @param {string} boardId - id of the board
 * @returns {Promise<Task>} newly created task
 */
const addTask = async (task: Task, boardId: string): Promise<Task> => {
  const newTask = new Task({ ...task, boardId } as TTask);
  taskData.push(newTask);
  return newTask;
};

/**
 * Update a task
 * @async
 * @param {string} taskId - id of the task
 * @param {Task} updTask - task details
 * @returns {Promise<string>} updated task id
 */
const updateTask = async (taskId: string, updTask: Task): Promise<string> => {
  const { id, title, order, description, userId, boardId, columnId } = updTask;
  taskData.forEach((task, i) => {
    if (task.id === taskId) {
      taskData[i]!.id = id;
      taskData[i]!.title = title;
      taskData[i]!.order = order;
      taskData[i]!.description = description;
      taskData[i]!.userId = userId;
      taskData[i]!.boardId = boardId;
      taskData[i]!.columnId = columnId;
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
const deleteTask = async (boardId: string, taskId: string): Promise<void> => {
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
const deleteTasksOnBoardDeletion = async (boardId: string): Promise<void> => {
  taskData = taskData.filter(task => task.boardId !== boardId);
};

/**
 * Unassign tasks when the user is being deleted
 * @async
 * @param {string} userId - id of the user
 */
const emptyUserIdOnUserDeletion = async (userId: string): Promise<void> => {
  taskData.forEach((task, i) => {
    if (task.userId === userId) {
      taskData[i]!.userId = null;
    }
  });
};

export default {
  getAllTasksBID,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
  deleteTasksOnBoardDeletion,
  emptyUserIdOnUserDeletion
};
