import { createFileRoute } from "@tanstack/react-router";
import { AdminProfileSettingsPage } from "@/features/admin/components/profile-settings-page";

export const Route = createFileRoute("/admin/profile")({
	component: AdminProfileSettingsPage,
});
