/** matches backend apiresponse wrapper */
export interface ApiResponse<T> {
	success: boolean;
	data?: T | null;
	meta?: {
		total?: number;
		page?: number;
		limit?: number;
		totalPages?: number;
	};
	/**
	 * present on error responses from backend
	 */
	error?: {
		statusCode: number;
		message: string | string[];
		error: string;
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
