import { GamesCollection } from '../db/models/games.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllGames = async ({
  page,
  perPage,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const gamesQuery = GamesCollection.find();

  if (filter.name) {
    gamesQuery.where('name').equals(filter.name);
  }
  if (filter.maxPrice) {
    gamesQuery.where('price').lte(filter.maxPrice);
  }
  if (filter.minPrice) {
    gamesQuery.where('price').gte(filter.minPrice);
  }
  if (filter.compatibility) {
    gamesQuery.where('compatibility').equals(filter.compatibility);
  }
  if (filter.rating) {
    gamesQuery.where('color').equals(filter.color);
  }
  if (filter.genre) {
    gamesQuery.where('genre').equals(filter.genre);
  }
  const [gamesCount, games] = await Promise.all([
    GamesCollection.find().merge(gamesQuery).countDocuments(),
    gamesQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);
  const paginationData = calculatePaginationData(gamesCount, perPage, page);

  return {
    data: games,
    ...paginationData,
  };
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

export const getTopGames = async () => {
  const topGames = await GamesCollection.find({ isTopGame: true })
    .sort({ rating: -1 })
    .limit(5)
    .exec();

  return topGames;
};
