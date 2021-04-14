import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import product from "./slices/products";
// import counterReducer from "../components/counterSlice";

export const store = configureStore({
  reducer: {
    product,
  },
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
