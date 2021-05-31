import * as express from 'express';
import User from './user.model';
import usersService from './user.service';

const router = express.Router();

router.route('/').get(async (_req, res) => {
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
  await usersService.updateUser(req.params.id, req.body);
  return res.status(200).json({ message: 'User has been updated' });
});

router.route('/:id').delete(async (req, res) => {
  const user = await usersService.getUserId(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  await usersService.deleteUser(req.params.id);
  return res.status(204).json({ message: 'User has been deleted' });
});

export default router;
