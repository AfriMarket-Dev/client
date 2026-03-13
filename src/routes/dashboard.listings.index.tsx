import { createFileRoute } from "@tanstack/react-router";
import ProviderDashboard from "@/features/dashboard/components/provider-dashboard";
import { companiesApi } from "@/services/api/companies";
import { companyCategoriesApi } from "@/services/api/company-categories";
import { productsApi } from "@/services/api/products";
import { servicesApi } from "@/services/api/services";
import { store } from "@/store";
import type { Company, ProductCategory, Product, Service } from "@/types";

export interface ListingsLoaderData {
	company: Company | null;
	categories: ProductCategory[];
	products: Product[];
	services: Service[];
}

export const Route = createFileRoute("/dashboard/listings/")({
	loader: async (): Promise<ListingsLoaderData> => {
		// 1. Fetch Company
		let company: Company | null = null;
		try {
			company = await store.dispatch(
				companiesApi.endpoints.getMyCompany.initiate(undefined, { forceRefetch: true }),
			).unwrap();
		} catch (err) {
			console.error("Listings Loader: Company fetch failed", err);
		}

		// 2. Fetch dependencies
		const [categoriesRes, productsRes, servicesRes] = await Promise.all([
			store.dispatch(companyCategoriesApi.endpoints.getCompanyCategories.initiate({ limit: 100 }, { forceRefetch: true })),
			company?.id
				? store.dispatch(productsApi.endpoints.getProducts.initiate({ companyId: company.id, limit: 100 }, { forceRefetch: true }))
				: Promise.resolve({ data: { data: [] } }),
			company?.id
				? store.dispatch(servicesApi.endpoints.getServices.initiate({ companyId: company.id, limit: 100 }, { forceRefetch: true }))
				: Promise.resolve({ data: { data: [] } })
		]);

		return {
			company,
			categories: (categoriesRes as any).data?.data || (categoriesRes as any).data || [],
			products: (productsRes as any).data?.data || (productsRes as any).data || [],
			services: (servicesRes as any).data?.data || (servicesRes as any).data || [],
		};
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
