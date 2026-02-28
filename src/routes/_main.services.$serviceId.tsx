import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "@/pages/marketplace/service-page";
import { store } from "@/app/store";
import { servicesApi } from "@/app/api/services";

export const Route = createFileRoute("/_main/services/$serviceId")({
  component: ServicePage,
  loader: ({ params }) => {
    store.dispatch(
      servicesApi.endpoints.getServiceById.initiate(params.serviceId),
    );
  },
});
