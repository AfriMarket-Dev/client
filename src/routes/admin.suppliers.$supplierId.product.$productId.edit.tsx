import { createFileRoute } from "@tanstack/react-router";
import AdminEditProductPage from "@/pages/admin-edit-product-page";

export const Route = createFileRoute(
	"/admin/suppliers/$supplierId/product/$productId/edit",
)({
	component: AdminEditProductPage,
});
