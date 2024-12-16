export interface VRHeadset {
  _id: string;
  name: string;
  description: string;
  price: number;
  screenResolution: string;
  compatibility: string;
  color: string;
  technicalSpecifications: {
    includedAccessories: string[];
    guarantee: string;
    purpose: string;
    refreshRate: string;
    fieldOfView: string;
    builtInMemory: string;
    sound: string;
    sensors: string[];
    connectors: string[];
    recommendedHardwareRequirements: string[];
    manufacturer: string;
  };
  photo: string;
  order: number;
}
export interface Game {
  _id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  mainCharacters: string[];
  gameObjective: string;
  genre: string;
  compatibility: string[];
  developer: string;
  rating: number;
  photo: string;
  updatedAt: string;
  isTopGame: boolean;
}
