import { createFileRoute } from "@tanstack/react-router";
import CategoriesPage from "@/pages/categories-page";

export const Route = createFileRoute("/_main/categories")({
	component: CategoriesPage,
});
