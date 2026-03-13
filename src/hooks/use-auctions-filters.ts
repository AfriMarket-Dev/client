import {
	useCallback,
	useEffect,
	useMemo,
	useState,
	useTransition,
} from "react";
import type { AuctionsQueryParams } from "@/types";
import { useAuctionsParams } from "./use-auctions-params";

const DEFAULT_PRICE_MAX = 100_000_000;

export function useAuctionsFilters() {
	const [params, setParams] = useAuctionsParams();
	const [isPending, startTransition] = useTransition();

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
		(patch: Partial<AuctionsQueryParams>) => {
			startTransition(() => {
				setParams(patch as any);
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
			!!params.searchQuery ||
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
