import { createFileRoute } from "@tanstack/react-router";
import AdminProfileSettingsPage from "@/pages/admin-profile-settings-page";

export const Route = createFileRoute("/admin/profile")({
	component: AdminProfileSettingsPage,
});
