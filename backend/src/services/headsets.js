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
  let updateQuery = {};

  if (payload.$push) {
    updateQuery.$push = payload.$push;
    delete payload.$push;
  }

  updateQuery.$set = payload;

  const rawResult = await HeadsetsCollection.findByIdAndUpdate(
    headsetId,
    updateQuery,
    {
      new: true,
      runValidators: true,
      ...options,
    },
  );

  if (!rawResult) return null;

  return {
    virtualHeadset: rawResult,
    isNew: false,
  };
};
