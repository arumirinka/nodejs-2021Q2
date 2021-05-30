/**
 * Task model
 * @module task/model
 */

const uuid = require('uuid').v4;

/**
 * Class representing a task
 */
class Task {
  /**
   * @param {string} id - task id (uuid)
   * @param {string} title - task title
   * @param {string} order - task order
   * @param {string} description - task description
   * @param {string} userId - task userId
   * @param {string} boardId - task boardId
   * @param {string} columnId - task columnId
   */
  constructor({
    id = uuid(),
    title = 'Task title',
    order = '1',
    description = 'Task description',
    userId = '1',
    boardId = '0',
    columnId = '1'
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;
