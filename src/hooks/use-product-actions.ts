import { useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useStartProductChatMutation } from "@/app/api/messages";
import {
	useAddToWishlistMutation,
	useGetWishlistQuery,
	useRemoveFromWishlistMutation,
} from "@/app/api/wishlist";
import type { RootState } from "@/app/store";

export function useProductActions(productId: string) {
	const navigate = useNavigate();
	const [messageOpen, setMessageOpen] = useState(false);
	const [messageText, setMessageText] = useState("");

	const { isAuthenticated } = useSelector((state: RootState) => state.auth);
	const { data: wishlist = [] } = useGetWishlistQuery(undefined, {
		skip: !isAuthenticated,
	});
	const [addToWishlist] = useAddToWishlistMutation();
	const [removeFromWishlist] = useRemoveFromWishlistMutation();
	const [startProductChat] = useStartProductChatMutation();

	const isInWishlist =
		Array.isArray(wishlist) &&
		wishlist.some((saved: any) => saved.id === productId);

	const handleToggleWishlist = useCallback(async () => {
		if (!isAuthenticated) {
			toast.error("Please login to add to wishlist");
			return;
		}
		try {
			if (isInWishlist) {
				await removeFromWishlist({ id: productId, type: "product" }).unwrap();
				toast.success("Removed from wishlist");
			} else {
				await addToWishlist({ id: productId, type: "product" }).unwrap();
				toast.success("Added to wishlist");
			}
		} catch (error) {
			console.error(error);
			toast.error("Failed to update wishlist");
		}
	}, [
		isAuthenticated,
		isInWishlist,
		productId,
		addToWishlist,
		removeFromWishlist,
	]);

	const handleSubmitInquiry = useCallback(async () => {
		if (!messageText.trim()) return;
		try {
			await startProductChat({
				productId,
				content: messageText.trim(),
			}).unwrap();
			toast.success("Inquiry sent successfully!");
			setMessageOpen(false);
			setMessageText("");
			navigate({ to: "/messages" });
		} catch (error) {
			console.error(error);
			toast.error("Inquiry delivery failed.");
		}
	}, [productId, messageText, startProductChat, navigate]);

	return {
		messageOpen,
		setMessageOpen,
		messageText,
		setMessageText,
		isInWishlist,
		handleToggleWishlist,
		handleSubmitInquiry,
		isAuthenticated,
	};
}
