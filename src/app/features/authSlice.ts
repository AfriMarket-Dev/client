import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id?: string;
    email?: string;
    name?: string;
    role?: string;
  } | null;
  tokens: {
    access?: string;
    refresh?: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  tokens: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login
    setUser: (state, action: PayloadAction<AuthState["user"]>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },

    // Set tokens
    setTokens: (state, action: PayloadAction<AuthState["tokens"]>) => {
      state.tokens = action.payload;
    },

    // Set loading
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Logout
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.tokens = null;
      state.error = null;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setUser, setTokens, setLoading, setError, logout, clearError } =
  authSlice.actions;

export default authSlice.reducer;
