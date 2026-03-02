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
			state.isAuthenticated = !!action.payload;
		},
		setToken: (state, action: PayloadAction<string | null>) => {
			state.token = action.payload;
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
		clearError: (state) => {
			state.error = null;
		},
	},
});

export const { setUser, setToken, setLoading, setError, logout, clearError } =
	authSlice.actions;

export default authSlice.reducer;
