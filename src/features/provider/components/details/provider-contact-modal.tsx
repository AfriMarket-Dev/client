import {
	RiMailLine,
	RiPhoneLine,
	RiSendPlane2Line,
	RiWhatsappLine,
} from "@remixicon/react";
import { useForm } from "@tanstack/react-form";
import type React from "react";
import { Button } from "@/components/ui/button";
import { getFormFieldErrors } from "@/lib/utils";
import { FormField } from "@/shared/components/form-field";
import { ResponsiveModal } from "@/shared/components/responsive-modal";
import {
	type ContactFormValues,
	contactSchema,
} from "@/shared/schemas/business";
import type { Company } from "@/types";

interface ProviderContactModalProps {
	company: Company;
	sendingInquiry: boolean;
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (message: string) => void;
}

export const ProviderContactModal: React.FC<ProviderContactModalProps> = ({
	company,
	sendingInquiry,
	isOpen,
	onClose,
	onSubmit,
}) => {
	const form = useForm({
		defaultValues: {
			message: "",
		} as ContactFormValues,
		validators: {
			onChange: contactSchema,
		},
		onSubmit: async ({ value }) => {
			onSubmit(value.message);
			form.reset();
		},
	});

	const phone = company.phoneNumber || company.phone;
	const whatsapp = company.whatsappNumber || phone;

	const contactMethods = [
		{
			icon: <RiWhatsappLine className="w-5 h-5" />,
			label: "Direct WhatsApp",
			value: whatsapp || "Not available",
			actionLabel: "Chat",
			disabled: !whatsapp,
			color: "text-success",
			href: whatsapp
				? `https://wa.me/${whatsapp.replace(/\D/g, "")}`
				: undefined,
		},
		{
			icon: <RiPhoneLine className="w-5 h-5" />,
			label: "Phone Line",
			value: phone || "Not available",
			actionLabel: "Call",
			disabled: !phone,
			color: "text-info",
			href: phone ? `tel:${phone}` : undefined,
		},
		{
			icon: <RiMailLine className="w-5 h-5" />,
			label: "Email Address",
			value: company.email || "Not available",
			actionLabel: "Mail",
			disabled: !company.email,
			color: "text-warning",
			href: company.email ? `mailto:${company.email}` : undefined,
		},
	];

	return (
		<ResponsiveModal
			open={isOpen}
			onOpenChange={(open) => {
				if (!open) {
					onClose();
					form.reset();
				}
			}}
			className="p-0 overflow-hidden !max-w-4xl"
		>
			<div className="flex flex-col md:flex-row h-full max-h-[90vh] md:max-h-[600px]">
				{/* Left Side: Contact Info */}
				<div className="flex-1 p-8 sm:p-10 space-y-8 bg-muted/5 border-b md:border-b-0 md:border-r border-border overflow-y-auto">
					<div className="space-y-2 mb-10">
						<h2 className="font-display font-black uppercase text-3xl tracking-tighter leading-none">
							Contact
							<br />
							Provider
						</h2>
						<div className="h-1 w-12 bg-primary mt-4" />
						<p className="text-[10px] uppercase font-black tracking-[0.3em] text-muted-foreground pt-2">
							{company.name}
						</p>
					</div>

					<div className="space-y-6">
						{contactMethods.map((method, idx) => (
							<div
								key={idx}
								className={`group flex items-center justify-between p-5 border border-border bg-background ${
									method.disabled
										? "opacity-40 grayscale"
										: "hover:border-primary/50"
								} transition-all duration-300`}
							>
								<div className="flex items-center gap-5">
									<div
										className={`w-12 h-12 flex items-center justify-center bg-muted/30 ${method.color} transition-colors group-hover:bg-primary group-hover:text-background`}
									>
										{method.icon}
									</div>
									<div className="space-y-1">
										<span className="text-[9px] block uppercase font-black text-muted-foreground tracking-widest">
											{method.label}
										</span>
										<span className="text-sm font-bold text-foreground leading-none truncate max-w-[150px] block">
											{method.value}
										</span>
									</div>
								</div>
								{!method.disabled && (
									<a
										href={method.href}
										className="h-9 px-4 flex items-center justify-center border border-border text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:text-background hover:border-primary transition-all"
									>
										{method.actionLabel}
									</a>
								)}
							</div>
						))}
					</div>
				</div>

				{/* Right Side: Message Form */}
				<div className="flex-1 flex flex-col p-8 sm:p-10 bg-background">
					<div className="mb-8">
						<h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground mb-1">
							Inquiry Protocol
						</h3>
						<p className="text-xs text-muted-foreground">
							Send a direct message to their dashboard
						</p>
					</div>

					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
						className="flex-1 flex flex-col space-y-6"
					>
						<form.Field
							name="message"
							children={(field) => (
								<FormField
									label="Message Specification"
									error={getFormFieldErrors(field.state.meta.errors)}
									className="flex-1 flex flex-col"
								>
									<textarea
										id={field.name}
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder="Describe your requirements in detail..."
										className="flex-1 w-full min-h-[150px] p-5 border border-border rounded-none text-sm font-medium focus:border-primary focus:ring-0 outline-none resize-none bg-muted/5 transition-all"
									/>
								</FormField>
							)}
						/>

						<div className="space-y-3 pt-4">
							<form.Subscribe
								selector={(state) => [state.canSubmit, state.isSubmitting]}
								children={([canSubmit, isSubmitting]) => (
									<Button
										type="submit"
										disabled={!canSubmit || sendingInquiry || isSubmitting}
										className="w-full rounded-none h-14 text-[11px] font-black uppercase tracking-[0.25em] shadow-none group"
									>
										{sendingInquiry || isSubmitting ? (
											"Transmitting..."
										) : (
											<>
												<RiSendPlane2Line
													size={16}
													className="mr-3 group-hover:translate-x-1 transition-transform"
												/>
												Deploy Message
											</>
										)}
									</Button>
								)}
							/>
							<Button
								type="button"
								onClick={onClose}
								variant="ghost"
								className="w-full rounded-none h-12 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
							>
								Cancel
							</Button>
						</div>
					</form>
				</div>
			</div>
		</ResponsiveModal>
	);
};
