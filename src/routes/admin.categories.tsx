import { createFileRoute } from "@tanstack/react-router";
import AdminCategoriesPage from "@/pages/admin-categories-page";

export const Route = createFileRoute("/admin/categories")({
	component: AdminCategoriesPage,
});
