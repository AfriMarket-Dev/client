import { useEffect, useState } from "react";
import type { Product, Provider } from "@/types";

interface WishlistItem {
	id: string;
	type: "product" | "provider";
	item: Product | Provider;
	addedAt: string;
}

export const useWishlist = () => {
	const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

	// Load wishlist from localStorage on mount
	useEffect(() => {
		const savedWishlist = localStorage.getItem("karibu-wishlist");
		if (savedWishlist) {
			try {
				setWishlistItems(JSON.parse(savedWishlist));
			} catch (error) {
				console.error("Error loading wishlist:", error);
			}
		}
	}, []);

	// Save wishlist to localStorage whenever it changes
	useEffect(() => {
		localStorage.setItem("karibu-wishlist", JSON.stringify(wishlistItems));
	}, [wishlistItems]);

	const addToWishlist = (
		item: Product | Provider,
		type: "product" | "provider",
	) => {
		const newItem: WishlistItem = {
			id: item.id,
			type,
			item,
			addedAt: new Date().toISOString(),
		};

		setWishlistItems((prev) => {
			// Check if item already exists
			const exists = prev.some(
				(wishlistItem) =>
					wishlistItem.id === item.id && wishlistItem.type === type,
			);

			if (exists) {
				return prev;
			}

			return [...prev, newItem];
		});
	};

	const removeFromWishlist = (id: string, type: "product" | "provider") => {
		setWishlistItems((prev) =>
			prev.filter((item) => !(item.id === id && item.type === type)),
		);
	};

	const isInWishlist = (id: string, type: "product" | "provider") => {
		return wishlistItems.some((item) => item.id === id && item.type === type);
	};

	const getWishlistProducts = () => {
		return wishlistItems
			.filter((item) => item.type === "product")
			.map((item) => item.item as Product);
	};

	const getWishlistProviders = () => {
		return wishlistItems
			.filter((item) => item.type === "provider")
			.map((item) => item.item as Provider);
	};

	const clearWishlist = () => {
		setWishlistItems([]);
	};

	return {
		wishlistItems,
		addToWishlist,
		removeFromWishlist,
		isInWishlist,
		getWishlistProducts,
		getWishlistProviders,
		clearWishlist,
		wishlistCount: wishlistItems.length,
	};
};
