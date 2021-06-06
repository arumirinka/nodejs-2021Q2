import * as express from 'express';
import { tryCatchErrors } from '../../utils/tryCatchErrors';
import boardsService from './board.service';

const router = express.Router();

class CustomError extends Error {
  code?: number;
}

const notFoundErr = new CustomError('Board not found');
notFoundErr.code = 404;

router.route('/').get(
  tryCatchErrors(async (_req: express.Request, res: express.Response) => {
    const boards = await boardsService.getAllBoards();
    return res.json(boards);
  })
);

router.route('/:boardId').get(
  tryCatchErrors(async (req: express.Request, res: express.Response) => {
    const board = await boardsService.getBoardById(req.params.boardId!);
    if (!board) {
      throw notFoundErr;
    }
    return res.status(200).json(board);
  })
);

router.route('/').post(
  tryCatchErrors(async (req: express.Request, res: express.Response) => {
    const addBoard = await boardsService.addBoard(req.body);
    return res.status(201).json(addBoard);
  })
);

router.route('/:boardId').put(
  tryCatchErrors(async (req: express.Request, res: express.Response) => {
    const board = await boardsService.getBoardById(req.params.boardId!);
    if (!board) {
      throw notFoundErr;
    }
    await boardsService.updateBoard(
      req.params.boardId!,
      req.body
    );
    return res.status(200).json({ message: 'Board has been updated' });
  })
);

router.route('/:boardId').delete(
  tryCatchErrors(async (req: express.Request, res: express.Response) => {
    const board = await boardsService.getBoardById(req.params.boardId!);
    if (!board) {
      throw notFoundErr;
    }
    await boardsService.deleteBoard(req.params.boardId!);
    return res.status(204).json({ message: 'Board has been deleted' });
  })
);

export default router;
