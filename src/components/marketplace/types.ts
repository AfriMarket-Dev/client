import type { Product } from "@/app/api/products";
import type { Service } from "@/app/api/services";

export type ListingType = "all" | "PRODUCT" | "SERVICE";

export type MarketplaceItem =
	| (Product & { itemType: "PRODUCT" })
	| (Service & { itemType: "SERVICE" });

export interface CatalogFilters {
	searchQuery: string;
	categoryId: string;
	type: ListingType;
	district: string;
	minPrice: string;
	maxPrice: string;
	onlyInStock: boolean;
	companyType: string;
	sortBy: string;
	sortOrder: "ASC" | "DESC";
	page: number;
}
