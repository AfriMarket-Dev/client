import { createFileRoute } from "@tanstack/react-router";
import { AdminProductsPage } from "@/features/admin/components/products-page";

export const Route = createFileRoute("/admin/products")({
	component: AdminProductsPage,
});
