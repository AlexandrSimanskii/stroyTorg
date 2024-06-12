import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserType, UserCartType, ProductOrderType } from "../../types/types";

const initialState: UserType = {
  _id: "",
  email: "",
  phone: "",
  username: "",
  region: "",
  cart: [],
  favorite: [],
  order: [],
};

export const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    signInSuccessSlice: (_state, action) => {
      return action.payload;
    },
    logOutSlise: (state) => {
      state = initialState;
      return state;
    },
    addFavoriteSlice: (state, action: PayloadAction<string>) => {
      state.favorite.push(action.payload);
    },
    deleteFavoriteSlice: (state, action: PayloadAction<string>) => {
      state.favorite = state.favorite.filter((item) => item !== action.payload);
    },
    deleteAllFavoritesSlice: (state) => {
      state.favorite = [];
    },
    addInCartSlice: (state, action: PayloadAction<UserCartType>) => {
      const existingIndex = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );
      if (existingIndex === -1) {
        state.cart.push(action.payload);
      } else {
        state.cart[existingIndex] = action.payload;
      }
    },
    addFavoriteInCartSlice: (state, action: PayloadAction<string[]>) => {
      const data = action.payload.map((item) => ({ _id: item, count: 1 }));
      state.cart.push(...data);
    },

    deleteFromCartSlice: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
    updateUserOrder: (state, action: PayloadAction<ProductOrderType>) => {
      state.order.push(action.payload);
      state.cart = [];
    },
    updateUser: (state, action: PayloadAction<UserType>) => {
      const { phone, username, email, region } = action.payload;
      state.phone = phone;
      state.username = username;
      state.email = email;
      state.region = region;
    },
  },
});

export const {
  signInSuccessSlice,
  logOutSlise,
  addFavoriteSlice,
  deleteFavoriteSlice,
  deleteAllFavoritesSlice,
  addInCartSlice,
  addFavoriteInCartSlice,
  deleteFromCartSlice,
  updateUserOrder,
  updateUser,
} = userSlice.actions;

export default userSlice.reducer;
