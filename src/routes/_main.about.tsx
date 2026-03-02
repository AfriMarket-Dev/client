import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/features/home/components/about-page";

export const Route = createFileRoute("/_main/about")({
	component: AboutPage,
});
