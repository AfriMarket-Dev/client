import React from "react";
import {
  ArrowLeft,
  Star,
  MapPin,
  CheckCircle,
  Package,
  ShieldCheck,
} from "lucide-react";
import { useGetCompanyByIdQuery } from "@/app/api/companies";
import { useGetListingsQuery } from "@/app/api/listings";
import type { Listing } from "@/app/api/listings";

interface SupplierDetailsProps {
  supplierId: string;
  onBack: () => void;
  onProductClick: (listing: Listing) => void;
}

function firstPrice(listing: Listing): number {
  const v = listing.variants?.[0];
  return v ? Number(v.price) : 0;
}

function firstImage(listing: Listing): string | null {
  const v = listing.variants?.[0];
  const imgs = v?.images;
  return imgs?.length ? imgs[0] : null;
}

const SupplierDetails: React.FC<SupplierDetailsProps> = ({
  supplierId,
  onBack,
  onProductClick,
}) => {
  const { data: company, isLoading, error } = useGetCompanyByIdQuery(supplierId);
  const { data: listData } = useGetListingsQuery({
    companyId: supplierId,
    limit: 50,
  });

  const listings = listData?.data ?? [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Supplier Not Found
          </h2>
          <button
            type="button"
            onClick={onBack}
            className="text-primary font-heading uppercase text-sm tracking-wider hover:underline"
          >
            Back to Suppliers
          </button>
        </div>
      </div>
    );
  }

  const rating = Number(company.averageRating ?? 0);
  const location = [company.district, company.province].filter(Boolean).join(", ");
  const categoryName = (company.category as { name?: string })?.name;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-background border-b border-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Suppliers
          </button>
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <div className="flex-1">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-sm border-2 border-background bg-muted flex items-center justify-center text-2xl font-bold text-muted-foreground shrink-0">
                  {company.name?.charAt(0) ?? "?"}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-heading font-bold text-foreground">
                      {company.name}
                    </h1>
                    {company.isVerified && (
                      <div className="flex items-center bg-success/20 text-success px-3 py-1 rounded-full text-sm font-medium">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Verified
                      </div>
                    )}
                  </div>
                  {location && (
                    <div className="flex items-center text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 text-warning fill-current" />
                    <span className="font-semibold text-foreground">{rating.toFixed(1)}</span>
                    <span className="text-muted-foreground text-sm">
                      ({company.reviewCount ?? 0} reviews)
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {company.description || "—"}
                  </p>
                  {categoryName && (
                    <span className="inline-block px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-sm border border-primary/20">
                      {categoryName}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full md:w-72 shrink-0">
              <div className="bg-card rounded-sm p-6 border border-border shadow-none">
                <h3 className="font-heading font-bold uppercase text-foreground mb-4 tracking-wide flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Products
                </h3>
                <p className="text-2xl font-heading font-bold text-foreground">
                  {listings.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-xl font-heading font-bold uppercase text-foreground mb-6 tracking-wide">
          Products
        </h2>

        {listings.length === 0 ? (
          <div className="bg-card rounded-sm border border-border p-12 text-center">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No products listed yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => {
              const img = firstImage(listing);
              const price = firstPrice(listing);
              return (
                <button
                  key={listing.id}
                  type="button"
                  onClick={() => onProductClick(listing)}
                  className="bg-card rounded-sm border border-border overflow-hidden text-left hover:border-primary transition-all group"
                >
                  <div className="aspect-[4/3] bg-muted overflow-hidden">
                    {img ? (
                      <img
                        src={img}
                        alt={listing.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      {company.isVerified && (
                        <ShieldCheck className="w-3 h-3 text-primary shrink-0" />
                      )}
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                        {listing.category?.name ?? "—"}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {listing.name}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
                      {listing.description || "—"}
                    </p>
                    <p className="text-lg font-heading font-bold text-primary">
                      RWF {price.toLocaleString()}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierDetails;
