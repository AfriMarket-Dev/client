import { createFileRoute } from "@tanstack/react-router";
import { AdminAddProviderPage } from "@/features/admin/components/add-provider-page";

export const Route = createFileRoute("/admin/providers/new")({
	component: AdminAddProviderPage,
});
