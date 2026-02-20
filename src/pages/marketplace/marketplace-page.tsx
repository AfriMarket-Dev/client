import { useNavigate, useSearchParams } from "react-router-dom";
import MarketplaceGrid from "@/components/marketplace/marketplace-grid";
import type { Listing } from "@/app/api/listings";

const MarketplacePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category") ?? "all";

  const handleProductClick = (listing: Listing) => {
    navigate(`/products/${listing.id}`);
  };

  return (
    <MarketplaceGrid
      initialCategoryId={categoryId}
      onSupplierClick={(supplierId: string) =>
        navigate(`/suppliers/${supplierId}`)
      }
      onProductClick={handleProductClick}
    />
  );
};

export default MarketplacePage;
