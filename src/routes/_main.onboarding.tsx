import { createFileRoute } from "@tanstack/react-router";
import { OnboardingPage } from "@/features/supplier/components/onboarding-page";

export const Route = createFileRoute("/_main/onboarding")({
	component: OnboardingPage,
});
