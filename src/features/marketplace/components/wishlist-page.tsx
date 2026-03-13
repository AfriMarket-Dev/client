import { useNavigate } from "@tanstack/react-router";
import Wishlist from "./wishlist";

export function WishlistPage() {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate({ to: "/products" });
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleProductClick = (item: {
		type?: string;
		id: string;
		[key: string]: unknown;
	}) => {
		if (item.type === "product") {
			navigate({
				to: "/products/$productId",
				params: { productId: item.id },
			});
		} else {
			navigate({
				to: "/services/$serviceId",
				params: { serviceId: item.id },
			});
		}
	};

	const handleProviderClick = (providerId: string) => {
		navigate({
			to: "/providers/$providerId",
			params: { providerId },
		});
	};

	return (
		<Wishlist
			onBack={handleBack}
			onProductClick={
				handleProductClick as unknown as (
					item: import("@/types").MarketplaceItem,
				) => void
			}
			onProviderClick={handleProviderClick}
		/>
	);
}
