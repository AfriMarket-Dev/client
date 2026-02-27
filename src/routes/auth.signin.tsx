import { createFileRoute } from "@tanstack/react-router";
import SignInPage from "@/pages/sign-in-page";

export const Route = createFileRoute("/auth/signin")({
	component: SignInPage,
});
