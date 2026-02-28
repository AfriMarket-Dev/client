import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useSendMessageMutation } from "@/app/api/messages";

export function useSupplierActions(company: any) {
	const [showContactModal, setShowContactModal] = useState(false);
	const [message, setMessage] = useState("");
	const [sendMessage, { isLoading: sendingInquiry }] = useSendMessageMutation();

	const handleSubmitInquiry = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			if (!message.trim()) {
				toast.error("Please enter your inquiry message.");
				return;
			}
			const receiverId = company?.ownerId;
			if (!receiverId) {
				toast.error("Supplier contact is not available.");
				return;
			}
			try {
				await sendMessage({
					receiverId,
					content: message.trim(),
				}).unwrap();
				toast.success("Inquiry sent.");
				setShowContactModal(false);
				setMessage("");
			} catch (error) {
				console.error(error);
				toast.error("Failed to send inquiry.");
			}
		},
		[message, company, sendMessage],
	);

	return {
		showContactModal,
		setShowContactModal,
		message,
		setMessage,
		handleSubmitInquiry,
		sendingInquiry,
	};
}
