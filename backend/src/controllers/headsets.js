import {
  createVirtualHeadset,
  deleteVirtualHeadset,
  getAllVirtualHeadsets,
  getVirtualHeadsetById,
  updateVirtualHeadset,
} from '../services/headsets.js';

import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getVirtualHeadsetsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const virtualHeadsets = await getAllVirtualHeadsets({
    page,
    perPage,
  });

  res.json({
    status: 200,
    message: 'Successfully found virtual headsets!',
    data: virtualHeadsets,
  });
};

export const getVirtualHeadsetByIdController = async (req, res, next) => {
  const { headsetId } = req.params;
  const virtualHeadset = await getVirtualHeadsetById(headsetId);

  if (!virtualHeadset) {
    throw createHttpError(404, 'Student not found');
  }

  res.json({
    status: 200,
    message: `Successfully found virtual headset with id ${headsetId}!`,
    data: virtualHeadset,
  });
};

export const createVirtualHeadsetsController = async (req, res) => {
  const virtualHeadset = await createVirtualHeadset(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a virtual headset!`,
    data: virtualHeadset,
  });
};

export const deleteVirtualHeadsetController = async (req, res) => {
  const { headsetId } = req.params;

  const virtualHeadset = await deleteVirtualHeadset(headsetId);

  if (!virtualHeadset) {
    next(createHttpError(404, 'Virtual headset not found'));
    return;
  }

  res.status(204).send();
};

export const upsertVirtualHeadsetController = async (req, res) => {
  const { headsetId } = req.params;

  const result = await updateVirtualHeadset(headsetId, req.body, {
    upsert: true,
  });

  if (!result) {
    next(createHttpError(404, 'Virtual headset not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a virtual headset!`,
    data: result.virtualHeadset,
  });
};

export const patchVirtualHeadsetController = async (req, res) => {
  // Тіло функції
};
