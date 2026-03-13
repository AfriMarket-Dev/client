import type { RootState } from "@/store";

/**
 * Standard utility to handle backend's standardized wrapped responses
 */
export function unwrapResponse<T>(response: any): T | null {
	if (!response) return null;
	if (response && typeof response === "object" && "data" in response) {
		return response.data as T;
	}
	if (typeof response === "object" && (response.id || response.name)) {
		return response as T;
	}
	return response as T;
}

/**
 * Standard utility for paginated/list responses
 */
export function unwrapListResponse<T>(response: any) {
	if (!response) {
		return {
			data: [] as T[],
			meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
		};
	}
	const data = response.data !== undefined ? response.data : response;
	const meta = response.meta ?? {
		total: Array.isArray(data) ? data.length : 0,
		page: 1,
		limit: 10,
		totalPages: 1,
	};
	return {
		data: (Array.isArray(data) ? data : []) as T[],
		meta,
	};
}

/**
 * SWR Helper for TanStack Loaders
 * If data exists in Redux cache and is fresh enough, return it immediately.
 * Otherwise, wait for the fetch.
 */
export async function getFreshOrCached<T>(
	store: { getState: () => RootState; dispatch: (action: any) => any },
	endpoint: any,
	args: any = undefined,
	staleTimeMs = 30000 // 30s default
) {
	const state = store.getState();
	const cacheEntry = endpoint.select(args)(state);
	
	// Check if data exists and is within stale time
	const now = Date.now();
	const fulfilledStamp = cacheEntry?.fulfilledTimeStamp ?? 0;
	const isFresh = now - fulfilledStamp < staleTimeMs;

	if (cacheEntry?.data && isFresh) {
		// Return cached data instantly, but trigger background refresh
		store.dispatch(endpoint.initiate(args, { forceRefetch: false }));
		return cacheEntry.data as T;
	}

	// Wait for fresh data if cache is empty or stale
	return await store.dispatch(endpoint.initiate(args, { forceRefetch: true })).unwrap() as T;
}
