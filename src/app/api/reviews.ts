import { apiSlice } from "@/app/api/api-entry";

export interface CreateReviewInput {
  rating: number;
  comment?: string;
  productId?: string;
  serviceId?: string;
  companyId?: string;
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  productId?: string;
  serviceId?: string;
  companyId?: string;
  createdAt?: string;
}

export const reviewsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation<Review, CreateReviewInput>({
      query: (body) => ({
        url: "/reviews",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateReviewMutation } = reviewsApi;
