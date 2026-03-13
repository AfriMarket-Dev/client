import { createFileRoute } from "@tanstack/react-router";
import { DashboardSwitcher } from "@/features/dashboard/components/dashboard-switcher";
import { companiesApi } from "@/services/api/companies";
import { companyCategoriesApi } from "@/services/api/company-categories";
import { productsApi } from "@/services/api/products";
import { servicesApi } from "@/services/api/services";
import { wishlistApi } from "@/services/api/wishlist";
import { messagesApi } from "@/services/api/messages";
import { store } from "@/store";
import { loaderLogger } from "@/lib/logger";
import { getFreshOrCached } from "@/services/api/utils";
import type { 
	Company, 
	ProductCategory, 
	Product, 
	Service, 
	WishlistItem, 
	ConversationPartner 
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
		const isProvider = ["provider", "admin", "agent"].includes(user?.role || "");

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
					companiesApi.endpoints.getMyCompany
				);

				const [catRes, prodRes, servRes] = await Promise.all([
					getFreshOrCached<any>(store, companyCategoriesApi.endpoints.getCompanyCategories, { limit: 100 }),
					data.company?.id 
						? getFreshOrCached<any>(store, productsApi.endpoints.getProducts, { companyId: data.company.id, limit: 100 })
						: Promise.resolve({ data: [] }),
					data.company?.id
						? getFreshOrCached<any>(store, servicesApi.endpoints.getServices, { companyId: data.company.id, limit: 100 })
						: Promise.resolve({ data: [] })
				]);

				data.categories = catRes.data || catRes || [];
				data.products = prodRes.data || prodRes || [];
				data.services = servRes.data || servRes || [];
			} else {
				const [wishRes, convRes] = await Promise.all([
					getFreshOrCached<any>(store, wishlistApi.endpoints.getWishlist),
					getFreshOrCached<any>(store, messagesApi.endpoints.getConversations)
				]);

				data.wishlist = wishRes.data || wishRes || [];
				data.conversations = convRes.data || convRes || [];
			}
		} catch (err) {
			loaderLogger.error(err, "Dashboard SWR Loader encountered an error");
		}

		return data;
	},
	component: DashboardSwitcher,
});
