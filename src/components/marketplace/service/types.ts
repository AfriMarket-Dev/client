import type { CompanyRef } from "@/types/api";

export interface ServiceCategoryRef {
  id: string;
  name: string;
  description?: string;
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  priceType: "FIXED" | "NEGOTIABLE" | "STARTS_AT";
  price?: number;
  duration?: string;
  isActive: boolean;
  isFeatured?: boolean;
  discount?: number;
  views: number;
  images?: string[];
  category: ServiceCategoryRef;
  company: CompanyRef;
  totalRequests?: number;
  createdAt?: string;
  updatedAt?: string;
}
