import { apiSlice } from "@/services/api/api-entry";
import type {
	ApiResponse,
	CompanyCategoriesListResult,
	CompanyCategory,
} from "@/types";

export const companyCategoriesApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCompanyCategories: builder.query<
			CompanyCategoriesListResult,
			{ page?: number; limit?: number } | undefined
		>({
			query: (params = {}) => {
				const sp = new URLSearchParams();
				if (params?.page != null) sp.set("page", String(params.page));
				if (params?.limit != null) sp.set("limit", String(params.limit));
				return `/company-categories?${sp.toString()}`;
			},
			transformResponse: (response: ApiResponse<CompanyCategory[]>) => {
				const m = response.meta;
				return {
					data: response.data ?? [],
					meta: {
						total: m?.total ?? 0,
						page: m?.page ?? 1,
						limit: m?.limit ?? 10,
						totalPages: m?.totalPages ?? 0,
					},
				};
			},
			providesTags: ["Categories"],
		}),

		getCompanyCategoryById: builder.query<CompanyCategory | null, string>({
			query: (id) => `/company-categories/${id}`,
			transformResponse: (response: ApiResponse<CompanyCategory>) =>
				response.data ?? null,
			providesTags: (_result, _err, id) => [{ type: "Categories", id }],
		}),
	}),
});

export const { useGetCompanyCategoriesQuery, useGetCompanyCategoryByIdQuery } =
	companyCategoriesApi;
