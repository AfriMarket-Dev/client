import { useCallback, useMemo, useTransition } from "react";
import type { ProviderFiltersState } from "@/types";
import { useProvidersParams } from "./use-providers-params";

export function useProviderFilters() {
	const [params, setParams] = useProvidersParams();
	const [isPending, startTransition] = useTransition();

	const filters = useMemo(
		() => ({
			...params,
		}),
		[params],
	);

	const handleFiltersChange = useCallback(
		(updates: Partial<ProviderFiltersState>) => {
			startTransition(() => {
				const nextParams: Parameters<typeof setParams>[0] = {
					...updates,
					page: 1,
				};
				setParams(nextParams);
			});
		},
		[setParams],
	);

	const handleClearFilters = useCallback(() => {
		startTransition(() => {
			setParams(null);
		});
	}, [setParams]);

	return {
		filters: filters as ProviderFiltersState,
		handleFiltersChange,
		handleClearFilters,
		isPending,
	};
}
