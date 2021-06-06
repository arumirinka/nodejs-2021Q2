import * as express from 'express';
import { tryCatchErrors } from '../../utils/tryCatchErrors';
import tasksService from './task.service';

const router = express.Router({ mergeParams: true });

class CustomError extends Error {
  code?: number;
}

let notFoundErr = new CustomError('Task not found');
notFoundErr.code = 404;

router.route('/:boardId/tasks').get(
  tryCatchErrors(async (req: express.Request, res: express.Response) => {
    const tasks = await tasksService.getAllTasksBID(req.params.boardId!);
    if (!tasks) {
      notFoundErr = new CustomError('Tasks not found');
      throw notFoundErr;
    }
    return res.status(200).json(tasks);
  })
);

router.route('/:boardId/tasks/:taskId').get(
  tryCatchErrors(async (req: express.Request, res: express.Response) => {
    const task = await tasksService.getTaskById(req.params.boardId!, req.params.taskId!);
    if (!task) {
      throw notFoundErr;
    }
    return res.status(200).json(task);
  })
);

router.route('/:boardId/tasks').post(
  tryCatchErrors(async (req: express.Request, res: express.Response) => {
    const addTask = await tasksService.addTask(req.body, req.params.boardId!);
    return res.status(201).json(addTask);
  })
);

router.route('/:boardId/tasks/:taskId').put(
  tryCatchErrors(async (req: express.Request, res: express.Response) => {
    const task = await tasksService.getTaskById(req.params.boardId!, req.params.taskId!);
    if (!task) {
      throw notFoundErr;
    }
    await tasksService.updateTask(req.params.taskId!, req.body);
    return res.status(200).json({ message: 'Task has been updated' });
  })
);

router.route('/:boardId/tasks/:taskId').delete(
  tryCatchErrors(async (req: express.Request, res: express.Response) => {
    const task = await tasksService.getTaskById(req.params.boardId!, req.params.taskId!);
    if (!task) {
      throw notFoundErr;
    }
    await tasksService.deleteTask(req.params.boardId!, req.params.taskId!);
    return res.status(204).json({ message: 'Task has been deleted' });
  })
);

export default router;
