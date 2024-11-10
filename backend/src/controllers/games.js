import {
  createGame,
  deleteGame,
  getAllGames,
  getGameById,
} from '../services/games.js';
import createHttpError from 'http-errors';
import { getPublicIdFromUrl } from '../utils/saveFileToCloudinary.js';

export const getGamesController = async (req, res) => {
  const games = await getAllGames();

  res.json({
    status: 200,
    message: 'Successfully found games!',
    data: games,
  });
};

export const getGameByIdController = async (req, res, next) => {
  const { gameId } = req.params;
  const game = await getGameById(gameId);
  if (!game) {
    throw createHttpError(404, 'Game not found');
  }

  res.json({
    status: 200,
    message: `Successfully found game with id ${gameId}!`,
    data: game,
  });
};

export const createGameController = async (req, res) => {
  const game = await createGame(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a game!`,
    data: game,
  });
};

export const deleteGameController = async (req, res) => {
  const { gameId } = req.params;

  const game = await deleteGame(gameId);

  if (!game) {
    next(createHttpError(404, 'Game not found'));
    return;
  }

  res.status(204).send();
};

export const patchGameController = async (req, res) => {
  const { gameId } = req.params;
  const photo = req.file;

  let photoUrl;

  const existingGame = await getGameById(gameId);

  if (!existingGame) {
    throw createHttpError(404, 'Product not found');
  }

  if (photo) {
    if (process.env.ENABLE_CLOUDINARY === 'true') {
      if (existingGame.photo) {
        const publicId = getPublicIdFromUrl(existingGame.photo);
        if (publicId) {
          await deleteFromCloudinary(publicId);
        }
      }
      photoUrl = await saveFileToCloudinary(photo);
      console.log('New photo URL:', photoUrl);
    }
  }
  const updateData = {
    ...(req.body.name && { name: req.body.name }),
    ...(req.body.shortDescription && {
      shortDescription: req.body.shortDescription,
    }),
    ...(req.body.longDescription && {
      longDescription: req.body.longDescription,
    }),
    ...(req.body.price && { price: req.body.price }),
    ...(req.body.mainCharacters && {
      mainCharacters: req.body.mainCharacters,
    }),
    ...(req.body.gameObjective && { gameObjective: req.body.gameObjective }),
    ...(req.body.genre && { genre: req.body.genre }),
    ...(req.body.compatibility && { compatibility: req.body.compatibility }),
    ...(req.body.developer && { developer: req.body.developer }),
    ...(req.body.rating && { rating: req.body.rating }),
    ...(photoUrl && { photo: photoUrl }),
  };

  const result = await updateGame(gameId, updateData);

  if (result === null) {
    throw createHttpError(404, 'Failed to update product');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a product!',
    data: result,
  });
};
