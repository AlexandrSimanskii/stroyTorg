import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./products/productsSlice";
import { userSlice } from "./users/userSlise";
import { notAuthSlice } from "./NotAuth/notAuthSlice";

import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { searchSlice } from "./SearchSlice/searchSlice";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  search: searchSlice.reducer,
  products: productSlice.reducer,
  notAuth: notAuthSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
