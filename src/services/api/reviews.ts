import { apiSlice } from "@/services/api/api-entry";
import { unwrapResponse } from "@/services/api/utils";
import type {
	ApiResponse,
	CreateReviewInput,
	Review,
	ReviewsResponse,
} from "@/types";

type ReviewTag =
	| { type: "Reviews"; id: string }
	| { type: "Products"; id: string }
	| { type: "Services"; id: string }
	| { type: "Providers"; id: string }
	| { type: "Stats"; id: string };

function compactTags(tags: Array<ReviewTag | null>) {
	return tags.filter((tag): tag is ReviewTag => tag !== null);
}

export const reviewsApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getReviews: builder.query<
			ReviewsResponse,
			{
				productId?: string;
				serviceId?: string;
				companyId?: string;
				page?: number;
				limit?: number;
			}
		>({
			query: (params) => {
				const { productId, serviceId, companyId, ...pagination } = params;

				let url = "/reviews";
				if (productId) url = `/reviews/product/${productId}`;
				else if (serviceId) url = `/reviews/service/${serviceId}`;
				else if (companyId) url = `/reviews/company/${companyId}`;

				const sp = new URLSearchParams();
				if (pagination.page) sp.set("page", String(pagination.page));
				if (pagination.limit) sp.set("limit", String(pagination.limit));

				const queryString = sp.toString();
				return queryString ? `${url}?${queryString}` : url;
			},
			transformResponse: (response: ApiResponse<Review[]>): ReviewsResponse => {
				const data = Array.isArray(response.data) ? response.data : [];
				const meta = response.meta ?? {};
				return {
					items: data,
					total: meta.total ?? data.length,
					page: meta.page ?? 1,
					limit: meta.limit ?? 10,
					totalPages: meta.totalPages ?? 0,
				};
			},
			providesTags: (result, _error, { productId, serviceId, companyId }) =>
				compactTags([
					{ type: "Reviews", id: "LIST" },
					...(result?.items.map((i) => ({
						type: "Reviews" as const,
						id: i.id,
					})) || []),
					productId ? { type: "Products", id: productId } : null,
					serviceId ? { type: "Services", id: serviceId } : null,
					companyId ? { type: "Providers", id: companyId } : null,
				]),
		}),

		createReview: builder.mutation<Review, CreateReviewInput>({
			query: (body) => ({
				url: "/reviews",
				method: "POST",
				body,
			}),
			transformResponse: (response: ApiResponse<Review>) =>
				unwrapResponse<Review>(response) as Review,
			invalidatesTags: (_result, _error, { productId, serviceId, companyId }) =>
				compactTags([
					{ type: "Reviews", id: "LIST" },
					productId ? { type: "Products", id: productId } : null,
					serviceId ? { type: "Services", id: serviceId } : null,
					companyId ? { type: "Providers", id: companyId } : null,
					{ type: "Stats", id: "LIST" },
				]),
		}),

		updateReview: builder.mutation<
			Review,
			{
				id: string;
				rating?: number;
				comment?: string;
				targetId?: string;
				targetType?: "product" | "service" | "company";
			}
		>({
			query: ({ id, ...body }) => ({
				url: `/reviews/${id}`,
				method: "PATCH",
				body,
			}),
			transformResponse: (response: ApiResponse<Review>) =>
				unwrapResponse<Review>(response) as Review,
			invalidatesTags: (_result, _error, { id, targetId, targetType }) =>
				compactTags([
					{ type: "Reviews", id },
					{ type: "Reviews", id: "LIST" },
					targetId && targetType === "product"
						? { type: "Products", id: targetId }
						: null,
					targetId && targetType === "service"
						? { type: "Services", id: targetId }
						: null,
					targetId && targetType === "company"
						? { type: "Providers", id: targetId }
						: null,
				]),
		}),

		deleteReview: builder.mutation<
			{ success: boolean },
			{
				id: string;
				targetId?: string;
				targetType?: "product" | "service" | "company";
			}
		>({
			query: ({ id }) => ({
				url: `/reviews/${id}`,
				method: "DELETE",
			}),
			transformResponse: (
				response: ApiResponse<{ success: boolean }>,
			): { success: boolean } =>
				unwrapResponse<{ success: boolean }>(response) ?? { success: true },
			invalidatesTags: (_result, _error, { id, targetId, targetType }) =>
				compactTags([
					{ type: "Reviews", id },
					{ type: "Reviews", id: "LIST" },
					targetId && targetType === "product"
						? { type: "Products", id: targetId }
						: null,
					targetId && targetType === "service"
						? { type: "Services", id: targetId }
						: null,
					targetId && targetType === "company"
						? { type: "Providers", id: targetId }
						: null,
				]),
		}),
	}),
});

export const {
	useCreateReviewMutation,
	useGetReviewsQuery,
	useUpdateReviewMutation,
	useDeleteReviewMutation,
} = reviewsApi;
