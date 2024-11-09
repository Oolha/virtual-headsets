import { model, Schema } from 'mongoose';

const technicalSpecificationsSchema = new Schema(
  {
    includedAccessories: { type: [String], required: true },
    guarantee: { type: String, required: true },
    purpose: { type: String, required: true },
    refreshRate: { type: String, required: true },
    fieldOfView: { type: String, required: true },
    builtInMemory: { type: String, required: true },
    sound: { type: String, required: true },
    sensors: { type: [String], required: true },
    connectors: { type: [String], required: true },
    recommendedHardwareRequirements: { type: [String], required: true },
    manufacturer: { type: String, required: true },
  },
  { _id: false },
);

const virtualHeadsetSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    screenResolution: { type: String, required: true },
    compatibility: { type: String, required: true },
    color: { type: String, required: true },
    technicalSpecifications: {
      type: technicalSpecificationsSchema,
      required: true,
    },
    photo: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const HeadsetsCollection = model(
  'VirtualHeadset',
  virtualHeadsetSchema,
  'virtual-headsets',
);
