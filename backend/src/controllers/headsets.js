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
  getPublicIdFromUrl,
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
    technicalSpecifications: req.body.technicalSpecifications,
    reviews: [],
    order: req.body.order,
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
    technicalSpecifications: req.body.technicalSpecifications,
    reviews: req.body.reviews || [],
    order: req.body.order,
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

  if (!existingHeadset) {
    throw createHttpError(404, 'Product not found');
  }

  if (photo) {
    if (process.env.ENABLE_CLOUDINARY === 'true') {
      if (existingHeadset.photo) {
        const publicId = getPublicIdFromUrl(existingHeadset.photo);
        if (publicId) {
          await deleteFromCloudinary(publicId);
        }
      }
      photoUrl = await saveFileToCloudinary(photo);
      console.log('New photo URL:', photoUrl);
    }
  }
  const updateData = {};
  if (req.body.name) updateData.name = req.body.name;
  if (req.body.description) updateData.description = req.body.description;
  if (req.body.price) updateData.price = req.body.price;
  if (req.body.screenResolution)
    updateData.screenResolution = req.body.screenResolution;
  if (req.body.compatibility) updateData.compatibility = req.body.compatibility;
  if (req.body.color) updateData.color = req.body.color;
  if (req.body.technicalSpecifications)
    updateData.technicalSpecifications = req.body.technicalSpecifications;
  if (req.body.order) updateData.order = req.body.order;
  if (photoUrl) updateData.photo = photoUrl;

  // $push is a MongoDB operator for adding elements to an array.
  if (req.body.reviews && req.body.reviews.length > 0) {
    updateData.$push = { reviews: { $each: req.body.reviews } };
  }

  const result = await updateVirtualHeadset(headsetId, updateData);

  if (result === null) {
    throw createHttpError(404, 'Failed to update product');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a product!',
    data: result,
  });
};
