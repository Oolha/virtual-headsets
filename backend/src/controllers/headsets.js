import {
  createVirtualHeadset,
  deleteVirtualHeadset,
  getAllVirtualHeadsets,
  getVirtualHeadsetById,
  updateVirtualHeadset,
} from '../services/headsets.js';

import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import {
  deleteFromCloudinary,
  saveFileToCloudinary,
} from '../utils/saveFileToCloudinary.js';

export const getVirtualHeadsetsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

  const filter = parseFilterParams(req.query);

  const virtualHeadsets = await getAllVirtualHeadsets({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
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
    throw createHttpError(404, 'Product not found');
  }

  res.json({
    status: 200,
    message: `Successfully found virtual headset with id ${headsetId}!`,
    data: virtualHeadset,
  });
};

export const createVirtualHeadsetsController = async (req, res) => {
  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (process.env.ENABLE_CLOUDINARY === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  const virtualHeadset = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    screenResolution: req.body.screenResolution,
    compatibility: req.body.compatibility,
    color: req.body.color,
    photo: photoUrl,
  };
  const result = await createVirtualHeadset(virtualHeadset);

  res.status(201).json({
    status: 201,
    message: `Successfully created a product!`,
    data: result,
  });
};

export const deleteVirtualHeadsetController = async (req, res) => {
  const { headsetId } = req.params;

  const virtualHeadset = await deleteVirtualHeadset(headsetId);

  if (!virtualHeadset) {
    next(createHttpError(404, 'Product not found'));
    return;
  }

  res.status(204).send();
};

export const upsertVirtualHeadsetController = async (req, res) => {
  const { headsetId } = req.params;
  const photo = req.file;
  let photoUrl;

  if (photo) {
    photoUrl = await saveFileToCloudinary(photo);
  } else {
    photoUrl = await saveFileToUploadDir(photo);
  }

  const virtualHeadset = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    screenResolution: req.body.screenResolution,
    compatibility: req.body.compatibility,
    color: req.body.color,
    photo: photoUrl,
  };
  const result = await updateVirtualHeadset(headsetId, virtualHeadset, {
    upsert: true,
  });

  if (!result) {
    throw createHttpError(404, 'Product not found');
  }

  const status = result.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: `Successfully ${result.isNew ? 'created' : 'updated'} a product!`,
    data: result.virtualHeadset,
  });
};

export const patchVirtualHeadsetController = async (req, res) => {
  const { headsetId } = req.params;
  const photo = req.file;

  let photoUrl;

  const existingHeadset = await getVirtualHeadsetById(headsetId);
  if (photo) {
    if (process.env.ENABLE_CLOUDINARY === 'true') {
      if (existingHeadset && existingHeadset.photo) {
        await deleteFromCloudinary(existingHeadset.photo);
      }
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  const virtualHeadset = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    screenResolution: req.body.screenResolution,
    compatibility: req.body.compatibility,
    color: req.body.color,
    ...(photoUrl && { photo: photoUrl }),
  };
  const result = await updateVirtualHeadset(headsetId, virtualHeadset, {
    upsert: true,
  });

  if (result === null) {
    throw createHttpError(404, 'Product not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a product!',
    data: result,
  });
};
