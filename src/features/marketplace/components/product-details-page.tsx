import { useNavigate, useParams } from "@tanstack/react-router";
import ProductView from "./product-view";

export function ProductDetailsPage() {
	const navigate = useNavigate();
	const { productId } = useParams({ from: "/_main/products/$productId" });

	return (
		<ProductView
			productId={productId}
			onBack={async () => {
				navigate({ to: "/products" });
			}}
			onProviderClick={async (providerId: string) => {
				navigate({
					to: "/providers/$providerId",
					params: { providerId },
				});
			}}
		/>
	);
}
