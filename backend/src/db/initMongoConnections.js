import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;

const DB_URI = `mongodb+srv://olhasydorchuk17:GJmzu33QKJ8Mz20a@virtual-headsets.h6ilf.mongodb.net/virtual-headsets?retryWrites=true&w=majority&appName=virtual-headsets`;

export const initMongoConnection = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error(error);
    throw error;
  }
};
