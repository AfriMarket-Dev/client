import { useState, useCallback, useMemo } from "react";
import { Plus, Edit, Trash2, Eye, Package, MoreHorizontal } from "lucide-react";
import { AdminPageHeader, AdminCard } from "@/components/admin";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { DataTableColumnHeader } from "@/components/ui/DataTableColumnHeader";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/Badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { ProductForm } from "@/components/forms/ProductForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";

interface PlatformProduct {
  id: string;
  name: string;
  category: string;
  supplier: string;
  status: "active" | "inactive" | "pending-review";
  createdDate: string;
  views: number;
  inquiries: number;
}

export default function AdminProductsPage() {
  const [showModal, setShowModal] = useState(false);

  const products: PlatformProduct[] = useMemo(
    () => [
      {
        id: "1",
        name: "Industrial Pump Series 200",
        category: "Construction",
        supplier: "TechHub Limited",
        status: "pending-review",
        createdDate: "2024-01-20",
        views: 125,
        inquiries: 8,
      },
      {
        id: "2",
        name: "Solar Panel 500W",
        category: "Electronics",
        supplier: "Global Exports Ltd",
        status: "active",
        createdDate: "2024-01-15",
        views: 542,
        inquiries: 34,
      },
      {
        id: "3",
        name: "Premium Cotton Fabric Roll",
        category: "Textiles",
        supplier: "African Traders Co",
        status: "active",
        createdDate: "2024-01-10",
        views: 789,
        inquiries: 56,
      },
      {
        id: "4",
        name: "LED Lighting System",
        category: "Electronics",
        supplier: "TechHub Limited",
        status: "inactive",
        createdDate: "2024-01-05",
        views: 234,
        inquiries: 12,
      },
    ],
    [],
  );

  const handleOpenModal = useCallback(() => setShowModal(true), []);
  const handleCloseModal = useCallback(() => setShowModal(false), []);

  const handleCreateProduct = (values: any) => {
    console.log("Creating product:", values);
    setShowModal(false);
  };

  const columns: ColumnDef<PlatformProduct>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Product" />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-sm border border-blue-100 shrink-0">
              <Package size={16} className="text-blue-600" />
            </div>
            <span className="font-heading font-bold text-sm text-foreground">
              {row.getValue("name")}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Category" />
        ),
        cell: ({ row }) => (
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
            {row.getValue("category")}
          </span>
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
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          return (
            <Badge
              variant={
                status === "active"
                  ? "success"
                  : status === "pending-review"
                    ? "warning"
                    : "destructive"
              }
              className="uppercase tracking-wider text-[10px]"
            >
              {status === "pending-review" ? "Pending" : status}
            </Badge>
          );
        },
      },
      {
        accessorKey: "views",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Views" />
        ),
      },
      {
        accessorKey: "inquiries",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Inquiries" />
        ),
      },
      {
        id: "actions",
        cell: () => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                }
              />
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" /> View details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" /> Edit product
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete product
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [],
  );

  return (
    <div className="space-y-6 pb-12">
      <AdminPageHeader
        title="Products"
        subtitle="Manage all platform products"
        actions={
          <Button
            onClick={handleOpenModal}
            className="rounded-sm h-11 px-6 font-heading font-bold uppercase text-sm tracking-wider shadow-none"
          >
            <Plus size={18} className="mr-2" />
            Add Product
          </Button>
        }
      />

      <AdminCard noPadding className="p-4">
        <DataTable
          columns={columns}
          data={products}
          filterColumn="name"
          filterPlaceholder="SEARCH PRODUCTS..."
        />
      </AdminCard>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden">
          <div className="bg-muted/30 p-6 border-b-2 border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary/20" />
            <DialogHeader>
              <DialogTitle className="text-lg font-heading font-bold uppercase tracking-wide text-foreground">
                Add New Product
              </DialogTitle>
            </DialogHeader>
          </div>

          <div className="p-6">
            <ProductForm
              onSubmit={handleCreateProduct}
              onCancel={handleCloseModal}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
