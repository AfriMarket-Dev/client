import { createFileRoute } from "@tanstack/react-router";
import ProviderDashboard from "@/features/dashboard/components/provider-dashboard";

export const Route = createFileRoute("/dashboard/listings/")({
	component: ProviderDashboard,
});
