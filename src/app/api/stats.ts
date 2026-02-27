import { apiSlice } from "@/app/api/api-entry";
import type { ApiResponse } from "@/app/api/types";
import { unwrapResponse } from "@/app/api/types";
import type { MarketplaceStats } from "@/types/api";
export type { MarketplaceStats } from "@/types/api";

export const statsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<any, void>({
      query: () => "/stats/dashboard",
      providesTags: ["Stats"],
    }),
    getProviderStats: builder.query<any, void>({
      query: () => "/stats/provider",
      providesTags: ["Stats"],
    }),
    getMarketplaceStats: builder.query<MarketplaceStats, void>({
      query: () => "/stats/marketplace",
      transformResponse: (response: ApiResponse<MarketplaceStats>) =>
        unwrapResponse(response) || {
          verifiedSuppliers: 0,
          productsListed: 0,
          districtsCovered: 0,
          activeContractors: 0,
        },
      providesTags: ["Stats"],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetProviderStatsQuery,
  useGetMarketplaceStatsQuery,
} = statsApi;
