import { useNavigate, useParams } from "@tanstack/react-router";
import { useCallback } from "react";
import SupplierDetails from "@/components/supplier/supplier-details";

const SupplierDetailsPage = () => {
	const navigate = useNavigate();
	const { supplierId } = useParams({ from: "/_main/suppliers/$supplierId" });

	const handleBack = useCallback(() => {
		navigate({ to: "/suppliers" });
	}, [navigate]);

	const handleProductClick = useCallback(
		(product: any) => {
			navigate({ to: `/products/${product.id}` as any });
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
