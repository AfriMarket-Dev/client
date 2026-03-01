import type { CompanyRef } from "./common";

export interface ProductCategoryRef {
  id: string;
  name: string;
  description?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku?: string;
  price: number;
  stock: number;
  discount?: number;
  unit?: string;
  images?: string[];
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  priceType: "FIXED" | "NEGOTIABLE" | "STARTS_AT";
  isActive: boolean;
  isFeatured?: boolean;
  views: number;
  category: ProductCategoryRef;
  company: CompanyRef;
  price?: number;
  stock?: number;
  unit?: string;
  images?: string[];
  variants?: ProductVariant[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductsQueryParams {
  page?: number;
  limit?: number;
  query?: string;
  categoryId?: string;
  companyId?: string;
  district?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  companyType?: string;
  isFeatured?: boolean;
  hasDiscount?: boolean;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}

export interface ProductsListResult {
  data: Product[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export interface CreateProductVariantInput {
  name: string;
  sku?: string;
  price: number;
  stock: number;
  unit?: string;
  images?: string[];
}

export interface CreateProductInput {
  name: string;
  description?: string;
  priceType?: "FIXED" | "NEGOTIABLE" | "STARTS_AT";
  price?: number;
  stock?: number;
  unit?: string;
  images?: string[];
  categoryId: string;
  companyId: string;
  variants?: CreateProductVariantInput[];
}
