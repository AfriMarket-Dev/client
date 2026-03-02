import { createFileRoute } from "@tanstack/react-router";
import MarketplacePage from "@/pages/marketplace/marketplace-page";
import { store } from "@/app/store";
import { productsApi } from "@/app/api/products";
import { servicesApi } from "@/app/api/services";

type MarketplaceSearch = {
	category?: string;
	type?: "PRODUCT" | "SERVICE";
};

export const Route = createFileRoute("/_main/marketplace")({
	component: MarketplacePage,
	validateSearch: (search: Record<string, unknown>): MarketplaceSearch => {
		const rawType = search.type;
		const type =
			rawType === "PRODUCT" || rawType === "SERVICE" ? rawType : undefined;

		return {
			category: (search.category as string) || undefined,
			type,
		};
	},
	loaderDeps: ({ search }) => search,
	loader: ({ deps }) => {
		const params = { page: 1, limit: 30, categoryId: deps.category };

		if (deps.type === "PRODUCT") {
			store.dispatch(productsApi.endpoints.getProducts.initiate(params));
			return;
		}

		if (deps.type === "SERVICE") {
			store.dispatch(servicesApi.endpoints.getServices.initiate(params));
			return;
		}

		store.dispatch(productsApi.endpoints.getProducts.initiate(params));
		store.dispatch(servicesApi.endpoints.getServices.initiate(params));
	},
});
