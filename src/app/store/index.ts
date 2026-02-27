import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	persistReducer,
	persistStore,
	REGISTER,
	REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { apiSlice } from "@/app/api/api-entry";
import authReducer from "@/app/features/auth-slice";

const authPersistConfig = {
	key: "auth",
	storage,
	whitelist: ["isAuthenticated", "user", "token"],
};

export const persistedAuthReducer = persistReducer(
	authPersistConfig,
	authReducer,
);

const rootReducer = combineReducers({
	auth: persistedAuthReducer,
	[apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
