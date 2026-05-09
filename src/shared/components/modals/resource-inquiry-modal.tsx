import {
	RiMessage3Line,
	RiPhoneLine,
	RiSendPlane2Line,
	RiWhatsappLine,
} from "@remixicon/react";
import { useForm } from "@tanstack/react-form";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn, getFormFieldErrors } from "@/lib/utils";
import { FormField } from "@/shared/components/form-field";
import { ResponsiveModal } from "@/shared/components/responsive-modal";
import {
	type ContactFormValues,
	contactSchema,
} from "@/shared/schemas/business";
import type { Company, ProviderRef } from "@/types";

interface ResourceInquiryModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	resourceName: string;
	resourceType: "PRODUCT" | "SERVICE" | "AUCTION";
	company?: Company | ProviderRef;
	onSubmit: (message: string) => void;
	isLoading?: boolean;
}

type ContactMethod = "MESSAGE" | "WHATSAPP" | "CALL";

export const ResourceInquiryModal: React.FC<ResourceInquiryModalProps> = ({
	isOpen,
	onOpenChange,
	resourceName,
	resourceType,
	company,
	onSubmit,
	isLoading = false,
}) => {
	const [method, setMethod] = useState<ContactMethod>("MESSAGE");

	const form = useForm({
		defaultValues: {
			message: `I'm interested in "${resourceName}". Please provide more details.`,
		} as ContactFormValues,
		validators: {
			onChange: contactSchema,
		},
		onSubmit: async ({ value }) => {
			onSubmit(value.message);
			form.reset();
		},
	});

	const labels = {
		PRODUCT: {
			title: "Inventory Inquiry",
			description: `Establish communication regarding "${resourceName}".`,
			submit: "Transmit Message",
		},
		SERVICE: {
			title: "Service Specification",
			description: `Discuss technical requirements for "${resourceName}".`,
			submit: "Request Quote",
		},
		AUCTION: {
			title: "Bid Inquiry",
			description: `Inquire about auction item "${resourceName}".`,
			submit: "Send Query",
		},
	}[resourceType];

	const phone = company
		? "phoneNumber" in company
			? company.phoneNumber
			: company.phone
		: undefined;
	const whatsapp = company
		? "whatsappNumber" in company
			? company.whatsappNumber
			: phone
		: undefined;

	return (
		<ResponsiveModal
			open={isOpen}
			onOpenChange={(open) => {
				onOpenChange(open);
				if (!open) {
					form.reset();
					setMethod("MESSAGE");
				}
			}}
			className="p-0 overflow-hidden !max-w-xl"
		>
			<div className="flex flex-col bg-background h-full max-h-[90vh]">
				{/* Header Section */}
				<div className="p-8 pb-4 border-b border-border space-y-2">
					<div className="flex items-center gap-3 mb-1">
						<div className="h-4 w-1 bg-primary" />
						<h2 className="font-display font-black uppercase text-xl tracking-tight leading-none">
							{labels.title}
						</h2>
					</div>
					<p className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground">
						Protocol: {resourceName}
					</p>
				</div>

				<div className="p-8 space-y-8 overflow-y-auto">
					{/* Method Selector */}
					<div className="space-y-4">
						<label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">
							Select Interaction Channel
						</label>
						<div className="grid grid-cols-3 gap-2">
							<button
								type="button"
								onClick={() => setMethod("MESSAGE")}
								className={cn(
									"flex flex-col items-center justify-center p-4 border border-border transition-all gap-2",
									method === "MESSAGE"
										? "bg-primary text-background border-primary"
										: "hover:bg-muted/50",
								)}
							>
								<RiMessage3Line size={20} />
								<span className="text-[9px] font-black uppercase tracking-widest">
									Portal
								</span>
							</button>
							<button
								type="button"
								disabled={!whatsapp}
								onClick={() => setMethod("WHATSAPP")}
								className={cn(
									"flex flex-col items-center justify-center p-4 border border-border transition-all gap-2",
									!whatsapp && "opacity-30 grayscale cursor-not-allowed",
									method === "WHATSAPP"
										? "bg-success text-background border-success"
										: "hover:bg-muted/50",
								)}
							>
								<RiWhatsappLine size={20} />
								<span className="text-[9px] font-black uppercase tracking-widest">
									WhatsApp
								</span>
							</button>
							<button
								type="button"
								disabled={!phone}
								onClick={() => setMethod("CALL")}
								className={cn(
									"flex flex-col items-center justify-center p-4 border border-border transition-all gap-2",
									!phone && "opacity-30 grayscale cursor-not-allowed",
									method === "CALL"
										? "bg-info text-background border-info"
										: "hover:bg-muted/50",
								)}
							>
								<RiPhoneLine size={20} />
								<span className="text-[9px] font-black uppercase tracking-widest">
									Voice
								</span>
							</button>
						</div>
					</div>

					{/* Dynamic Content based on Method */}
					<div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
						{method === "MESSAGE" ? (
							<form
								onSubmit={(e) => {
									e.preventDefault();
									e.stopPropagation();
									form.handleSubmit();
								}}
								className="space-y-6"
							>
								<form.Field
									name="message"
									children={(field) => (
										<FormField
											label="Inquiry Details"
											error={getFormFieldErrors(field.state.meta.errors)}
										>
											<Textarea
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder="Describe your requirements or volume needs..."
												className="min-h-40 rounded-none border-border bg-muted/5 p-4 resize-none focus-visible:ring-0 focus-visible:border-primary text-sm font-medium transition-all"
											/>
										</FormField>
									)}
								/>
								<div className="flex flex-col gap-3 pt-2">
									<form.Subscribe
										selector={(state) => [state.canSubmit, state.isSubmitting]}
										children={([canSubmit, isSubmitting]) => (
											<Button
												type="submit"
												className="w-full rounded-none h-14 text-[10px] font-black uppercase tracking-[0.2em] shadow-none"
												disabled={!canSubmit || isSubmitting || isLoading}
											>
												<RiSendPlane2Line size={16} className="mr-3" />
												{isSubmitting || isLoading
													? "Transmitting..."
													: labels.submit}
											</Button>
										)}
									/>
									<Button
										type="button"
										variant="ghost"
										onClick={() => onOpenChange(false)}
										className="w-full rounded-none h-12 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground"
									>
										Cancel
									</Button>
								</div>
							</form>
						) : (
							<div className="space-y-8 py-4">
								<div className="p-6 bg-muted/5 border border-border space-y-4">
									<h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
										Direct Provider Access
									</h4>
									<p className="text-xl font-display font-black tracking-tighter">
										{method === "WHATSAPP" ? whatsapp : phone}
									</p>
									<p className="text-xs text-muted-foreground leading-relaxed">
										You are initiating a direct communication outside of the
										platform. Please mention you found them on{" "}
										<span className="text-foreground font-bold">
											AfriMarket
										</span>
										.
									</p>
								</div>
								<div className="flex flex-col gap-3">
									<Button
										render={(props) => (
											<a
												{...props}
												href={
													method === "WHATSAPP"
														? `https://wa.me/${whatsapp?.replace(/\D/g, "")}`
														: `tel:${phone}`
												}
												target="_blank"
												rel="noopener noreferrer"
											>
												{method === "WHATSAPP" ? (
													<RiWhatsappLine size={18} className="mr-3" />
												) : (
													<RiPhoneLine size={18} className="mr-3" />
												)}
												Launch{" "}
												{method === "WHATSAPP" ? "WhatsApp Chat" : "Voice Call"}
											</a>
										)}
										className={cn(
											"w-full rounded-none h-14 text-[10px] font-black uppercase tracking-[0.2em] shadow-none",
											method === "WHATSAPP"
												? "bg-success text-background hover:bg-success/90"
												: "bg-info text-background hover:bg-info/90",
										)}
									/>
									<Button
										type="button"
										variant="ghost"
										onClick={() => setMethod("MESSAGE")}
										className="w-full rounded-none h-12 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground"
									>
										Back to Portal Message
									</Button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</ResponsiveModal>
	);
};
