import { createFileRoute } from "@tanstack/react-router";
import AdminServicesPage from "@/pages/admin-services-page";

export const Route = createFileRoute("/admin/services")({
	component: AdminServicesPage,
});
