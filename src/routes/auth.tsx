import { createFileRoute, redirect } from "@tanstack/react-router";
import { store } from "@/app/store";
import { AuthLayout } from "@/components/layout/auth-layout";

export const Route = createFileRoute("/auth")({
	beforeLoad: () => {
		const { isAuthenticated, user } = store.getState().auth;
		if (isAuthenticated) {
			if (user?.needsOnboarding) {
				throw redirect({ to: "/onboarding" });
			}
			const isAdmin = user?.role === "admin" || user?.role === "agent";
			const isProvider = user?.role === "provider" || user?.role === "supplier";
			
			if (isAdmin) throw redirect({ to: "/admin" });
			if (isProvider) throw redirect({ to: "/dashboard" });
			throw redirect({ to: "/" });
		}
	},
	component: AuthLayout,
});
