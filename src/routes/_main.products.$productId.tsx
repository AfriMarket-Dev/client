import { createFileRoute } from "@tanstack/react-router";
import { ProductDetailsPage } from "@/features/marketplace/components/product-details-page";
import { productsApi } from "@/services/api/products";
import { store } from "@/store";

export const Route = createFileRoute("/_main/products/$productId")({
	component: ProductDetailsPage,
	loader: ({ params }) => {
		store.dispatch(
			productsApi.endpoints.getProductById.initiate(params.productId),
		);
	},
});
