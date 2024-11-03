import express from 'express';

import {
  getVirtualHeadsetsController,
  getVirtualHeadsetByIdController,
  createVirtualHeadsetsController,
  deleteVirtualHeadsetController,
  upsertVirtualHeadsetController,
  patchVirtualHeadsetController,
} from '../controllers/headsets.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  virtualHeadsetValidationSchema,
  updateVirtualHeadsetValidationSchema,
} from '../validation/items.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = express.Router();
const jsonParser = express.json({
  type: 'application/json',
});

router.get('/headsets', ctrlWrapper(getVirtualHeadsetsController));

router.get(
  '/headsets/:headsetId',
  isValidId,
  ctrlWrapper(getVirtualHeadsetByIdController),
);

router.post(
  '/headsets',
  jsonParser,
  validateBody(virtualHeadsetValidationSchema),
  ctrlWrapper(createVirtualHeadsetsController),
);

router.delete(
  '/headsets/:headsetId',
  isValidId,
  ctrlWrapper(deleteVirtualHeadsetController),
);

router.put(
  '/headsets/:headsetId',
  jsonParser,
  isValidId,
  validateBody(virtualHeadsetValidationSchema),
  ctrlWrapper(upsertVirtualHeadsetController),
);

router.patch(
  '/headsets/:headsetId',
  jsonParser,
  isValidId,
  validateBody(updateVirtualHeadsetValidationSchema),
  ctrlWrapper(patchVirtualHeadsetController),
);
export default router;
