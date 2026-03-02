import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { ROUTES } from "@/shared/constants/routes";
import { store } from "@/store";

export const Route = createFileRoute("/_main/_protected")({
	beforeLoad: ({ location }) => {
		const { isAuthenticated } = store.getState().auth;
		if (!isAuthenticated) {
			throw redirect({
				to: ROUTES.AUTH.SIGNIN,
				search: {
					from: location.href,
				},
			});
		}
	},
	component: Outlet,
});
