import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import SupplierListing from "@/components/supplier/SupplierListing";

const SupplierListingPage = () => {
  const navigate = useNavigate();

  const handleSupplierClick = useCallback(
    (supplierId: string) => {
      navigate(`/suppliers/${supplierId}`);
    },
    [navigate],
  );

  return <SupplierListing onSupplierClick={handleSupplierClick} />;
};

export default SupplierListingPage;
