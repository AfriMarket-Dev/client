import { createFileRoute } from "@tanstack/react-router";
import { AdminSupplierDetailsPage } from "@/features/admin/components/supplier-details-page";

export const Route = createFileRoute("/admin/suppliers/$supplierId/")({
	component: AdminSupplierDetailsPage,
});
