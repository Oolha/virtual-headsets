import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, CartItem } from "../types";

const loadCartFromLocalStorage = (): CartItem[] => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};
const saveCartToLocalStorage = (items: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(items));
};
const initialState: CartState = {
  items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
        saveCartToLocalStorage(state.items);
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state.items);
    },
  },
});

export const { addToCart, deleteItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
