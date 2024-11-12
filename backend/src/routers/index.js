import { Router } from 'express';
import virtualHeadsetsRouter from './headsets.js';
import authRouter from './auth.js';
import gamesRouter from './games.js';

const router = Router();
router.use('/headsets', virtualHeadsetsRouter);
router.use('/games', gamesRouter);
router.use('/auth', authRouter);

export default router;
