import { apiSlice } from "@/app/api/apiEntry";

export interface SignInRequest {
  email: string;
  password?: string;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password?: string;
  role: "buyer" | "provider";
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  user: SessionUser;
  token: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthResponse, SignInRequest>({
      queryFn: async (args, _api, _extraOptions, baseQuery) => {
        const result = await baseQuery({
          url: "/api/auth/sign-in/email",
          method: "POST",
          body: {
            email: args.email,
            password: args.password,
          },
        });

        if (result.error) {
          return { error: result.error };
        }

        const token = (
          result.meta as { response: Response }
        )?.response?.headers.get("set-auth-token");
        const data = result.data as any;

        return {
          data: {
            user: data.user,
            token: token || "",
          },
        };
      },
      invalidatesTags: ["Session"],
    }),

    signUp: builder.mutation<AuthResponse, SignUpRequest>({
      queryFn: async (args, _api, _extraOptions, baseQuery) => {
        const result = await baseQuery({
          url: "/api/auth/sign-up/email",
          method: "POST",
          body: args,
        });

        if (result.error) {
          return { error: result.error };
        }

        const token = (
          result.meta as { response: Response }
        )?.response?.headers.get("set-auth-token");
        const data = result.data as any;

        return {
          data: {
            user: data.user,
            token: token || "",
          },
        };
      },
    }),

    getSession: builder.query<any, void>({
      query: () => "/api/auth/get-session",
      providesTags: ["Session"],
    }),

    signOut: builder.mutation<void, void>({
      query: () => ({
        url: "/api/auth/sign-out",
        method: "POST",
      }),
      invalidatesTags: ["Session"],
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useGetSessionQuery,
  useSignOutMutation,
} = authApi;
