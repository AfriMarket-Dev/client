import { Building2, ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { useMarketplaceFilters } from "@/hooks/use-marketplace-filters";
import { cn } from "@/lib/utils";
import { useGetServicesQuery } from "@/services/api/services";
import type { MarketplaceItem } from "@/types";
import { ServiceCard } from "./catalog/service-card";

interface ServiceListingViewProps {
	viewMode: "grid" | "list";
	isAuthenticated: boolean;
	wishlistIds: Set<string>;
	onToggleWishlist: (e: React.MouseEvent, item: MarketplaceItem) => void;
	onProviderClick: (e: React.MouseEvent, companyId: string) => void;
	onClick: (item: MarketplaceItem) => void;
}

const PAGE_SIZE = 12;

export const ServiceListingView: React.FC<ServiceListingViewProps> = ({
	viewMode,
	isAuthenticated,
	wishlistIds,
	onToggleWishlist,
	onProviderClick,
	onClick,
}) => {
	const { filters, patchFilters, resetFilters } = useMarketplaceFilters();

	const sharedParams = useMemo(
		() => ({
			page: filters.page,
			limit: PAGE_SIZE,
			searchQuery: (filters.searchQuery || "").trim() || undefined,
			categoryId: filters.categoryId === "all" ? undefined : filters.categoryId,
			district: (filters.district || "").trim() || undefined,
			minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
			maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
			companyType:
				filters.companyType === "all" ? undefined : filters.companyType,
			sortBy: filters.sortBy,
			sortOrder: filters.sortOrder as "ASC" | "DESC" | undefined,
		}),
		[filters],
	);

	const { data: servicesData, isFetching } = useGetServicesQuery(sharedParams);

	const services = useMemo(
		() =>
			(servicesData?.data || []).map((s) => ({
				...s,
				itemType: "SERVICE" as const,
			})),
		[servicesData],
	);
	const meta = servicesData?.meta;

	if (isFetching && services.length === 0) {
		return (
			<div
				className={cn(
					"grid gap-4 md:gap-6",
					viewMode === "grid" ? "grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" : "grid-cols-1",
				)}
			>
				{Array.from({ length: 8 }).map((_, i) => (
					<Skeleton
						key={`skeleton-${i}`}
						className="h-80 border border-border rounded-md"
					/>
				))}
			</div>
		);
	}

	return (
		<div className="space-y-10">
			{services.length === 0 ? (
				<div className="py-20 flex justify-center w-full">
					<Empty className="max-w-md w-full">
						<EmptyHeader>
							<EmptyMedia variant="icon">
								<Building2 className="w-8 h-8 text-muted-foreground" />
							</EmptyMedia>
							<EmptyTitle>
								No Services Found
							</EmptyTitle>
							<EmptyDescription>
								We couldn't find any professional services matching your current
								filters.
							</EmptyDescription>
						</EmptyHeader>
						<EmptyContent className="mt-6 flex justify-center">
							<Button
								onClick={resetFilters}
								variant="outline"
								className="h-10 px-6 font-medium"
							>
								Clear All Filters
							</Button>
						</EmptyContent>
					</Empty>
				</div>
			) : (
				<div
					className={cn(
						"grid gap-4 md:gap-6",
						viewMode === "grid"
							? "grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
							: "grid-cols-1",
					)}
				>
					{services.map((item) => (
						<ServiceCard
							key={item.id}
							service={item}
							viewMode={viewMode}
							isInWishlist={isAuthenticated && wishlistIds.has(item.id)}
							onToggleWishlist={(e) => onToggleWishlist(e, item)}
							onProviderClick={(e) => onProviderClick(e, item.company.id)}
							onClick={() => onClick(item)}
						/>
					))}
				</div>
			)}

			{meta && meta.totalPages > 1 && (
				<div className="flex justify-center items-center gap-4 mt-12 pt-8 border-t border-border">
					<Button
						variant="outline"
						size="sm"
						className="font-medium h-9 px-4"
						disabled={filters.page <= 1}
						onClick={() => patchFilters({ page: filters.page - 1 })}
					>
						<ChevronLeft className="w-4 h-4 mr-1" />
						Prev
					</Button>
					<span className="text-sm font-medium text-muted-foreground">
						{meta.page} / {meta.totalPages}
					</span>
					<Button
						variant="outline"
						size="sm"
						className="font-medium h-9 px-4"
						disabled={filters.page >= meta.totalPages}
						onClick={() => patchFilters({ page: filters.page + 1 })}
					>
						Next
						<ChevronRight className="w-4 h-4 ml-1" />
					</Button>
				</div>
			)}
		</div>
	);
};
