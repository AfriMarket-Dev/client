import {
	RiBuilding4Line,
	RiGlobeLine,
	RiMailLine,
	RiPhoneLine,
	RiWhatsappLine,
} from "@remixicon/react";
import { useForm } from "@tanstack/react-form";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getFormFieldErrors } from "@/lib/utils";
import { useUpdateCompanyMutation } from "@/services/api/companies";
import { FormField } from "@/shared/components/form-field";
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
			website: provider.website || "",
			socialLinks: {
				facebook: provider.socialLinks?.facebook || "",
				instagram: provider.socialLinks?.instagram || "",
				linkedin: provider.socialLinks?.linkedin || "",
				twitter: provider.socialLinks?.twitter || "",
				youtube: provider.socialLinks?.youtube || "",
			},
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
			<div className="relative h-48 bg-muted border border-border rounded-none group overflow-hidden shadow-none">
				{provider.logoUrl ? (
					<img
						src={provider.logoUrl}
						alt="Logo"
						className="w-full h-full object-cover opacity-40"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center text-foreground/10 text-6xl font-bold">
						{provider.name?.charAt(0) || "B"}
					</div>
				)}
				<div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300">
					<Button
						variant="outline"
						className="bg-background border-border font-bold uppercase text-[10px] tracking-widest h-10 px-6 rounded-none shadow-none"
					>
						<Upload className="w-4 h-4 mr-2" /> Change Brand Assets
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
						<h3 className="text-sm font-bold text-foreground uppercase tracking-tight">
							Entity Definition
						</h3>
					</div>

					<div className="grid gap-8">
						<form.Field
							name="name"
							children={(field) => (
								<FormField
									label="Official Business Name"
									error={getFormFieldErrors(field.state.meta.errors)}
								>
									<Input
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										className="h-11 bg-background font-medium rounded-none border-border focus:ring-1 focus:ring-primary/20 shadow-none"
									/>
								</FormField>
							)}
						/>

						<form.Field
							name="description"
							children={(field) => (
								<FormField
									label="Enterprise Abstract"
									error={getFormFieldErrors(field.state.meta.errors)}
								>
									<Textarea
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										rows={4}
										className="bg-background font-medium text-sm leading-relaxed rounded-none border-border focus:ring-1 focus:ring-primary/20 resize-none shadow-none"
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
						<h3 className="text-sm font-bold text-foreground uppercase tracking-tight">
							Engagement Channels
						</h3>
					</div>

					<div className="grid md:grid-cols-2 gap-8">
						<form.Field
							name="phoneNumber"
							children={(field) => (
								<FormField
									label="Direct Line"
									error={getFormFieldErrors(field.state.meta.errors)}
								>
									<div className="relative">
										<RiPhoneLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
										<Input
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											className="h-11 pl-10 bg-background font-medium text-sm rounded-none border-border focus:ring-1 focus:ring-primary/20 shadow-none"
											placeholder="+250..."
										/>
									</div>
								</FormField>
							)}
						/>

						<form.Field
							name="whatsappNumber"
							children={(field) => (
								<FormField
									label="WhatsApp Protocol"
									error={getFormFieldErrors(field.state.meta.errors)}
								>
									<div className="relative">
										<RiWhatsappLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
										<Input
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											className="h-11 pl-10 bg-background font-medium text-sm rounded-none border-border focus:ring-1 focus:ring-primary/20 shadow-none"
											placeholder="+250..."
										/>
									</div>
								</FormField>
							)}
						/>

						<form.Field
							name="email"
							children={(field) => (
								<FormField
									label="Official Correspondence"
									error={getFormFieldErrors(field.state.meta.errors)}
								>
									<div className="relative">
										<RiMailLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
										<Input
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											className="h-11 pl-10 bg-background font-medium text-sm rounded-none border-border focus:ring-1 focus:ring-primary/20 shadow-none"
											placeholder="office@business.rw"
										/>
									</div>
								</FormField>
							)}
						/>

						<form.Field
							name="website"
							children={(field) => (
								<FormField
									label="Digital Domain (Website)"
									error={getFormFieldErrors(field.state.meta.errors)}
								>
									<div className="relative">
										<RiGlobeLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
										<Input
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											className="h-11 pl-10 bg-background font-medium text-sm rounded-none border-border focus:ring-1 focus:ring-primary/20 shadow-none"
											placeholder="https://www.business.rw"
										/>
									</div>
								</FormField>
							)}
						/>
					</div>

					<div className="h-px bg-border/40 my-8" />

					<p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-6">
						Social Presence Protocols
					</p>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						<form.Field
							name="socialLinks.facebook"
							children={(field) => (
								<FormField
									label="Facebook Identifier"
									error={getFormFieldErrors(field.state.meta.errors)}
								>
									<Input
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										className="h-11 bg-background font-medium text-sm rounded-none border-border focus:ring-1 focus:ring-primary/20 shadow-none"
										placeholder="facebook.com/username"
									/>
								</FormField>
							)}
						/>

						<form.Field
							name="socialLinks.instagram"
							children={(field) => (
								<FormField
									label="Instagram Handle"
									error={getFormFieldErrors(field.state.meta.errors)}
								>
									<Input
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										className="h-11 bg-background font-medium text-sm rounded-none border-border focus:ring-1 focus:ring-primary/20 shadow-none"
										placeholder="@username"
									/>
								</FormField>
							)}
						/>

						<form.Field
							name="socialLinks.linkedin"
							children={(field) => (
								<FormField
									label="LinkedIn Presence"
									error={getFormFieldErrors(field.state.meta.errors)}
								>
									<Input
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										className="h-11 bg-background font-medium text-sm rounded-none border-border focus:ring-1 focus:ring-primary/20 shadow-none"
										placeholder="linkedin.com/company/..."
									/>
								</FormField>
							)}
						/>

						<form.Field
							name="socialLinks.twitter"
							children={(field) => (
								<FormField
									label="X (Twitter) Feed"
									error={getFormFieldErrors(field.state.meta.errors)}
								>
									<Input
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										className="h-11 bg-background font-medium text-sm rounded-none border-border focus:ring-1 focus:ring-primary/20 shadow-none"
										placeholder="@username"
									/>
								</FormField>
							)}
						/>

						<form.Field
							name="socialLinks.youtube"
							children={(field) => (
								<FormField
									label="YouTube Channel"
									error={getFormFieldErrors(field.state.meta.errors)}
								>
									<Input
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										className="h-11 bg-background font-medium text-sm rounded-none border-border focus:ring-1 focus:ring-primary/20 shadow-none"
										placeholder="youtube.com/c/..."
									/>
								</FormField>
							)}
						/>
					</div>
				</div>

				<div className="pt-6 border-t border-border">
					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
						children={([canSubmit, isSubmitting]) => (
							<Button
								type="submit"
								disabled={!canSubmit || isSubmitting || isLoading}
								className="w-full h-12 rounded-none font-bold uppercase text-xs tracking-widest shadow-none transition-all active:scale-[0.98]"
							>
								{isSubmitting || isLoading
									? "Committing Updates..."
									: "Save Business Profile"}
							</Button>
						)}
					/>
				</div>
			</form>
		</div>
	);
}
