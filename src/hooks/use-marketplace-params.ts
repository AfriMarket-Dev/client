import {
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from "nuqs";
import type { ListingType } from "@/components/marketplace/types";

export const marketplaceParamsParser = {
  type: parseAsStringEnum<ListingType>([
    "all",
    "PRODUCT",
    "SERVICE",
  ]).withDefault("all"),
  categoryId: parseAsString.withDefault("all"),
  searchQuery: parseAsString.withDefault(""),
  district: parseAsString.withDefault(""),
  minPrice: parseAsString.withDefault(""),
  maxPrice: parseAsString.withDefault(""),
  onlyInStock: parseAsBoolean.withDefault(false),
  companyType: parseAsString.withDefault("all"),
  sortBy: parseAsString.withDefault("createdAt"),
  sortOrder: parseAsStringEnum<"ASC" | "DESC">(["ASC", "DESC"]).withDefault(
    "DESC",
  ),
  page: parseAsInteger.withDefault(1),
};

export function useMarketplaceParams() {
  return useQueryStates(marketplaceParamsParser, {
    shallow: false,
  });
}
