import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { type RootState } from "@/app/store";
import { logout } from "@/app/features/auth-slice";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
const BASE_URL = `${API_BASE.replace(/\/$/, "")}/api`;

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const state = (getState as () => RootState)();
    const token = state.auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
  credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Users",
    "Categories",
    "Products",
    "Services",
    "Suppliers",
    "Customers",
    "Orders",
    "Dashboard",
    "Session",
    "Wishlist",
    "Messages",
  ],
  endpoints: () => ({}),
});
