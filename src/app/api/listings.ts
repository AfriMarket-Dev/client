import { apiSlice } from "@/app/api/apiEntry";
import type { ApiResponse } from "@/app/api/types";

export interface ListingCategoryRef {
  id: string;
  name: string;
  description?: string;
}

export interface CompanyRef {
  id: string;
  name: string;
  slug: string;
  district?: string;
  isVerified?: boolean;
  type?: string; 
}

export interface ListingVariantRef {
  id: string;
  name: string;
  price: number;
  stock: number;
  unit?: string;
  images?: string[];
}

export interface Listing {
  id: string;
  name: string;
  description?: string;
  type: "PRODUCT" | "SERVICE";
  priceType: string;
  isActive: boolean;
  views: number;
  category: ListingCategoryRef;
  company: CompanyRef;
  variants?: ListingVariantRef[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ListingsQueryParams {
  page?: number;
  limit?: number;
  query?: string;
  categoryId?: string;
  companyId?: string;
  type?: "PRODUCT" | "SERVICE";
  district?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  companyType?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}

export interface ListingsListResult {
  data: Listing[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export interface CreateListingInput {
  name: string;
  description?: string;
  type: "PRODUCT" | "SERVICE";
  priceType?: "FIXED" | "NEGOTIABLE" | "STARTS_AT";
  price?: number;
  stock?: number;
  unit?: string;
  images?: string[];
  categoryId: string;
  companyId: string;
}

export interface CreateVariantInput {
  name: string;
  sku?: string;
  price: number;
  stock: number;
  unit?: string;
  images?: string[];
}

export const listingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getListings: builder.query<ListingsListResult, ListingsQueryParams | void>({
      query: (params = {}) => {
        const sp = new URLSearchParams();
        if (params?.page != null) sp.set("page", String(params.page));
        if (params?.limit != null) sp.set("limit", String(params.limit));
        if (params?.query) sp.set("query", params.query);
        if (params?.categoryId) sp.set("categoryId", params.categoryId);
        if (params?.companyId) sp.set("companyId", params.companyId);
        if (params?.type) sp.set("type", params.type);
        if (params?.district) sp.set("district", params.district);
        if (params?.minPrice != null) sp.set("minPrice", String(params.minPrice));
        if (params?.maxPrice != null) sp.set("maxPrice", String(params.maxPrice));
        if (params?.inStock != null) sp.set("inStock", String(params.inStock));
        if (params?.companyType) sp.set("companyType", params.companyType);
        if (params?.sortBy) sp.set("sortBy", params.sortBy);
        if (params?.sortOrder) sp.set("sortOrder", params.sortOrder);
        return `/listings?${sp.toString()}`;
      },
      transformResponse: (response: ApiResponse<Listing[]>) => {
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
      providesTags: ["Products"],
    }),

    getListingById: builder.query<Listing | null, string>({
      query: (id) => `/listings/${id}`,
      transformResponse: (response: ApiResponse<Listing>) => response.data ?? null,
      providesTags: (_result, _err, id) => [{ type: "Products", id }],
    }),

    createListing: builder.mutation<Listing, CreateListingInput>({
      query: (body) => ({
        url: "/listings",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),

    updateListing: builder.mutation<
      Listing,
      { id: string; data: Partial<CreateListingInput> }
    >({
      query: ({ id, data }) => ({
        url: `/listings/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _err, { id }) => [{ type: "Products", id }, "Products"],
    }),

    addVariant: builder.mutation<unknown, { listingId: string; data: CreateVariantInput }>({
      query: ({ listingId, data }) => ({
        url: `/listings/${listingId}/variants`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _err, { listingId }) => [
        { type: "Products", id: listingId },
        "Products",
      ],
    }),

    removeVariant: builder.mutation<void, string>({
      query: (variantId) => ({
        url: `/listings/variants/${variantId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetListingsQuery,
  useGetListingByIdQuery,
  useCreateListingMutation,
  useUpdateListingMutation,
  useAddVariantMutation,
  useRemoveVariantMutation,
} = listingsApi;
