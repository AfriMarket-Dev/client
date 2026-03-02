import { createFileRoute } from "@tanstack/react-router";
import { SuppliersPage } from "@/features/supplier/components/suppliers-page";

export const Route = createFileRoute("/_main/suppliers/")({
	component: SuppliersPage,
});
