import { createFileRoute } from "@tanstack/react-router";
import { AdminEditProviderPage } from "@/features/admin/components/edit-provider-page";

export const Route = createFileRoute("/admin/providers/$providerId/edit")({
	component: AdminEditProviderPage,
});
