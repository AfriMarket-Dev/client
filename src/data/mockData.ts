import data from "./data.json";

export enum PriceType {
  FIXED = "FIXED",
  NEGOTIABLE = "NEGOTIABLE",
  STARTS_AT = "STARTS_AT",
}

export enum CompanyType {
  MANUFACTURER = "MANUFACTURER",
  WHOLESALER = "WHOLESALER",
  RETAILER = "RETAILER",
  SERVICE_PROVIDER = "SERVICE_PROVIDER",
}

export const mockCategories = data.categories;
export const mockCompanies = data.companies;
export const mockProducts = data.products;
export const mockServices = data.services;

// Aliases for compatibility
export const categories = mockCategories;
export const suppliers = mockCompanies;
export const products = mockProducts;
export const services = mockServices;
export const orders: any[] = [];
export const inquiries: any[] = [];

// Helper to get products with joined data
export const getMockProducts = () => {
  return mockProducts.map((p) => ({
    ...p,
    type: "PRODUCT" as const,
    category: (mockCategories.find((c) => c.id === p.categoryId) ||
      mockCategories[0]) as any,
    company: (mockCompanies.find((c) => c.id === p.companyId) ||
      mockCompanies[0]) as any,
  }));
};

// Helper to get services with joined data
export const getMockServices = () => {
  return mockServices.map((s) => ({
    ...s,
    type: "SERVICE" as const,
    company: (mockCompanies.find((c) => c.id === s.companyId) ||
      mockCompanies[0]) as any,
  }));
};
