import { Link } from "react-router-dom";
import { useGetMyCompanyQuery } from "@/app/api/companies";
import { useGetListingsQuery } from "@/app/api/listings";
import { Button } from "@/components/ui/button";
import { Package, Plus } from "lucide-react";

export default function ProviderDashboardPage() {
  const { data: company, isLoading: companyLoading } = useGetMyCompanyQuery();
  const companyId = (company as { id?: string })?.id;
  const { data: listData } = useGetListingsQuery(
    companyId ? { companyId, limit: 50 } : { limit: 0 }
  );
  const listings = listData?.data ?? [];

  if (companyLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="p-8 max-w-lg">
        <h1 className="text-xl font-heading font-bold uppercase text-foreground mb-2">
          No company assigned
        </h1>
        <p className="text-muted-foreground mb-4">
          Your account is not linked to a company yet. Contact an administrator to get access to the provider dashboard.
        </p>
        <Link to="/">
          <Button variant="outline">Back to Marketplace</Button>
        </Link>
      </div>
    );
  }

  const companyName = (company as { name?: string }).name ?? "My Company";

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold uppercase text-foreground">
            {companyName}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your listings and variants
          </p>
        </div>
        <Link to="/dashboard/listings/new">
          <Button className="shrink-0 gap-2">
            <Plus className="w-4 h-4" />
            Add Listing
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 mb-8 sm:grid-cols-2">
        <div className="p-4 rounded-sm border border-border bg-card">
          <p className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground">
            Total Listings
          </p>
          <p className="text-2xl font-heading font-bold text-foreground mt-1">
            {listings.length}
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-heading font-bold uppercase text-foreground mb-4">
          My Listings
        </h2>
        {listings.length === 0 ? (
          <div className="p-8 rounded-sm border border-border bg-card text-center text-muted-foreground">
            <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="mb-4">No listings yet.</p>
            <Link to="/dashboard/listings/new">
              <Button>Add your first listing</Button>
            </Link>
          </div>
        ) : (
          <ul className="space-y-2">
            {listings.map((listing) => (
              <li key={listing.id}>
                <Link
                  to={`/dashboard/listings/${listing.id}/edit`}
                  className="flex items-center justify-between p-4 rounded-sm border border-border bg-card hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm bg-muted flex items-center justify-center">
                      <Package className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-foreground">
                        {listing.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {listing.category?.name ?? "—"} · {listing.type}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Edit
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
