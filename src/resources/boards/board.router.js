const router = require('express').Router();
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
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
  const updBoard = await boardsService.updateBoard(
    req.params.boardId,
    req.body
  );
  return res.status(200).json(updBoard);
});

router.route('/:boardId').delete(async (req, res) => {
  const board = await boardsService.getBoardById(req.params.boardId);
  if (!board) {
    return res.status(404).json({ message: 'Board not found' });
  }
  await boardsService.deleteBoard(req.params.boardId);
  return res.status(204).json({ message: 'The board has been deleted' });
});

module.exports = router;
