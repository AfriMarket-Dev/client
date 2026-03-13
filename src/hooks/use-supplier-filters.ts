import { useCallback, useMemo, useTransition } from "react";
import type { SupplierFiltersState } from "@/types";
import { useSuppliersParams } from "./use-suppliers-params";

export function useSupplierFilters() {
  const [params, setParams] = useSuppliersParams();
  const [isPending, startTransition] = useTransition();

  const filters = useMemo(() => ({
    ...params,
  }), [params]);

  const handleFiltersChange = useCallback(
    (updates: Partial<SupplierFiltersState>) => {
      startTransition(() => {
        setParams({
          ...updates,
          page: 1,
        } as any);
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
    filters: filters as SupplierFiltersState,
    handleFiltersChange,
    handleClearFilters,
    isPending,
  };
}
