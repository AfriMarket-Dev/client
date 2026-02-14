import { useNavigate, useParams } from "react-router-dom";
import { useCallback } from "react";
import SupplierDetails from "@/components/supplier/SupplierDetails";
import { type Product } from "@/types";

const SupplierDetailsPage = () => {
  const navigate = useNavigate();
  const { supplierId } = useParams<{ supplierId: string }>();

  const handleBack = useCallback(() => {
    navigate("/suppliers");
  }, [navigate]);

  const handleProductClick = useCallback(
    (product: Product) => {
      navigate(`/products/${product.id}`);
    },
    [navigate],
  );

  if (!supplierId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-heading font-bold uppercase text-foreground mb-4 tracking-wide">
            Supplier Not Found
          </h2>
          <button
            onClick={handleBack}
            className="text-primary font-heading uppercase text-sm tracking-wider hover:underline"
          >
            Back to Suppliers
          </button>
        </div>
      </div>
    );
  }

  return (
    <SupplierDetails
      supplierId={supplierId}
      onBack={handleBack}
      onProductClick={handleProductClick}
    />
  );
};

export default SupplierDetailsPage;
