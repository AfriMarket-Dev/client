import { createFileRoute } from "@tanstack/react-router";
import { AdminProductDetailsPage } from "@/features/admin/components/product-details-page";

export const Route = createFileRoute(
	"/admin/providers/$providerId/product/$productId/",
)({
	component: AdminProductDetailsPage,
});
