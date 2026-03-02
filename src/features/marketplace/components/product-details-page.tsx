import { useNavigate, useParams } from "@tanstack/react-router";
import ProductView from "@/features/marketplace/components/product-view";
import { ROUTES } from "@/shared/constants/routes";

export function ProductDetailsPage() {
	const navigate = useNavigate();
	const { productId } = useParams({ from: "/_main/products/$productId" });

	return (
		<ProductView
			productId={productId || ""}
			onBack={() => navigate({ to: ROUTES.MARKETPLACE })}
			onSupplierClick={(supplierId: string) =>
				navigate({ to: ROUTES.PUBLIC.SUPPLIER(supplierId) as any })
			}
		/>
	);
}
