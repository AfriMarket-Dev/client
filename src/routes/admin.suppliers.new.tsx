import { createFileRoute } from "@tanstack/react-router";
import { AdminAddSupplierPage } from "@/features/admin/components/add-supplier-page";

export const Route = createFileRoute("/admin/suppliers/new")({
	component: AdminAddSupplierPage,
});
