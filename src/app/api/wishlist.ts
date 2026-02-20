import { apiSlice } from "@/app/api/api-entry";
import type { ApiResponse } from "@/app/api/types";
import type { Listing } from "@/app/api/listings";

export const wishlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query<Listing[], void>({
      query: () => "/interactions/wishlist",
      transformResponse: (response: ApiResponse<Listing[]>) =>
        Array.isArray(response?.data) ? response.data : (response as unknown as Listing[]) ?? [],
      providesTags: ["Wishlist"],
    }),

    addToWishlist: builder.mutation<unknown, string>({
      query: (listingId) => ({
        url: "/interactions/wishlist",
        method: "POST",
        body: { listingId },
      }),
      invalidatesTags: ["Wishlist"],
    }),

    removeFromWishlist: builder.mutation<void, string>({
      query: (listingId) => ({
        url: `/interactions/wishlist/${listingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;
