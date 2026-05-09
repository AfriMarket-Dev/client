import { createFileRoute, redirect } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { NotFound } from "@/shared/components/not-found";
import { RouteError } from "@/shared/components/route-error";
import { RouteLoading } from "@/shared/components/route-loading";
import { ROLES } from "@/shared/constants";
import { ROUTES } from "@/shared/constants/routes";
import { store } from "@/store";

const PROVIDER_ROLES = [ROLES.PROVIDER, ROLES.ADMIN, ROLES.AGENT] as string[];

export const Route = createFileRoute("/dashboard")({
	beforeLoad: () => {
		const { isAuthenticated, user } = store.getState().auth;

		if (isAuthenticated && !user?.role) {
			store.dispatch({ type: "auth/logout" });
			throw redirect({ to: ROUTES.AUTH.SIGNIN });
		}

		if (!isAuthenticated) {
			throw redirect({
				to: ROUTES.AUTH.SIGNIN,
			});
		}

		// REMOVED: needsOnboarding redirect.
		// We let the dashboard loader verify if a company actually exists.

		if (!user?.role || !PROVIDER_ROLES.includes(user.role)) {
			throw redirect({
				to: ROUTES.HOME,
			});
		}
	},
	// biome-ignore lint/suspicious/noExplicitAny: tanstack router context
	shouldReload: (ctx: any) =>
		!ctx.prev || ctx.next.pathname !== ctx.prev.pathname,
	preload: false,
	component: DashboardLayout,
	pendingComponent: RouteLoading,
	notFoundComponent: NotFound,
	errorComponent: RouteError,
	head: () => ({
		meta: [
			{ title: "Provider Dashboard | Karibu" },
			{ name: "robots", content: "noindex, nofollow" },
		],
	}),
});
