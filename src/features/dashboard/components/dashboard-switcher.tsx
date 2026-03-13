import { getRouteApi } from "@tanstack/react-router";
import ProviderDashboard from "./provider-dashboard";
import UserDashboard from "./user-dashboard";
import type { DashboardLoaderData } from "@/routes/dashboard.index";

const routeApi = getRouteApi("/dashboard/");

/**
 * Orchestrates between Provider and User dashboard views
 * Receives fully unwrapped and validated data from the loader
 */
export function DashboardSwitcher() {
	const data = routeApi.useLoaderData() as DashboardLoaderData;

	if (data.isProvider) {
		return (
			<ProviderDashboard
				company={data.company ?? undefined}
				categories={data.categories}
				products={data.products}
				services={data.services}
			/>
		);
	}

	return (
		<UserDashboard 
			wishlist={data.wishlist}
			conversations={data.conversations}
		/>
	);
}
