import { useNavigate } from "@tanstack/react-router";
import {
  RiDeleteBinLine,
  RiEditLine,
  RiEyeLine,
  RiMoreLine,
  RiPagesLine,
} from "@remixicon/react";
import { useCallback, useMemo, useState } from "react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/app/api/products";
import { AdminCard, AdminPageHeader } from "@/components/admin";
import { Badge } from "@/components/ui/badge";
import { ActionModal } from "@/components/common/action-modal";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

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
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: productsResult, isLoading } = useGetProductsQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
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
        header: "Product",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="rounded-sm border border-blue-100 bg-blue-50 p-2">
              <RiPagesLine size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="font-heading font-bold text-foreground">
                {row.original.name}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {row.original.category}
              </p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "supplier",
        header: "Supplier",
        cell: ({ row }) => (
          <span className="text-xs font-semibold text-foreground">
            {row.original.supplier}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge
            variant={row.original.status === "active" ? "success" : "secondary"}
            className="uppercase text-[10px] tracking-wider"
          >
            {row.original.status}
          </Badge>
        ),
      },
      {
        accessorKey: "createdDate",
        header: "Created",
        cell: ({ row }) => (
          <span className="text-xs text-muted-foreground">
            {row.original.createdDate}
          </span>
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
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  disabled={!row.original.supplierId}
                  onClick={() =>
                    navigate({
                      to: `/suppliers/${row.original.supplierId}` as any,
                    })
                  }
                >
                  <RiEyeLine className="mr-2 h-4 w-4" /> View supplier
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    navigate({
                      to: `/products/${row.original.id}` as any,
                    })
                  }
                >
                  <RiEyeLine className="mr-2 h-4 w-4" /> View details
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    navigate({
                      to: `/admin/suppliers/${row.original.supplierId}/product/${row.original.id}/edit` as any,
                    })
                  }
                >
                  <RiEditLine className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
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
      <AdminPageHeader title="Products" subtitle="Manage catalog materials" />

      <AdminCard>
        {isLoading ? (
          <div className="p-8 text-sm text-muted-foreground text-center">
            Loading products...
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={products}
            filterColumn="name"
            filterPlaceholder="Search products..."
            manualPagination
            pageCount={productsResult?.meta?.totalPages || 0}
            onPaginationChange={setPagination}
            state={{ pagination }}
          />
        )}
      </AdminCard>

      <ActionModal
        isOpen={deleteModal.isOpen}
        title="Delete Product"
        description={`Are you sure you want to delete "${deleteModal.productName}"? This action cannot be undone.`}
        type="delete"
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
        isLoading={deleting}
      />
    </div>
  );
}
