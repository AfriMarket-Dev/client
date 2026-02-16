import React from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { ArrowRight, MapPin, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetListingsQuery } from "@/app/api/listings";
import type { Listing } from "@/app/api/listings";

function firstPrice(listing: Listing): number {
  const v = listing.variants?.[0];
  return v ? Number(v.price) : 0;
}

function firstImage(listing: Listing): string | null {
  const v = listing.variants?.[0];
  const imgs = v?.images;
  return imgs?.length ? imgs[0] : null;
}

const FeaturedServices: React.FC = () => {
  const navigate = useNavigate();
  // Fetch specifically SERVICES
  const { data } = useGetListingsQuery({ limit: 12, type: "SERVICE" });
  const listings = data?.data ?? [];

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-border pb-6">
        <div>
           <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              Pro Services
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase text-foreground mb-2 text-balance">
            Featured Services
          </h2>
          <p className="text-muted-foreground text-lg font-medium">
            Expert contractors and equipment rentals near you.
          </p>
        </div>

        <Button
          variant="ghost"
          onClick={() => navigate("/products?type=SERVICE")}
          className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-sm font-bold uppercase tracking-wide hidden md:flex shadow-none"
        >
            Find more services
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>

      {listings.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-4/3 rounded-sm border border-border bg-muted/30 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.map((listing) => {
            const img = firstImage(listing);
            const price = firstPrice(listing);
            const company = listing.company as { district?: string } | undefined;
            return (
              <Card
                key={listing.id}
                className="group border border-border shadow-sm hover:shadow-md hover:border-primary transition-all duration-200 rounded-sm overflow-hidden bg-card cursor-pointer"
                onClick={() => navigate(`/products/${listing.id}`)}
              >
                <div className="relative aspect-4/3 overflow-hidden bg-muted border-b border-border">
                  {img ? (
                    <img
                      src={img}
                      alt={listing.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                      No image
                    </div>
                  )}
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-bl-sm">
                    {listing.category?.name ?? "Service"}
                  </div>
                </div>

                <CardContent className="p-5">
                  {company?.district && (
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      <MapPin className="w-3 h-3" />
                      {company.district}
                    </div>
                  )}
                  <h3 className="text-lg font-heading font-bold uppercase text-foreground mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                    {listing.name}
                  </h3>
                   <div className="flex items-baseline gap-1 mt-auto">
                    <span className="text-muted-foreground text-xs uppercase font-bold mr-1">Starts at</span>
                    <span className="text-xl font-bold text-foreground">
                      RWF {price.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <div className="mt-8 md:hidden">
        <Button
          variant="outline"
          className="w-full rounded-sm h-12 uppercase font-bold border border-border shadow-none"
          onClick={() => navigate("/products?type=SERVICE")}
        >
            Find more services
        </Button>
      </div>
    </div>
  );
};

export default FeaturedServices;
