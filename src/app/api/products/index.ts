import { apiSlice } from "@/app/api/apiEntry";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "inactive" | "pending-review";
  supplierId: string;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductResponse {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "inactive" | "pending-review";
  supplierId: string;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
  supplierId?: string;
}

export interface ProductsListResponse {
  data: ProductResponse[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all products with optional filters
    getProducts: builder.query<ProductsListResponse, ProductsQueryParams>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append("page", String(params.page));
        if (params.limit) queryParams.append("limit", String(params.limit));
        if (params.search) queryParams.append("search", params.search);
        if (params.category) queryParams.append("category", params.category);
        if (params.status) queryParams.append("status", params.status);
        if (params.supplierId)
          queryParams.append("supplierId", params.supplierId);

        return `/products?${queryParams.toString()}`;
      },
      providesTags: ["Products"],
    }),

    // Get single product by ID
    getProductById: builder.query<ProductResponse, string>({
      query: (id) => `/products/${id}`,
    //   providesTags: (result, error, id) => [{ type: "Products", id }],
    }),

    // Create new product
    createProduct: builder.mutation<ProductResponse, Partial<Product>>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),

    // Update product
    updateProduct: builder.mutation<
      ProductResponse,
      { id: string; body: Partial<Product> }
    >({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body,
      }),
    //   invalidatesTags: (result, error, { id }) => [
    //     { type: "Products", id },
    //     "Products",
    //   ],
    }),

    // Delete product
    deleteProduct: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/products/${id}`,
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
} = productsApi;
