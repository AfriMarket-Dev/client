import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import Wishlist from "@/components/marketplace/Wishlist";
import { type Product } from "@/types";

const WishlistPage = () => {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleProductClick = useCallback(
    (product: Product) => {
      navigate(`/products/${product.id}`);
    },
    [navigate],
  );

  const handleSupplierClick = useCallback(
    (supplierId: string) => {
      navigate(`/suppliers/${supplierId}`);
    },
    [navigate],
  );

  return (
    <Wishlist
      onBack={handleBack}
      onProductClick={handleProductClick}
      onSupplierClick={handleSupplierClick}
    />
  );
};

export default WishlistPage;
