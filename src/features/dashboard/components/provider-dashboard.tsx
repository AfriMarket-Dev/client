import { RiAddLine } from "@remixicon/react";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useDeleteProductMutation } from "@/services/api/products";
import { useDeleteServiceMutation } from "@/services/api/services";
import { PageHeader as AdminPageHeader } from "@/shared/components/admin/page-header";
import { ConfirmationModal } from "@/shared/components/confirmation-modal";
import type { Company, Product, ProductCategory, Service } from "@/types";
import { CompanySetupSection } from "./company-setup-section";
import { InventoryStats } from "./inventory/inventory-stats";
import { InventoryTable } from "./inventory/inventory-table";

interface ProviderDashboardProps {
	company?: Company;
	categories: ProductCategory[];
	products: Product[];
	services: Service[];
}

export default function ProviderDashboard({
	company,
	categories,
	products,
	services,
}: ProviderDashboardProps) {
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

	const [deleteProduct, { isLoading: deletingProduct }] =
		useDeleteProductMutation();
	const [deleteService, { isLoading: deletingService }] =
		useDeleteServiceMutation();

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
			console.error("DELETE FAILED:", error);
			toast.error("Failed to delete listing");
		}
	}, [
		deleteProduct,
		deleteService,
		deleteModal.listingId,
		deleteModal.itemType,
	]);

	if (!company) {
		return <CompanySetupSection categories={categories} />;
	}

	const listings = [
		...products.map((p) => ({ ...p, itemType: "PRODUCT" as const })),
		...services.map((s) => ({ ...s, itemType: "SERVICE" as const })),
	].sort(
		(a, b) =>
			new Date(b.createdAt ?? 0).getTime() -
			new Date(a.createdAt ?? 0).getTime(),
	);

	return (
		<div className="space-y-6 pb-14">
			<AdminPageHeader
				title={company.name}
				subtitle="Manage your marketplace listings"
				badge="Provider Dashboard"
				actions={
					<Button
						onClick={() => navigate({ to: "/dashboard/listings/new" })}
						className="h-11 rounded-none px-6 text-[10px] font-heading font-black uppercase tracking-wider w-full sm:w-auto"
					>
						<RiAddLine size={18} className="mr-2" />
						New Listing
					</Button>
				}
			/>

			<InventoryStats listings={listings} />

			<InventoryTable
				listings={listings}
				onDeleteClick={(listing) =>
					setDeleteModal({
						isOpen: true,
						listingId: listing.id,
						listingName: listing.name,
						itemType: listing.itemType,
					})
				}
			/>

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
				isLoading={deletingProduct || deletingService}
			/>
		</div>
	);
}
