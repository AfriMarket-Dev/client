import { createFileRoute } from "@tanstack/react-router";
import { HelpPage } from "@/features/home/components/help-page";

export const Route = createFileRoute("/_main/help")({
	component: HelpPage,
});
