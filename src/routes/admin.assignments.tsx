import { createFileRoute } from "@tanstack/react-router";
import { AdminAssignmentsPage } from "@/features/admin/components/assignments-page";

export const Route = createFileRoute("/admin/assignments")({
	component: AdminAssignmentsPage,
});
