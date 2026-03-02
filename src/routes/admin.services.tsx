import { createFileRoute } from "@tanstack/react-router";
import { AdminServicesPage } from "@/features/admin/components/services-page";

export const Route = createFileRoute("/admin/services")({
	component: AdminServicesPage,
});
