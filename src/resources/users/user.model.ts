/**
 * User model
 * @module user/model
 */

import { v4 as uuid } from 'uuid';

type TUser = {
  id: string;
  name: string;
  login: string;
  password: string;
}

 /**
  * Class representing a user
  */
class User {
  id: string;

  name: string;

  login: string;

  password: string;

  /**
    * @param {string} id - user id (uuid)
    * @param {string} name - user name
    * @param {string} login - user login
    * @param {string} password - user password
    */
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  }: TUser = {} as TUser) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Method to return user without password
   * @param {User} user - user instance
   * @returns {Object} user object without password
   */
  static toResponse(user: { id: string; name: string; login: string; }): Omit<TUser, "password"> {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
