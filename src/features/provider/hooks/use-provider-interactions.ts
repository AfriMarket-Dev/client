import { useCallback } from "react";
import { useLogInteractionMutation } from "@/services/api/interactions";
import { ProviderContact } from "@/shared/utils/provider-contact";

interface InteractionArgs {
	companyId: string;
	productId?: string;
	serviceId?: string;
}

/**
 * Hook to handle provider interactions with automatic logging
 */
export function useProviderInteractions() {
	const [logInteraction] = useLogInteractionMutation();

	const callProvider = useCallback(
		async (phoneNumber: string, args: InteractionArgs) => {
			// 1. Log interaction
			await logInteraction({
				type: "CALL_CLICK",
				companyId: args.companyId,
				productId: args.productId,
				serviceId: args.serviceId,
			});

			// 2. Execute native action
			window.location.href = ProviderContact.getPhoneLink(phoneNumber);
		},
		[logInteraction],
	);

	const whatsappProvider = useCallback(
		async (phoneNumber: string, message: string, args: InteractionArgs) => {
			// 1. Log interaction
			await logInteraction({
				type: "WHATSAPP_CLICK",
				companyId: args.companyId,
				productId: args.productId,
				serviceId: args.serviceId,
			});

			// 2. Execute native action
			window.open(
				ProviderContact.getWhatsAppLink(phoneNumber, message),
				"_blank",
			);
		},
		[logInteraction],
	);

	const emailProvider = useCallback(
		async (email: string, subject: string, args: InteractionArgs) => {
			// 1. Log interaction
			await logInteraction({
				type: "EMAIL_CLICK",
				companyId: args.companyId,
				productId: args.productId,
				serviceId: args.serviceId,
			});

			// 2. Execute native action
			window.location.href = ProviderContact.getEmailLink(email, subject);
		},
		[logInteraction],
	);

	return {
		callProvider,
		whatsappProvider,
		emailProvider,
	};
}
