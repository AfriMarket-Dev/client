import { createFileRoute } from "@tanstack/react-router";
import AdminAssignmentsPage from "@/pages/admin-assignments-page";

export const Route = createFileRoute("/admin/assignments")({
	component: AdminAssignmentsPage,
});
