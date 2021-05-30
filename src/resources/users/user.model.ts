/**
 * User model
 * @module user/model
 */

 const uuid = require('uuid').v4;

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
  } = {}) {
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
  static toResponse(user: { id: string; name: string; login: string; }) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
