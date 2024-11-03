import Joi from 'joi';

const technicalSpecificationsSchema = Joi.object({
  includedAccessories: Joi.array()
    .items(Joi.string().required())
    .required()
    .messages({
      'array.base': 'Included accessories should be an array of strings.',
      'any.required': 'Included accessories are required.',
    }),
  guarantee: Joi.string().required().messages({
    'string.base': 'The guarantee must be a string.',
    'any.required': 'The guarantee is required.',
  }),
  purpose: Joi.string().required().messages({
    'string.base': 'The purpose must be a string.',
    'any.required': 'The purpose is required.',
  }),
  refreshRate: Joi.string().required().messages({
    'string.base': 'The refresh rate must be a string.',
    'any.required': 'The refresh rate is required.',
  }),
  fieldOfView: Joi.string().required().messages({
    'string.base': 'The field of view must be a string.',
    'any.required': 'The field of view is required.',
  }),
  builtInMemory: Joi.string().required().messages({
    'string.base': 'The built-in memory must be a string.',
    'any.required': 'The built-in memory is required.',
  }),
  sound: Joi.string().required().messages({
    'string.base': 'The sound must be a string.',
    'any.required': 'The sound is required.',
  }),
  sensors: Joi.array().items(Joi.string().required()).required().messages({
    'array.base': 'Sensors should be an array of strings.',
    'any.required': 'Sensors are required.',
  }),
  connectors: Joi.array().items(Joi.string().required()).required().messages({
    'array.base': 'Connectors should be an array of strings.',
    'any.required': 'Connectors are required.',
  }),
  recommendedHardwareRequirements: Joi.array()
    .items(Joi.string().required())
    .required()
    .messages({
      'array.base':
        'Recommended hardware requirements should be an array of strings.',
      'any.required': 'Recommended hardware requirements are required.',
    }),
  manufacturer: Joi.string().required().messages({
    'string.base': 'The manufacturer must be a string.',
    'any.required': 'The manufacturer is required.',
  }),
});

export const virtualHeadsetValidationSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.base': 'The name must be a string.',
    'string.min': 'The name must be at least 3 characters long.',
    'any.required': 'The name is required.',
  }),
  description: Joi.string().required().messages({
    'string.base': 'The description must be a string.',
    'any.required': 'The description is required.',
  }),
  price: Joi.number().positive().required().messages({
    'number.base': 'The price must be a number.',
    'number.positive': 'The price must be a positive number.',
    'any.required': 'The price is required.',
  }),
  screenResolution: Joi.string().required().messages({
    'string.base': 'The screen resolution must be a string.',
    'any.required': 'The screen resolution is required.',
  }),
  compatibility: Joi.string().required().messages({
    'string.base': 'The compatibility must be a string.',
    'any.required': 'Compatibility is required.',
  }),
  color: Joi.string().required().messages({
    'string.base': 'The color must be a string.',
    'any.required': 'Color is required.',
  }),
  technicalSpecifications: technicalSpecificationsSchema.required().messages({
    'any.required': 'Technical specifications are required.',
  }),
});

const updateTechnicalSpecificationsSchema = Joi.object({
  includedAccessories: Joi.array().items(Joi.string().required()).messages({
    'array.base': 'Included accessories should be an array of strings.',
  }),
  guarantee: Joi.string().messages({
    'string.base': 'The guarantee must be a string.',
  }),
  purpose: Joi.string().messages({
    'string.base': 'The purpose must be a string.',
  }),
  refreshRate: Joi.string().messages({
    'string.base': 'The refresh rate must be a string.',
  }),
  fieldOfView: Joi.string().messages({
    'string.base': 'The field of view must be a string.',
  }),
  builtInMemory: Joi.string().messages({
    'string.base': 'The built-in memory must be a string.',
  }),
  sound: Joi.string().messages({
    'string.base': 'The sound must be a string.',
  }),
  sensors: Joi.array().items(Joi.string().required()).messages({
    'array.base': 'Sensors should be an array of strings.',
  }),
  connectors: Joi.array().items(Joi.string().required()).messages({
    'array.base': 'Connectors should be an array of strings.',
  }),
  recommendedHardwareRequirements: Joi.array()
    .items(Joi.string().required())
    .messages({
      'array.base':
        'Recommended hardware requirements should be an array of strings.',
    }),
  manufacturer: Joi.string().messages({
    'string.base': 'The manufacturer must be a string.',
  }),
});

export const updateVirtualHeadsetValidationSchema = Joi.object({
  name: Joi.string().min(3).messages({
    'string.base': 'The name must be a string.',
    'string.min': 'The name must be at least 3 characters long.',
  }),
  description: Joi.string().messages({
    'string.base': 'The description must be a string.',
  }),
  price: Joi.number().positive().messages({
    'number.base': 'The price must be a number.',
    'number.positive': 'The price must be a positive number.',
  }),
  screenResolution: Joi.string().messages({
    'string.base': 'The screen resolution must be a string.',
  }),
  compatibility: Joi.string().messages({
    'string.base': 'The compatibility must be a string.',
  }),
  color: Joi.string().messages({
    'string.base': 'The color must be a string.',
  }),
  technicalSpecifications: updateTechnicalSpecificationsSchema.messages({
    'object.base': 'Technical specifications should be a valid object.',
  }),
})
  .min(1)
  .messages({
    'object.min': 'At least one field must be provided for update.',
  });
