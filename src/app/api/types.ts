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
  /**
   * Present on error responses from the backend HttpExceptionFilter.
   * Most client code will instead rely on RTK Query error handling,
   * but this keeps the shape aligned with the Nest ApiResponse.
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

/** Unwrap backend response: use data and meta from ApiResponse */
export function unwrapListResponse<T>(response: ApiResponse<T[]>) {
  return {
    data: Array.isArray(response.data) ? response.data : [],
    meta: response.meta ?? { total: 0, page: 1, limit: 10, totalPages: 0 },
  };
}

export function unwrapResponse<T>(response: ApiResponse<T>) {
  return response.data ?? null;
}
