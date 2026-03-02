import { createFileRoute } from "@tanstack/react-router";
import { AdminSuppliersPage } from "@/features/admin/components/suppliers-page";

export const Route = createFileRoute("/admin/suppliers/")({
	component: AdminSuppliersPage,
});
