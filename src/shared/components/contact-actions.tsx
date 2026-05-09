import {
	RiArrowDownSLine,
	RiChat3Line,
	RiMailSendLine,
	RiPhoneLine,
	RiWhatsappLine,
} from "@remixicon/react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProviderInteractions } from "@/features/provider/hooks/use-provider-interactions";
import { cn } from "@/lib/utils";
import {
	useStartAuctionChatMutation,
	useStartProductChatMutation,
	useStartServiceChatMutation,
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
	variant?: "inline" | "dropdown";
	label?: string;
	onCustomInquiry?: () => void;
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
	variant = "inline",
	label = "Contact Provider",
	onCustomInquiry,
}: ContactActionsProps) {
	const { callProvider, whatsappProvider, emailProvider } =
		useProviderInteractions();
	const [startProductChat] = useStartProductChatMutation();
	const [startServiceChat] = useStartServiceChatMutation();
	const [startAuctionChat] = useStartAuctionChatMutation();
	const navigate = useNavigate();

	const handleMessage = async () => {
		try {
			if (productId) {
				await startProductChat({
					productId,
					content: `I'm interested in ${companyName}'s product.`,
				}).unwrap();
			} else if (serviceId) {
				await startServiceChat({
					serviceId,
					content: `I'm interested in ${companyName}'s service.`,
				}).unwrap();
			} else if (auctionId) {
				await startAuctionChat({
					auctionId,
					content: `I'm interested in this auction.`,
				}).unwrap();
			}
			navigate({ to: ROUTES.PROTECTED.MESSAGES });
		} catch (err) {
			console.error("Failed to start chat:", err);
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
		});
	};

	const handleEmail = async () => {
		if (!email || !companyId) return;
		const subject = auctionId
			? `Inquiry regarding Auction ${auctionId}`
			: "Inquiry from Karibu";
		await emailProvider(email, subject, { companyId, productId, serviceId });
	};

	const isSmall = size === "sm";

	if (variant === "dropdown") {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger
					render={(triggerProps) => (
						<Button
							{...triggerProps}
							className={cn(
								"rounded-none font-black uppercase tracking-widest transition-all shadow-none",
								isSmall ? "h-9 text-[9px] px-4" : "h-11 text-[10px] px-8",
								className,
							)}
						>
							{label}
							<RiArrowDownSLine className="ml-2 h-4 w-4" />
						</Button>
					)}
				/>
				<DropdownMenuContent
					align="end"
					className="rounded-none border-border industrial-grain min-w-[200px]"
				>
					<div className="px-3 py-2 border-b border-border mb-1">
						<span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">
							Select Protocol
						</span>
					</div>

					<DropdownMenuItem
						className="rounded-none py-3 focus:bg-primary focus:text-background transition-colors cursor-pointer"
						onClick={onCustomInquiry || handleMessage}
					>
						<RiChat3Line className="mr-3 h-4 w-4" />
						<div className="flex flex-col">
							<span className="text-[10px] font-black uppercase tracking-widest leading-none">
								Internal Portal
							</span>
							<span className="text-[9px] opacity-60 uppercase tracking-wider mt-1">
								{onCustomInquiry ? "Send Detailed Form" : "Direct Chat Access"}
							</span>
						</div>
					</DropdownMenuItem>

					{(phone || whatsapp) && (
						<>
							<DropdownMenuSeparator className="bg-border" />
							{whatsapp && (
								<DropdownMenuItem
									className="rounded-none py-3 focus:bg-success focus:text-background transition-colors cursor-pointer"
									onClick={handleWhatsApp}
								>
									<RiWhatsappLine className="mr-3 h-4 w-4" />
									<div className="flex flex-col">
										<span className="text-[10px] font-black uppercase tracking-widest leading-none">
											WhatsApp
										</span>
										<span className="text-[9px] opacity-60 uppercase tracking-wider mt-1">
											Direct Connection
										</span>
									</div>
								</DropdownMenuItem>
							)}
							{phone && (
								<DropdownMenuItem
									className="rounded-none py-3 focus:bg-info focus:text-background transition-colors cursor-pointer"
									onClick={handleCall}
								>
									<RiPhoneLine className="mr-3 h-4 w-4" />
									<div className="flex flex-col">
										<span className="text-[10px] font-black uppercase tracking-widest leading-none">
											Voice Call
										</span>
										<span className="text-[9px] opacity-60 uppercase tracking-wider mt-1">
											Immediate Access
										</span>
									</div>
								</DropdownMenuItem>
							)}
						</>
					)}

					{email && (
						<>
							<DropdownMenuSeparator className="bg-border" />
							<DropdownMenuItem
								className="rounded-none py-3 focus:bg-warning focus:text-background transition-colors cursor-pointer"
								onClick={handleEmail}
							>
								<RiMailSendLine className="mr-3 h-4 w-4" />
								<div className="flex flex-col">
									<span className="text-[10px] font-black uppercase tracking-widest leading-none">
										Email Line
									</span>
									<span className="text-[9px] opacity-60 uppercase tracking-wider mt-1">
										Formal Specification
									</span>
								</div>
							</DropdownMenuItem>
						</>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}

	return (
		<div className={`flex flex-wrap items-center gap-2 ${className || ""}`}>
			{(phone || whatsapp) && (
				<>
					<button
						type="button"
						className={`flex items-center justify-center rounded-none border border-success/30 text-success hover:bg-success/5 transition-all font-black uppercase tracking-widest ${
							className?.includes("flex-col") ? "w-full" : ""
						} ${isSmall ? "h-8 px-3 text-[9px]" : "h-11 px-4 text-[10px]"}`}
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
							className?.includes("flex-col") ? "w-full" : ""
						} ${isSmall ? "h-8 px-3 text-[9px]" : "h-11 px-4 text-[10px]"}`}
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
						className?.includes("flex-col") ? "w-full" : ""
					} ${isSmall ? "h-8 px-3 text-[9px]" : "h-11 px-4 text-[10px]"}`}
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
					className?.includes("flex-col") ? "w-full" : ""
				} ${isSmall ? "h-8 px-3 text-[9px]" : "h-11 px-4 text-[10px]"}`}
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
