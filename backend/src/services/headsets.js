import { HeadsetsCollection } from '../db/models/headset.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllVirtualHeadsets = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const virtualHeaderQuery = HeadsetsCollection.find();
  const virtualHeaderCount = await HeadsetsCollection.find()
    .merge(virtualHeaderQuery)
    .countDocuments();

  const headers = await virtualHeaderQuery.skip(skip).limit(limit).exec();

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
