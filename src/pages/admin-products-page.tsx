import type { ColumnDef } from "@tanstack/react-table";
import {
  RiDeleteBinLine,
  RiEditLine,
  RiEyeLine,
  RiMoreLine,
  RiPagesLine,
} from "@remixicon/react";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/app/api/products";
import { AdminCard, AdminPageHeader } from "@/components/admin";
import { ConfirmationModal } from "@/components/common/confirmation-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProductRow {
  id: string;
  name: string;
  category: string;
  supplier: string;
  supplierId: string;
  status: "active" | "inactive";
  createdDate: string;
  views: number;
}

function toDateLabel(value?: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AdminProductsPage() {
  const navigate = useNavigate();
  const { data: productsResult, isLoading } = useGetProductsQuery({
    limit: 100,
    sortBy: "createdAt",
    sortOrder: "DESC",
  });
  const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    productId: string;
    productName: string;
  }>({
    isOpen: false,
    productId: "",
    productName: "",
  });

  const products: ProductRow[] = useMemo(() => {
    return (productsResult?.data ?? []).map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category?.name ?? "Uncategorized",
      supplier: product.company?.name ?? "Unknown supplier",
      supplierId: product.company?.id ?? "",
      status: product.isActive ? "active" : "inactive",
      createdDate: toDateLabel(product.createdAt),
      views: Number(product.views) || 0,
    }));
  }, [productsResult]);

  const openDeleteModal = useCallback((row: ProductRow) => {
    setDeleteModal({
      isOpen: true,
      productId: row.id,
      productName: row.name,
    });
  }, []);

  const closeDeleteModal = useCallback(() => {
    setDeleteModal({ isOpen: false, productId: "", productName: "" });
  }, []);

  const handleDelete = useCallback(async () => {
    if (!deleteModal.productId) return;
    try {
      await deleteProduct(deleteModal.productId).unwrap();
      toast.success("Product deleted successfully");
      closeDeleteModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    }
  }, [closeDeleteModal, deleteModal.productId, deleteProduct]);

  const columns: ColumnDef<ProductRow>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Product" />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="rounded-sm border border-blue-100 bg-blue-50 p-2 shrink-0">
              <RiPagesLine size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="font-heading font-bold text-sm text-foreground">
                {row.original.name}
              </p>
              <p className="text-xs text-muted-foreground">{row.original.id}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Category" />
        ),
      },
      {
        accessorKey: "supplier",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Supplier" />
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => (
          <Badge
            variant={row.original.status === "active" ? "success" : "secondary"}
            className="uppercase tracking-wider text-[10px]"
          >
            {row.original.status}
          </Badge>
        ),
      },
      {
        accessorKey: "views",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Views" />
        ),
      },
      {
        accessorKey: "createdDate",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Created" />
        ),
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <RiMoreLine className="h-4 w-4" />
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  disabled={!row.original.supplierId}
                  onClick={() =>
                    navigate({
                      to: `/admin/suppliers/${row.original.supplierId}/product/${row.original.id}` as any,
                    })
                  }
                >
                  <RiEyeLine className="mr-2 h-4 w-4" /> View details
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={!row.original.supplierId}
                  onClick={() =>
                    navigate({
                      to: `/admin/suppliers/${row.original.supplierId}/product/${row.original.id}/edit` as any,
                    })
                  }
                >
                  <RiEditLine className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => openDeleteModal(row.original)}
                >
                  <RiDeleteBinLine className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [navigate, openDeleteModal],
  );

  return (
    <div className="space-y-5 pb-10">
      <AdminPageHeader
        title="Products"
        subtitle="All marketplace products, sourced from live API data"
        actions={
          <Button
            onClick={() => navigate({ to: "/dashboard/listings/new" as any })}
            className="h-11 rounded-sm px-6 font-heading font-bold uppercase text-xs tracking-wider"
          >
            Create Listing
          </Button>
        }
      />

      <AdminCard noPadding className="p-4">
        {isLoading ? (
          <div className="p-8 text-sm text-muted-foreground">
            Loading products...
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={products}
            filterColumn="name"
            filterPlaceholder="Search products..."
          />
        )}
      </AdminCard>

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        title="Delete Product"
        message={`Delete \"${deleteModal.productName}\"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="delete"
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
        isLoading={deleting}
      />
    </div>
  );
}
