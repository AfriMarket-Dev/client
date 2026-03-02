export interface ProductCategory {
	id: string;
	name: string;
	description?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface ProductCategoriesListResult {
	data: ProductCategory[];
	meta: { total: number; page: number; limit: number; totalPages: number };
}

export interface CreateProductCategoryInput {
	name: string;
	description?: string;
}

