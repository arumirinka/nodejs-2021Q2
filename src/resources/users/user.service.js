const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getUserId = id => usersRepo.getUserId(id);

const addUser = user => usersRepo.addUser(user);

const updateUser = (id, data) => usersRepo.updateUser(id, data);

const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, getUserId, addUser, updateUser, deleteUser };
