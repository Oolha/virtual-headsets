import { Router } from 'express';
import virtualHeadsetsRouter from './headsets';

const router = Router();
router.use('/headsets', virtualHeadsetsRouter);

export default router;
