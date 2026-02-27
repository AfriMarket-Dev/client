/** Matches backend ApiResponse wrapper */
export interface ApiResponse<T> {
	success: boolean;
	data?: T | null;
	meta?: {
		total?: number;
		page?: number;
		limit?: number;
		totalPages?: number;
	};
	timestamp?: string;
	path?: string;
}

export interface PaginatedMeta {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

/** Unwrap backend response: use data and meta from ApiResponse */
export function unwrapListResponse<T>(response: ApiResponse<T[]>) {
	return {
		data: response.data ?? [],
		meta: response.meta ?? { total: 0, page: 1, limit: 10, totalPages: 0 },
	};
}

export function unwrapResponse<T>(response: ApiResponse<T>) {
	return response.data ?? null;
}
