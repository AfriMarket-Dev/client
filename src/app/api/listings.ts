import { apiSlice } from "@/app/api/api-entry";
import type { ApiResponse } from "@/app/api/types";
import type {
  CreateListingInput,
  CreateVariantInput,
  Listing,
  ListingsListResult,
  ListingsQueryParams,
} from "@/types/api";
export type {
  CreateListingInput,
  CreateVariantInput,
  Listing,
  ListingCategoryRef,
  ListingVariantRef,
  ListingsListResult,
  ListingsQueryParams,
  CompanyRef,
} from "@/types/api";

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
        if (params?.minPrice != null)
          sp.set("minPrice", String(params.minPrice));
        if (params?.maxPrice != null)
          sp.set("maxPrice", String(params.maxPrice));
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
      providesTags: ["Listings"],
    }),

    getListingById: builder.query<Listing | null, string>({
      query: (id) => `/listings/${id}`,
      transformResponse: (response: ApiResponse<Listing>) =>
        response.data ?? null,
      providesTags: (_result, _err, id) => [{ type: "Listings", id }],
    }),

    createListing: builder.mutation<Listing, CreateListingInput>({
      query: (body) => ({
        url: "/listings",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Listings"],
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
      invalidatesTags: (_result, _err, { id }) => [
        { type: "Listings", id },
        "Listings",
      ],
    }),

    deleteListing: builder.mutation<void, string>({
      query: (id) => ({
        url: `/listings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Listings"],
    }),

    addVariant: builder.mutation<
      unknown,
      { listingId: string; data: CreateVariantInput }
    >({
      query: ({ listingId, data }) => ({
        url: `/listings/${listingId}/variants`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _err, { listingId }) => [
        { type: "Listings", id: listingId },
        "Listings",
      ],
    }),

    removeVariant: builder.mutation<void, string>({
      query: (variantId) => ({
        url: `/listings/variants/${variantId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Listings"],
    }),
  }),
});

export const {
  useGetListingsQuery,
  useGetListingByIdQuery,
  useCreateListingMutation,
  useUpdateListingMutation,
  useDeleteListingMutation,
  useAddVariantMutation,
  useRemoveVariantMutation,
} = listingsApi;
