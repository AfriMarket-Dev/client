import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  AlertCircle,
  Pause,
  MoreHorizontal,
} from "lucide-react";
import { ConfirmationModal } from "@/components/common/ConfirmationModal";
import { AdminPageHeader, AdminCard } from "@/components/admin";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { DataTableColumnHeader } from "@/components/ui/DataTableColumnHeader";
import type { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Badge } from "@/components/ui/Badge";

interface Supplier {
  id: string;
  name: string;
  email: string;
  location: string;
  status: "active" | "pending" | "inactive";
  verificationStatus: "verified" | "unverified";
  joinDate: string;
  productCount: number;
}

export default function AdminSuppliersPage() {
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    supplierId: "",
    supplierName: "",
  });
  const [suspendModal, setSuspendModal] = useState({
    isOpen: false,
    supplierId: "",
    supplierName: "",
  });
  const navigate = useNavigate();

  const suppliers: Supplier[] = useMemo(
    () => [
      {
        id: "1",
        name: "TechHub Limited",
        email: "contact@techhub.com",
        location: "Lagos, Nigeria",
        status: "pending",
        verificationStatus: "unverified",
        joinDate: "2024-01-15",
        productCount: 0,
      },
      {
        id: "2",
        name: "Global Exports Ltd",
        email: "info@globalexports.com",
        location: "Cairo, Egypt",
        status: "active",
        verificationStatus: "verified",
        joinDate: "2023-08-20",
        productCount: 45,
      },
      {
        id: "3",
        name: "African Traders Co",
        email: "support@africantrade.com",
        location: "Nairobi, Kenya",
        status: "active",
        verificationStatus: "verified",
        joinDate: "2023-11-10",
        productCount: 32,
      },
    ],
    [],
  );

  const handleViewDetails = useCallback(
    (supplierId: string) => {
      navigate(`/admin/suppliers/${supplierId}`);
    },
    [navigate],
  );

  const handleEditSupplier = useCallback(
    (supplierId: string) => {
      navigate(`/admin/suppliers/${supplierId}/edit`);
    },
    [navigate],
  );

  const handleDeleteClick = useCallback((supplier: Supplier) => {
    setDeleteModal({
      isOpen: true,
      supplierId: supplier.id,
      supplierName: supplier.name,
    });
  }, []);

  const handleConfirmDelete = useCallback(() => {
    console.log("Deleting supplier:", deleteModal.supplierId);
    setDeleteModal({ isOpen: false, supplierId: "", supplierName: "" });
  }, [deleteModal.supplierId]);

  const handleSuspendClick = useCallback((supplier: Supplier) => {
    setSuspendModal({
      isOpen: true,
      supplierId: supplier.id,
      supplierName: supplier.name,
    });
  }, []);

  const handleConfirmSuspend = useCallback(() => {
    console.log("Suspending supplier:", suspendModal.supplierId);
    setSuspendModal({ isOpen: false, supplierId: "", supplierName: "" });
  }, [suspendModal.supplierId]);

  const columns: ColumnDef<Supplier>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Supplier" />
        ),
        cell: ({ row }) => {
          const supplier = row.original;
          return (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center text-primary-foreground font-heading font-bold text-sm border border-primary/20">
                {supplier.name.charAt(0)}
              </div>
              <div>
                <p className="font-heading font-bold text-sm text-foreground">
                  {supplier.name}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  {supplier.verificationStatus === "verified" ? (
                    <>
                      <CheckCircle size={12} className="text-success" />
                      <span className="text-[10px] font-heading font-bold text-success uppercase tracking-wider">
                        Verified
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle size={12} className="text-warning" />
                      <span className="text-[10px] font-heading font-bold text-warning uppercase tracking-wider">
                        Unverified
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Email" />
        ),
      },
      {
        accessorKey: "location",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Location" />
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
                  : status === "pending"
                    ? "warning"
                    : "destructive"
              }
              className="uppercase tracking-wider text-[10px]"
            >
              {status}
            </Badge>
          );
        },
      },
      {
        accessorKey: "productCount",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Products" />
        ),
      },
      {
        accessorKey: "joinDate",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Join Date" />
        ),
        cell: ({ row }) => (
          <span className="font-mono text-xs">{row.getValue("joinDate")}</span>
        ),
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const supplier = row.original;

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
                <DropdownMenuItem
                  onClick={() => handleViewDetails(supplier.id)}
                >
                  <Eye className="mr-2 h-4 w-4" /> View details
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleEditSupplier(supplier.id)}
                >
                  <Edit className="mr-2 h-4 w-4" /> Edit supplier
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleSuspendClick(supplier)}>
                  <Pause className="mr-2 h-4 w-4" /> Suspend supplier
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => handleDeleteClick(supplier)}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete supplier
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [
      handleEditSupplier,
      handleViewDetails,
      handleDeleteClick,
      handleSuspendClick,
    ],
  );

  return (
    <div className="space-y-6 pb-12">
      <AdminPageHeader
        title="Suppliers"
        subtitle="Manage all platform suppliers"
        actions={
          <Button
            onClick={() => navigate("/admin/suppliers/new")}
            className="rounded-sm h-11 px-6 font-heading font-bold uppercase text-sm tracking-wider shadow-none"
          >
            <Plus size={18} className="mr-2" />
            Add Supplier
          </Button>
        }
      />

      <AdminCard noPadding className="p-4">
        <DataTable
          columns={columns}
          data={suppliers}
          filterColumn="name"
          filterPlaceholder="SEARCH BY NAME..."
        />
      </AdminCard>

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        title="Delete Supplier"
        message={`Are you sure you want to delete ${deleteModal.supplierName}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="delete"
        onConfirm={handleConfirmDelete}
        onCancel={() =>
          setDeleteModal({ isOpen: false, supplierId: "", supplierName: "" })
        }
      />

      <ConfirmationModal
        isOpen={suspendModal.isOpen}
        title="Suspend Supplier"
        message={`Are you sure you want to suspend ${suspendModal.supplierName}? They will not be able to access their account or sell products.`}
        confirmText="Suspend"
        cancelText="Cancel"
        type="suspend"
        onConfirm={handleConfirmSuspend}
        onCancel={() =>
          setSuspendModal({ isOpen: false, supplierId: "", supplierName: "" })
        }
      />
    </div>
  );
}
