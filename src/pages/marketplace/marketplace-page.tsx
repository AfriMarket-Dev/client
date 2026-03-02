import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import MarketplaceGrid from "@/components/marketplace/marketplace-grid";
import type { MarketplaceItem } from "@/components/marketplace/types";

const MarketplacePage = () => {
  const navigate = useNavigate();

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

  return (
    <MarketplaceGrid
      onSupplierClick={handleSupplierClick}
      onProductClick={handleProductClick}
    />
  );
};

export default MarketplacePage;
