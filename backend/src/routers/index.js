import { Router } from 'express';
import virtualHeadsetsRouter from './headsets.js';
import authRouter from './auth.js';

const router = Router();
router.use('/headsets', virtualHeadsetsRouter);
router.use('/auth', authRouter);

export default router;
