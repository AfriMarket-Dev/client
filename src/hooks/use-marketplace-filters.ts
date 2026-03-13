import {
	useCallback,
	useEffect,
	useMemo,
	useState,
	useTransition,
} from "react";
import type { CatalogFilters, ListingType } from "@/types";
import { useMarketplaceParams } from "./use-marketplace-params";

const DEFAULT_PRICE_MAX = 1_000_000;

export function useMarketplaceFilters(
	_from?: "/_main/products/" | "/_main/services/",
	onTypeChange?: (type: ListingType) => void,
) {
	const [params, setParams] = useMarketplaceParams();
	const [isPending, startTransition] = useTransition();

	// Local state for immediate UI feedback (e.g. while typing)
	const [searchInput, setSearchInput] = useState(params.searchQuery);
	const [priceRange, setPriceRange] = useState<[number, number]>([
		params.minPrice ? Number(params.minPrice) : 0,
		params.maxPrice ? Number(params.maxPrice) : DEFAULT_PRICE_MAX,
	]);

	// Sync local state with URL params
	useEffect(() => {
		setSearchInput(params.searchQuery);
	}, [params.searchQuery]);

	useEffect(() => {
		setPriceRange([
			params.minPrice ? Number(params.minPrice) : 0,
			params.maxPrice ? Number(params.maxPrice) : DEFAULT_PRICE_MAX,
		]);
	}, [params.minPrice, params.maxPrice]);

	const patchFilters = useCallback(
		(patch: Partial<CatalogFilters>) => {
			startTransition(() => {
				setParams(patch as any);
				if (patch.type && onTypeChange) {
					onTypeChange(patch.type as ListingType);
				}
			});
		},
		[setParams, onTypeChange],
	);

	const resetFilters = useCallback(() => {
		startTransition(() => {
			setParams(null); // nuqs resets to defaults when null
			setSearchInput("");
			setPriceRange([0, DEFAULT_PRICE_MAX]);
			if (onTypeChange) {
				onTypeChange("all");
			}
		});
	}, [setParams, onTypeChange]);

	const commitPrice = useCallback(() => {
		startTransition(() => {
			setParams({
				minPrice: String(priceRange[0]),
				maxPrice: String(priceRange[1]),
				page: 1,
			});
		});
	}, [priceRange, setParams]);

	// Handle search with transition
	const handleSearchChange = useCallback(
		(value: string) => {
			setSearchInput(value);
			startTransition(() => {
				setParams({ searchQuery: value, page: 1 });
			});
		},
		[setParams],
	);

	const hasActiveFilters = useMemo(() => {
		return (
			params.categoryId !== "all" ||
			params.type !== "all" ||
			params.companyType !== "all" ||
			!!params.district ||
			!!params.minPrice ||
			!!params.maxPrice ||
			params.onlyInStock ||
			!!params.searchQuery
		);
	}, [params]);

	return {
		filters: params as unknown as CatalogFilters,
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
