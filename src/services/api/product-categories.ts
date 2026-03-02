import { apiSlice } from "@/services/api/api-entry";
import { unwrapListResponse, unwrapResponse } from "@/services/api/utils";
import type {
	ApiResponse,
	CreateProductCategoryInput,
	ProductCategoriesListResult,
	ProductCategory,
} from "@/types";

export const productCategoriesApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProductCategories: builder.query<
			ProductCategoriesListResult,
			{ page?: number; limit?: number }
		>({
			query: (params = {}) => {
				const sp = new URLSearchParams();
				if (params?.page != null) sp.set("page", String(params.page));
				if (params?.limit != null) sp.set("limit", String(params.limit));
				return `/product-categories?${sp.toString()}`;
			},
			transformResponse: (response: ApiResponse<ProductCategory[]>) =>
				unwrapListResponse(response) as ProductCategoriesListResult,
			providesTags: ["Categories"],
		}),

		getProductCategoryById: builder.query<ProductCategory | null, string>({
			query: (id) => `/product-categories/${id}`,
			transformResponse: (response: ApiResponse<ProductCategory>) =>
				unwrapResponse(response),
			providesTags: (_result, _err, id) => [{ type: "Categories", id }],
		}),

		createProductCategory: builder.mutation<
			ProductCategory,
			CreateProductCategoryInput
		>({
			query: (body) => ({
				url: "/product-categories",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Categories"],
		}),

		updateProductCategory: builder.mutation<
			ProductCategory,
			{ id: string; data: CreateProductCategoryInput }
		>({
			query: ({ id, data }) => ({
				url: `/product-categories/${id}`,
				method: "PATCH",
				body: data,
			}),
			invalidatesTags: (_result, _err, { id }) => [
				{ type: "Categories", id },
				"Categories",
			],
		}),

		deleteProductCategory: builder.mutation<void, string>({
			query: (id) => ({
				url: `/product-categories/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Categories"],
		}),
	}),
});

export const {
	useGetProductCategoriesQuery,
	useGetProductCategoryByIdQuery,
	useCreateProductCategoryMutation,
	useUpdateProductCategoryMutation,
	useDeleteProductCategoryMutation,
} = productCategoriesApi;
