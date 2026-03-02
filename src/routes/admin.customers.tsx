import { createFileRoute } from "@tanstack/react-router";
import { AdminCustomersPage } from "@/features/admin/components/customers-page";

export const Route = createFileRoute("/admin/customers")({
	component: AdminCustomersPage,
});
