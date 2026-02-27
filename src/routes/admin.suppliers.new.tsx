import { createFileRoute } from "@tanstack/react-router";
import AdminAddSupplierPage from "@/pages/admin-add-supplier-page";

export const Route = createFileRoute("/admin/suppliers/new")({
	component: AdminAddSupplierPage,
});
