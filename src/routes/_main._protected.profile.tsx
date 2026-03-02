import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/features/auth/components/profile-page";

export const Route = createFileRoute("/_main/_protected/profile")({
	component: ProfilePage,
});
