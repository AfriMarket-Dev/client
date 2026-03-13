import { useForm } from "@tanstack/react-form";
import { RiBuilding4Line, RiGlobeLine, RiMailLine, RiPhoneLine, RiWhatsappLine } from "@remixicon/react";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateCompanyMutation } from "@/services/api/companies";
import { FormField } from "@/shared/components";
import { getFormFieldErrors } from "@/lib/utils";
import type { Provider } from "@/types";

interface CompanyInfoSectionProps {
	provider: Provider;
}

export function CompanyInfoSection({ provider }: CompanyInfoSectionProps) {
	const [updateCompany, { isLoading }] = useUpdateCompanyMutation();

	const form = useForm({
		defaultValues: {
			name: provider.name || "",
			description: provider.description || "",
			phoneNumber: provider.phoneNumber || provider.phone || "",
			whatsappNumber: provider.whatsappNumber || "",
			email: provider.email || "",
			province: provider.province || "",
			district: provider.district || "",
			sector: provider.sector || "",
		},
		onSubmit: async ({ value }) => {
			try {
				await updateCompany({
					id: provider.id,
					data: value,
				}).unwrap();
				toast.success("Business profile updated successfully");
			} catch (error) {
				console.error(error);
				toast.error("Failed to update business details");
			}
		},
	});

	return (
		<div className="space-y-12">
			{/* Brand Header */}
			<div className="relative h-48 bg-muted border border-border group overflow-hidden">
				<div className="absolute inset-0 blueprint-grid opacity-[0.05] pointer-events-none" />
				{provider.logoUrl ? (
					<img src={provider.logoUrl} alt="Logo" className="w-full h-full object-cover opacity-40" />
				) : (
					<div className="w-full h-full flex items-center justify-center text-foreground/10 text-6xl font-display font-black">
						{provider.name?.charAt(0) || "B"}
					</div>
				)}
				<div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500">
					<Button
						variant="outline"
						className="bg-background border-border font-heading font-black uppercase text-[9px] tracking-[0.2em] h-11 px-6 rounded-none shadow-xl"
					>
						<Upload className="w-3.5 h-3.5 mr-2" /> Change Brand Assets
					</Button>
				</div>
			</div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				className="space-y-10"
			>
				{/* 1. Identity & Narrative */}
				<div className="space-y-6">
					<div className="flex items-center gap-3">
						<RiBuilding4Line className="text-primary w-4 h-4" />
						<h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground">
							Entity Definition
						</h3>
					</div>
					
					<div className="grid gap-8">
						<form.Field
							name="name"
							children={(field) => (
								<FormField label="Official Business Name" error={getFormFieldErrors(field.state.meta.errors)}>
									<Input
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										className="h-12 bg-background font-bold uppercase tracking-wider rounded-none border-border/40 focus:border-primary/40 focus:ring-0"
									/>
								</FormField>
							)}
						/>

						<form.Field
							name="description"
							children={(field) => (
								<FormField label="Enterprise Abstract" error={getFormFieldErrors(field.state.meta.errors)}>
									<Textarea
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										rows={4}
										className="bg-background font-medium text-xs leading-relaxed rounded-none border-border/40 focus:border-primary/40 focus:ring-0 resize-none uppercase tracking-wide"
										placeholder="Describe your business operations..."
									/>
								</FormField>
							)}
						/>
					</div>
				</div>

				{/* 2. Interaction Channels */}
				<div className="space-y-6">
					<div className="flex items-center gap-3">
						<RiGlobeLine className="text-primary w-4 h-4" />
						<h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground">
							Engagement Channels
						</h3>
					</div>

					<div className="grid md:grid-cols-2 gap-8">
						<form.Field
							name="phoneNumber"
							children={(field) => (
								<FormField label="Direct Line" error={getFormFieldErrors(field.state.meta.errors)}>
									<div className="relative">
										<RiPhoneLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
										<Input
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											className="h-12 pl-10 bg-background font-mono text-xs font-bold rounded-none border-border/40 focus:border-primary/40 focus:ring-0"
											placeholder="+250..."
										/>
									</div>
								</FormField>
							)}
						/>

						<form.Field
							name="whatsappNumber"
							children={(field) => (
								<FormField label="WhatsApp Protocol" error={getFormFieldErrors(field.state.meta.errors)}>
									<div className="relative">
										<RiWhatsappLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
										<Input
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											className="h-12 pl-10 bg-background font-mono text-xs font-bold rounded-none border-border/40 focus:border-primary/40 focus:ring-0"
											placeholder="+250..."
										/>
									</div>
								</FormField>
							)}
						/>

						<form.Field
							name="email"
							children={(field) => (
								<FormField label="Official Correspondence" error={getFormFieldErrors(field.state.meta.errors)}>
									<div className="relative">
										<RiMailLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
										<Input
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											className="h-12 pl-10 bg-background font-mono text-xs font-bold rounded-none border-border/40 focus:border-primary/40 focus:ring-0"
											placeholder="office@business.rw"
										/>
									</div>
								</FormField>
							)}
						/>
					</div>
				</div>

				<div className="pt-6 border-t border-border/20">
					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
						children={([canSubmit, isSubmitting]) => (
							<Button
								type="submit"
								disabled={!canSubmit || isSubmitting || isLoading}
								className="w-full h-14 rounded-none font-heading font-black uppercase tracking-[0.3em] text-[11px] shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
							>
								{isSubmitting || isLoading ? "Committing Updates..." : "Save Business Profile"}
							</Button>
						)}
					/>
				</div>
			</form>
		</div>
	);
}
