const User = require('./user.model');
const { emptyUserIdOnUserDeletion } = require('../tasks/task.memory.repository');

const userData = [];

const getAll = async () => userData;

const getUserId = async id => userData.find(user => user.id === id);

const addUser = async user => {
  const newUser = new User(user);
  userData.push(newUser);
  return newUser;
};

const updateUser = async (id, data) => {
  const { name, login, password } = data;
  userData.forEach((user, i) => {
    if (user.id === id) {
      userData[i].name = name;
      userData[i].login = login;
      userData[i].password = password;
    }
  });
  return data;
};

const deleteUser = async id => {
  const i = userData.findIndex(user => user.id === id);
  userData.splice(i, 1);
  await emptyUserIdOnUserDeletion(id);
  return null;
};

module.exports = { getAll, getUserId, addUser, updateUser, deleteUser };
