import * as express from 'express';
import { tryCatchErrors } from '../../utils/tryCatchErrors';
import User from './user.model';
import usersService from './user.service';

const router = express.Router();

class CustomError extends Error {
  code?: number;
}

const notFoundErr = new CustomError('User not found');
notFoundErr.code = 404;

router.route('/').get(
  tryCatchErrors(async (_req: express.Request, res: express.Response) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  tryCatchErrors(async (req: express.Request, res: express.Response) => {
    const user = await usersService.getUserId(req.params.id!);
    if (!user) {
      throw notFoundErr;
    }
    return res.status(200).json(User.toResponse(user));
  })
);

router.route('/').post(
  tryCatchErrors(async (req: express.Request, res: express.Response) => {
    const addUser = await usersService.addUser(req.body);
    return res.status(201).json(User.toResponse(addUser));
  })
);

router.route('/:id').put(
  tryCatchErrors(async (req: express.Request, res: express.Response) => {
    const user = await usersService.getUserId(req.params.id!);
    if (!user) {
      throw notFoundErr;
    }
    await usersService.updateUser(req.params.id!, req.body);
    return res.status(200).json({ message: 'User has been updated' });
  })
);

router.route('/:id').delete(
  tryCatchErrors(async (req: express.Request, res: express.Response) => {
    const user = await usersService.getUserId(req.params.id!);
    if (!user) {
      throw notFoundErr;
    }
    await usersService.deleteUser(req.params.id!);
    return res.status(204).json({ message: 'User has been deleted' });
  })
);

export default router;
