import { apiSlice } from "@/services/api/api-entry";
import { unwrapResponse } from "@/services/api/utils";
import type {
	ApiResponse,
	AuthResponse,
	SessionUser,
	SignInRequest,
	SignUpRequest,
} from "@/types";

function normalizeSessionUser(
	response: ApiResponse<SessionUser> | ApiResponse<{ user?: SessionUser }>,
): SessionUser | null {
	const payload = unwrapResponse<SessionUser | { user?: SessionUser }>(
		response,
	);

	if (!payload || typeof payload !== "object") {
		return null;
	}

	const maybeUser = "user" in payload ? payload.user : payload;

	if (
		!maybeUser ||
		typeof maybeUser !== "object" ||
		!("id" in maybeUser) ||
		!("email" in maybeUser) ||
		!("name" in maybeUser) ||
		!("role" in maybeUser)
	) {
		return null;
	}

	return {
		...maybeUser,
		needsOnboarding: Boolean(maybeUser.needsOnboarding ?? false),
	};
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
				const envelope = result.data as Record<string, unknown>;
				// biome-ignore lint/suspicious/noExplicitAny: complex backend envelope
				const payload = (envelope?.data ?? envelope) as any;

				const token =
					res?.headers.get("set-auth-token") ??
					payload?.token ??
					payload?.session?.token ??
					"";

				const user = (payload?.user ?? payload) as SessionUser;
				const needsOnboarding = Boolean(
					payload?.needsOnboarding ?? user?.needsOnboarding ?? false,
				);

				return {
					data: {
						user: { ...user, needsOnboarding },
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
				const envelope = result.data as Record<string, unknown>;
				// biome-ignore lint/suspicious/noExplicitAny: complex backend envelope
				const payload = (envelope?.data ?? envelope) as any;

				const token =
					res?.headers.get("set-auth-token") ??
					payload?.token ??
					payload?.session?.token ??
					"";

				const user = (payload?.user ?? payload) as SessionUser;
				const needsOnboarding = Boolean(
					payload?.needsOnboarding ?? user?.needsOnboarding ?? false,
				);

				return {
					data: {
						user: { ...user, needsOnboarding },
						token: token ?? "",
					},
				};
			},
		}),

		getSession: builder.query<SessionUser | null, void>({
			query: () => "/auth/get-session",
			transformResponse: (
				response:
					| ApiResponse<SessionUser>
					| ApiResponse<{ user?: SessionUser }>,
			) => normalizeSessionUser(response),
			providesTags: ["Session"],
		}),

		verifyEmail: builder.mutation<
			{ status?: string },
			{ token: string; callbackURL?: string }
		>({
			query: ({ token, callbackURL }) => ({
				url: `/auth/verify-email?token=${token}${callbackURL ? `&callbackURL=${encodeURIComponent(callbackURL)}` : ""}`,
				method: "GET",
			}),
		}),

		signOut: builder.mutation<void, void>({
			query: () => ({
				url: "/auth/sign-out",
				method: "POST",
			}),
			invalidatesTags: ["Session"],
		}),

		resendVerificationEmail: builder.mutation<void, { email: string }>({
			query: ({ email }) => ({
				url: "/auth/send-verification-email",
				method: "POST",
				body: { email },
			}),
		}),

		forgetPassword: builder.mutation<
			void,
			{ email: string; redirectTo: string }
		>({
			query: (body) => ({
				url: "/auth/request-password-reset",
				method: "POST",
				body,
			}),
		}),

		resetPassword: builder.mutation<
			void,
			{ token: string; newPassword: string }
		>({
			query: (body) => ({
				url: "/auth/reset-password",
				method: "POST",
				body,
			}),
		}),

		checkEmailUniqueness: builder.query<{ available: boolean }, string>({
			query: (email) => `/users/check-email?email=${encodeURIComponent(email)}`,
		}),

		checkRegistrationUniqueness: builder.query<{ available: boolean }, string>({
			query: (phoneNumber) =>
				`/users/check-registration?phoneNumber=${encodeURIComponent(phoneNumber)}`,
		}),
	}),
});

export const {
	useSignInMutation,
	useSignUpMutation,
	useGetSessionQuery,
	useSignOutMutation,
	useVerifyEmailMutation,
	useResendVerificationEmailMutation,
	useForgetPasswordMutation,
	useResetPasswordMutation,
	useCheckEmailUniquenessQuery,
	useLazyCheckEmailUniquenessQuery,
	useLazyCheckRegistrationUniquenessQuery,
} = authApi;
