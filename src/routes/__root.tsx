import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { NuqsAdapter } from "nuqs/adapters/tanstack-router";
import { NotFound } from "@/shared/components/not-found";
import { RouteLoading } from "@/shared/components/route-loading";
import "../index.css";

export const Route = createRootRoute({
	component: RootComponent,
	pendingComponent: RouteLoading,
	notFoundComponent: NotFound,
});

function RootComponent() {
	return (
		<>
			<NuqsAdapter>
				<Outlet />
			</NuqsAdapter>
			<TanStackDevtools
				config={{
					position: "bottom-right",
				}}
				plugins={[
					{
						name: "TanStack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
				]}
			/>
		</>
	);
}
