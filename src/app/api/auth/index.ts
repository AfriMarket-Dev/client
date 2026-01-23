import { apiSlice } from "@/app/api/apiEntry";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  tokens: {
    access: string;
    refresh: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // Register
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    // Refresh token
    refreshToken: builder.mutation<{ access: string }, { refresh: string }>({
      query: (data) => ({
        url: "/auth/refresh",
        method: "POST",
        body: data,
      }),
    }),

    // Get current user
    getCurrentUser: builder.query<User, void>({
      query: () => "/auth/me",
      providesTags: ["Users"],
    }),

    // Logout
    logout: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
} = authApi;
