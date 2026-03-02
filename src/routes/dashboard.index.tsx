import { createFileRoute } from "@tanstack/react-router";
import { DashboardSwitcher } from "@/features/dashboard/components/dashboard-switcher";

export const Route = createFileRoute("/dashboard/")({
	component: DashboardSwitcher,
});
