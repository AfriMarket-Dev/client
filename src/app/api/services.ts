import { apiSlice } from "@/app/api/api-entry";
import type { ApiResponse } from "@/app/api/types";
import { unwrapListResponse, unwrapResponse } from "@/app/api/types";
import type { CompanyRef } from "@/types/api";
import { createSelector } from "@reduxjs/toolkit";

export interface ServiceCategoryRef {
  id: string;
  name: string;
  description?: string;
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  priceType: "FIXED" | "NEGOTIABLE" | "STARTS_AT";
  price?: number;
  duration?: string;
  isActive: boolean;
  isFeatured?: boolean;
  discount?: number;
  views: number;
  images?: string[];
  category: ServiceCategoryRef;
  company: CompanyRef;
  totalRequests?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServicesQueryParams {
  page?: number;
  limit?: number;
  query?: string;
  categoryId?: string;
  companyId?: string;
  district?: string;
  minPrice?: number;
  maxPrice?: number;
  companyType?: string;
  isFeatured?: boolean;
  hasDiscount?: boolean;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}

export interface ServicesListResult {
  data: Service[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export interface CreateServiceInput {
  name: string;
  description?: string;
  price?: number;
  priceType?: "FIXED" | "NEGOTIABLE" | "STARTS_AT";
  duration?: string;
  discount?: number;
  images?: string[];
  categoryId: string;
  companyId: string;
}

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
