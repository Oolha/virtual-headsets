import { Router } from 'express';
import {
  getGamesController,
  getGameByIdController,
  createGameController,
  deleteGameController,
  patchGameController,
} from '../controllers/games.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/games', ctrlWrapper(getGamesController));

router.get('/games/:gameId', ctrlWrapper(getGameByIdController));

router.post('/games', ctrlWrapper(createGameController));

router.delete('/games/:gameId', ctrlWrapper(deleteGameController));

router.patch('/students/:studentId', ctrlWrapper(patchGameController));

export default router;
