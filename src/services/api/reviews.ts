import { apiSlice } from "@/services/api/api-entry";
import type {
	ApiResponse,
	CreateReviewInput,
	Review,
	ReviewsResponse,
} from "@/types";

export const reviewsApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createReview: builder.mutation<Review, CreateReviewInput>({
			query: (body) => ({
				url: "/reviews",
				method: "POST",
				body,
			}),
		}),
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
		}),
	}),
});

export const { useCreateReviewMutation, useGetReviewsQuery } = reviewsApi;
