import { apiSlice } from "@/app/api/api-entry";
import type { ApiResponse } from "@/app/api/types";
import { unwrapListResponse, unwrapResponse } from "@/app/api/types";

export interface ServiceCategory {
	id: string;
	name: string;
	description?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface ServiceCategoriesListResult {
	data: ServiceCategory[];
	meta: { total: number; page: number; limit: number; totalPages: number };
}

export const serviceCategoriesApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getServiceCategories: builder.query<
			ServiceCategoriesListResult,
			{ page?: number; limit?: number }
		>({
			query: (params = {}) => {
				const sp = new URLSearchParams();
				if (params?.page != null) sp.set("page", String(params.page));
				if (params?.limit != null) sp.set("limit", String(params.limit));
				return `/service-categories?${sp.toString()}`;
			},
			transformResponse: (response: ApiResponse<ServiceCategory[]>) =>
				unwrapListResponse(response) as ServiceCategoriesListResult,
			providesTags: ["Categories"],
		}),

		getServiceCategoryById: builder.query<ServiceCategory | null, string>({
			query: (id) => `/service-categories/${id}`,
			transformResponse: (response: ApiResponse<ServiceCategory>) =>
				unwrapResponse(response),
			providesTags: (_result, _err, id) => [{ type: "Categories", id }],
		}),
	}),
});

export const { useGetServiceCategoriesQuery, useGetServiceCategoryByIdQuery } =
	serviceCategoriesApi;
