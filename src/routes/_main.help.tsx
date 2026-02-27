import { createFileRoute } from "@tanstack/react-router";
import HelpCenterPage from "@/pages/help-center-page";

export const Route = createFileRoute("/_main/help")({
	component: HelpCenterPage,
});
