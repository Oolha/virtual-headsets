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

router.get('/', ctrlWrapper(getVirtualHeadsetsController));

router.get(
  '/:headsetId',
  isValidId,
  ctrlWrapper(getVirtualHeadsetByIdController),
);

router.post(
  '/',
  jsonParser,
  validateBody(virtualHeadsetValidationSchema),
  ctrlWrapper(createVirtualHeadsetsController),
);

router.delete(
  '/:headsetId',
  isValidId,
  ctrlWrapper(deleteVirtualHeadsetController),
);

router.put(
  '/:headsetId',
  jsonParser,
  isValidId,
  validateBody(virtualHeadsetValidationSchema),
  ctrlWrapper(upsertVirtualHeadsetController),
);

router.patch(
  '/:headsetId',
  jsonParser,
  isValidId,
  validateBody(updateVirtualHeadsetValidationSchema),
  ctrlWrapper(patchVirtualHeadsetController),
);
export default router;
