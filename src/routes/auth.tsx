import { createFileRoute, redirect } from "@tanstack/react-router";
import { store } from "@/app/store";
import { AuthLayout } from "@/components/layout/auth-layout";

export const Route = createFileRoute("/auth")({
	beforeLoad: () => {
		const { isAuthenticated, user } = store.getState().auth;
		if (isAuthenticated) {
			const isAdmin = user?.role === "admin" || user?.role === "agent";
			throw redirect({
				to: isAdmin ? "/admin" : "/",
			});
		}
	},
	component: AuthLayout,
});
