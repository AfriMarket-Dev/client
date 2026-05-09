import {
	RiAddLine,
	RiDeleteBinLine,
	RiEditLine,
	RiInformationLine,
	RiListSettingsLine,
} from "@remixicon/react";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductForm } from "@/features/forms/components/product-form";
import { ServiceForm } from "@/features/forms/components/service-form";
import { VariantForm } from "@/features/forms/components/variant-form";
import {
	useAddProductVariantMutation,
	useGetProductByIdQuery,
	useRemoveProductVariantMutation,
	useUpdateProductMutation,
	useUpdateProductVariantMutation,
} from "@/services/api/products";
import {
	useGetServiceByIdQuery,
	useUpdateServiceMutation,
} from "@/services/api/services";
import { ResponsiveModal } from "@/shared/components/responsive-modal";
import {
	type ProductFormValues,
	type ServiceFormValues,
	type VariantFormValues,
} from "@/shared/schemas/business";
import type {
	CreateProductInput,
	CreateProductVariantInput,
	CreateServiceInput,
	ProductVariant,
} from "@/types";

function AddVariantDialog({
	open,
	onClose,
	onSubmit,
	isLoading,
}: {
	open: boolean;
	onClose: () => void;
	// biome-ignore lint/suspicious/noExplicitAny: form value mapping
	onSubmit: (data: any) => void;
	isLoading: boolean;
}) {
	return (
		<ResponsiveModal
			open={open}
			onOpenChange={(v) => !v && onClose()}
			title="Add Product Option"
			description="Create a new variant (e.g. Size, Color) for this product."
			size="md"
		>
			<div className="p-4 pt-0">
				<VariantForm
					onSubmit={onSubmit}
					onCancel={onClose}
					isLoading={isLoading}
					submitLabel="Add Variant"
				/>
			</div>
		</ResponsiveModal>
	);
}

function EditVariantDialog({
	open,
	onClose,
	onSubmit,
	isLoading,
	variant,
}: {
	open: boolean;
	onClose: () => void;
	// biome-ignore lint/suspicious/noExplicitAny: form value mapping
	onSubmit: (data: any) => void;
	isLoading: boolean;
	variant: ProductVariant | null;
}) {
	if (!variant) return null;

	return (
		<ResponsiveModal
			open={open}
			onOpenChange={(v) => !v && onClose()}
			title="Edit Option"
			description={`Update details for "${variant.name}"`}
			size="md"
		>
			<div className="p-4 pt-0">
				<VariantForm
					initialValues={{
						name: variant.name,
						sku: variant.sku ?? "",
						price: String(variant.price),
						stock: String(variant.stock),
						unit: variant.unit ?? "unit",
						images: variant.images ?? [],
					}}
					onSubmit={onSubmit}
					onCancel={onClose}
					isLoading={isLoading}
					submitLabel="Update Variant"
				/>
			</div>
		</ResponsiveModal>
	);
}

export function ProviderListingEditPage() {
	const { listingId } = useParams({
		from: "/dashboard/listings/$listingId/edit",
	});
	const search = useSearch({ strict: false });
	const itemType = (search as { type?: string }).type;
	const navigate = useNavigate();

	const [addVariantOpen, setAddVariantOpen] = useState(false);
	const [editingVariant, setEditingVariant] = useState<ProductVariant | null>(
		null,
	);

	// Product hooks
	const { data: product, isLoading: productLoading } = useGetProductByIdQuery(
		listingId ?? "",
		{ skip: !listingId || itemType !== "PRODUCT" },
	);
	const [updateProduct, { isLoading: updatingProduct }] =
		useUpdateProductMutation();
	const [addProductVariant, { isLoading: addVarLoading }] =
		useAddProductVariantMutation();
	const [updateProductVariant, { isLoading: updatingVar }] =
		useUpdateProductVariantMutation();
	const [removeProductVariant] = useRemoveProductVariantMutation();

	// Service hooks
	const { data: service, isLoading: serviceLoading } = useGetServiceByIdQuery(
		listingId ?? "",
		{ skip: !listingId || itemType !== "SERVICE" },
	);
	const [updateService, { isLoading: updatingService }] =
		useUpdateServiceMutation();

	const isLoading = itemType === "PRODUCT" ? productLoading : serviceLoading;
	const isUpdating = itemType === "PRODUCT" ? updatingProduct : updatingService;
	const item = itemType === "PRODUCT" ? product : service;

	if (
		!listingId ||
		(!itemType && !isLoading) ||
		(item === null && !isLoading)
	) {
		return (
			<div className="p-8 text-center">
				<p className="text-muted-foreground font-heading font-black uppercase tracking-widest text-[10px]">
					Listing not found.
				</p>
				<Button
					variant="outline"
					onClick={() => navigate({ to: "/dashboard" })}
					className="mt-6 rounded-none h-11 px-8 font-black uppercase text-[10px] tracking-widest"
				>
					Back to Dashboard
				</Button>
			</div>
		);
	}

	if (isLoading || !item) {
		return (
			<div className="p-8 flex items-center justify-center min-h-[400px]">
				<div className="animate-pulse text-muted-foreground font-heading font-black uppercase tracking-widest text-[10px]">
					Loading...
				</div>
			</div>
		);
	}

	const handleUpdateProduct = async (values: ProductFormValues) => {
		const toastId = toast.loading("Updating product info...");
		try {
			const {
				price: _price,
				stock: _stock,
				unit: _unit,
				categoryId,
				...masterInfo
			} = values;

			const payload = {
				...masterInfo,
				categoryId: categoryId,
			};

			await updateProduct({
				id: listingId,
				data: payload as Partial<CreateProductInput>,
			}).unwrap();
			toast.success("Product info updated", { id: toastId });
		} catch (err) {
			toast.error("Failed to update product info", { id: toastId });
			console.error("Update product error:", err);
		}
	};

	const handleUpdateService = async (values: ServiceFormValues) => {
		const toastId = toast.loading("Updating service...");
		try {
			const { categoryId, price, discount, ...rest } = values;
			const sanitizedData = {
				...rest,
				categoryId: categoryId,
				price:
					price !== undefined && (price as string | number) !== ""
						? Number(price)
						: 0,
				discount:
					discount !== undefined && (discount as string | number) !== ""
						? Number(discount)
						: 0,
			};
			await updateService({
				id: listingId,
				data: sanitizedData as Partial<CreateServiceInput>,
			}).unwrap();
			toast.success("Service updated successfully", { id: toastId });
			navigate({ to: "/dashboard" });
		} catch (err) {
			toast.error("Failed to update service", { id: toastId });
			console.error("Update service error:", err);
		}
	};

	return (
		<div className="p-8 max-w-[1800px] mx-auto">
			<div className="mb-10 text-center md:text-left">
				<h1 className="text-3xl font-heading font-black uppercase tracking-tight text-foreground mb-2">
					Edit {itemType === "PRODUCT" ? "Product" : "Service"}
				</h1>
				<p className="text-muted-foreground text-sm font-medium">
					{itemType === "PRODUCT"
						? "Manage your product catalog and inventory options."
						: "Manage your professional service listing."}
				</p>
			</div>

			{itemType === "PRODUCT" && product && (
				<Tabs defaultValue="general" className="w-full">
					<TabsList className="!flex w-full max-w-md h-11 p-0 bg-transparent border-b border-border/40 rounded-none mb-10 gap-8">
						<TabsTrigger
							value="general"
							className="!rounded-none !border-b-2 !border-transparent data-active:!border-primary data-active:!text-primary data-active:!bg-transparent !px-0 !h-full font-heading font-black uppercase text-[10px] tracking-[0.2em] gap-2 !shadow-none transition-all"
						>
							<RiInformationLine className="size-3.5" />
							General Info
						</TabsTrigger>
						<TabsTrigger
							value="inventory"
							className="!rounded-none !border-b-2 !border-transparent data-active:!border-primary data-active:!text-primary data-active:!bg-transparent !px-0 !h-full font-heading font-black uppercase text-[10px] tracking-[0.2em] gap-2 !shadow-none transition-all"
						>
							<RiListSettingsLine className="size-3.5" />
							Inventory
						</TabsTrigger>
					</TabsList>

					<TabsContent
						value="general"
						className="mt-0 outline-none animate-in fade-in duration-500"
					>
						<div className="max-w-2xl bg-card border border-border/50 p-8 shadow-sm rounded-none">
							<ProductForm
								key={`product-master-edit-${listingId}`}
								initialValues={{
									name: product.name,
									description: product.description ?? "",
									categoryId: product.category?.id ?? "",
									images: product.images ?? [],
									specifications:
										(product.specifications as Record<string, string>) ?? {},
									priceType: product.priceType || "FIXED",
									price: String(product.variants?.[0]?.price ?? 0),
									stock: String(product.variants?.[0]?.stock ?? 0),
									unit: product.variants?.[0]?.unit ?? "unit",
								}}
								onSubmit={handleUpdateProduct}
								onCancel={() => navigate({ to: "/dashboard" })}
								isLoading={isUpdating}
								showPricing={false}
							/>
						</div>
					</TabsContent>

					<TabsContent
						value="inventory"
						className="mt-0 outline-none animate-in fade-in duration-500"
					>
						<div className="max-w-5xl space-y-8">
							<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-muted/5 border border-border/20 p-6 rounded-none">
								<div>
									<h2 className="text-lg font-heading font-black uppercase tracking-tight text-foreground">
										Product Options
									</h2>
									<p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-1">
										Manage different sizes, colors, or technical versions.
									</p>
								</div>
								<Button
									type="button"
									onClick={() => setAddVariantOpen(true)}
									className="gap-2 font-heading font-black uppercase text-[10px] tracking-widest rounded-none h-11 px-8 shadow-lg shadow-primary/10"
								>
									<RiAddLine className="size-4" />
									Add New Option
								</Button>
							</div>

							<div className="bg-card border border-border/40 rounded-none overflow-hidden">
								<div className="overflow-x-auto">
									<table className="w-full border-collapse">
										<thead>
											<tr className="border-b border-border/40 bg-muted/10">
												<th className="text-left p-4 text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
													Variant Name
												</th>
												<th className="text-left p-4 text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
													Price (RWF)
												</th>
												<th className="text-left p-4 text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
													Stock
												</th>
												<th className="text-right p-4 text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
													Actions
												</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-border/10">
											{(product.variants ?? []).map((v) => (
												<tr
													key={v.id}
													className="group hover:bg-muted/5 transition-colors"
												>
													<td className="p-4">
														<div className="flex flex-col">
															<span className="font-bold text-xs uppercase tracking-tight">
																{v.name}
															</span>
															<span className="text-[9px] font-mono font-bold text-muted-foreground/40 uppercase tracking-widest">
																SKU: {v.sku || "N/A"}
															</span>
														</div>
													</td>
													<td className="p-4">
														<span className="font-heading font-black text-sm text-primary">
															{Number(v.price).toLocaleString()}
														</span>
													</td>
													<td className="p-4">
														<div className="flex items-center gap-2">
															<span
																className={`font-bold text-xs ${v.stock > 0 ? "text-foreground" : "text-destructive"}`}
															>
																{v.stock}
															</span>
															<span className="text-[9px] font-black uppercase text-muted-foreground/40">
																{v.unit || "unit"}
															</span>
															{v.stock <= 5 && v.stock > 0 && (
																<Badge
																	variant="warning"
																	className="h-4 text-[7px] font-black px-1.5 rounded-none uppercase"
																>
																	Low
																</Badge>
															)}
														</div>
													</td>
													<td className="p-4">
														<div className="flex justify-end gap-1">
															<Button
																type="button"
																variant="ghost"
																size="icon"
																className="h-8 w-8 rounded-none text-foreground/40 hover:text-primary hover:bg-primary/5"
																onClick={() => setEditingVariant(v)}
															>
																<RiEditLine className="size-3.5" />
															</Button>
															<Button
																type="button"
																variant="ghost"
																size="icon"
																className="h-8 w-8 rounded-none text-destructive/40 hover:text-destructive hover:bg-destructive/5"
																onClick={async () => {
																	if (
																		confirm(`Remove the "${v.name}" option?`)
																	) {
																		try {
																			await removeProductVariant({
																				productId: listingId,
																				variantId: v.id,
																			}).unwrap();
																			toast.success("Option removed");
																		} catch (e) {
																			console.error(e);
																			toast.error("Failed to remove option");
																		}
																	}
																}}
															>
																<RiDeleteBinLine className="size-3.5" />
															</Button>
														</div>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>

								{(product.variants ?? []).length === 0 && (
									<div className="py-24 text-center">
										<RiListSettingsLine className="size-12 text-muted-foreground/10 mx-auto mb-4" />
										<p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.3em]">
											No product options configured.
										</p>
										<Button
											variant="outline"
											onClick={() => setAddVariantOpen(true)}
											className="mt-6 h-10 px-6 rounded-none font-black uppercase text-[10px] tracking-widest border-border/40 hover:border-primary/40 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all"
										>
											Configure Inventory
										</Button>
									</div>
								)}
							</div>
						</div>
					</TabsContent>

					<AddVariantDialog
						open={addVariantOpen}
						onClose={() => setAddVariantOpen(false)}
						onSubmit={async (data: VariantFormValues) => {
							try {
								await addProductVariant({
									productId: listingId,
									data: {
										...data,
										price: Number(data.price),
										stock: Number(data.stock),
									} as CreateProductVariantInput,
								}).unwrap();
								toast.success("New option added");
								setAddVariantOpen(false);
							} catch (e) {
								console.error(e);
								toast.error("Failed to add option");
							}
						}}
						isLoading={addVarLoading}
					/>

					<EditVariantDialog
						open={!!editingVariant}
						variant={editingVariant}
						onClose={() => setEditingVariant(null)}
						onSubmit={async (data: Partial<VariantFormValues>) => {
							if (!editingVariant) return;
							try {
								await updateProductVariant({
									productId: listingId,
									variantId: editingVariant.id,
									data: {
										...data,
										price: data.price ? Number(data.price) : undefined,
										stock: data.stock ? Number(data.stock) : undefined,
									} as Partial<CreateProductVariantInput>,
								}).unwrap();
								toast.success("Option updated");
								setEditingVariant(null);
							} catch (e) {
								console.error(e);
								toast.error("Failed to update option");
							}
						}}
						isLoading={updatingVar}
					/>
				</Tabs>
			)}

			{itemType === "SERVICE" && service && (
				<div className="max-w-2xl bg-card border border-border/50 p-8 shadow-sm rounded-none mx-auto md:mx-0">
					<ServiceForm
						key={`service-edit-form-${listingId}`}
						initialValues={{
							name: service.name,
							description: service.description ?? "",
							categoryId: service.category?.id ?? "",
							price: String(service.price ?? 0),
							priceType: service.priceType,
							duration: service.duration ?? "",
							discount: String(service.discount ?? 0),
							images: service.images ?? [],
							specifications:
								(service.specifications as Record<string, string>) ?? {},
						}}
						onSubmit={handleUpdateService}
						onCancel={() => navigate({ to: "/dashboard" })}
						isLoading={isUpdating}
					/>
				</div>
			)}
		</div>
	);
}
