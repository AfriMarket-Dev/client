/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { apiUrl } from "@/utils";
import { RootState } from "@/app/store";
import { logout } from "@/app/features/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: apiUrl,
  prepareHeaders: (headers, { getState }) => {
    const state = (getState as () => RootState)();
    const accessToken = state.auth.tokens?.access;

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // @ts-nocheck
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorData = result.error.data as any;
    if (
      errorData?.detail === "Invalid token" ||
      errorData?.detail === "No token provided" ||
      errorData?.message === "Invalid token" ||
      errorData?.message === "No token provided"
    ) {
      api.dispatch(logout());
      window.location.href = "/login";
    }
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
  ],
  endpoints: () => ({}),
});
