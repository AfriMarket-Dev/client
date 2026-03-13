/**
 * Standardized Provider Contact Utility
 */
export const ProviderContact = {
	/**
	 * 1. WhatsApp Link Generator
	 * @param number Phone number with or without country code
	 * @param message Default message to pre-fill
	 */
	getWhatsAppLink: (number: string, message: string) => {
		const cleanNumber = number.replace(/\D/g, ""); // Remove non-digits
		return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
	},

	/**
	 * 2. Phone Link Generator
	 */
	getPhoneLink: (number: string) => `tel:${number}`,

	/**
	 * 3. Email Link Generator
	 */
	getEmailLink: (email: string, subject: string) =>
		`mailto:${email}?subject=${encodeURIComponent(subject)}`,
};
