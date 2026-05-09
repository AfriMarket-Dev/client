import { createFileRoute, redirect } from "@tanstack/react-router";
import { DashboardSwitcher } from "@/features/dashboard/components/dashboard-switcher";
import { loaderLogger } from "@/lib/logger";
import { companiesApi } from "@/services/api/companies";
import { companyCategoriesApi } from "@/services/api/company-categories";
import { messagesApi } from "@/services/api/messages";
import {
	type NormalizedProductsResult,
	productsApi,
} from "@/services/api/products";
import {
	type NormalizedServicesResult,
	servicesApi,
} from "@/services/api/services";
import { getFreshOrCached } from "@/services/api/utils";
import { wishlistApi } from "@/services/api/wishlist";
import { ROUTES } from "@/shared/constants/routes";
import { store } from "@/store";
import type {
	Company,
	CompanyCategoriesListResult,
	ConversationPartner,
	Product,
	ProductCategory,
	Service,
	WishlistItem,
} from "@/types";

export interface DashboardLoaderData {
	isProvider: boolean;
	company: Company | null;
	categories: ProductCategory[];
	products: Product[];
	services: Service[];
	wishlist: WishlistItem[];
	conversations: ConversationPartner[];
}

export const Route = createFileRoute("/dashboard/")({
	loader: async (): Promise<DashboardLoaderData> => {
		const { user } = store.getState().auth;
		const isProvider = ["provider", "admin", "agent"].includes(
			user?.role || "",
		);

		loaderLogger.debug({ isProvider }, "Dashboard SWR Loader Initializing");

		const data: DashboardLoaderData = {
			isProvider,
			company: null,
			categories: [],
			products: [],
			services: [],
			wishlist: [],
			conversations: [],
		};

		try {
			if (isProvider) {
				// SWR fetch for company
				data.company = await getFreshOrCached<Company>(
					store,
					companiesApi.endpoints.getMyCompany,
				);

				const [catRes, prodRes, servRes] = await Promise.all([
					getFreshOrCached<CompanyCategoriesListResult>(
						store,
						companyCategoriesApi.endpoints.getCompanyCategories,
						{ limit: 100 },
					),
					data.company?.id
						? getFreshOrCached<NormalizedProductsResult>(
								store,
								productsApi.endpoints.getProducts,
								{
									companyId: data.company.id,
									limit: 100,
								},
							)
						: Promise.resolve<NormalizedProductsResult>({
								data: [],
								meta: { total: 0, page: 1, limit: 100, totalPages: 0 },
								byId: {},
							}),
					data.company?.id
						? getFreshOrCached<NormalizedServicesResult>(
								store,
								servicesApi.endpoints.getServices,
								{
									companyId: data.company.id,
									limit: 100,
								},
							)
						: Promise.resolve<NormalizedServicesResult>({
								data: [],
								meta: { total: 0, page: 1, limit: 100, totalPages: 0 },
								byId: {},
							}),
				]);

				data.categories = catRes.data;
				data.products = prodRes.data;
				data.services = servRes.data;
			} else {
				const [wishRes, convRes] = await Promise.all([
					getFreshOrCached<WishlistItem[]>(
						store,
						wishlistApi.endpoints.getWishlist,
					),
					getFreshOrCached<ConversationPartner[]>(
						store,
						messagesApi.endpoints.getConversations,
					),
				]);

				data.wishlist = wishRes;
				data.conversations = convRes;
			}
		} catch (err) {
			loaderLogger.error(err, "Dashboard SWR Loader encountered an error");
			if (!store.getState().auth.isAuthenticated) {
				throw redirect({ to: ROUTES.AUTH.SIGNIN });
			}
			throw err;
		}

		return data;
	},
	component: DashboardSwitcher,
});
