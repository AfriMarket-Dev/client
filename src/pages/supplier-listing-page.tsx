import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import SupplierListing from "@/components/supplier/supplier-listing";

const SupplierListingPage = () => {
	const navigate = useNavigate();

	const handleSupplierClick = useCallback(
		(supplierId: string) => {
			navigate({ to: `/suppliers/${supplierId}` as any });
		},
		[navigate],
	);

	return <SupplierListing onSupplierClick={handleSupplierClick} />;
};

export default SupplierListingPage;
