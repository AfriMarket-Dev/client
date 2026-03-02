import { createFileRoute } from "@tanstack/react-router";
import MessagesPage from "@/pages/messages-page";

export const Route = createFileRoute("/_main/_protected/messages")({
	component: MessagesPage,
});
