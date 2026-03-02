import { createFileRoute } from "@tanstack/react-router";
import { AdminCategoriesPage } from "@/features/admin/components/categories-page";

export const Route = createFileRoute("/admin/categories")({
	component: AdminCategoriesPage,
});
