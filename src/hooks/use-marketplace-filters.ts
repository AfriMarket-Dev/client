import { useCallback, useEffect, useRef, useState } from "react";
import type {
	CatalogFilters,
	ListingType,
} from "@/components/marketplace/types";

const DEFAULT_PRICE_MAX = 1_000_000;

function defaultFilters(
	overrides: Partial<CatalogFilters> = {},
): CatalogFilters {
	return {
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
		...overrides,
	};
}

export function useMarketplaceFilters(
	initialCategoryId = "all",
	initialType: ListingType = "all",
	onTypeChange?: (type: ListingType) => void,
) {
	const [filters, setFilters] = useState<CatalogFilters>(() =>
		defaultFilters({ categoryId: initialCategoryId, type: initialType }),
	);

	const [searchInput, setSearchInput] = useState("");
	const [priceRange, setPriceRange] = useState<[number, number]>([
		0,
		DEFAULT_PRICE_MAX,
	]);

	const patchFilters = useCallback(
		(patch: Partial<CatalogFilters>) => {
			setFilters((prev) => {
				const next = { ...prev, ...patch };
				if (patch.type != null && patch.type !== prev.type) {
					onTypeChange?.(patch.type);
				}
				return next;
			});
		},
		[onTypeChange],
	);

	const resetFilters = useCallback(() => {
		setFilters(defaultFilters());
		setSearchInput("");
		setPriceRange([0, DEFAULT_PRICE_MAX]);
		onTypeChange?.("all");
	}, [onTypeChange]);

	const searchDebounce = useRef<ReturnType<typeof setTimeout>>();
	useEffect(() => {
		clearTimeout(searchDebounce.current);
		searchDebounce.current = setTimeout(() => {
			patchFilters({ searchQuery: searchInput, page: 1 });
		}, 400);
		return () => clearTimeout(searchDebounce.current);
	}, [searchInput, patchFilters]);

	const commitPrice = useCallback(() => {
		patchFilters({
			minPrice: priceRange[0].toString(),
			maxPrice: priceRange[1].toString(),
			page: 1,
		});
	}, [priceRange, patchFilters]);

	useEffect(() => {
		if (!filters.minPrice && !filters.maxPrice) {
			setPriceRange([0, DEFAULT_PRICE_MAX]);
		}
	}, [filters.minPrice, filters.maxPrice]);

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
