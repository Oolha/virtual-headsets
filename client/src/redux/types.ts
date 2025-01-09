export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

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
  reviews: Review[];
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

export interface CartItem {
  id: string;
  name: string;
  price: number;
  photo: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export const initialCartState: CartState = {
  items: [],
};

export interface User {
  name: string | null;
  email: string | null;
}

export interface AuthState {
  user: User;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  error: string | null;
}

export interface AuthResponse {
  token: string;
  user: User;
}
