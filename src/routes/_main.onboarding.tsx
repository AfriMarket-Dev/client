import { createFileRoute, redirect } from "@tanstack/react-router";
import OnboardingPage from "@/pages/onboarding-page";
import { store } from "@/app/store";

export const Route = createFileRoute("/_main/onboarding")({
	beforeLoad: () => {
		const { isAuthenticated, user } = store.getState().auth;
		if (!isAuthenticated) {
			throw redirect({ to: "/auth/signin" });
		}
		// If they don't need onboarding, they shouldn't be here
		if (!user?.needsOnboarding) {
			throw redirect({ to: "/dashboard" });
		}
	},
	component: OnboardingPage,
});
