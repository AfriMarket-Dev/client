import { useNavigate, useParams } from "react-router-dom";
import ProductView from "@/components/marketplace/product-view";

const ProductPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();

  return (
    <ProductView
      productId={productId || ""}
      onBack={() => navigate("/marketplace")}
      onSupplierClick={(supplierId: string) =>
        navigate(`/suppliers/${supplierId}`)
      }
    />
  );
};

export default ProductPage;
