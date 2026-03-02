import { createFileRoute } from "@tanstack/react-router";
import { VerifyEmailPage } from "@/features/auth/components/verify-email-page";

export const Route = createFileRoute("/auth/verify-email")({
	component: VerifyEmailPage,
});
