import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnections.js';

const bootstrap = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (error) {
    console.error(error);
  }
};

bootstrap();
