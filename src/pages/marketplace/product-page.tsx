import { useNavigate, useParams } from "@tanstack/react-router";
import ProductView from "@/components/marketplace/product-view";

const ProductPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams({ from: "/_main/products/$productId" });

  return (
    <ProductView
      productId={productId || ""}
      onBack={() => navigate({ to: "/marketplace" })}
      onSupplierClick={(supplierId: string) =>
        navigate({ to: `/suppliers/${supplierId}` as any })
      }
    />
  );
};

export default ProductPage;
