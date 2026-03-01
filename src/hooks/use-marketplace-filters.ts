import { useCallback, useEffect, useRef, useState } from "react";
import type {
  CatalogFilters,
  ListingType,
} from "@/components/marketplace/types";
import { useMarketplaceParams } from "./use-marketplace-params";

const DEFAULT_PRICE_MAX = 1_000_000;

export function useMarketplaceFilters(
  _initialCategoryId = "all",
  _initialType: ListingType = "all",
  onTypeChange?: (type: ListingType) => void,
) {
  const [filters, setFilters] = useMarketplaceParams();

  const [searchInput, setSearchInput] = useState(filters.searchQuery);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.minPrice ? Number(filters.minPrice) : 0,
    filters.maxPrice ? Number(filters.maxPrice) : DEFAULT_PRICE_MAX,
  ]);

  // Sync state if filters change (e.g. from URL or reset)
  useEffect(() => {
    setSearchInput(filters.searchQuery);
  }, [filters.searchQuery]);

  useEffect(() => {
    setPriceRange([
      filters.minPrice ? Number(filters.minPrice) : 0,
      filters.maxPrice ? Number(filters.maxPrice) : DEFAULT_PRICE_MAX,
    ]);
  }, [filters.minPrice, filters.maxPrice]);

  const patchFilters = useCallback(
    (patch: Partial<CatalogFilters>) => {
      setFilters((prev) => {
        const next = { ...prev, ...patch };
        if (patch.type != null && patch.type !== prev.type) {
          onTypeChange?.(patch.type as ListingType);
        }
        return next;
      });
    },
    [setFilters, onTypeChange],
  );

  const resetFilters = useCallback(() => {
    setFilters({
      searchQuery: "",
      categoryId: "all",
      type: "all",
      district: "",
      minPrice: "",
      maxPrice: "",
      onlyInStock: false,
      companyType: "all",
      sortBy: "createdAt",
      sortOrder: "DESC",
      page: 1,
    });
    onTypeChange?.("all");
  }, [setFilters, onTypeChange]);

  const searchDebounce = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => {
    if (searchInput === filters.searchQuery) return; // Skip if already synced

    clearTimeout(searchDebounce.current);
    searchDebounce.current = setTimeout(() => {
      setFilters({ searchQuery: searchInput, page: 1 });
    }, 400);
    return () => clearTimeout(searchDebounce.current);
  }, [searchInput, filters.searchQuery, setFilters]);

  const commitPrice = useCallback(() => {
    setFilters({
      minPrice: priceRange[0].toString(),
      maxPrice: priceRange[1].toString(),
      page: 1,
    });
  }, [priceRange, setFilters]);

  const hasActiveFilters =
    filters.categoryId !== "all" ||
    filters.type !== "all" ||
    filters.companyType !== "all" ||
    !!filters.district ||
    !!filters.minPrice ||
    !!filters.maxPrice ||
    filters.onlyInStock;

  return {
    filters,
    setFilters,
    patchFilters,
    resetFilters,
    searchInput,
    setSearchInput,
    priceRange,
    setPriceRange,
    commitPrice,
    hasActiveFilters,
  };
}
