import { createFileRoute } from "@tanstack/react-router";
import { OnboardingPage } from "@/features/provider/components/onboarding-page";

export const Route = createFileRoute("/_main/onboarding")({
	component: OnboardingPage,
});
