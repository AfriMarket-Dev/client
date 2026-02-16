import { useMemo } from "react";
import {
  MapPin,
  Phone,
  Star,
  Eye,
  Edit,
  Trash2,
  Download,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";
import { AdminPageHeader, AdminStatCard, AdminCard } from "@/components/admin";
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

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  status: string;
  orders: number;
  totalSpent: string;
  rating: number;
  avatar: string;
}

export default function AdminCustomersPage() {
  const customers: Customer[] = useMemo(
    () => [
      {
        id: 1,
        name: "ABC Trading Co.",
        email: "contact@abctrading.com",
        phone: "+234-123-456-7890",
        location: "Lagos, Nigeria",
        joinDate: "2024-01-15",
        status: "active",
        orders: 24,
        totalSpent: "$18,500",
        rating: 4.8,
        avatar:
          "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      },
      {
        id: 2,
        name: "Global Imports Ltd",
        email: "info@globalimports.com",
        phone: "+256-987-654-3210",
        location: "Kampala, Uganda",
        joinDate: "2023-11-22",
        status: "active",
        orders: 18,
        totalSpent: "$14,200",
        rating: 4.6,
        avatar:
          "https://images.pexels.com/photos/5625120/pexels-photo-5625120.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      },
      {
        id: 3,
        name: "Retail Solutions",
        email: "support@retailsol.com",
        phone: "+233-555-123-4567",
        location: "Accra, Ghana",
        joinDate: "2024-02-01",
        status: "active",
        orders: 31,
        totalSpent: "$24,800",
        rating: 4.9,
        avatar:
          "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      },
      {
        id: 4,
        name: "Fashion Hub Africa",
        email: "hello@fashionhub.com",
        phone: "+27-123-456-7890",
        location: "Cape Town, South Africa",
        joinDate: "2023-10-10",
        status: "inactive",
        orders: 12,
        totalSpent: "$8,600",
        rating: 4.5,
        avatar:
          "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      },
      {
        id: 5,
        name: "Tech Distributors",
        email: "sales@techdist.com",
        phone: "+254-789-456-1230",
        location: "Nairobi, Kenya",
        joinDate: "2024-01-05",
        status: "active",
        orders: 27,
        totalSpent: "$21,900",
        rating: 4.7,
        avatar:
          "https://images.pexels.com/photos/5625120/pexels-photo-5625120.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      },
    ],
    [],
  );

  const columns: ColumnDef<Customer>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Customer" />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <img
              src={row.original.avatar}
              alt={row.getValue("name")}
              className="w-10 h-10 rounded-sm object-cover border border-border"
            />
            <div>
              <p className="text-sm font-heading font-bold text-foreground">
                {row.getValue("name")}
              </p>
              <a
                href={`mailto:${row.original.email}`}
                className="text-[10px] text-primary hover:underline font-mono font-bold uppercase tracking-tighter"
              >
                {row.original.email}
              </a>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "location",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Location" />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            <MapPin size={12} className="text-primary" />
            {row.getValue("location")}
          </div>
        ),
      },
      {
        accessorKey: "orders",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Orders" />
        ),
        cell: ({ row }) => (
          <p className="text-sm font-bold text-foreground font-mono">
            {row.getValue("orders")}
          </p>
        ),
      },
      {
        accessorKey: "totalSpent",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Total Spent" />
        ),
        cell: ({ row }) => (
          <p className="text-sm font-bold text-foreground font-mono">
            {row.getValue("totalSpent")}
          </p>
        ),
      },
      {
        accessorKey: "rating",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Rating" />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-sm w-fit">
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            <p className="text-xs font-heading font-bold text-foreground">
              {row.getValue("rating")}
            </p>
          </div>
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
              variant={status === "active" ? "success" : "secondary"}
              className="uppercase tracking-wider text-[10px]"
            >
              {status}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        cell: () => (
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
                <Edit className="mr-2 h-4 w-4" /> Edit customer
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Delete customer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [],
  );

  return (
    <div className="space-y-6 pb-12">
      <AdminPageHeader
        title="Customers"
        subtitle="Manage and view all platform customers"
        actions={
          <Button
            variant="outline"
            className="rounded-sm h-11 px-6 border border-border font-heading font-bold uppercase text-xs tracking-wider"
          >
            <Download size={16} className="mr-2" />
            Export
          </Button>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AdminStatCard
          label="Total Customers"
          value={customers.length}
          icon={Phone}
          bgColor="bg-blue-50"
          color="text-blue-600"
        />
        <AdminStatCard
          label="Active"
          value={customers.filter((c) => c.status === "active").length}
          icon={Eye}
          bgColor="bg-green-50"
          color="text-green-600"
        />
        <AdminStatCard
          label="Total Orders"
          value={customers.reduce((sum, c) => sum + c.orders, 0)}
          icon={MessageSquare}
        />
        <AdminStatCard
          label="Avg. Rating"
          value={(
            customers.reduce((sum, c) => sum + c.rating, 0) /
            customers.length
          ).toFixed(1)}
          icon={Star}
          bgColor="bg-yellow-50"
          color="text-yellow-600"
        />
      </div>

      <AdminCard noPadding className="p-4">
        <DataTable
          columns={columns}
          data={customers}
          filterColumn="name"
          filterPlaceholder="SEARCH BY NAME..."
        />
      </AdminCard>
    </div>
  );
}
