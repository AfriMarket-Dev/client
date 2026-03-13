import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import ProviderListing from "./provider-listing";

export function ProvidersPage() {
	const navigate = useNavigate();

	const handleProviderClick = useCallback(
		(providerId: string) => {
			navigate({
				to: "/providers/$providerId",
				params: { providerId },
			});
		},
		[navigate],
	);

	return <ProviderListing onProviderClick={handleProviderClick} />;
}
