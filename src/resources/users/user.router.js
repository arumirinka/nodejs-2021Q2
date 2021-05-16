const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getUserId(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.status(200).json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const addUser = await usersService.addUser(req.body);
  return res.status(201).json(User.toResponse(addUser));
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.getUserId(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const updUser = await usersService.updateUser(req.params.id, req.body);
  return res.status(200).json(User.toResponse(updUser));
});

router.route('/:id').delete(async (req, res) => {
  const user = await usersService.getUserId(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  await usersService.deleteUser(req.params.id);
  return res.status(204).json({ message: 'The user has been deleted' });
});

module.exports = router;
