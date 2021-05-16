const uuid = require('uuid').v4;

class Task {
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
