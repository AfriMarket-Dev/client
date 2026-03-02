import { createFileRoute } from "@tanstack/react-router";
import ProductPage from "@/pages/marketplace/product-page";
import { store } from "@/app/store";
import { productsApi } from "@/app/api/products";

export const Route = createFileRoute("/_main/products/$productId")({
  component: ProductPage,
  loader: ({ params }) => {
    store.dispatch(
      productsApi.endpoints.getProductById.initiate(params.productId),
    );
  },
});
