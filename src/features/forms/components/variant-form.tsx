import { useForm } from "@tanstack/react-form";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { getFormFieldErrors } from "@/lib/utils";
import { useUploadMediaMutation } from "@/services/api/media";
import { FormField } from "@/shared/components/form-field";
import { ImageUploadSection } from "@/shared/components/forms/image-upload-section";
import { ResourceFormLayout } from "@/shared/components/forms/resource-form-layout";
import { FormGrid, FormSection } from "@/shared/components/forms/form-components";
import {
	type VariantFormValues,
	variantOptions,
	variantSchema,
} from "@/shared/schemas/business";
import type { FileWithPreview } from "@/types/ui";

interface VariantFormProps {
	onSubmit: (values: VariantFormValues) => void;
	onCancel: () => void;
	initialValues?: Partial<VariantFormValues>;
	isLoading?: boolean;
	serverError?: string;
	submitLabel?: string;
}

export const VariantForm: React.FC<VariantFormProps> = ({
	onSubmit,
	onCancel,
	initialValues,
	isLoading,
	serverError,
	submitLabel = "Save Variant",
}) => {
	const [uploadMedia, { isLoading: isUploading }] = useUploadMediaMutation();
	const [newFiles, setNewFiles] = useState<FileWithPreview[]>([]);

	const form = useForm({
		...variantOptions,
		defaultValues: {
			...variantOptions.defaultValues,
			...initialValues,
		} as VariantFormValues,
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
					toast.error("Failed to upload variant images.");
					return;
				}
			}

			onSubmit({
				...value,
				images: [...(value.images || []), ...newUploadedUrls],
			});
		},
	});

	return (
		<form.Subscribe
			selector={(state) => [state.canSubmit, state.isSubmitting]}
			children={([canSubmit, isSubmitting]) => (
				<ResourceFormLayout
					onSubmit={() => form.handleSubmit()}
					onCancel={onCancel}
					canSubmit={canSubmit}
					isSubmitting={isSubmitting || isUploading}
					isLoading={isLoading}
					serverError={serverError}
					submitLabel={submitLabel}
					submittingLabel="Saving..."
				>
					<FormSection title="Variant Identity" description="Unique name and identifier for this option">
						<FormGrid>
							<form.Field
								name="name"
								validators={{ onChange: variantSchema.shape.name }}
								children={(field) => (
									<FormField
										label="Variant Name"
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
											className="h-11 rounded-none border-border/40 focus:border-primary/40 focus:ring-0 text-sm"
											placeholder="e.g. Standard, Blue / XL"
										/>
									</FormField>
								)}
							/>
							<form.Field
								name="sku"
								children={(field) => (
									<FormField
										label="SKU (Optional)"
										error={getFormFieldErrors(field.state.meta.errors)}
										isTouched={field.state.meta.isTouched}
									>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											className="h-11 rounded-none border-border/40 focus:border-primary/40 focus:ring-0 text-sm"
											placeholder="e.g. SOL-400W-BLK"
										/>
									</FormField>
								)}
							/>
						</FormGrid>
					</FormSection>

					<FormSection title="Inventory" description="Pricing and stock management">
						<FormGrid cols={3}>
							<form.Field
								name="price"
								validators={{
									onChange: ({ value }) => {
										const parsed = Number(value);
										if (Number.isNaN(parsed) || parsed < 0) return "Invalid price";
										return undefined;
									},
								}}
								children={(field) => (
									<FormField
										label="Price (RWF)"
										required
										error={getFormFieldErrors(field.state.meta.errors)}
										isTouched={field.state.meta.isTouched}
									>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											type="number"
											min="0"
											step="0.01"
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											className="h-11 rounded-none border-border/40 focus:border-primary/40 focus:ring-0 text-sm"
										/>
									</FormField>
								)}
							/>
							<form.Field
								name="stock"
								validators={{
									onChange: ({ value }) => {
										const parsed = Number(value);
										if (Number.isNaN(parsed) || parsed < 0) return "Invalid stock";
										return undefined;
									},
								}}
								children={(field) => (
									<FormField
										label="Stock"
										required
										error={getFormFieldErrors(field.state.meta.errors)}
										isTouched={field.state.meta.isTouched}
									>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											type="number"
											min="0"
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											className="h-11 rounded-none border-border/40 focus:border-primary/40 focus:ring-0 text-sm"
										/>
									</FormField>
								)}
							/>
							<form.Field
								name="unit"
								validators={{ onChange: variantSchema.shape.unit }}
								children={(field) => (
									<FormField
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
											className="h-11 rounded-none border-border/40 focus:border-primary/40 focus:ring-0 text-sm"
											placeholder="e.g. piece, kg"
										/>
									</FormField>
								)}
							/>
						</FormGrid>
					</FormSection>

					<FormSection title="Visuals" description="Variant-specific image (optional)">
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
