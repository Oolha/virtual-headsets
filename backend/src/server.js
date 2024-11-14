import app from './app.js';
import { initMongoConnection } from './db/initMongoConnections.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export const setupServer = async () => {
  try {
    await initMongoConnection();
    const PORT = process.env.PORT || 7070;
    app.use(notFoundHandler);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};
