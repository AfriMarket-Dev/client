import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/features/home/components/home-page";

export const Route = createFileRoute("/_main/")({
	component: HomePage,
});
