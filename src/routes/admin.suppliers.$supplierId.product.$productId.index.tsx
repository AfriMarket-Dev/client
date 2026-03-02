import { createFileRoute } from "@tanstack/react-router";
import { AdminProductDetailsPage } from "@/features/admin/components/product-details-page";

export const Route = createFileRoute(
	"/admin/suppliers/$supplierId/product/$productId/",
)({
	component: AdminProductDetailsPage,
});
