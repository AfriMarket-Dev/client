import { createFileRoute } from "@tanstack/react-router";
import { AdminProviderDetailsPage } from "@/features/admin/components/provider-details-page";

export const Route = createFileRoute("/admin/providers/$providerId/")({
	component: AdminProviderDetailsPage,
});
