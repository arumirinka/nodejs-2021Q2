const uuid = require('uuid').v4;

class Board {
  constructor({
    id = uuid(),
    title = 'Board title',
    columns = [
      {
        id: uuid(),
        title: 'Column title',
        order: 0,
      }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
