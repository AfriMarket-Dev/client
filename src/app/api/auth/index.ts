import { apiSlice } from "@/app/api/api-entry";

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
					url: "/auth/sign-in/email",
					method: "POST",
					body: {
						email: args.email,
						password: args.password,
					},
				});

				if (result.error) {
					return { error: result.error };
				}

				const res = (result.meta as { response?: Response })?.response;
				const envelope = result.data as any;
				// api wraps responses in { success, data: { user, token } }
				const payload = envelope?.data ?? envelope;
				const token =
					res?.headers.get("set-auth-token") ??
					payload?.token ??
					payload?.session?.token ??
					"";

				return {
					data: {
						user: payload?.user ?? payload,
						token: token ?? "",
					},
				};
			},
			invalidatesTags: ["Session"],
		}),

		signUp: builder.mutation<AuthResponse, SignUpRequest>({
			queryFn: async (args, _api, _extraOptions, baseQuery) => {
				const result = await baseQuery({
					url: "/auth/sign-up/email",
					method: "POST",
					body: args,
				});

				if (result.error) {
					return { error: result.error };
				}

				const res = (result.meta as { response?: Response })?.response;
				const envelope = result.data as any;
				const payload = envelope?.data ?? envelope;
				const token =
					res?.headers.get("set-auth-token") ??
					payload?.token ??
					payload?.session?.token ??
					"";

				return {
					data: {
						user: payload?.user ?? payload,
						token: token ?? "",
					},
				};
			},
		}),

		getSession: builder.query<any, void>({
			query: () => "/auth/get-session",
			providesTags: ["Session"],
		}),

		signOut: builder.mutation<void, void>({
			query: () => ({
				url: "/auth/sign-out",
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
