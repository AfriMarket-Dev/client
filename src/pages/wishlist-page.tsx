import { useNavigate } from "@tanstack/react-router";
import Wishlist from "@/components/marketplace/wishlist";

export default function WishlistPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate({ to: "/marketplace" as any });
  };

  const handleProductClick = (item: any) => {
    if (item.type === "product") {
      navigate({
        to: "/products/$productId",
        params: { productId: item.id },
      });
    } else {
      navigate({
        to: "/services/$serviceId",
        params: { serviceId: item.id },
      });
    }
  };

  const handleSupplierClick = (supplierId: string) => {
    navigate({
      to: "/suppliers/$supplierId",
      params: { supplierId },
    });
  };

  return (
    <Wishlist
      onBack={handleBack}
      onProductClick={handleProductClick}
      onSupplierClick={handleSupplierClick}
    />
  );
}
