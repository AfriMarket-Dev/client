import { createFileRoute } from "@tanstack/react-router";
import ProviderDashboardPage from "@/pages/provider-dashboard-page";

export const Route = createFileRoute("/dashboard/listings/")({
	component: ProviderDashboardPage,
});
