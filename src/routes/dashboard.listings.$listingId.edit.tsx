import { createFileRoute } from "@tanstack/react-router";
import { ProviderListingEditPage } from "@/features/dashboard/components/edit-listing-page";

export const Route = createFileRoute("/dashboard/listings/$listingId/edit")({
	component: ProviderListingEditPage,
});
