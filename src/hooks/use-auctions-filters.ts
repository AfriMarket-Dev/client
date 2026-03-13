import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { useAuctionsParams } from "./use-auctions-params";

const DEFAULT_PRICE_MAX = 100_000_000;

export function useAuctionsFilters() {
  const [params, setParams] = useAuctionsParams();
  const [isPending, startTransition] = useTransition();

  const [searchInput, setSearchInput] = useState(params.q);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    params.minPrice ? Number(params.minPrice) : 0,
    params.maxPrice ? Number(params.maxPrice) : DEFAULT_PRICE_MAX,
  ]);

  // Sync local state with URL params
  useEffect(() => {
    setSearchInput(params.q);
  }, [params.q]);

  useEffect(() => {
    setPriceRange([
      params.minPrice ? Number(params.minPrice) : 0,
      params.maxPrice ? Number(params.maxPrice) : DEFAULT_PRICE_MAX,
    ]);
  }, [params.minPrice, params.maxPrice]);

  const patchFilters = useCallback(
    (patch: Record<string, any>) => {
      startTransition(() => {
        setParams(patch);
      });
    },
    [setParams],
  );

  const resetFilters = useCallback(() => {
    startTransition(() => {
      setParams(null);
      setSearchInput("");
      setPriceRange([0, DEFAULT_PRICE_MAX]);
    });
  }, [setParams]);

  const commitPrice = useCallback(() => {
    startTransition(() => {
      setParams({
        minPrice: String(priceRange[0]),
        maxPrice: String(priceRange[1]),
        page: 1,
      });
    });
  }, [priceRange, setParams]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
    startTransition(() => {
      setParams({ q: value, page: 1 });
    });
  }, [setParams]);

  const hasActiveFilters = useMemo(() => {
    return (
      !!params.q ||
      !!params.minPrice ||
      !!params.maxPrice ||
      params.sortBy !== "createdAt"
    );
  }, [params]);

  return {
    filters: params,
    patchFilters,
    resetFilters,
    searchInput,
    setSearchInput: handleSearchChange,
    priceRange,
    setPriceRange,
    commitPrice,
    hasActiveFilters,
    isPending,
  };
}
