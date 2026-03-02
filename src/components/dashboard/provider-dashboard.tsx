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
import { Card } from "@/features/admin/components/card";
import { PageHeader } from "@/features/admin/components/page-header";
import { StatCard } from "@/features/admin/components/stat-card";
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
import {
	ConfirmationModal,
	PageContainer,
	StatsGrid,
} from "@/shared/components";
import { ROUTES } from "@/shared/constants/routes";

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
				<div className="h-8 w-8 animate-spin rounded-none border-b-2 border-primary" />
			</div>
		);
	}

	if (!company) {
		return (
			<PageContainer>
				<Card className="p-12 text-center border-dashed">
					<RiStore2Line className="mx-auto mb-6 h-16 w-16 text-muted-foreground/20" />
					<h1 className="mb-4 text-2xl font-display font-black uppercase tracking-tight text-foreground">
						No Company Assigned
					</h1>
					<p className="mb-8 text-muted-foreground uppercase text-[10px] font-bold tracking-widest leading-loose max-w-sm mx-auto">
						Your account is not linked to a company node. Contact system
						administrators to establish a provider link.
					</p>
					<div className="flex flex-col justify-center gap-4 sm:flex-row">
						<Button
							variant="outline"
							onClick={() => navigate({ to: ROUTES.HOME })}
							className="h-12 rounded-none px-8 text-[10px] font-black uppercase tracking-[0.2em] border-border/40"
						>
							Back to Nexus
						</Button>
						<Button
							onClick={() =>
								(window.location.href = `mailto:support@afrikamarket.com`)
							}
							className="h-12 rounded-none px-8 text-[10px] font-black uppercase tracking-[0.2em]"
						>
							Contact Support
						</Button>
					</div>
				</Card>
			</PageContainer>
		);
	}

	return (
		<PageContainer>
			<PageHeader
				title={company.name}
				subtitle="Manage your marketplace listings"
				badge="Supplier Dashboard"
				actions={
					<Button
						onClick={() => navigate({ to: ROUTES.DASHBOARD.LISTINGS.NEW })}
						className="h-11 rounded-none px-6 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 border-none"
					>
						<RiAddLine size={18} className="mr-2" />
						New Listing
					</Button>
				}
			/>

			<StatsGrid>
				<StatCard
					label="Total Listings"
					value={listings.length}
					icon={Package}
					bgColor="bg-primary/5"
					color="text-primary"
				/>
				<StatCard
					label="Active Listings"
					value={activeListings}
					icon={RiStore2Line}
					bgColor="bg-emerald-50"
					color="text-emerald-600"
				/>
				<StatCard
					label="Products"
					value={productCount}
					icon={Package}
					bgColor="bg-blue-50"
					color="text-blue-600"
				/>
				<StatCard
					label="Services"
					value={serviceCount}
					icon={RiStore2Line}
					bgColor="bg-violet-50"
					color="text-violet-600"
				/>
			</StatsGrid>

			<Card
				title="Inventory Monitor"
				subtitle="Live marketplace listings"
				noPadding
			>
				{listLoading ? (
					<div className="p-12 text-center">
						<div className="mx-auto h-6 w-6 animate-spin rounded-none border-b-2 border-primary" />
					</div>
				) : listings.length === 0 ? (
					<div className="border-t border-border/40 p-16 text-center">
						<Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground/20" />
						<p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
							No listings created yet.
						</p>
						<Button
							variant="ghost"
							className="mt-4 text-primary text-[10px] font-black uppercase tracking-widest"
							onClick={() => navigate({ to: ROUTES.DASHBOARD.LISTINGS.NEW })}
						>
							Create first listing
						</Button>
					</div>
				) : (
					<div className="overflow-hidden border-t border-border/40">
						<table className="w-full">
							<thead>
								<tr className="border-b border-border/40 bg-muted/20 text-left text-[10px] uppercase tracking-widest text-muted-foreground font-black">
									<th className="px-6 py-4">Listing Node</th>
									<th className="px-6 py-4">Classification</th>
									<th className="px-6 py-4">Status</th>
									<th className="px-6 py-4 text-right">Action</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border/40">
								{listings.map((listing: any) => (
									<tr
										key={listing.id}
										className="cursor-pointer transition-colors hover:bg-muted/30 group"
										onClick={() =>
											navigate({
												to: ROUTES.DASHBOARD.LISTINGS.EDIT(listing.id),
												search: { type: listing.itemType },
											} as any)
										}
									>
										<td className="px-6 py-4">
											<p className="font-display font-black text-foreground uppercase tracking-tight group-hover:text-primary transition-colors">
												{listing.name}
											</p>
											<p className="text-[9px] font-mono text-muted-foreground/60 mt-0.5">
												{listing.id}
											</p>
										</td>
										<td className="px-6 py-4">
											<Badge
												variant="outline"
												className="text-[9px] font-black uppercase tracking-widest rounded-none border-border/40"
											>
												{listing.itemType}
											</Badge>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-2">
												<div
													className={cn(
														"h-1.5 w-1.5 rounded-full",
														listing.isActive
															? "bg-emerald-500"
															: "bg-amber-500",
													)}
												/>
												<span className="text-[10px] font-bold uppercase tracking-widest text-foreground">
													{listing.isActive ? "Live" : "Standby"}
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
															className="h-8 w-8 p-0 rounded-none border border-transparent hover:border-border/40"
														>
															<span className="sr-only">Open menu</span>
															<RiMoreLine className="h-4 w-4" />
														</Button>
													}
												/>
												<DropdownMenuContent
													align="end"
													className="w-56 rounded-none border-border/40 shadow-2xl"
												>
													<DropdownMenuGroup>
														<DropdownMenuLabel className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 py-3">
															Operations
														</DropdownMenuLabel>
														<DropdownMenuItem
															className="text-[10px] font-bold uppercase tracking-widest py-3 cursor-pointer"
															onClick={(e) => {
																e.stopPropagation();
																navigate({
																	to: ROUTES.DASHBOARD.LISTINGS.EDIT(
																		listing.id,
																	),
																	search: { type: listing.itemType },
																} as any);
															}}
														>
															<RiEditLine className="mr-3 h-4 w-4 text-primary" />{" "}
															Edit Node
														</DropdownMenuItem>
														<DropdownMenuSeparator className="bg-border/40" />
														<DropdownMenuItem
															className="text-destructive text-[10px] font-bold uppercase tracking-widest py-3 cursor-pointer"
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
															<RiDeleteBinLine className="mr-3 h-4 w-4" /> Purge
															Listing
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
			</Card>

			<ConfirmationModal
				isOpen={deleteModal.isOpen}
				title="Purge Listing"
				message={`Delete "${deleteModal.listingName}"? This action cannot be reversed within the network.`}
				confirmText="Confirm Purge"
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
		</PageContainer>
	);
}
