import { apiSlice } from "@/app/api/api-entry";
import type { ApiResponse } from "@/app/api/types";
import { unwrapResponse } from "@/app/api/types";
import type { MarketplaceStats } from "@/types/api";
export type { MarketplaceStats } from "@/types/api";

export interface AdminDashboardStats {
  users: {
    total: number;
    active: number;
    byRole: Record<string, number>;
  };
  companies: {
    total: number;
    active: number;
    verified: number;
    byCategory: { name: string; count: number }[];
  };
  products: {
    total: number;
    active: number;
  };
  services: {
    total: number;
    active: number;
  };
  reviews: {
    total: number;
    /**
     * Average rating string formatted to 2 decimal places on the backend.
     */
    averageRating: string;
  };
}

export interface ProviderCompanyStats {
  id: string;
  name: string;
  overview: {
    visits: number;
    reviews: number;
    rating: number;
  };
  interactions: {
    views: number;
    whatsappClicks: number;
    callClicks: number;
    emailClicks: number;
    shares: number;
  };
  inventory: {
    products: {
      count: number;
      views: number;
    };
    services: {
      count: number;
      views: number;
    };
  };
}

export interface ProviderStats {
  overview: {
    totalViews: number;
    totalReviews: number;
    averageRating: number;
    companiesCount: number;
    totalInteractions: number;
  };
  companies: ProviderCompanyStats[];
}

export const statsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<AdminDashboardStats, void>({
      query: () => "/stats/dashboard",
      transformResponse: (response: ApiResponse<AdminDashboardStats>) =>
        unwrapResponse(response) as AdminDashboardStats,
      providesTags: ["Stats"],
    }),
    getProviderStats: builder.query<ProviderStats, void>({
      query: () => "/stats/provider",
      transformResponse: (response: ApiResponse<ProviderStats>) =>
        unwrapResponse(response) as ProviderStats,
      providesTags: ["Stats"],
    }),
    getMarketplaceStats: builder.query<MarketplaceStats, void>({
      query: () => "/stats/marketplace",
      transformResponse: (response: ApiResponse<MarketplaceStats>) => {
        const data = unwrapResponse(response);
        return {
          verifiedSuppliers: data?.verifiedSuppliers ?? 0,
          productsListed: data?.productsListed ?? 0,
          districtsCovered: data?.districtsCovered ?? 0,
          activeContractors: data?.activeContractors ?? 0,
        };
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
