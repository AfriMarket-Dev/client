import { createFileRoute } from "@tanstack/react-router";
import VerifyEmailPage from "@/pages/verify-email-page";

export const Route = createFileRoute("/auth/verify-email")({
	component: VerifyEmailPage,
	validateSearch: (search: Record<string, unknown>) => {
		return {
			token: (search.token as string) || "",
		};
	},
});
