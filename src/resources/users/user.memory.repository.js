const User = require('./user.model');

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
    return user;
  });
  return data;
};

const deleteUser = async id => {
  const i = await userData.findIndex(user => user.id === id);
  await userData.splice(i, 1);
  return null;
};

module.exports = { getAll, getUserId, addUser, updateUser, deleteUser };
