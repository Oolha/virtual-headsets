import Joi from 'joi';

export const vrGameSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.base': '"name" should be a type of text',
    'string.empty': '"name" cannot be an empty field',
    'any.required': '"name" is a required field',
  }),
  shortDescription: Joi.string().trim().required().messages({
    'string.base': '"shortDescription" should be a type of text',
    'string.empty': '"shortDescription" cannot be an empty field',
    'any.required': '"shortDescription" is a required field',
  }),
  longDescription: Joi.string().trim().required().messages({
    'string.base': '"longDescription" should be a type of text',
    'string.empty': '"longDescription" cannot be an empty field',
    'any.required': '"longDescription" is a required field',
  }),
  price: Joi.number().min(0).required().messages({
    'number.base': '"price" should be a type of number',
    'number.min': '"price" must be greater than or equal to 0',
    'any.required': '"price" is a required field',
  }),
  mainCharacters: Joi.array().items(Joi.string()).default([]).messages({
    'array.base': '"mainCharacters" should be an array of names',
  }),
  gameObjective: Joi.string().trim().required().messages({
    'string.base': '"gameObjective" should be a type of text',
    'string.empty': '"gameObjective" cannot be an empty field',
    'any.required': '"gameObjective" is a required field',
  }),
  genre: Joi.string().trim().required().messages({
    'string.base': '"genre" should be a type of text',
    'string.empty': '"genre" cannot be an empty field',
    'any.required': '"genre" is a required field',
  }),
  compatibility: Joi.array()
    .items(
      Joi.string().valid(
        'Standalone',
        'PC VR',
        'PlayStation VR',
        'PlayStation VR2',
      ),
    )
    .required()
    .messages({
      'array.base': '"compatibility" should be an array of supported types',
      'any.only':
        '"compatibility" must contain only "Standalone", "PC VR", "PlayStation VR", or "PlayStation VR2"',
      'any.required': '"compatibility" is a required field',
    }),
  developer: Joi.string().trim().required().messages({
    'string.base': '"developer" should be a type of text',
    'string.empty': '"developer" cannot be an empty field',
    'any.required': '"developer" is a required field',
  }),
  rating: Joi.number().min(0).max(5).default(0).messages({
    'number.base': '"rating" should be a type of number',
    'number.min': '"rating" must be at least 0',
    'number.max': '"rating" must be at most 5',
  }),
  photo: Joi.string().uri().messages({
    'string.uri': '"photo" must be a valid URI',
    'string.base': '"photo" should be a type of text',
  }),
}).unknown(true);

export const vrGamePatchSchema = Joi.object({
  name: Joi.string().trim().messages({
    'string.base': '"name" should be a type of text',
    'string.empty': '"name" cannot be an empty field',
  }),
  shortDescription: Joi.string().trim().messages({
    'string.base': '"shortDescription" should be a type of text',
    'string.empty': '"shortDescription" cannot be an empty field',
  }),
  longDescription: Joi.string().trim().messages({
    'string.base': '"longDescription" should be a type of text',
    'string.empty': '"longDescription" cannot be an empty field',
  }),
  price: Joi.number().min(0).messages({
    'number.base': '"price" should be a type of number',
    'number.min': '"price" must be greater than or equal to 0',
  }),
  mainCharacters: Joi.array().items(Joi.string()).messages({
    'array.base': '"mainCharacters" should be an array of names',
  }),
  gameObjective: Joi.string().trim().messages({
    'string.base': '"gameObjective" should be a type of text',
    'string.empty': '"gameObjective" cannot be an empty field',
  }),
  genre: Joi.string().trim().messages({
    'string.base': '"genre" should be a type of text',
    'string.empty': '"genre" cannot be an empty field',
  }),
  compatibility: Joi.array()
    .items(
      Joi.string().valid(
        'Standalone',
        'PC VR',
        'PlayStation VR',
        'PlayStation VR2',
      ),
    )
    .messages({
      'array.base': '"compatibility" should be an array of supported types',
      'any.only':
        '"compatibility" must contain only "Standalone", "PC VR", "PlayStation VR", or "PlayStation VR2"',
    }),
  developer: Joi.string().trim().messages({
    'string.base': '"developer" should be a type of text',
    'string.empty': '"developer" cannot be an empty field',
  }),
  rating: Joi.number().min(0).max(5).messages({
    'number.base': '"rating" should be a type of number',
    'number.min': '"rating" must be at least 0',
    'number.max': '"rating" must be at most 5',
  }),
  photo: Joi.string().uri().messages({
    'string.uri': '"photo" must be a valid URI',
    'string.base': '"photo" should be a type of text',
  }),
}).unknown(true);
