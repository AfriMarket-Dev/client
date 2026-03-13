import { createFileRoute } from "@tanstack/react-router";
import { AdminEditProductPage } from "@/features/admin/components/edit-product-page";

export const Route = createFileRoute(
	"/admin/providers/$providerId/product/$productId/edit",
)({
	component: AdminEditProductPage,
});
