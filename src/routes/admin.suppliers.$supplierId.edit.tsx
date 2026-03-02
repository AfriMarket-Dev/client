import { createFileRoute } from "@tanstack/react-router";
import { AdminEditSupplierPage } from "@/features/admin/components/edit-supplier-page";

export const Route = createFileRoute("/admin/suppliers/$supplierId/edit")({
	component: AdminEditSupplierPage,
});
