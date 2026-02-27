import { apiSlice } from "@/app/api/api-entry";
import type { Listing } from "@/app/api/listings";

export const wishlistApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getWishlist: builder.query<Listing[], void>({
			query: () => "/wishlists",
			transformResponse: (response: any) => {
				const data = response?.data || response;
				const products = (data?.products || []).map((p: any) => ({
					...p,
					type: "product",
				}));
				const services = (data?.services || []).map((s: any) => ({
					...s,
					type: "service",
				}));
				// sort by newest if possible, else just merge
				return [...products, ...services].sort((a, b) => {
					return (
						new Date(b.createdAt || 0).getTime() -
						new Date(a.createdAt || 0).getTime()
					);
				});
			},
			providesTags: ["Wishlist"],
		}),

		addToWishlist: builder.mutation<
			unknown,
			{ id: string; type: "product" | "service" }
		>({
			query: ({ id, type }) => ({
				url: `/wishlists/${type}s`,
				method: "POST",
				body: type === "product" ? { [type + "Id"]: id } : { serviceId: id },
			}),
			invalidatesTags: ["Wishlist"],
		}),

		removeFromWishlist: builder.mutation<
			void,
			{ id: string; type: "product" | "service" }
		>({
			query: ({ id, type }) => ({
				url: `/wishlists/${type}s/${id}`,
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
