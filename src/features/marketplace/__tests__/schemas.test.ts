import { describe, expect, it } from "vitest";
import {
	auctionSearchSchema,
	marketplaceSearchSchema,
	providersSearchSchema,
} from "../schemas";

describe("Marketplace Search Schemas", () => {
	describe("marketplaceSearchSchema", () => {
		it("validates empty search without automatic defaults", () => {
			const result = marketplaceSearchSchema.safeParse({});
			expect(result.success).toBe(true);
			if (result.success) {
				// Defaults are now handled in hooks/loaders, not Zod schema
				expect(result.data.type).toBeUndefined();
				expect(result.data.page).toBeUndefined();
				expect(result.data.sortBy).toBeUndefined();
			}
		});

		it("accepts valid numeric prices", () => {
			const result = marketplaceSearchSchema.safeParse({
				minPrice: 100,
				maxPrice: 500,
			});
			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data.minPrice).toBe(100);
				expect(result.data.maxPrice).toBe(500);
			}
		});

		it("validates sortOrder correctly", () => {
			const result = marketplaceSearchSchema.safeParse({
				sortOrder: "ASC",
			});
			expect(result.success).toBe(true);
			expect(result.data?.sortOrder).toBe("ASC");
		});
	});

	describe("auctionSearchSchema", () => {
		it("validates without automatic defaults", () => {
			const result = auctionSearchSchema.safeParse({});
			expect(result.success).toBe(true);
			expect(result.data?.page).toBeUndefined();
			expect(result.data?.searchQuery).toBeUndefined();
		});

		it("accepts searchQuery string", () => {
			const result = auctionSearchSchema.safeParse({ searchQuery: "tractor" });
			expect(result.success).toBe(true);
			expect(result.data?.searchQuery).toBe("tractor");
		});
	});

	describe("providersSearchSchema", () => {
		it("validates without automatic defaults", () => {
			const result = providersSearchSchema.safeParse({});
			expect(result.success).toBe(true);
			expect(result.data?.categoryId).toBeUndefined();
			expect(result.data?.verified).toBeUndefined();
		});

		it("handles verified boolean", () => {
			const result = providersSearchSchema.safeParse({ verified: true });
			expect(result.success).toBe(true);
			expect(result.data?.verified).toBe(true);
		});

		it("accepts minRating string", () => {
			const result = providersSearchSchema.safeParse({ minRating: "4" });
			expect(result.success).toBe(true);
			expect(result.data?.minRating).toBe("4");
		});
	});
});
