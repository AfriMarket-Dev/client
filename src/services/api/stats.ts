import { apiSlice } from "@/services/api/api-entry";
import { unwrapResponse } from "@/services/api/utils";
import type {
	AdminDashboardStats,
	ApiResponse,
	MarketplaceStats,
	ProviderStats,
} from "@/types";

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
