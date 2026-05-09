import { RiInformationLine } from "@remixicon/react";
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
import { useGetProductCategoriesQuery } from "@/services/api/product-categories";
import { FormField } from "@/shared/components/form-field";
import {
	FormGrid,
	FormSection,
} from "@/shared/components/forms/form-components";
import { ImageUploadSection } from "@/shared/components/forms/image-upload-section";
import { ResourceFormLayout } from "@/shared/components/forms/resource-form-layout";
import { SpecificationManager } from "@/shared/components/forms/specification-manager";
import {
	type ProductFormValues,
	productOptions,
	productSchema,
} from "@/shared/schemas/business";
import type { FileWithPreview } from "@/types/ui";

export type { ProductFormValues };

interface ProductFormProps {
	onSubmit: (values: ProductFormValues) => void;
	onCancel: () => void;
	initialValues?: Partial<ProductFormValues>;
	isLoading?: boolean;
	serverError?: string;
	submitLabel?: string;
	showPricing?: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({
	onSubmit,
	onCancel,
	initialValues,
	isLoading,
	serverError,
	submitLabel,
	showPricing = false,
}) => {
	const { data: categoriesData } = useGetProductCategoriesQuery({ limit: 100 });
	const categories = categoriesData?.data ?? [];
	const [uploadMedia, { isLoading: isUploading }] = useUploadMediaMutation();
	const [newFiles, setNewFiles] = useState<FileWithPreview[]>([]);

	const form = useForm({
		...productOptions,
		defaultValues: {
			...productOptions.defaultValues,
			...initialValues,
		} as ProductFormValues,
		onSubmit: async ({ value }) => {
			let newUploadedUrls: string[] = [];
			const filesToUpload = newFiles
				.map((f) => f.file)
				.filter((f): f is File => f instanceof File);

			if (filesToUpload.length > 0) {
				const formData = new FormData();
				for (const f of filesToUpload) {
					formData.append("files", f);
				}
				formData.append("folder", "products");
				try {
					const res = await uploadMedia(formData).unwrap();
					newUploadedUrls = res.map((r) => r.url);
				} catch (uploadErr) {
					console.error("Upload failed", uploadErr);
					toast.error("Failed to upload new images. Please try again.");
					return;
				}
			}

			const finalValues = {
				...value,
				images: [...(value.images || []), ...newUploadedUrls],
			};
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
					submitLabel={
						submitLabel ||
						(initialValues?.name ? "Save Changes" : "Create Product")
					}
					submittingLabel={isUploading ? "Uploading Images..." : "Saving..."}
				>
					<FormSection
						title="Core Information"
						description="Basic product identity and pricing model"
					>
						<form.Field
							name="name"
							validators={{ onChange: productSchema.shape.name }}
							children={(field) => (
								<FormField
									id={field.name}
									label="Product Name"
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
										placeholder="Enter product name"
									/>
								</FormField>
							)}
						/>

						<FormGrid>
							<form.Field
								name="categoryId"
								validators={{ onChange: productSchema.shape.categoryId }}
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
													<SelectValue placeholder="Select Category">
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
													{categories.map(
														(cat: { id: string; name: string }) => (
															<SelectItem
																key={cat.id}
																value={cat.id}
																className="rounded-none"
															>
																{cat.name}
															</SelectItem>
														),
													)}
												</SelectContent>
											</Select>
										</FormField>
									);
								}}
							/>

							<form.Field
								name="priceType"
								validators={{ onChange: productSchema.shape.priceType }}
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
														val as ProductFormValues["priceType"],
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
						</FormGrid>

						<form.Field
							name="description"
							validators={{ onChange: productSchema.shape.description }}
							children={(field) => (
								<FormField
									id={field.name}
									label="Description"
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
										placeholder="Describe your product in detail..."
									/>
								</FormField>
							)}
						/>
					</FormSection>

					{showPricing && (
						<FormSection
							title="Initial Inventory"
							description="Set starting price and stock for your first variant"
						>
							<FormGrid>
								<form.Field
									name="price"
									validators={{
										onChange: ({ value }) => {
											const parsed = Number(value);
											if (Number.isNaN(parsed) || parsed < 0)
												return "Invalid price";
											return undefined;
										},
									}}
									children={(field) => {
										const isNegotiable = priceType === "NEGOTIABLE";
										return (
											<FormField
												id={field.name}
												label="Price (RWF)"
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
								<form.Field
									name="stock"
									validators={{
										onChange: ({ value }) => {
											const parsed = Number(value);
											if (Number.isNaN(parsed) || parsed < 0)
												return "Invalid stock";
											return undefined;
										},
									}}
									children={(field) => (
										<FormField
											id={field.name}
											label="Stock Quantity"
											required
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

							<form.Field
								name="unit"
								validators={{ onChange: productSchema.shape.unit }}
								children={(field) => (
									<FormField
										id={field.name}
										label="Unit"
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
											placeholder="e.g. piece, kg, box"
										/>
									</FormField>
								)}
							/>
						</FormSection>
					)}

					{!showPricing && initialValues?.name && (
						<div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/10 rounded-none mb-8">
							<RiInformationLine className="size-5 text-primary shrink-0 mt-0.5" />
							<p className="text-[10px] font-bold text-primary uppercase tracking-widest leading-relaxed">
								To manage specific pricing, stock levels, or product options
								like sizes and colors, please switch to the{" "}
								<span className="underline italic">Inventory</span> tab.
							</p>
						</div>
					)}

					<FormSection
						title="Detailed Specs"
						description="Add technical details and metadata"
					>
						<form.Field
							name="specifications"
							children={(field) => (
								<SpecificationManager
									value={field.state.value as Record<string, string>}
									onChange={(val) => field.handleChange(val)}
								/>
							)}
						/>
					</FormSection>

					<FormSection
						title="Gallery"
						description="General product images for the showcase"
					>
						<form.Field
							name="images"
							mode="array"
							children={(field) => (
								<ImageUploadSection
									field={field}
									folder="products"
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
