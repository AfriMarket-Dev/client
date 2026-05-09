import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import { apiLogger } from "@/lib/logger";
import { getApiUrl } from "@/shared/config/env";
import type { RootState } from "@/store";
import { logout } from "@/store/slices/auth-slice";

const BASE_URL = getApiUrl();

/**
 * Cache Configuration Standards
 */
export const CACHE_CONFIG = {
	/** TTL: How long data stays in cache after all components unmount (5 mins) */
	TTL: 300,
	/** REVALIDATE: If data is older than this (30s), fetch fresh in background on mount */
	STALE_TIME: 30,
};

const baseQuery = fetchBaseQuery({
	baseUrl: BASE_URL,
	prepareHeaders: (headers, { getState }) => {
		const state = (getState as () => RootState)();
		const token = state.auth.token;

		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}
		headers.set("Content-Type", "application/json");
		return headers;
	},
	credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	const result = await baseQuery(args, api, extraOptions);

	if (result.error && result.error.status === 401) {
		apiLogger.warn("Session expired, logging out...");
		api.dispatch(apiSlice.util.resetApiState());
		api.dispatch(logout());
	}

	return result;
};

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: baseQueryWithReauth,
	// @ts-expect-error Redux persist payload is not strongly typed
	extractRehydrationInfo(action, { reducerPath }) {
		if (action.type === REHYDRATE) {
			return (action.payload as Record<string, unknown>)?.[reducerPath];
		}
	},

	/**
	 * GLOBAL CACHE POLICIES
	 * Implements SWR (Stale-While-Revalidate)
	 */
	keepUnusedDataFor: CACHE_CONFIG.TTL,
	refetchOnMountOrArgChange: CACHE_CONFIG.STALE_TIME,
	refetchOnReconnect: true,
	refetchOnFocus: false, // Avoid excessive refetching when switching tabs

	tagTypes: [
		"Users",
		"Categories",
		"Products",
		"Services",
		"Providers",
		"Customers",
		"Orders",
		"Dashboard",
		"Session",
		"Wishlist",
		"Messages",
		"Stats",
		"Reviews",
		"Auctions",
	],
	endpoints: () => ({}),
});
