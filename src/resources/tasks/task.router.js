const router = require('express').Router();
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAllTasksBID(req.boardId);
  if (!tasks) {
    return res.status(404).json({ message: 'Tasks not found' });
  }
  return res.status(200).json(tasks);
});

router.route('/:taskId').get(async (req, res) => {
  const task = await tasksService.getTaskById(req.boardId, req.params.taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  return res.status(200).json(task);
});

router.route('/').post(async (req, res) => {
  const addTask = await tasksService.addTask(req.body, req.boardId);
  return res.status(201).json(addTask);
});

router.route('/:taskId').put(async (req, res) => {
  const task = await tasksService.getTaskById(req.boardId, req.params.taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  const updTask = await tasksService.updateTask(req.params.taskId, req.body);
  return res.status(200).json(updTask);
});

router.route('/:taskId').delete(async (req, res) => {
  const task = await tasksService.getTaskById(req.boardId, req.params.taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  await tasksService.deleteTask(req.boardId, req.params.taskId);
  return res.status(204).json({ message: 'The task has been deleted' });
});

module.exports = router;
