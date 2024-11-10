import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { UPLOAD_DIR } from './constants/index.js';

import { getAllGames, getGameById } from './services/games.js';
import gamesRouter from './routers/games.js';

const app = express();
app.use(express.json());
app.use('/uploads', express.static(UPLOAD_DIR));
app.use(
  cors({
    origin: 'http://localhost:7070',
    optionsSuccessStatus: 200,
  }),
);
app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);
app.use(cookieParser());
app.use('/', router);
app.get('/games', async (req, res) => {
  const games = await getAllGames();
  res.status(200).json({
    data: games,
  });
});

app.get('/games/:gameId', async (req, res) => {
  const { gameId } = req.params;
  const game = await getGameById(gameId);

  if (!game) {
    res.status(404).json({
      message: 'Game not found',
    });
    return;
  }
  res.status(200).json({
    data: game,
  });
});
app.use(gamesRouter);
app.use('*', notFoundHandler);

app.use(errorHandler);

export default app;
