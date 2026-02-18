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
import { mockCompanies, getMockProducts } from "@/data/mockData";

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
  // const {
  //   data: company,
  //   isLoading,
  //   error,
  // } = useGetCompanyByIdQuery(supplierId);
  // const { data: listData } = useGetListingsQuery({
  //   companyId: supplierId,
  //   limit: 50,
  // });

  const isLoading = false;
  const error = null;

  // Mock data logic
  const foundCompany = mockCompanies.find((c) => c.id === supplierId);
  // Fallback to first company if ID not found, to ensure UI is always visible for demo
  const company = foundCompany || mockCompanies[0];

  const allProducts = getMockProducts();
  const listings = allProducts.filter((p) => p.companyId === company.id);

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
  const location = [company.district, company.province]
    .filter(Boolean)
    .join(", ");
  const categoryName = (company.category as { name?: string })?.name;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-background border-b border-border sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center text-muted-foreground hover:text-primary transition-colors font-medium text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-primary text-white text-sm font-bold uppercase tracking-wider rounded-sm hover:bg-primary/90 transition-colors">
                Contact Supplier
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-background border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <div className="flex-1">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-lg border border-border bg-white flex items-center justify-center text-3xl font-bold text-muted-foreground shrink-0 shadow-sm">
                  {company.name?.charAt(0) ?? "?"}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                      {company.name}
                    </h1>
                    {company.isVerified && (
                      <div className="flex items-center bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full text-xs font-bold border border-blue-100">
                        <CheckCircle className="w-3.5 h-3.5 mr-1" />
                        VERIFIED
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                    {location && (
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-1.5 text-slate-400" />
                        <span>{location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                      <span className="font-bold text-foreground">
                        {rating.toFixed(1)}
                      </span>
                      <span className="text-muted-foreground">
                        ({company.reviewCount ?? 0} reviews)
                      </span>
                    </div>
                    {categoryName && (
                      <span className="inline-flex items-center px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-md text-xs font-medium">
                        {categoryName}
                      </span>
                    )}
                  </div>

                  <p className="text-muted-foreground leading-relaxed max-w-2xl">
                    {company.description ||
                      "No description available for this supplier."}
                  </p>
                </div>
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
