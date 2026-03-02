import { createFileRoute } from "@tanstack/react-router";
import AboutPage from "@/pages/about-page";

export const Route = createFileRoute("/_main/about")({
	component: AboutPage,
});
