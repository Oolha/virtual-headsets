import { Schema, model } from 'mongoose';

const gameSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    longDescription: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    mainCharacters: {
      type: [String],
      default: [],
    },
    gameObjective: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    compatibility: {
      type: [String],
      required: true,
      enum: ['Standalone', 'PC VR', 'PlayStation VR', 'PlayStation VR2'],
    },
    developer: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    photo: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const GamesCollection = model('games', gameSchema, 'vrGames');
