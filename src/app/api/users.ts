import { apiSlice } from "@/app/api/apiEntry";
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
        (response as ApiResponse<UserProfile>)?.data ?? (response as unknown as UserProfile),
      providesTags: ["Users", "Session"],
    }),

    updateProfile: builder.mutation<UserProfile, { id: string; data: UpdateProfileInput }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Users", "Session"],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = usersApi;
