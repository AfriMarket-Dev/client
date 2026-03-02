import { apiSlice } from "@/app/api/api-entry";
import type { ApiResponse } from "@/app/api/types";

export interface CompanyCategory {
	id: string;
	name: string;
	description?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface CompanyCategoriesListResult {
	data: CompanyCategory[];
	meta: { total: number; page: number; limit: number; totalPages: number };
}

export const companyCategoriesApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCompanyCategories: builder.query<
			CompanyCategoriesListResult,
			{ page?: number; limit?: number } | void
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
