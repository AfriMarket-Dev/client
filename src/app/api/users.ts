import { apiSlice } from "@/app/api/api-entry";
import type { ApiResponse } from "@/app/api/types";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  emailVerified?: boolean;
  phoneNumber?: string;
  company?: { id: string; name: string };
}

export interface UpdateProfileInput {
  name?: string;
  phoneNumber?: string;
  image?: string;
}

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<UserProfile, void>({
      query: () => "/users/me/profile",
      transformResponse: (response: ApiResponse<UserProfile>) =>
        (response as ApiResponse<UserProfile>)?.data ??
        (response as unknown as UserProfile),
      providesTags: ["Users", "Session"],
    }),

    updateProfile: builder.mutation<
      UserProfile,
      { id: string; data: UpdateProfileInput }
    >({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Users", "Session"],
    }),
    getUsers: builder.query<
      { data: UserProfile[]; meta: any },
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 20 }) => `/users?page=${page}&limit=${limit}`,
      providesTags: ["Users"],
    }),
    getUserById: builder.query<UserProfile, string>({
      query: (id) => `/users/${id}`,
      providesTags: (_r, _e, id) => [{ type: "Users", id }],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation,
} = usersApi;
