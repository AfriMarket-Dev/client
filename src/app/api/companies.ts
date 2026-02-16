import { apiSlice } from "@/app/api/apiEntry";
import type { ApiResponse } from "@/app/api/types";

export interface CompanyCategoryRef {
  id: string;
  name: string;
  description?: string;
}

export interface Company {
  id: string;
  name: string;
  slug: string;
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
}

export interface CompaniesListResult {
  data: Company[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export const companiesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query<CompaniesListResult, CompaniesQueryParams | void>({
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
      providesTags: ["Suppliers"],
    }),

    getCompanyById: builder.query<Company | null, string>({
      query: (id) => `/companies/${id}`,
      transformResponse: (response: ApiResponse<Company>) => response.data ?? null,
      providesTags: (_result, _err, id) => [{ type: "Suppliers", id }],
    }),

    getMyCompany: builder.query<Company | null, void>({
      query: () => "/companies/my",
      transformResponse: (response: ApiResponse<Company>) => response.data ?? null,
      providesTags: ["Suppliers"],
    }),
  }),
});

export const {
  useGetCompaniesQuery,
  useGetCompanyByIdQuery,
  useGetMyCompanyQuery,
} = companiesApi;
