import { useNavigate } from "@tanstack/react-router";
import {
  RiAlertLine,
  RiApps2Line,
  RiFolder2Line,
  RiShieldCheckLine,
  RiUserLine,
} from "@remixicon/react";
import { useMemo } from "react";
import { useGetCompaniesQuery } from "@/app/api/companies";
import { useGetProductsQuery } from "@/app/api/products";
import { useGetServicesQuery } from "@/app/api/services";
import { useGetMarketplaceStatsQuery } from "@/app/api/stats";
import { AdminCard, AdminPageHeader, AdminStatCard } from "@/components/admin";
import { Button } from "@/components/ui/button";

function compact(value: number) {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return `${value}`;
}

function formatDate(value?: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { data: stats } = useGetMarketplaceStatsQuery();
  const { data: companiesResult } = useGetCompaniesQuery({
    limit: 100,
    sortBy: "createdAt",
    sortOrder: "DESC",
  });
  const { data: productsResult } = useGetProductsQuery({
    limit: 100,
    sortBy: "createdAt",
    sortOrder: "DESC",
  });
  const { data: servicesResult } = useGetServicesQuery({
    limit: 100,
    sortBy: "createdAt",
    sortOrder: "DESC",
  });

  const companies = companiesResult?.data ?? [];
  const products = productsResult?.data ?? [];
  const services = servicesResult?.data ?? [];

  const verifiedSuppliers =
    Number(stats?.verifiedSuppliers) ||
    companies.filter((company) => company.isVerified).length;
  const activeProducts = products.filter((p) => p.isActive).length;
  const activeServices = services.filter((s) => s.isActive).length;
  const activeListings = activeProducts + activeServices;
  const catalogItems = products.length + services.length;
  const pendingReviewCount =
    companies.filter((company) => !company.isVerified).length +
    products.filter((p) => !p.isActive).length +
    services.filter((s) => !s.isActive).length;

  const recentActivity = useMemo(() => {
    const recentCompanies = companies.slice(0, 3).map((company) => ({
      id: company.id,
      type: "Supplier",
      name: company.name,
      status: company.isVerified ? "Verified" : "Pending verification",
      date: formatDate(company.createdAt),
    }));

    const recentProducts = products.slice(0, 3).map((p) => ({
      id: p.id,
      type: "Product",
      name: p.name,
      status: p.isActive ? "Active" : "Inactive",
      date: formatDate(p.createdAt),
    }));

    const recentServices = services.slice(0, 3).map((s) => ({
      id: s.id,
      type: "Service",
      name: s.name,
      status: s.isActive ? "Active" : "Inactive",
      date: formatDate(s.createdAt),
    }));

    return [...recentCompanies, ...recentProducts, ...recentServices]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6);
  }, [companies, products, services]);

  return (
    <div className="space-y-6 pb-12">
      <AdminPageHeader
        title="Admin Dashboard"
        subtitle="Live operational metrics and quick admin actions"
        badge="Administrator"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          label="Verified Suppliers"
          value={compact(verifiedSuppliers)}
          icon={RiShieldCheckLine}
          bgColor="bg-emerald-50"
          color="text-emerald-600"
        />
        <AdminStatCard
          label="Active Listings"
          value={compact(activeListings)}
          icon={RiApps2Line}
          bgColor="bg-blue-50"
          color="text-blue-600"
        />
        <AdminStatCard
          label="Catalog Items"
          value={compact(catalogItems)}
          icon={RiFolder2Line}
          bgColor="bg-violet-50"
          color="text-violet-600"
        />
        <AdminStatCard
          label="Needs Review"
          value={compact(pendingReviewCount)}
          icon={RiAlertLine}
          bgColor="bg-amber-50"
          color="text-amber-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <AdminCard
          title="Quick Actions"
          subtitle="Go directly to key admin sections"
          className="xl:col-span-1"
        >
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => navigate({ to: "/admin/suppliers" })}
            >
              <RiUserLine className="mr-2 h-4 w-4" /> Manage Suppliers
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => navigate({ to: "/admin/products" })}
            >
              <RiFolder2Line className="mr-2 h-4 w-4" /> Manage Products
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => navigate({ to: "/admin/services" })}
            >
              <RiApps2Line className="mr-2 h-4 w-4" /> Review Services
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => navigate({ to: "/admin/categories" })}
            >
              <RiShieldCheckLine className="mr-2 h-4 w-4" /> Manage Categories
            </Button>
          </div>
        </AdminCard>

        <AdminCard
          title="Recent Activity"
          subtitle="Latest suppliers and listings"
          className="xl:col-span-2"
        >
          {recentActivity.length === 0 ? (
            <div className="py-10 text-sm text-muted-foreground">
              No recent activity yet.
            </div>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className="flex items-center justify-between rounded-sm border border-border px-4 py-3"
                >
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {item.type}
                    </p>
                    <p className="font-medium text-foreground">{item.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-foreground">{item.status}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </AdminCard>
      </div>
    </div>
  );
}
