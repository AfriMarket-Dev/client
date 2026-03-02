import { createFileRoute } from "@tanstack/react-router";
import AdminCustomersPage from "@/pages/admin-customers-page";

export const Route = createFileRoute("/admin/customers")({
	component: AdminCustomersPage,
});
