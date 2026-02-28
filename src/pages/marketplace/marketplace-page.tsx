import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback } from "react";
import MarketplaceGrid, {
	type MarketplaceItem,
} from "@/components/marketplace/marketplace-grid";

const MarketplacePage = () => {
	const navigate = useNavigate();
	const search = useSearch({ from: "/_main/marketplace" });
	const categoryId = search.category ?? "all";
	const listingType = search.type ?? "all";

	const handleProductClick = useCallback(
		(listing: MarketplaceItem) => {
			if (listing.itemType === "SERVICE") {
				navigate({ to: `/services/${listing.id}` as any });
				return;
			}

			navigate({ to: `/products/${listing.id}` as any });
		},
		[navigate],
	);

	const handleSupplierClick = useCallback(
		(supplierId: string) => {
			navigate({ to: `/suppliers/${supplierId}` as any });
		},
		[navigate],
	);

	const handleTypeChange = useCallback(
		(type: "all" | "PRODUCT" | "SERVICE") => {
			navigate({
				to: "/marketplace",
				search: {
					category: categoryId === "all" ? undefined : categoryId,
					type: type === "all" ? undefined : type,
				},
				replace: true,
			});
		},
		[categoryId, navigate],
	);

	return (
		<MarketplaceGrid
			initialCategoryId={categoryId}
			initialType={listingType}
			onTypeChange={handleTypeChange}
			onSupplierClick={handleSupplierClick}
			onProductClick={handleProductClick}
		/>
	);
};

export default MarketplacePage;
