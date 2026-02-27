import type { Company } from "@/app/api/companies";
import type { Product } from "@/app/api/products";
import dataJson from "./data.json";

// cast to match API types so mock data is interchangeable with API responses
export const mockCompanies = dataJson.companies as unknown as Company[];

export const mockProducts = dataJson.products as unknown as (Product & {
	companyId: string;
})[];
