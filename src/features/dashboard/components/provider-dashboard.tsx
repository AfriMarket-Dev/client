import {
	RiAddLine,
	RiDeleteBinLine,
	RiEditLine,
	RiMoreLine,
	RiStore2Line,
} from "@remixicon/react";
import { useNavigate } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card as AdminCard } from "@/features/admin/components/card";
import { PageHeader as AdminPageHeader } from "@/features/admin/components/page-header";
import { StatCard as AdminStatCard } from "@/features/admin/components/stat-card";
import { cn } from "@/lib/utils";
import { useGetMyCompanyQuery } from "@/services/api/companies";
import {
	useDeleteProductMutation,
	useGetProductsQuery,
} from "@/services/api/products";
import {
	useDeleteServiceMutation,
	useGetServicesQuery,
} from "@/services/api/services";
import { ConfirmationModal } from "@/shared/components/confirmation-modal";

export default function ProviderDashboard() {
	const navigate = useNavigate();
	const [deleteModal, setDeleteModal] = useState<{
		isOpen: boolean;
		listingId: string;
		listingName: string;
		itemType: "PRODUCT" | "SERVICE" | null;
	}>({
		isOpen: false,
		listingId: "",
		listingName: "",
		itemType: null,
	});
	const { data: company, isLoading: companyLoading } = useGetMyCompanyQuery();
	const companyId = company?.id;

	const { data: productsResult, isLoading: productsLoading } =
		useGetProductsQuery(companyId ? { companyId, limit: 100 } : { limit: 0 });
	const { data: servicesResult, isLoading: servicesLoading } =
		useGetServicesQuery(companyId ? { companyId, limit: 100 } : { limit: 0 });
	const [deleteProduct, { isLoading: deletingProduct }] =
		useDeleteProductMutation();
	const [deleteService, { isLoading: deletingService }] =
		useDeleteServiceMutation();

	const deleting = deletingProduct || deletingService;
	const listLoading = productsLoading || servicesLoading;

	const listings = useMemo(() => {
		const prods = (productsResult?.data ?? []).map((p) => ({
			...p,
			itemType: "PRODUCT" as const,
		}));
		const servs = (servicesResult?.data ?? []).map((s) => ({
			...s,
			itemType: "SERVICE" as const,
		}));
		return [...prods, ...servs].sort((a, b) => {
			const dateA = new Date(a.createdAt ?? 0).getTime();
			const dateB = new Date(b.createdAt ?? 0).getTime();
			return dateB - dateA;
		});
	}, [productsResult?.data, servicesResult?.data]);

	const productCount = productsResult?.data.length ?? 0;
	const serviceCount = servicesResult?.data.length ?? 0;
	const activeListings = listings.filter(
		(listing: any) => listing.isActive,
	).length;

	const handleConfirmDelete = useCallback(async () => {
		if (!deleteModal.listingId || !deleteModal.itemType) return;
		try {
			if (deleteModal.itemType === "PRODUCT") {
				await deleteProduct(deleteModal.listingId).unwrap();
			} else {
				await deleteService(deleteModal.listingId).unwrap();
			}
			toast.success("Listing deleted successfully");
			setDeleteModal({
				isOpen: false,
				listingId: "",
				listingName: "",
				itemType: null,
			});
		} catch (error) {
			console.error(error);
			toast.error("Failed to delete listing");
		}
	}, [
		deleteProduct,
		deleteService,
		deleteModal.listingId,
		deleteModal.itemType,
	]);

	if (companyLoading) {
		return (
			<div className="flex items-center justify-center p-24">
				<div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
			</div>
		);
	}

	if (!company) {
		return (
			<div className="mx-auto max-w-2xl py-20">
				<AdminCard className="p-12 text-center">
					<RiStore2Line className="mx-auto mb-6 h-16 w-16 text-muted-foreground/20" />
					<h1 className="mb-4 text-2xl font-heading font-bold uppercase tracking-tight text-foreground">
						No Company Assigned
					</h1>
					<p className="mb-8 text-muted-foreground">
						Your account is not linked to a company yet. Contact an
						administrator to get provider dashboard access.
					</p>
					<div className="flex flex-col justify-center gap-4 sm:flex-row">
						<Button
							variant="outline"
							onClick={() => navigate({ to: "/" })}
							className="h-12 rounded-sm px-8 text-xs font-heading font-bold uppercase tracking-widest"
						>
							Back to Marketplace
						</Button>
						<Button
							onClick={() =>
								(window.location.href = "mailto:support@afrikamarket.com")
							}
							className="h-12 rounded-sm px-8 text-xs font-heading font-bold uppercase tracking-widest"
						>
							Contact Support
						</Button>
					</div>
				</AdminCard>
			</div>
		);
	}

	return (
		<div className="space-y-6 pb-14">
			<AdminPageHeader
				title={company.name}
				subtitle="Manage your marketplace listings"
				badge="Supplier Dashboard"
				actions={
					<Button
						onClick={() => navigate({ to: "/dashboard/listings/new" })}
						className="h-11 rounded-sm px-6 text-xs font-heading font-bold uppercase tracking-wider"
					>
						<RiAddLine size={18} className="mr-2" />
						New Listing
					</Button>
				}
			/>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
				<AdminStatCard
					label="Total Listings"
					value={listings.length}
					icon={Package}
					bgColor="bg-primary/5"
					color="text-primary"
				/>
				<AdminStatCard
					label="Active Listings"
					value={activeListings}
					icon={RiStore2Line}
					bgColor="bg-emerald-50"
					color="text-emerald-600"
				/>
				<AdminStatCard
					label="Products"
					value={productCount}
					icon={Package}
					bgColor="bg-blue-50"
					color="text-blue-600"
				/>
				<AdminStatCard
					label="Services"
					value={serviceCount}
					icon={RiStore2Line}
					bgColor="bg-violet-50"
					color="text-violet-600"
				/>
			</div>

			<AdminCard title="Listings" subtitle="Current inventory" noPadding>
				{listLoading ? (
					<div className="p-12 text-center">
						<div className="mx-auto h-6 w-6 animate-spin rounded-full border-b-2 border-primary" />
					</div>
				) : listings.length === 0 ? (
					<div className="border-t border-border p-16 text-center">
						<Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground/20" />
						<p className="text-sm text-muted-foreground">
							No listings created yet.
						</p>
						<Button
							variant="ghost"
							className="mt-4 text-primary"
							onClick={() => navigate({ to: "/dashboard/listings/new" })}
						>
							Create first listing
						</Button>
					</div>
				) : (
					<div className="overflow-hidden border-t border-border">
						<table className="w-full">
							<thead>
								<tr className="border-b border-border bg-muted/20 text-left text-[10px] uppercase tracking-widest text-muted-foreground">
									<th className="px-6 py-4">Listing</th>
									<th className="px-6 py-4">Category</th>
									<th className="px-6 py-4">Status</th>
									<th className="px-6 py-4 text-right">Action</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border">
								{listings.map((listing: any) => (
									<tr
										key={listing.id}
										className="cursor-pointer transition-colors hover:bg-muted/30"
										onClick={() =>
											navigate({
												to: `/dashboard/listings/${listing.id}/edit`,
												search: { type: listing.itemType },
											} as any)
										}
									>
										<td className="px-6 py-4">
											<p className="font-medium text-foreground">
												{listing.name}
											</p>
											<p className="text-xs text-muted-foreground">
												{listing.id}
											</p>
										</td>
										<td className="px-6 py-4">
											<Badge
												variant="outline"
												className="text-[10px] uppercase tracking-wider"
											>
												{listing.itemType}
											</Badge>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-2">
												<div
													className={cn(
														"h-2 w-2 rounded-full",
														listing.isActive
															? "bg-emerald-500"
															: "bg-amber-500",
													)}
												/>
												<span className="text-xs uppercase tracking-wider text-foreground">
													{listing.isActive ? "Live" : "Inactive"}
												</span>
											</div>
										</td>
										<td
											className="px-6 py-4 text-right"
											onClick={(e) => e.stopPropagation()}
										>
											<DropdownMenu>
												<DropdownMenuTrigger
													render={
														<Button
															variant="ghost"
															className="h-8 w-8 p-0 rounded-sm"
														>
															<span className="sr-only">Open menu</span>
															<RiMoreLine className="h-4 w-4" />
														</Button>
													}
												/>
												<DropdownMenuContent align="end" className="w-56">
													<DropdownMenuGroup>
														<DropdownMenuLabel>Actions</DropdownMenuLabel>
														<DropdownMenuItem
															onClick={(e) => {
																e.stopPropagation();
																navigate({
																	to: `/dashboard/listings/${listing.id}/edit`,
																	search: { type: listing.itemType },
																} as any);
															}}
														>
															<RiEditLine className="mr-2 h-4 w-4" /> Edit
														</DropdownMenuItem>
														<DropdownMenuSeparator />
														<DropdownMenuItem
															className="text-destructive"
															onClick={(e) => {
																e.stopPropagation();
																setDeleteModal({
																	isOpen: true,
																	listingId: listing.id,
																	listingName: listing.name,
																	itemType: listing.itemType,
																});
															}}
														>
															<RiDeleteBinLine className="mr-2 h-4 w-4" />{" "}
															Delete
														</DropdownMenuItem>
													</DropdownMenuGroup>
												</DropdownMenuContent>
											</DropdownMenu>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</AdminCard>

			<ConfirmationModal
				isOpen={deleteModal.isOpen}
				title="Delete Listing"
				message={`Delete "${deleteModal.listingName}"? This action cannot be undone.`}
				confirmText="Delete"
				cancelText="Cancel"
				type="delete"
				onConfirm={handleConfirmDelete}
				onCancel={() =>
					setDeleteModal({
						isOpen: false,
						listingId: "",
						listingName: "",
						itemType: null,
					})
				}
				isLoading={deleting}
			/>
		</div>
	);
}
