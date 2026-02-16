import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useGetListingsQuery } from "@/app/api/listings";
import { useNavigate } from "react-router-dom";
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

const HotDeals: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useGetListingsQuery({ limit: 4 });
  const listings = data?.data ?? [];

  return (
    <section className="py-24 bg-background border-b border-border">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase text-foreground leading-none mb-4">
              Featured <span className="text-primary">Listings</span>
            </h2>
            <p className="text-muted-foreground text-lg font-medium">
              Top construction materials and equipment from verified suppliers.
            </p>
          </div>
          <Button
            variant="outline"
            className="h-12 border border-border hover:border-primary px-6 rounded-sm font-bold uppercase tracking-wide group"
            onClick={() => navigate("/products")}
          >
            View All
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {listings.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-sm border border-border bg-muted/30 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {listings.map((listing) => {
              const img = firstImage(listing);
              const price = firstPrice(listing);
              return (
                <button
                  key={listing.id}
                  type="button"
                  onClick={() => navigate(`/products/${listing.id}`)}
                  className="group bg-card border border-border hover:border-primary rounded-sm overflow-hidden transition-all duration-300 relative text-left"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    {img ? (
                      <img
                        src={img}
                        alt={listing.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                      {listing.category?.name ?? "—"}
                    </p>
                    <h3 className="font-heading font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {listing.name}
                    </h3>
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
    </section>
  );
};

export default HotDeals;
