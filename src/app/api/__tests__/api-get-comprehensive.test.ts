import { describe, expect, it } from "vitest";
import { productsApi } from "@/app/api/products";
import { servicesApi } from "@/app/api/services";
import { companiesApi } from "@/app/api/companies";
import { messagesApi } from "@/app/api/messages";
import { wishlistApi } from "@/app/api/wishlist";
import { statsApi } from "@/app/api/stats";
import { productCategoriesApi } from "@/app/api/product-categories";
import {
  createApiTestStore,
  installFetchMock,
  jsonResponse,
} from "./test-utils";

describe("comprehensive api get requests", () => {
  it("verifies products api complex filtering parameters", async () => {
    const store = createApiTestStore();
    const { requests } = installFetchMock(() =>
      jsonResponse({
        data: [],
        meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
      }),
    );

    await store
      .dispatch(
        productsApi.endpoints.getProducts.initiate({
          query: "test",
          categoryId: "cat1",
          companyId: "comp1",
          minPrice: 100,
          maxPrice: 1000,
          inStock: true,
          isFeatured: true,
          hasDiscount: true,
          sortBy: "price",
          sortOrder: "ASC",
        }),
      )
      .unwrap();

    const req = requests[0];
    expect(req.path).toContain("/api/products?");
    expect(req.path).toContain("query=test");
    expect(req.path).toContain("categoryId=cat1");
    expect(req.path).toContain("companyId=comp1");
    expect(req.path).toContain("minPrice=100");
    expect(req.path).toContain("maxPrice=1000");
    expect(req.path).toContain("inStock=true");
    expect(req.path).toContain("isFeatured=true");
    expect(req.path).toContain("hasDiscount=true");
    expect(req.path).toContain("sortBy=price");
    expect(req.path).toContain("sortOrder=ASC");
  });

  it("verifies services api filtering parameters", async () => {
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
          isFeatured: true,
        }),
      )
      .unwrap();

    const req = requests[0];
    expect(req.path).toContain("/api/services?");
    expect(req.path).toContain("query=plumbing");
    expect(req.path).toContain("companyType=PRO");
    expect(req.path).toContain("isFeatured=true");
  });

  it("verifies companies api district and rating filters", async () => {
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
          district: "Gasabo",
          minRating: 4,
          isVerified: true,
        }),
      )
      .unwrap();

    const req = requests[0];
    expect(req.path).toContain("/api/companies?");
    expect(req.path).toContain("district=Gasabo");
    expect(req.path).toContain("minRating=4");
    expect(req.path).toContain("isVerified=true");
  });

  it("verifies messages api history and normalization", async () => {
    const store = createApiTestStore();
    installFetchMock(() =>
      jsonResponse({
        data: [
          {
            id: "m1",
            content: "hi",
            sender: { id: "u1" },
            receiver: { id: "u2" },
            createdAt: "2026-01-01",
          },
        ],
        meta: { total: 1, page: 1, limit: 20, totalPages: 1 },
      }),
    );

    const result = await store
      .dispatch(
        messagesApi.endpoints.getChatHistory.initiate({
          partnerId: "u2",
          page: 1,
          limit: 20,
        }),
      )
      .unwrap();

    expect(result.items).toHaveLength(1);
    expect(result.total).toBe(1);
    expect(result.items[0].content).toBe("hi");
  });

  it("verifies wishlist api combined list transformation", async () => {
    const store = createApiTestStore();
    installFetchMock(() =>
      jsonResponse({
        data: {
          products: [{ id: "p1", name: "P1", createdAt: "2026-01-02" }],
          services: [{ id: "s1", name: "S1", createdAt: "2026-01-01" }],
        },
      }),
    );

    const result = await store
      .dispatch(wishlistApi.endpoints.getWishlist.initiate())
      .unwrap();

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe("p1"); // sorted by date desc
    expect(result[0].type).toBe("product");
    expect(result[1].id).toBe("s1");
    expect(result[1].type).toBe("service");
  });

  it("verifies stats api response and defaults", async () => {
    const store = createApiTestStore();
    installFetchMock(() =>
      jsonResponse({
        data: {
          verifiedSuppliers: 10,
          productsListed: 100,
        },
      }),
    );

    const result = await store
      .dispatch(statsApi.endpoints.getMarketplaceStats.initiate())
      .unwrap();

    expect(result.verifiedSuppliers).toBe(10);
    expect(result.productsListed).toBe(100);
    expect(result.districtsCovered).toBe(0); // default fallback
  });

  it("verifies product categories pagination", async () => {
    const store = createApiTestStore();
    const { requests } = installFetchMock(() =>
      jsonResponse({
        data: [],
        meta: { total: 0, page: 1, limit: 50, totalPages: 0 },
      }),
    );

    await store
      .dispatch(
        productCategoriesApi.endpoints.getProductCategories.initiate({
          page: 1,
          limit: 50,
        }),
      )
      .unwrap();

    expect(requests[0].path).toBe("/api/product-categories?page=1&limit=50");
  });
});
