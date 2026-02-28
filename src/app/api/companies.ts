import { apiSlice } from "@/app/api/api-entry";
import type { ApiResponse } from "@/app/api/types";
import { createSelector } from "@reduxjs/toolkit";

export interface CompanyCategoryRef {
  id: string;
  name: string;
  description?: string;
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  ownerId?: string;
  user?: { id: string; name?: string; email?: string };
  description?: string;
  logoUrl?: string;
  isActive: boolean;
  isVerified: boolean;
  averageRating: number;
  reviewCount: number;
  visits: number;
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  type: string;
  category: CompanyCategoryRef;
  phone?: string;
  email?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CompaniesQueryParams {
  page?: number;
  limit?: number;
  query?: string;
  categoryId?: string;
  district?: string;
  type?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  minRating?: number;
  isVerified?: boolean;
}

export interface CompaniesListResult {
  data: Company[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export interface CreateCompanyInput {
  name: string;
  description?: string;
  type?: string;
  categoryId?: string;
  province?: string;
  district?: string;
  sector?: string;
  cell?: string;
  village?: string;
  isVerified?: boolean;
  isActive?: boolean;
}

export const companiesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query<CompaniesListResult, CompaniesQueryParams>({
      query: (params = {}) => {
        const sp = new URLSearchParams();
        if (params?.page != null) sp.set("page", String(params.page));
        if (params?.limit != null) sp.set("limit", String(params.limit));
        if (params?.query) sp.set("query", params.query);
        if (params?.categoryId) sp.set("categoryId", params.categoryId);
        if (params?.district) sp.set("district", params.district);
        if (params?.type) sp.set("type", params.type);
        if (params?.sortBy) sp.set("sortBy", params.sortBy);
        if (params?.sortOrder) sp.set("sortOrder", params.sortOrder);
        if (params?.minRating) sp.set("minRating", String(params.minRating));
        if (params?.isVerified) sp.set("isVerified", String(true));
        return `/companies?${sp.toString()}`;
      },
      transformResponse: (response: ApiResponse<Company[]>) => {
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
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Suppliers" as const,
                id,
              })),
              { type: "Suppliers", id: "LIST" },
            ]
          : [{ type: "Suppliers", id: "LIST" }],
    }),

    getCompanyById: builder.query<Company | null, string>({
      query: (id) => `/companies/${id}`,
      transformResponse: (response: ApiResponse<Company>) =>
        response.data ?? null,
      providesTags: (_result, _err, id) => [{ type: "Suppliers", id }],
    }),

    getMyCompany: builder.query<Company | null, void>({
      query: () => "/companies/my",
      transformResponse: (response: ApiResponse<Company>) =>
        response.data ?? null,
      providesTags: ["Suppliers"],
    }),

    createCompany: builder.mutation<Company, CreateCompanyInput>({
      query: (body) => ({
        url: "/companies",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Suppliers", id: "LIST" }],
    }),

    updateCompany: builder.mutation<
      Company,
      { id: string; data: Partial<CreateCompanyInput> }
    >({
      query: ({ id, data }) => ({
        url: `/companies/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _err, { id }) => [
        { type: "Suppliers", id },
        { type: "Suppliers", id: "LIST" },
      ],
    }),

    deleteCompany: builder.mutation<void, string>({
      query: (id) => ({
        url: `/companies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Suppliers", id: "LIST" }],
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
} = companiesApi;

const selectCompaniesResult = (result: CompaniesListResult | undefined) =>
  result;

export const selectCompaniesData = createSelector(
  [selectCompaniesResult],
  (result) => result?.data ?? [],
);

export const selectCompaniesMeta = createSelector(
  [selectCompaniesResult],
  (result) => result?.meta,
);
