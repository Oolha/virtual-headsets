import { HeadsetsCollection } from '../db/models/headset.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllVirtualHeadsets = async ({
  page = 1,
  perPage = 8,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const virtualHeaderQuery = HeadsetsCollection.find();
  if (filter.name) {
    virtualHeaderQuery.where('name').equals(filter.name);
  }
  if (filter.maxPrice) {
    virtualHeaderQuery.where('price').lte(filter.maxPrice);
  }
  if (filter.minPrice) {
    virtualHeaderQuery.where('price').gte(filter.minPrice);
  }
  if (filter.compatibility) {
    virtualHeaderQuery.where('compatibility').equals(filter.compatibility);
  }
  if (filter.color) {
    virtualHeaderQuery.where('color').equals(filter.color);
  }
  if (filter.manufacturer) {
    virtualHeaderQuery
      .where('manufacturer')
      .equals(filter.manufacturer.toUpperCase());
  }
  const [virtualHeaderCount, headers] = await Promise.all([
    HeadsetsCollection.find().merge(virtualHeaderQuery).countDocuments(),
    virtualHeaderQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);
  const paginationData = calculatePaginationData(
    virtualHeaderCount,
    perPage,
    page,
  );

  return {
    data: headers,
    ...paginationData,
  };
};

export const getVirtualHeadsetById = async (headsetId) => {
  const headset = await HeadsetsCollection.findById(headsetId);
  return headset;
};

export const createVirtualHeadset = async (payload) => {
  const virtualHeadset = await HeadsetsCollection.create(payload);
  return virtualHeadset;
};

export const deleteVirtualHeadset = async (headsetId) => {
  const virtualHeadset = await HeadsetsCollection.findOneAndDelete({
    _id: headsetId,
  });

  return virtualHeadset;
};

export const updateVirtualHeadset = async (
  headsetId,
  payload,
  options = {},
) => {
  const rawResult = await HeadsetsCollection.findOneAndUpdate(
    { _id: headsetId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    virtualHeadset: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const patchVirtualHeadsetController = async (req, res, next) => {
  const { headsetId } = req.params;
  const result = await updateVirtualHeadset(headsetId, req.body);

  if (!result) {
    next(createHttpError(404, 'Virtual headset not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a virtual headset!`,
    data: result.virtualHeadset,
  });
};
