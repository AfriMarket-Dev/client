import { useNavigate, useSearch } from "@tanstack/react-router";
import MarketplaceGrid from "@/components/marketplace/marketplace-grid";

const MarketplacePage = () => {
	const navigate = useNavigate();
	const search = useSearch({ from: "/_main/marketplace" });
	const categoryId = search.category ?? "all";

	const handleProductClick = (listing: any) => {
		navigate({ to: `/products/${listing.id}` as any });
	};

	return (
		<MarketplaceGrid
			initialCategoryId={categoryId}
			onSupplierClick={(supplierId: string) =>
				navigate({ to: `/suppliers/${supplierId}` as any })
			}
			onProductClick={handleProductClick}
		/>
	);
};

export default MarketplacePage;
