import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "";

export const searchSlice = createSlice({
  name: "searchSlice",

  initialState,

  reducers: {
    setSearchSlice: (state, action: PayloadAction<string>) => {
      state = action.payload;
      return state;
    },
    clearSearchSlice: (state) => {
      state = "";
      return state;
    },
  },
});

export const { setSearchSlice, clearSearchSlice } = searchSlice.actions;

export default searchSlice.reducer;
