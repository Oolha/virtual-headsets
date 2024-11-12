import { Router } from 'express';
import {
  getGamesController,
  getGameByIdController,
  createGameController,
  deleteGameController,
  patchGameController,
  getTopGamesController,
} from '../controllers/games.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { vrGamePatchSchema, vrGameSchema } from '../validation/games.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.get('/', ctrlWrapper(getGamesController));

router.get('/top5', ctrlWrapper(getTopGamesController));

router.get('/:gameId', ctrlWrapper(getGameByIdController));

router.post(
  '/',
  upload.single('photo'),
  validateBody(vrGameSchema),
  ctrlWrapper(createGameController),
);

router.delete('/:gameId', ctrlWrapper(deleteGameController));

router.patch(
  '/:gameId',
  upload.single('photo'),
  validateBody(vrGamePatchSchema),
  ctrlWrapper(patchGameController),
);

export default router;
