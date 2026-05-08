import { RiMailSendLine, RiPhoneLine, RiWhatsappLine, RiChat3Line } from "@remixicon/react";
import { useNavigate } from "@tanstack/react-router";
import { useProviderInteractions } from "@/features/provider/hooks/use-provider-interactions";
import { 
	useStartProductChatMutation, 
	useStartServiceChatMutation, 
	useStartAuctionChatMutation 
} from "@/services/api/messages";
import { ROUTES } from "@/shared/constants/routes";

interface ContactActionsProps {
	phone?: string;
	email?: string;
	whatsapp?: string;
	companyName?: string;
	companyId?: string;
	productId?: string;
	serviceId?: string;
	auctionId?: string;
	className?: string;
	size?: "sm" | "default" | "lg";
}

export function ContactActions({
	phone,
	email,
	whatsapp,
	companyName,
	companyId,
	productId,
	serviceId,
	auctionId,
	className,
	size = "default",
}: ContactActionsProps) {
	const { callProvider, whatsappProvider, emailProvider } = useProviderInteractions();
	const [startProductChat] = useStartProductChatMutation();
	const [startServiceChat] = useStartServiceChatMutation();
	const [startAuctionChat] = useStartAuctionChatMutation();
	const navigate = useNavigate();

	const handleMessage = async () => {
		try {
			if (productId) {
				await startProductChat({ productId, content: `I'm interested in ${companyName}'s product.` }).unwrap();
			} else if (serviceId) {
				await startServiceChat({ serviceId, content: `I'm interested in ${companyName}'s service.` }).unwrap();
			} else if (auctionId) {
				await startAuctionChat({ auctionId, content: `I'm interested in this auction.` }).unwrap();
			}
			navigate({ to: ROUTES.PROTECTED.MESSAGES });
		} catch (err) {
			console.error("Failed to start chat:", err);
			// If it fails (e.g. not logged in), still navigate to messages which handles auth redirect
			navigate({ to: ROUTES.PROTECTED.MESSAGES });
		}
	};

	const handleCall = async () => {
		if (!phone || !companyId) return;
		await callProvider(phone, { companyId, productId, serviceId });
	};

	const handleWhatsApp = async () => {
		const targetPhone = whatsapp || phone;
		if (!targetPhone || !companyId) return;
		
		const text = companyName
			? `Hello ${companyName}, I found your profile on Karibu and I'm interested in your services.`
			: "Hello, I found your profile on Karibu and I'm interested in your services.";
			
		await whatsappProvider(targetPhone, text, { 
			companyId, 
			productId, 
			serviceId,
			// Pass auctionId in metadata if needed, though hook doesn't currently take it
		});
	};

	const handleEmail = async () => {
		if (!email || !companyId) return;
		const subject = auctionId ? `Inquiry regarding Auction ${auctionId}` : "Inquiry from Karibu";
		await emailProvider(email, subject, { companyId, productId, serviceId });
	};

	const isSmall = size === "sm";

	return (
		<div className={`flex flex-wrap items-center gap-2 ${className || ""}`}>
			{(phone || whatsapp) && (
				<>
					<button
						type="button"
						className={`flex items-center justify-center rounded-none border border-success/30 text-success hover:bg-success/5 transition-all font-black uppercase tracking-widest ${
							isSmall ? "h-8 px-3 text-[9px]" : "h-11 px-4 text-[10px]"
						}`}
						onClick={handleWhatsApp}
					>
						<RiWhatsappLine
							className={isSmall ? "mr-1.5 h-3.5 w-3.5" : "mr-2 h-4 w-4"}
						/>
						WhatsApp
					</button>
					<button
						type="button"
						className={`flex items-center justify-center rounded-none border border-info/30 text-info hover:bg-info/5 transition-all font-black uppercase tracking-widest ${
							isSmall ? "h-8 px-3 text-[9px]" : "h-11 px-4 text-[10px]"
						}`}
						onClick={handleCall}
					>
						<RiPhoneLine
							className={isSmall ? "mr-1.5 h-3.5 w-3.5" : "mr-2 h-4 w-4"}
						/>
						Call
					</button>
				</>
			)}
			{email && (
				<button
					type="button"
					className={`flex items-center justify-center rounded-none border border-warning/30 text-warning hover:bg-warning/5 transition-all font-black uppercase tracking-widest ${
						isSmall ? "h-8 px-3 text-[9px]" : "h-11 px-4 text-[10px]"
					}`}
					onClick={handleEmail}
				>
					<RiMailSendLine
						className={isSmall ? "mr-1.5 h-3.5 w-3.5" : "mr-2 h-4 w-4"}
					/>
					Email
				</button>
			)}
			<button
				type="button"
				className={`flex items-center justify-center rounded-none border border-primary/30 text-primary hover:bg-primary/5 transition-all font-black uppercase tracking-widest ${
					isSmall ? "h-8 px-3 text-[9px]" : "h-11 px-4 text-[10px]"
				}`}
				onClick={handleMessage}
			>
				<RiChat3Line
					className={isSmall ? "mr-1.5 h-3.5 w-3.5" : "mr-2 h-4 w-4"}
				/>
				Message
			</button>
		</div>
	);
}
