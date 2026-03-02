import { createFileRoute } from "@tanstack/react-router";
import { ProviderListingFormPage } from "@/features/dashboard/components/new-listing-page";

export const Route = createFileRoute("/dashboard/listings/new")({
	component: ProviderListingFormPage,
});
