import { createFileRoute } from "@tanstack/react-router";
import { WishlistPage } from "@/features/marketplace/components/wishlist-page";

export const Route = createFileRoute("/_main/_protected/wishlist")({
	component: WishlistPage,
});
