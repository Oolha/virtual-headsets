import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { headsetId } = req.params;
  if (!isValidObjectId(headsetId)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
};
