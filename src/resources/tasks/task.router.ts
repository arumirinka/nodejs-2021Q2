import * as express from 'express';
import tasksService from './task.service';

const router = express.Router({ mergeParams: true });

router.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await tasksService.getAllTasksBID(req.params.boardId);
  if (!tasks) {
    return res.status(404).json({ message: 'Tasks not found' });
  }
  return res.status(200).json(tasks);
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  const task = await tasksService.getTaskById(req.params.boardId, req.params.taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  return res.status(200).json(task);
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const addTask = await tasksService.addTask(req.body, req.params.boardId);
  return res.status(201).json(addTask);
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const task = await tasksService.getTaskById(req.params.boardId, req.params.taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  await tasksService.updateTask(req.params.taskId, req.body);
  return res.status(200).json({ message: 'Task has been updated' });
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  const task = await tasksService.getTaskById(req.params.boardId, req.params.taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  await tasksService.deleteTask(req.params.boardId, req.params.taskId);
  return res.status(204).json({ message: 'Task has been deleted' });
});

export default router;
