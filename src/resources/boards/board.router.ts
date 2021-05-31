import * as express from 'express';
import boardsService from './board.service';

const router = express.Router();

router.route('/').get(async (_req, res) => {
  const boards = await boardsService.getAllBoards();
  return res.json(boards);
});

router.route('/:boardId').get(async (req, res) => {
  const board = await boardsService.getBoardById(req.params.boardId);
  if (!board) {
    return res.status(404).json({ message: 'Board not found' });
  }
  return res.status(200).json(board);
});

router.route('/').post(async (req, res) => {
  const addBoard = await boardsService.addBoard(req.body);
  return res.status(201).json(addBoard);
});

router.route('/:boardId').put(async (req, res) => {
  const board = await boardsService.getBoardById(req.params.boardId);
  if (!board) {
    return res.status(404).json({ message: 'Board not found' });
  }
  await boardsService.updateBoard(
    req.params.boardId,
    req.body
  );
  return res.status(200).json({ message: 'Board has been updated' });
});

router.route('/:boardId').delete(async (req, res) => {
  const board = await boardsService.getBoardById(req.params.boardId);
  if (!board) {
    return res.status(404).json({ message: 'Board not found' });
  }
  await boardsService.deleteBoard(req.params.boardId);
  return res.status(204).json({ message: 'Board has been deleted' });
});

export default router;
