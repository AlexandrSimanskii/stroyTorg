import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { UserCartType } from "../../types/types";

type notAuthSlice = {
  cart: UserCartType[];
  favorite: string[];
};

const initialState: notAuthSlice = { cart: [], favorite: [] };

export const notAuthSlice = createSlice({
  name: "notAuthSlice",

  initialState,

  reducers: {
    addFavoriteNotAuth: (state, action: PayloadAction<string>) => {
      state.favorite.push(action.payload);
    },
    deleteFavoriteNotAuth: (state, action: PayloadAction<string>) => {
      state.favorite = state.favorite.filter((item) => item !== action.payload);
    },
 
    deleteFromCartNotAuth: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
    deleteAllFavoritesNotAuth: (state) => {
      state.favorite = [];
    },
    addFavoritesInCartNotAuth: (state, action: PayloadAction<string[]>) => {
      const data = action.payload.map((item) => ({ _id: item, count: 1 }));
      state.cart.push(...data);
    },
    addInCartNotAuth: (state, action: PayloadAction<UserCartType>) => {
      const existingIndex = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );
      if (existingIndex === -1) {
        state.cart.push(action.payload);
      } else {
        state.cart[existingIndex] = action.payload;
      }
    },
   
  },
});

export const {
  addFavoriteNotAuth,
  deleteFavoriteNotAuth,
  addInCartNotAuth,
  deleteFromCartNotAuth,
  deleteAllFavoritesNotAuth,
  addFavoritesInCartNotAuth
} = notAuthSlice.actions;

export default notAuthSlice.reducer;
