import { createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "@/services/api/api-entry";
import { unwrapListResponse, unwrapResponse } from "@/services/api/utils";
import type { RootState } from "@/store";
import type {
	ApiResponse,
	CompaniesListResult,
	CompaniesQueryParams,
	Company,
	CreateCompanyInput,
} from "@/types";

export interface NormalizedCompaniesResult extends CompaniesListResult {
	byId: Record<string, Company>;
}

export const companiesApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		/** Get list of companies with pagination/filters */
		getCompanies: builder.query<
			NormalizedCompaniesResult,
			CompaniesQueryParams
		>({
			query: (params) => ({ url: "/companies", params }),
			transformResponse: (response: ApiResponse<Company[]>) => {
				const res = unwrapListResponse<Company>(response);
				const byId: Record<string, Company> = {};
				for (const item of res.data) {
					byId[item.id] = item;
				}
				return { ...res, byId };
			},
			providesTags: (result) =>
				result
					? [
							...result.data.map(({ id }) => ({
								type: "Providers" as const,
								id,
							})),
							{ type: "Providers", id: "LIST" },
						]
					: [{ type: "Providers", id: "LIST" }],
		}),

		/** Get single company by ID */
		getCompanyById: builder.query<Company | null, string>({
			query: (id) => `/companies/${id}`,
			transformResponse: (response: ApiResponse<Company>) =>
				unwrapResponse<Company>(response),
			providesTags: (_result, _err, id) => [{ type: "Providers", id }],
		}),

		/** Get current user's company (for providers) */
		getMyCompany: builder.query<Company | null, void>({
			query: () => "/companies/my",
			transformResponse: (response: ApiResponse<Company>) =>
				unwrapResponse<Company>(response),
			providesTags: ["Session", { type: "Providers", id: "MY_COMPANY" }],
		}),

		/** Create a new company profile */
		createCompany: builder.mutation<Company, CreateCompanyInput>({
			query: (body) => ({ url: "/companies", method: "POST", body }),
			transformResponse: (response: ApiResponse<Company>) =>
				unwrapResponse<Company>(response) as Company,
			invalidatesTags: [
				"Providers",
				"Session",
				{ type: "Providers", id: "MY_COMPANY" },
			],
		}),

		/** Update an existing company */
		updateCompany: builder.mutation<
			Company,
			{ id: string; data: Partial<CreateCompanyInput> }
		>({
			query: ({ id, data }) => ({
				url: `/companies/${id}`,
				method: "PATCH",
				body: data,
			}),
			transformResponse: (response: ApiResponse<Company>) =>
				unwrapResponse<Company>(response) as Company,
			invalidatesTags: (_result, _err, { id }) => [
				{ type: "Providers", id },
				{ type: "Providers", id: "MY_COMPANY" },
				"Providers",
				"Session",
			],
		}),

		/** Delete a company */
		deleteCompany: builder.mutation<void, string>({
			query: (id) => ({ url: `/companies/${id}`, method: "DELETE" }),
			invalidatesTags: [
				"Providers",
				"Session",
				{ type: "Providers", id: "MY_COMPANY" },
			],
		}),

		/** Utility checks */
		checkCompanySlug: builder.query<{ available: boolean }, string>({
			query: (slug) => `/companies/check-slug?slug=${slug}`,
			transformResponse: (response: ApiResponse<{ available: boolean }>) =>
				unwrapResponse<{ available: boolean }>(response) || {
					available: false,
				},
		}),

		checkCompanyName: builder.query<{ available: boolean }, string>({
			query: (name) => `/companies/check-name?name=${name}`,
			transformResponse: (response: ApiResponse<{ available: boolean }>) =>
				unwrapResponse<{ available: boolean }>(response) || {
					available: false,
				},
		}),
	}),
});

export const {
	useGetCompaniesQuery,
	useGetCompanyByIdQuery,
	useGetMyCompanyQuery,
	useCreateCompanyMutation,
	useUpdateCompanyMutation,
	useDeleteCompanyMutation,
	useCheckCompanySlugQuery,
	useCheckCompanyNameQuery,
	useLazyCheckCompanySlugQuery,
	useLazyCheckCompanyNameQuery,
} = companiesApi;

/** Selectors for clean component usage */
const selectCompaniesResult = (
	state: RootState,
	params: CompaniesQueryParams,
) => companiesApi.endpoints.getCompanies.select(params)(state);

export const selectCompanyById = createSelector(
	[
		selectCompaniesResult,
		(_state: RootState, _params: unknown, id: string) => id,
	],
	(result, id) => result.data?.byId?.[id],
);
