import { createFileRoute, useNavigate } from "@tanstack/react-router";
import CategoriesPage from "@/features/marketplace/components/categories-page";

export const Route = createFileRoute("/_main/categories")({
	component: CategoriesPageWrapper,
});

function CategoriesPageWrapper() {
	const navigate = useNavigate();

	return (
		<CategoriesPage
			onBack={() => navigate({ to: "/" })}
			onSupplierClick={(supplierId: string) =>
				navigate({
					to: "/suppliers/$supplierId",
					params: { supplierId },
				} as any)
			}
		/>
	);
}
