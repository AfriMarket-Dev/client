import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "@/pages/marketplace/service-page";

export const Route = createFileRoute("/_main/services/$serviceId")({
	component: ServicePage,
});
