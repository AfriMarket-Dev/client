import { useCallback, useState } from "react";
import { APP_CONFIG } from "../shared/constants";

interface UseAdminTableOptions {
	initialPageSize?: number;
}

export function useAdminTable(options: UseAdminTableOptions = {}) {
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: options.initialPageSize || APP_CONFIG.DEFAULT_PAGE_SIZE,
	});
	const [searchTerm, setSearchTerm] = useState("");

	const handlePaginationChange = useCallback((updater: any) => {
		setPagination((prev) => {
			const next = typeof updater === "function" ? updater(prev) : updater;
			return next;
		});
	}, []);

	return {
		pagination,
		setPagination: handlePaginationChange,
		searchTerm,
		setSearchTerm,
		page: pagination.pageIndex + 1,
		limit: pagination.pageSize,
	};
}
