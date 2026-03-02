import { describe, expect, it } from "vitest";

import { companiesApi } from "@/services/api/companies";
import { companyCategoriesApi } from "@/services/api/company-categories";
import { productCategoriesApi } from "@/services/api/product-categories";
import { productsApi } from "@/services/api/products";
import { serviceCategoriesApi } from "@/services/api/service-categories";
import { servicesApi } from "@/services/api/services";
import { statsApi } from "@/services/api/stats";

import {
	createApiTestStore,
	installFetchMock,
	jsonResponse,
} from "./test-utils";

function findRequest(
	requests: Array<{ path: string; method: string; jsonBody: unknown }>,
	path: string,
	method?: string,
) {
	return requests.find((request) => {
		const pathMatches = request.path === path;
		const methodMatches = method ? request.method === method : true;
		return pathMatches && methodMatches;
	});
}

describe("catalog api", () => {
	it("builds product query params and product mutation payloads", async () => {
		const store = createApiTestStore();
		const { requests } = installFetchMock((_req, idx) => {
			if (idx === 0) {
				return jsonResponse({
					data: [{ id: "p1" }],
					meta: { total: 1, page: 2, limit: 5, totalPages: 1 },
				});
			}
			return jsonResponse({ data: { id: "p1" } });
		});

		await store
			.dispatch(
				productsApi.endpoints.getProducts.initiate({
					page: 2,
					limit: 5,
					query: "cement",
					categoryId: "c1",
					companyId: "co1",
					district: "Gasabo",
					minPrice: 100,
					maxPrice: 500,
					inStock: true,
					companyType: "SUPPLIER",
					isFeatured: true,
					hasDiscount: false,
					sortBy: "createdAt",
					sortOrder: "DESC",
				}),
			)
			.unwrap();
		await store
			.dispatch(
				productsApi.endpoints.createProduct.initiate({
					name: "Cement",
					categoryId: "c1",
					companyId: "co1",
				}),
			)
			.unwrap();

		expect(requests[0].path).toContain("/api/products?");
		expect(requests[0].path).toContain("query=cement");
		expect(requests[0].path).toContain("hasDiscount=false");
		expect(requests[1].method).toBe("POST");
		expect(requests[1].path).toBe("/api/products");
		expect(requests[1].jsonBody).toEqual({
			name: "Cement",
			categoryId: "c1",
			companyId: "co1",
		});
	});

	it("builds companies params and company mutations", async () => {
		const store = createApiTestStore();
		const { requests } = installFetchMock(() =>
			jsonResponse({
				data: [],
				meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
			}),
		);

		await store
			.dispatch(
				companiesApi.endpoints.getCompanies.initiate({
					query: "builder",
					type: "CONTRACTOR",
					isVerified: false,
					minRating: 4,
					sortBy: "name",
					sortOrder: "ASC",
				}),
			)
			.unwrap();
		await store
			.dispatch(
				companiesApi.endpoints.createCompany.initiate({
					name: "Build Co",
					district: "Gasabo",
				}),
			)
			.unwrap();
		await store
			.dispatch(
				companiesApi.endpoints.updateCompany.initiate({
					id: "co1",
					data: { name: "Build Co Ltd" },
				}),
			)
			.unwrap();
		await store
			.dispatch(companiesApi.endpoints.deleteCompany.initiate("co1"))
			.unwrap();

		expect(requests[0].path).toContain("query=builder");
		expect(requests[0].path).not.toContain("isVerified=");
		expect(findRequest(requests, "/api/companies", "POST")).toBeTruthy();
		expect(findRequest(requests, "/api/companies/co1", "PATCH")).toBeTruthy();
		expect(findRequest(requests, "/api/companies/co1", "DELETE")).toBeTruthy();
	});

	it("builds services params and service mutations", async () => {
		const store = createApiTestStore();
		const { requests } = installFetchMock(() =>
			jsonResponse({
				data: [],
				meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
			}),
		);

		await store
			.dispatch(
				servicesApi.endpoints.getServices.initiate({
					query: "plumbing",
					companyType: "PRO",
					hasDiscount: true,
					isFeatured: false,
				}),
			)
			.unwrap();
		await store
			.dispatch(
				servicesApi.endpoints.createService.initiate({
					name: "Plumbing",
					categoryId: "sc1",
					companyId: "co1",
				}),
			)
			.unwrap();
		await store
			.dispatch(servicesApi.endpoints.deleteService.initiate("sv1"))
			.unwrap();

		expect(requests[0].path).toContain("query=plumbing");
		expect(requests[0].path).toContain("hasDiscount=true");
		expect(requests[0].path).toContain("isFeatured=false");
		expect(findRequest(requests, "/api/services", "POST")).toBeTruthy();
		expect(findRequest(requests, "/api/services/sv1", "DELETE")).toBeTruthy();
	});

	it("normalizes category list/get endpoints and product category mutations", async () => {
		const store = createApiTestStore();
		const { requests } = installFetchMock((_req, idx) => {
			if (idx <= 5) {
				return jsonResponse({
					data: [{ id: "c1", name: "Cat" }],
					meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
				});
			}
			return jsonResponse({ data: { id: "c1", name: "Cat" } });
		});

		await store
			.dispatch(
				productCategoriesApi.endpoints.getProductCategories.initiate({
					page: 1,
					limit: 10,
				}),
			)
			.unwrap();
		await store
			.dispatch(
				serviceCategoriesApi.endpoints.getServiceCategories.initiate({
					page: 1,
					limit: 10,
				}),
			)
			.unwrap();
		await store
			.dispatch(
				companyCategoriesApi.endpoints.getCompanyCategories.initiate({
					page: 1,
					limit: 10,
				}),
			)
			.unwrap();
		await store
			.dispatch(
				productCategoriesApi.endpoints.getProductCategoryById.initiate("c1"),
			)
			.unwrap();
		await store
			.dispatch(
				serviceCategoriesApi.endpoints.getServiceCategoryById.initiate("c1"),
			)
			.unwrap();
		await store
			.dispatch(
				companyCategoriesApi.endpoints.getCompanyCategoryById.initiate("c1"),
			)
			.unwrap();
		await store
			.dispatch(
				productCategoriesApi.endpoints.createProductCategory.initiate({
					name: "Cat",
				}),
			)
			.unwrap();
		await store
			.dispatch(
				productCategoriesApi.endpoints.updateProductCategory.initiate({
					id: "c1",
					data: { name: "Updated" },
				}),
			)
			.unwrap();
		await store
			.dispatch(
				productCategoriesApi.endpoints.deleteProductCategory.initiate("c1"),
			)
			.unwrap();

		expect(requests[0].path).toBe("/api/product-categories?page=1&limit=10");
		expect(requests[1].path).toBe("/api/service-categories?page=1&limit=10");
		expect(requests[2].path).toBe("/api/company-categories?page=1&limit=10");
		expect(
			findRequest(requests, "/api/product-categories", "POST"),
		).toBeTruthy();
		expect(
			findRequest(requests, "/api/product-categories/c1", "PATCH"),
		).toBeTruthy();
		expect(
			findRequest(requests, "/api/product-categories/c1", "DELETE"),
		).toBeTruthy();
	});

	it("uses fallback marketplace stats when response data is empty", async () => {
		const store = createApiTestStore();
		installFetchMock(() => jsonResponse({ success: true, data: null }));

		const stats = await store
			.dispatch(statsApi.endpoints.getMarketplaceStats.initiate())
			.unwrap();

		expect(stats).toEqual({
			verifiedSuppliers: 0,
			productsListed: 0,
			districtsCovered: 0,
			activeContractors: 0,
		});
	});
});
