import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { ProductType } from "../../types/types";

type Products = ProductType[];

const initialState: Products = [];

export const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    getProducts: (_state, action: PayloadAction<Products>) => {
      return action.payload;
    },
  },
});

export const { getProducts } = productSlice.actions;

export default productSlice.reducer;
