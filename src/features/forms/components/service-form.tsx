import { RiTimeLine } from "@remixicon/react";
import { useForm } from "@tanstack/react-form";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getFormFieldErrors } from "@/lib/utils";
import { useUploadMediaMutation } from "@/services/api/media";
import { useGetServiceCategoriesQuery } from "@/services/api/service-categories";
import { FormField } from "@/shared/components/form-field";
import {
	FormGrid,
	FormSection,
} from "@/shared/components/forms/form-components";
import { ImageUploadSection } from "@/shared/components/forms/image-upload-section";
import { ResourceFormLayout } from "@/shared/components/forms/resource-form-layout";
import { SpecificationManager } from "@/shared/components/forms/specification-manager";
import {
	type ServiceFormValues,
	serviceOptions,
	serviceSchema,
} from "@/shared/schemas/business";
import type { FileWithPreview } from "@/types/ui";

interface ServiceFormProps {
	onSubmit: (values: ServiceFormValues) => void;
	onCancel: () => void;
	initialValues?: Partial<ServiceFormValues>;
	isLoading?: boolean;
	serverError?: string;
}

export const ServiceForm: React.FC<ServiceFormProps> = ({
	onSubmit,
	onCancel,
	initialValues,
	isLoading,
	serverError,
}) => {
	const { data: categoriesData } = useGetServiceCategoriesQuery({ limit: 100 });
	const categories = categoriesData?.data ?? [];
	const [uploadMedia, { isLoading: isUploading }] = useUploadMediaMutation();
	const [newFiles, setNewFiles] = useState<FileWithPreview[]>([]);

	const form = useForm({
		...serviceOptions,
		defaultValues: {
			...serviceOptions.defaultValues,
			...initialValues,
		} as ServiceFormValues,
		onSubmit: async ({ value }) => {
			console.log("ServiceForm onSubmit starting with value:", value);
			let newUploadedUrls: string[] = [];
			const filesToUpload = newFiles
				.map((f) => f.file)
				.filter((f): f is File => f instanceof File);

			if (filesToUpload.length > 0) {
				console.log(`Uploading ${filesToUpload.length} new files...`);
				const formData = new FormData();
				for (const f of filesToUpload) {
					formData.append("files", f);
				}
				formData.append("folder", "services");
				try {
					const res = await uploadMedia(formData).unwrap();
					newUploadedUrls = res.map((r) => r.url);
					console.log("Upload successful, URLs:", newUploadedUrls);
				} catch (uploadErr) {
					console.error("Upload failed", uploadErr);
					toast.error("Failed to upload portfolio images.");
					return;
				}
			}

			const finalValues = {
				...value,
				images: [...(value.images || []), ...newUploadedUrls],
			};
			console.log("Calling final onSubmit with:", finalValues);
			onSubmit(finalValues);
		},
	});

	return (
		<form.Subscribe
			selector={(state) => [
				state.canSubmit,
				state.isSubmitting,
				state.values.priceType,
			]}
			children={([canSubmit, isSubmitting, priceType]) => (
				<ResourceFormLayout
					onSubmit={() => form.handleSubmit()}
					onCancel={onCancel}
					canSubmit={!!canSubmit}
					isSubmitting={!!isSubmitting || isUploading}
					isLoading={isLoading}
					serverError={serverError}
					submitLabel={initialValues?.name ? "Save Changes" : "Create Service"}
					submittingLabel={isUploading ? "Uploading Portfolio..." : "Saving..."}
				>
					<FormSection
						title="Service Details"
						description="Define your expertise and categorization"
					>
						<form.Field
							name="name"
							validators={{ onChange: serviceSchema.shape.name }}
							children={(field) => (
								<FormField
									id={field.name}
									label="Service Name"
									required
									error={getFormFieldErrors(field.state.meta.errors)}
									isTouched={field.state.meta.isTouched}
								>
									<Input
										id={field.name}
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										className="h-11 text-sm bg-background rounded-none border-border/40 focus:border-primary/40 focus:ring-0"
										placeholder="e.g. Electrical Installation"
									/>
								</FormField>
							)}
						/>

						<form.Field
							name="categoryId"
							validators={{ onChange: serviceSchema.shape.categoryId }}
							children={(field) => {
								const selectedCategory = categories.find(
									(c) => c.id === field.state.value,
								);
								return (
									<FormField
										id={field.name}
										label="Category"
										required
										error={getFormFieldErrors(field.state.meta.errors)}
										isTouched={field.state.meta.isTouched}
									>
										<Select
											value={field.state.value || ""}
											onValueChange={(val) => field.handleChange(val ?? "")}
										>
											<SelectTrigger
												id={field.name}
												className="h-11 w-full bg-background rounded-none border-border/40 focus:ring-0"
											>
												<SelectValue placeholder="Select category">
													{selectedCategory ? (
														selectedCategory.name
													) : (
														<span className="text-muted-foreground">
															Select category
														</span>
													)}
												</SelectValue>
											</SelectTrigger>
											<SelectContent className="rounded-none border-border/40">
												{categories.map((cat: { id: string; name: string }) => (
													<SelectItem
														key={cat.id}
														value={cat.id}
														className="rounded-none"
													>
														{cat.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormField>
								);
							}}
						/>

						<form.Field
							name="description"
							validators={{ onChange: serviceSchema.shape.description }}
							children={(field) => (
								<FormField
									id={field.name}
									label="Service Description"
									required
									error={getFormFieldErrors(field.state.meta.errors)}
									isTouched={field.state.meta.isTouched}
								>
									<Textarea
										id={field.name}
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										rows={4}
										className="text-sm resize-none bg-background rounded-none border-border/40 focus:border-primary/40 focus:ring-0"
										placeholder="Describe your service in detail..."
									/>
								</FormField>
							)}
						/>
					</FormSection>

					<FormSection
						title="Pricing & Availability"
						description="Rates and delivery timelines"
					>
						<FormGrid>
							<form.Field
								name="priceType"
								validators={{ onChange: serviceSchema.shape.priceType }}
								children={(field) => (
									<FormField
										id={field.name}
										label="Pricing Type"
										required
										error={getFormFieldErrors(field.state.meta.errors)}
										isTouched={field.state.meta.isTouched}
									>
										<Select
											value={field.state.value || "FIXED"}
											onValueChange={(val) => {
												if (val)
													field.handleChange(
														val as ServiceFormValues["priceType"],
													);
											}}
										>
											<SelectTrigger
												id={field.name}
												className="h-11 w-full bg-background rounded-none border-border/40 focus:ring-0"
											>
												<SelectValue>
													{field.state.value === "FIXED" && "Fixed Price"}
													{field.state.value === "NEGOTIABLE" && "Negotiable"}
													{field.state.value === "STARTS_AT" && "Starts At"}
													{!field.state.value && "Select type"}
												</SelectValue>
											</SelectTrigger>
											<SelectContent className="rounded-none border-border/40">
												<SelectItem value="FIXED" className="rounded-none">
													Fixed Price
												</SelectItem>
												<SelectItem value="NEGOTIABLE" className="rounded-none">
													Negotiable
												</SelectItem>
												<SelectItem value="STARTS_AT" className="rounded-none">
													Starts At
												</SelectItem>
											</SelectContent>
										</Select>
									</FormField>
								)}
							/>
							<form.Field
								name="price"
								validators={{
									onChange: ({ value }: { value: string }) => {
										const parsed = Number(value);
										if (Number.isNaN(parsed) || parsed < 0)
											return "Rate must be a positive number";
										return undefined;
									},
								}}
								children={(field) => {
									const isNegotiable = priceType === "NEGOTIABLE";
									return (
										<FormField
											id={field.name}
											label="Rate (RWF)"
											required={!isNegotiable}
											error={getFormFieldErrors(field.state.meta.errors)}
											isTouched={field.state.meta.isTouched}
										>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												type="number"
												disabled={isNegotiable}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												className="h-11 text-sm bg-background rounded-none border-border/40 focus:border-primary/40 focus:ring-0"
												placeholder={isNegotiable ? "N/A" : "0.00"}
											/>
										</FormField>
									);
								}}
							/>
						</FormGrid>

						<FormGrid>
							<form.Field
								name="duration"
								validators={{ onChange: serviceSchema.shape.duration }}
								children={(field) => (
									<FormField
										id={field.name}
										label="Duration"
										required
										error={getFormFieldErrors(field.state.meta.errors)}
										isTouched={field.state.meta.isTouched}
									>
										<div className="relative group">
											<RiTimeLine className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												className="h-11 text-sm bg-background pl-10 rounded-none border-border/40 focus:border-primary/40 focus:ring-0"
												placeholder="e.g. 2-3 days"
											/>
										</div>
									</FormField>
								)}
							/>
							<form.Field
								name="discount"
								validators={{
									onChange: ({ value }: { value: string }) => {
										const parsed = Number(value);
										if (Number.isNaN(parsed) || parsed < 0 || parsed > 100)
											return "Discount must be between 0 and 100";
										return undefined;
									},
								}}
								children={(field) => (
									<FormField
										id={field.name}
										label="Discount (%)"
										error={getFormFieldErrors(field.state.meta.errors)}
										isTouched={field.state.meta.isTouched}
									>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											type="number"
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											className="h-11 text-sm bg-background rounded-none border-border/40 focus:border-primary/40 focus:ring-0"
											placeholder="0"
										/>
									</FormField>
								)}
							/>
						</FormGrid>
					</FormSection>

					<FormSection
						title="Service Metadata"
						description="Technical details and capabilities"
					>
						<form.Field
							name="specifications"
							children={(field) => (
								<SpecificationManager
									value={field.state.value as Record<string, string>}
									onChange={(val) => field.handleChange(val)}
									label="Service Details"
								/>
							)}
						/>
					</FormSection>

					<FormSection
						title="Portfolio"
						description="Showcase previous work and samples"
					>
						<form.Field
							name="images"
							mode="array"
							children={(field) => (
								<ImageUploadSection
									field={field}
									folder="services"
									onFilesChange={setNewFiles}
								/>
							)}
						/>
					</FormSection>
				</ResourceFormLayout>
			)}
		/>
	);
};
