//Review
export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

//VRHeadset
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

//Game
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

//Cart
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

//User
export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  data: {
    accessToken: string;
    user: User;
  };
}

export interface RegisterResponse {
  status: number;
  message: string;
  data: User;
}

//Search
export interface SearchSuggestion {
  id: string;
  name: string;
  type: "catalog" | "game";
  category: string;
  photo?: string;
}

export interface SearchState {
  searchTerm: string;
  searchResults: {
    headsets: VRHeadset[];
    games: Game[];
  };
  suggestions: SearchSuggestion[];
  isLoading: boolean;
  error: string | null;
}
