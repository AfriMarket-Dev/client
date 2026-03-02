import { useCallback, useState } from "react";
import type { SupplierFiltersState } from "@/components/supplier/listing/types";

const defaultFilters: SupplierFiltersState = {
	searchQuery: "",
	categoryId: "all",
	district: "",
	type: "all",
	minRating: "0",
	verified: false,
	page: 1,
};

export function useSupplierFilters(initialSearchQuery = "") {
	const [filters, setFilters] = useState<SupplierFiltersState>({
		...defaultFilters,
		searchQuery: initialSearchQuery,
	});

	const handleFiltersChange = useCallback(
		(updates: Partial<SupplierFiltersState>) => {
			setFilters((prev) => ({ ...prev, ...updates, page: 1 }));
		},
		[],
	);

	const handleClearFilters = useCallback(() => {
		setFilters(defaultFilters);
	}, []);

	return {
		filters,
		setFilters,
		handleFiltersChange,
		handleClearFilters,
	};
}
