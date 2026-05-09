import {
	useCallback,
	useEffect,
	useMemo,
	useState,
	useTransition,
} from "react";
import { useCategoriesParams } from "./use-categories-params";

export function useCategoriesFilters() {
	const [params, setParams] = useCategoriesParams();
	const [isPending, startTransition] = useTransition();

	const [searchInput, setSearchInput] = useState(params.searchQuery);

	useEffect(() => {
		setSearchInput(params.searchQuery);
	}, [params.searchQuery]);

	const handleSearchChange = useCallback(
		(value: string) => {
			setSearchInput(value);
			startTransition(() => {
				setParams({ searchQuery: value, page: 1 });
			});
		},
		[setParams],
	);

	const handlePageChange = useCallback(
		(page: number) => {
			startTransition(() => {
				setParams({ page });
			});
		},
		[setParams],
	);

	const handleReset = useCallback(() => {
		startTransition(() => {
			setParams(null);
		});
	}, [setParams]);

	const filters = useMemo(() => params, [params]);

	return {
		filters,
		searchInput,
		setSearchInput: handleSearchChange,
		handlePageChange,
		handleReset,
		isPending,
	};
}
