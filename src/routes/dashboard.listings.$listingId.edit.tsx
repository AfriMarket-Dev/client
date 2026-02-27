import { createFileRoute } from "@tanstack/react-router";
import ProviderListingEditPage from "@/pages/provider-listing-edit-page";

export const Route = createFileRoute("/dashboard/listings/$listingId/edit")({
	component: ProviderListingEditPage,
});
