import { apiSlice } from "@/app/api/api-entry";
import type { ApiResponse } from "@/app/api/types";
import { unwrapListResponse, unwrapResponse } from "@/app/api/types";
import type {
	CreateProductInput,
	CreateProductVariantInput,
	Product,
	ProductsListResult,
	ProductsQueryParams,
} from "@/types/api";
export type {
	CompanyRef,
	CreateProductInput,
	CreateProductVariantInput,
	Product,
	ProductCategoryRef,
	ProductVariant,
	ProductsListResult,
	ProductsQueryParams,
} from "@/types/api";

function buildProductsQuery(params: ProductsQueryParams): string {
	const sp = new URLSearchParams();
	if (params.page != null) sp.set("page", String(params.page));
	if (params.limit != null) sp.set("limit", String(params.limit));
	if (params.query) sp.set("query", params.query);
	if (params.categoryId) sp.set("categoryId", params.categoryId);
	if (params.companyId) sp.set("companyId", params.companyId);
	if (params.district) sp.set("district", params.district);
	if (params.minPrice != null) sp.set("minPrice", String(params.minPrice));
	if (params.maxPrice != null) sp.set("maxPrice", String(params.maxPrice));
	if (params.inStock != null) sp.set("inStock", String(params.inStock));
	if (params.companyType) sp.set("companyType", params.companyType);
	if (params.isFeatured != null)
		sp.set("isFeatured", String(params.isFeatured));
	if (params.hasDiscount != null)
		sp.set("hasDiscount", String(params.hasDiscount));
	if (params.sortBy) sp.set("sortBy", params.sortBy);
	if (params.sortOrder) sp.set("sortOrder", params.sortOrder);
	return `/products?${sp.toString()}`;
}

export const productsApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query<ProductsListResult, ProductsQueryParams>({
			query: (params = {}) => buildProductsQuery(params as ProductsQueryParams),
			transformResponse: (response: ApiResponse<Product[]>) =>
				unwrapListResponse(response) as ProductsListResult,
			providesTags: ["Products"],
		}),

		getProductById: builder.query<Product | null, string>({
			query: (id) => `/products/${id}`,
			transformResponse: (response: ApiResponse<Product>) =>
				unwrapResponse(response),
			providesTags: (_result, _err, id) => [{ type: "Products", id }],
		}),

		createProduct: builder.mutation<Product, CreateProductInput>({
			query: (body) => ({ url: "/products", method: "POST", body }),
			invalidatesTags: ["Products"],
		}),

		updateProduct: builder.mutation<
			Product,
			{ id: string; data: Partial<CreateProductInput> }
		>({
			query: ({ id, data }) => ({
				url: `/products/${id}`,
				method: "PATCH",
				body: data,
			}),
			invalidatesTags: (_result, _err, { id }) => [
				{ type: "Products", id },
				"Products",
			],
		}),

		deleteProduct: builder.mutation<void, string>({
			query: (id) => ({ url: `/products/${id}`, method: "DELETE" }),
			invalidatesTags: ["Products"],
		}),

		addProductVariant: builder.mutation<
			unknown,
			{ productId: string; data: CreateProductVariantInput }
		>({
			query: ({ productId, data }) => ({
				url: `/products/${productId}/variants`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: (_result, _err, { productId }) => [
				{ type: "Products", id: productId },
				"Products",
			],
		}),

		removeProductVariant: builder.mutation<void, string>({
			query: (variantId) => ({
				url: `/products/variants/${variantId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Products"],
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductByIdQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,
	useAddProductVariantMutation,
	useRemoveProductVariantMutation,
} = productsApi;
