import { createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "@/services/api/api-entry";
import { unwrapListResponse, unwrapResponse } from "@/services/api/utils";
import type {
	ApiResponse,
	CreateServiceInput,
	Service,
	ServicesListResult,
	ServicesQueryParams,
} from "@/types";

function buildServicesQuery(params: ServicesQueryParams): string {
	const sp = new URLSearchParams();
	if (params.page != null) sp.set("page", String(params.page));
	if (params.limit != null) sp.set("limit", String(params.limit));
	if (params.query) sp.set("query", params.query);
	if (params.categoryId) sp.set("categoryId", params.categoryId);
	if (params.companyId) sp.set("companyId", params.companyId);
	if (params.district) sp.set("district", params.district);
	if (params.minPrice != null) sp.set("minPrice", String(params.minPrice));
	if (params.maxPrice != null) sp.set("maxPrice", String(params.maxPrice));
	if (params.companyType) sp.set("companyType", params.companyType);
	if (params.isFeatured != null)
		sp.set("isFeatured", String(params.isFeatured));
	if (params.hasDiscount != null)
		sp.set("hasDiscount", String(params.hasDiscount));
	if (params.sortBy) sp.set("sortBy", params.sortBy);
	if (params.sortOrder) sp.set("sortOrder", params.sortOrder);
	return `/services?${sp.toString()}`;
}

export const servicesApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getServices: builder.query<ServicesListResult, ServicesQueryParams>({
			query: (params = {}) => buildServicesQuery(params as ServicesQueryParams),
			transformResponse: (response: ApiResponse<Service[]>) =>
				unwrapListResponse(response) as ServicesListResult,
			providesTags: (result) =>
				result
					? [
							...result.data.map(({ id }) => ({
								type: "Services" as const,
								id,
							})),
							{ type: "Services", id: "LIST" },
						]
					: [{ type: "Services", id: "LIST" }],
		}),

		getServiceById: builder.query<Service | null, string>({
			query: (id) => `/services/${id}`,
			transformResponse: (response: ApiResponse<Service>) =>
				unwrapResponse(response),
			providesTags: (_result, _err, id) => [{ type: "Services", id }],
		}),

		createService: builder.mutation<Service, CreateServiceInput>({
			query: (body) => ({ url: "/services", method: "POST", body }),
			invalidatesTags: [{ type: "Services", id: "LIST" }],
		}),

		updateService: builder.mutation<
			Service,
			{ id: string; data: Partial<CreateServiceInput> }
		>({
			query: ({ id, data }) => ({
				url: `/services/${id}`,
				method: "PATCH",
				body: data,
			}),
			invalidatesTags: (_result, _err, { id }) => [
				{ type: "Services", id },
				{ type: "Services", id: "LIST" },
			],
		}),

		deleteService: builder.mutation<void, string>({
			query: (id) => ({ url: `/services/${id}`, method: "DELETE" }),
			invalidatesTags: [{ type: "Services", id: "LIST" }],
		}),
	}),
});

export const {
	useGetServicesQuery,
	useGetServiceByIdQuery,
	useCreateServiceMutation,
	useUpdateServiceMutation,
	useDeleteServiceMutation,
} = servicesApi;

const selectServicesResult = (result: ServicesListResult | undefined) => result;

export const selectServicesData = createSelector(
	[selectServicesResult],
	(result) => result?.data ?? [],
);

export const selectServicesMeta = createSelector(
	[selectServicesResult],
	(result) => result?.meta,
);
