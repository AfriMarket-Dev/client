import { z } from "zod";

export const marketplaceSearchSchema = z.object({
  category: z.string().optional(),
  categoryId: z.string().optional(),
  companyId: z.string().optional(),
  district: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  inStock: z.boolean().optional(),
  query: z.string().optional(),
  type: z.string().optional(),
  searchQuery: z.string().optional(),
  onlyInStock: z.boolean().optional(),
  companyType: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["ASC", "DESC"]).optional(),
  page: z.number().optional(),
});

export type MarketplaceSearch = z.infer<typeof marketplaceSearchSchema>;

export const auctionSearchSchema = z.object({
  q: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["ASC", "DESC"]).optional(),
  page: z.number().optional(),
});

export type AuctionSearch = z.infer<typeof auctionSearchSchema>;

export const suppliersSearchSchema = z.object({
  searchQuery: z.string().optional(),
  categoryId: z.string().optional(),
  district: z.string().optional(),
  type: z.string().optional(),
  minRating: z.string().optional(),
  verified: z.boolean().optional(),
  page: z.number().optional(),
});

export type SuppliersSearch = z.infer<typeof suppliersSearchSchema>;
