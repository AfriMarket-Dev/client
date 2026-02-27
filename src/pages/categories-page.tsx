import { useNavigate } from "@tanstack/react-router";
import CategoriesPage from "@/components/marketplace/categories-page";

const CategoriesPageWrapper = () => {
	const navigate = useNavigate();

	return (
		<CategoriesPage
			onBack={() => navigate({ to: "/" })}
			onSupplierClick={(supplierId: string) =>
				navigate({ to: `/suppliers/${supplierId}` as any })
			}
		/>
	);
};

export default CategoriesPageWrapper;
