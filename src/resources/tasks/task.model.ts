/**
 * Task model
 * @module task/model
 */

import { v4 as uuid } from 'uuid';

type TTask = {
  id: string;
  title: string;
  order: string;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string;
}

/**
 * Class representing a task
 */
class Task {
  id: string;

  title: string;

  order: string;

  description: string;

  userId: string | null;

  boardId: string;

  columnId: string;

  /**
   * @param {string} id - task id (uuid)
   * @param {string} title - task title
   * @param {string} order - task order
   * @param {string} description - task description
   * @param {string|null} userId - task userId
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
  }: TTask = {} as TTask) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

export default Task;
