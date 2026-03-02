import type { ApiResponse } from "@/types";

/** unwrap backend response: use data and meta from apiresponse */
export function unwrapListResponse<T>(response: ApiResponse<T[]>) {
	return {
		data: Array.isArray(response.data) ? response.data : [],
		meta: response.meta ?? { total: 0, page: 1, limit: 10, totalPages: 0 },
	};
}

export function unwrapResponse<T>(response: ApiResponse<T>) {
	return response.data ?? null;
}
