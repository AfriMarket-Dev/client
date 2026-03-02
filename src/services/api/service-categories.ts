import { apiSlice } from "@/services/api/api-entry";
import { unwrapListResponse, unwrapResponse } from "@/services/api/utils";
import type {
	ApiResponse,
	ServiceCategoriesListResult,
	ServiceCategory,
} from "@/types";

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
