import { createFileRoute, redirect } from "@tanstack/react-router";
import ProviderDashboard from "@/features/dashboard/components/provider-dashboard";
import { companiesApi } from "@/services/api/companies";
import { companyCategoriesApi } from "@/services/api/company-categories";
import {
	type NormalizedProductsResult,
	productsApi,
} from "@/services/api/products";
import {
	type NormalizedServicesResult,
	servicesApi,
} from "@/services/api/services";
import { getFreshOrCached } from "@/services/api/utils";
import { ROUTES } from "@/shared/constants/routes";
import { store } from "@/store";
import type {
	Company,
	CompanyCategoriesListResult,
	Product,
	ProductCategory,
	Service,
} from "@/types";

export interface ListingsLoaderData {
	company: Company | null;
	categories: ProductCategory[];
	products: Product[];
	services: Service[];
}

export const Route = createFileRoute("/dashboard/listings/")({
	loader: async (): Promise<ListingsLoaderData> => {
		try {
			const company = await store
				.dispatch(
					companiesApi.endpoints.getMyCompany.initiate(undefined, {
						forceRefetch: true,
					}),
				)
				.unwrap();

			const [categoriesRes, productsRes, servicesRes] = await Promise.all([
				getFreshOrCached<CompanyCategoriesListResult>(
					store,
					companyCategoriesApi.endpoints.getCompanyCategories,
					{ limit: 100 },
				),
				company?.id
					? getFreshOrCached<NormalizedProductsResult>(
							store,
							productsApi.endpoints.getProducts,
							{ companyId: company.id, limit: 100 },
						)
					: Promise.resolve<NormalizedProductsResult>({
							data: [],
							meta: { total: 0, page: 1, limit: 100, totalPages: 0 },
							byId: {},
						}),
				company?.id
					? getFreshOrCached<NormalizedServicesResult>(
							store,
							servicesApi.endpoints.getServices,
							{ companyId: company.id, limit: 100 },
						)
					: Promise.resolve<NormalizedServicesResult>({
							data: [],
							meta: { total: 0, page: 1, limit: 100, totalPages: 0 },
							byId: {},
						}),
			]);

			return {
				company,
				categories: categoriesRes.data,
				products: productsRes.data,
				services: servicesRes.data,
			};
		} catch (err) {
			console.error("Listings Loader failed", err);
			if (!store.getState().auth.isAuthenticated) {
				throw redirect({ to: ROUTES.AUTH.SIGNIN });
			}
			throw err;
		}
	},
	component: () => {
		const data = Route.useLoaderData();
		return (
			<ProviderDashboard
				company={data.company ?? undefined}
				categories={data.categories}
				products={data.products}
				services={data.services}
			/>
		);
	},
});
