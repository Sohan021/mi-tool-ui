import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/es/storage";
import { ReducerUi } from "./slices/uiSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  ui: ReducerUi,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const AppStore = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export const AppPersistor = persistStore(AppStore);

export type AppState = ReturnType<typeof AppStore.getState>;
export type AppDispatch = typeof AppStore.dispatch;
export type AppThunk = ThunkAction<void, AppState, unknown, Action<string>>;
export type AppThunkApi = BaseThunkAPI<AppState, unknown, AppDispatch, unknown>;

export const useDispatchTyped: () => AppDispatch = useDispatch;
export const useSelectorTyped: TypedUseSelectorHook<AppState> = useSelector;
