/**
 * Board model
 * @module board/model
 */

const uuid = require('uuid').v4;

/**
 * Column instance type
 * @typedef {Object} Column
 * @property {string} id - column id (uuid)
 * @property {string} title - column title
 * @property {string} order - column order
 */

/**
 * Class representing a board
 */
class Board {
  /**
   * @param {string} id - board id (uuid)
   * @param {string} title - board title
   * @param {Array<Column>} columns - board columns array
   */
  constructor({
    id = uuid(),
    title = 'Board title',
    columns = [
      {
        id: uuid(),
        title: 'Column title',
        order: '0',
      }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
