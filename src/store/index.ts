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
import storage from "redux-persist/es/storage";

import { apiSlice } from "@/services/api/api-entry";
import authReducer from "@/store/slices/auth-slice";

// Safely handle the storage object for Vite/ESM compatibility
// biome-ignore lint/suspicious/noExplicitAny: required for storage compatibility
const storageEngine = ((storage as any).default || storage) as Storage;

const authPersistConfig = {
	key: "auth",
	storage: storageEngine,
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
				warnAfter: 256,
			},
			immutableCheck: {
				warnAfter: 256,
			},
		}).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
