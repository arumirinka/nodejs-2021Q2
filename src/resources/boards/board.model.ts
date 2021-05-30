/**
 * Board model
 * @module board/model
 */

import { v4 as uuid } from 'uuid';

/**
 * Column instance type
 * @typedef {Object} Column
 * @property {string} id - column id (uuid)
 * @property {string} title - column title
 * @property {string} order - column order
 */

type TColumn = {
  id: string;
  title: string;
  order: string;
}

type TBoard = {
  id: string;
  title: string;
  columns: Array<TColumn>;
}

/**
 * Class representing a board
 */
class Board {
  id: string;

  title: string;

  columns: Array<TColumn>;
  
  /**
   * @param {string} id - board id (uuid)
   * @param {string} title - board title
   * @param {Array<TColumn>} columns - board columns array
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
  }: TBoard = {} as TBoard) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

export default Board;
