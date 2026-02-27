import type { CompanyRef } from "./common";

export interface ListingCategoryRef {
	id: string;
	name: string;
	slug?: string;
	description?: string;
}

export interface ListingVariantRef {
	id: string;
	name: string;
	price: number;
	stock: number;
	unit?: string;
	images?: string[];
}

export interface Listing {
	id: string;
	name: string;
	description?: string;
	type: "PRODUCT" | "SERVICE";
	priceType: string;
	isActive: boolean;
	views: number;
	category: ListingCategoryRef;
	company: CompanyRef;
	variants?: ListingVariantRef[];
	createdAt?: string;
	updatedAt?: string;
}

export interface ListingsQueryParams {
	page?: number;
	limit?: number;
	query?: string;
	categoryId?: string;
	companyId?: string;
	type?: "PRODUCT" | "SERVICE";
	district?: string;
	minPrice?: number;
	maxPrice?: number;
	inStock?: boolean;
	companyType?: string;
	sortBy?: string;
	sortOrder?: "ASC" | "DESC";
}

export interface ListingsListResult {
	data: Listing[];
	meta: { total: number; page: number; limit: number; totalPages: number };
}

export interface CreateListingInput {
	name: string;
	description?: string;
	type: "PRODUCT" | "SERVICE";
	priceType?: "FIXED" | "NEGOTIABLE" | "STARTS_AT";
	price?: number;
	stock?: number;
	unit?: string;
	images?: string[];
	categoryId: string;
	companyId: string;
}

export interface CreateVariantInput {
	name: string;
	sku?: string;
	price: number;
	stock: number;
	unit?: string;
	images?: string[];
}

