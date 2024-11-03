import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import router from './routers/headsets.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
app.use(express.json());
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
app.use('/', router);
app.use('*', notFoundHandler);

app.use(errorHandler);
export default app;
