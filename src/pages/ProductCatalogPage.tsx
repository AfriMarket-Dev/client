import { useNavigate, useSearchParams } from "react-router-dom";
import ProductCatalog from "@/components/ProductCatalog";
import type { Listing } from "@/app/api/listings";

const ProductCatalogPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category") ?? "all";

  const handleProductClick = (listing: Listing) => {
    navigate(`/products/${listing.id}`);
  };

  return (
    <ProductCatalog
      initialCategoryId={categoryId}
      onSupplierClick={(supplierId: string) =>
        navigate(`/suppliers/${supplierId}`)
      }
      onProductClick={handleProductClick}
    />
  );
};

export default ProductCatalogPage;
