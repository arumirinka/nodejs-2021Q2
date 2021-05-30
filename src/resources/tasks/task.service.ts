/**
 * Task service
 * @module task/service
 */

import Task from "./task.model";
import tasksRepo from './task.memory.repository';

/**
 * Get all tasks from the board with provided id
 * @param {string} boardId - id of the board
 * @returns {Promise<Task[]|undefined>} array of all tasks or undefined in case of no tasks
 */
const getAllTasksBID = (boardId: string): Promise<Task[]|undefined> => tasksRepo.getAllTasksBID(boardId);

/**
 * Get a task by id from the board with provided id
 * @param {string} boardId - id of the board
 * @param {string} id - id of the task
 * @returns {Promise<Task|undefined>} task
 */
const getTaskById = (boardId: string, id: string): Promise<Task|undefined> => tasksRepo.getTaskById(boardId, id);

/**
 * Add a task to the board with provided id
 * @param {Task} task - task details
 * @param {string} boardId - id of the board
 * @returns {Promise<Task>} newly created task
 */
const addTask = (task: Task, boardId: string): Promise<Task> => tasksRepo.addTask(task, boardId);

/**
 * Update a task
 * @param {string} id - id of the task
 * @param {Task} task - task details
 * @returns {Promise<string>} updated task id
 */
const updateTask = (id: string, task: Task): Promise<string> => tasksRepo.updateTask(id, task);

/**
 * Delete a task with provided id and board id
 * @param {string} boardId - id of the board
 * @param {string} taskId - id of the task
 */
const deleteTask = (boardId: string, taskId: string): Promise<void> => tasksRepo.deleteTask(boardId, taskId);

export default {
  getAllTasksBID,
  getTaskById,
  addTask,
  updateTask,
  deleteTask
};
