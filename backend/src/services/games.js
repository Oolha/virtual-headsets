import { GamesCollection } from '../db/models/games.js';

export const getAllGames = async () => {
  const games = await GamesCollection.find();
  return games;
};

export const getGameById = async (gameId) => {
  const game = await GamesCollection.findById(gameId);
  return game;
};

export const createGame = async (payload) => {
  const game = await GamesCollection.create(payload);
  return game;
};

export const deleteGame = async (gameId) => {
  const game = await GamesCollection.findOneAndDelete({
    _id: gameId,
  });
  return game;
};

export const updateGame = async (gameId, payload, options = {}) => {
  const rawResult = await GamesCollection.findByIdAndUpdate(
    gameId,
    { $set: payload },
    {
      new: true,
      runValidators: true,
      ...options,
    },
  );
  if (!rawResult) return null;

  return {
    game: rawResult,
    isNew: false,
  };
};
