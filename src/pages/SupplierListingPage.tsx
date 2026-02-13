import { useNavigate } from "react-router-dom";
import SupplierListing from "@/components/SupplierListing";

const SupplierListingPage = () => {
  const navigate = useNavigate();

  return (
    <SupplierListing
      onSupplierClick={(supplierId: string) =>
        navigate(`/suppliers/${supplierId}`)
      }
    />
  );
};

export default SupplierListingPage;
