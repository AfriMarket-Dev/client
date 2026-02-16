import { apiSlice } from "@/app/api/apiEntry";
import type { ApiResponse } from "@/app/api/types";

export interface ListingCategory {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ListingCategoriesListResult {
  data: ListingCategory[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export const listingCategoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getListingCategories: builder.query<
      ListingCategoriesListResult,
      { page?: number; limit?: number } | void
    >({
      query: (params = {}) => {
        const sp = new URLSearchParams();
        if (params?.page != null) sp.set("page", String(params.page));
        if (params?.limit != null) sp.set("limit", String(params.limit));
        return `/listing-categories?${sp.toString()}`;
      },
      transformResponse: (response: ApiResponse<ListingCategory[]>) => {
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

    getListingCategoryById: builder.query<ListingCategory | null, string>({
      query: (id) => `/listing-categories/${id}`,
      transformResponse: (response: ApiResponse<ListingCategory>) =>
        response.data ?? null,
      providesTags: (_result, _err, id) => [{ type: "Categories", id }],
    }),
  }),
});

export const {
  useGetListingCategoriesQuery,
  useGetListingCategoryByIdQuery,
} = listingCategoriesApi;
