import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { store } from "@/app/store";

export const Route = createFileRoute("/_main/_protected")({
	beforeLoad: ({ location }) => {
		const { isAuthenticated } = store.getState().auth;
		if (!isAuthenticated) {
			throw redirect({
				to: "/auth/signin",
				search: {
					from: location.href,
				},
			});
		}
	},
	component: Outlet,
});
