import { apiSlice } from "@/app/api/apiEntry";

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  productCount: number;
  subcategories?: string[];
  status?: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryResponse {
  id: string;
  name: string;
  description: string;
  icon: string;
  productCount: number;
  subcategories?: string[];
  status?: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoriesListResponse {
  data: CategoryResponse[];
  total: number;
}

export const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all categories
    getCategories: builder.query<CategoriesListResponse, void>({
      query: () => "/categories",
      providesTags: ["Categories"],
    }),

    // Get single category by ID
    getCategoryById: builder.query<CategoryResponse, string>({
      query: (id) => `/categories/${id}`,
    //   providesTags: (result, error, id) => [{ type: "Categories", id }],
    }),

    // Create new category
    createCategory: builder.mutation<CategoryResponse, Partial<Category>>({
      query: (body) => ({
        url: "/categories",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Categories"],
    }),

    // Update category
    updateCategory: builder.mutation<
      CategoryResponse,
      { id: string; body: Partial<Category> }
    >({
      query: ({ id, body }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body,
      }),
    //   invalidatesTags: (result, error, { id }) => [
    //     { type: "Categories", id },
    //     "Categories",
    //   ],
    }),

    // Delete category
    deleteCategory: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
