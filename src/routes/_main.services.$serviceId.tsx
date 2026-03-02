import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetailsPage } from "@/features/marketplace/components/service-details-page";
import { servicesApi } from "@/services/api/services";
import { store } from "@/store";

export const Route = createFileRoute("/_main/services/$serviceId")({
	component: ServiceDetailsPage,
	loader: ({ params }) => {
		store.dispatch(
			servicesApi.endpoints.getServiceById.initiate(params.serviceId),
		);
	},
});
