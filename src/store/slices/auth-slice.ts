import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, AuthUser } from "@/types";

const initialState: AuthState = {
	isAuthenticated: false,
	user: null,
	token: null,
	loading: false,
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<AuthUser | null>) => {
			state.user = action.payload;
			state.isAuthenticated = Boolean(action.payload && state.token);
		},
		setToken: (state, action: PayloadAction<string | null>) => {
			state.token = action.payload;
			state.isAuthenticated = Boolean(state.user && action.payload);
		},
		setSession: (
			state,
			action: PayloadAction<{ user: AuthUser | null; token: string | null }>,
		) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
			state.isAuthenticated = Boolean(
				action.payload.user && action.payload.token,
			);
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;
			state.error = null;
		},
		setNeedsOnboarding: (state, action: PayloadAction<boolean>) => {
			if (state.user) {
				state.user.needsOnboarding = action.payload;
			}
		},
		clearError: (state) => {
			state.error = null;
		},
	},
});

export const {
	setUser,
	setToken,
	setSession,
	setLoading,
	setError,
	logout,
	setNeedsOnboarding,
	clearError,
} = authSlice.actions;

export default authSlice.reducer;
