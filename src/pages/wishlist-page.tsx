import { useNavigate } from "@tanstack/react-router";
import { RiHeartFill, RiHeartLine } from "@remixicon/react";
import { Package } from "lucide-react";
import type { Listing } from "@/app/api/listings";
import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "@/app/api/wishlist";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function firstPrice(listing: Listing): number {
  const v = listing.variants?.[0];
  return v ? Number(v.price) : 0;
}

function firstImage(listing: Listing): string | null {
  const v = listing.variants?.[0];
  const imgs = v?.images;
  return imgs?.length ? imgs[0] : null;
}

export default function WishlistPage() {
  const navigate = useNavigate();
  const { data: listings = [], isLoading } = useGetWishlistQuery();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-primary" />
              <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase">
                Secure_Buffer
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-black uppercase text-foreground tracking-tighter leading-none">
              Asset Registry
            </h1>
            <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.3em] mt-4">
              {listings.length} Saved nodes / Operational readiness
            </p>
          </div>
        </div>

        <div className="h-px bg-border/20 w-full relative mb-12">
          <div className="absolute left-0 top-0 w-24 h-px bg-primary/40" />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-80 rounded-none border border-border/10 bg-muted/5 animate-pulse"
              />
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center border border-border/20 rounded-none bg-muted/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
            <RiHeartLine className="w-16 h-16 text-primary/20 mb-8 relative z-10 transition-transform duration-500 hover:scale-110" />
            <h2 className="text-3xl font-display font-black uppercase text-foreground mb-4 tracking-tighter relative z-10">
              Registry Empty
            </h2>
            <p className="text-xs font-bold text-muted-foreground/30 uppercase tracking-[0.3em] max-w-md mx-auto mb-12 relative z-10">
              No assets cached / Buffer operational
            </p>
            <Button
              size="lg"
              className="rounded-none font-display font-black uppercase tracking-[0.2em] h-14 px-10 relative z-10"
              onClick={() => navigate({ to: "/marketplace" } as any)}
            >
              Explore_Registry
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {(listings as any[]).map((listing) => {
              const img = firstImage(listing);
              const price = firstPrice(listing);
              return (
                <div
                  key={listing.id}
                  className="group border border-border/10 bg-card hover:border-primary/40 transition-all duration-500 rounded-none overflow-hidden flex flex-col relative"
                >
                  <div className="absolute top-0 left-0 w-[1px] h-full bg-primary/0 group-hover:bg-primary/40 transition-all duration-500 z-20" />

                  <div className="aspect-[4/3] bg-muted/20 relative overflow-hidden border-b border-border/10">
                    {img ? (
                      <img
                        src={img}
                        alt={listing.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 cursor-pointer group-hover:scale-105"
                        onClick={() =>
                          navigate({ to: `/products/${listing.id}` as any })
                        }
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center cursor-pointer opacity-20"
                        onClick={() =>
                          navigate({ to: `/products/${listing.id}` as any })
                        }
                      >
                        <Package className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}

                    <button
                      className="absolute top-4 right-4 z-30 bg-slate-950/80 backdrop-blur-md border border-white/10 p-2 rounded-none text-primary hover:bg-primary hover:text-white transition-all shadow-2xl"
                      onClick={async (e) => {
                        e.stopPropagation();
                        try {
                          await removeFromWishlist({
                            id: listing.id,
                            type: listing.type?.toLowerCase() as
                              | "product"
                              | "service",
                          }).unwrap();
                        } catch (e) {
                          console.error(e);
                        }
                      }}
                    >
                      <RiHeartFill className="w-4 h-4 fill-current" />
                    </button>

                    <div className="absolute top-0 left-0 bg-primary text-white px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.3em] shadow-2xl">
                      {listing.category?.name || "NODE"}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow bg-card">
                    <h3
                      className="text-sm font-display font-black text-foreground mb-4 cursor-pointer group-hover:text-primary transition-colors uppercase tracking-widest line-clamp-2 min-h-[2.5rem]"
                      onClick={() =>
                        navigate({ to: `/products/${listing.id}` as any })
                      }
                    >
                      {listing.name}
                    </h3>

                    <div className="flex flex-col gap-1 mb-8">
                      <span className="text-[8px] font-black text-muted-foreground/40 uppercase tracking-[0.4em]">
                        MARKET_VALUATION
                      </span>
                      <span className="text-xl font-black text-foreground tracking-tighter">
                        RWF {price.toLocaleString()}
                      </span>
                    </div>

                    <div className="mt-auto grid grid-cols-2 gap-3 pt-6 border-t border-border/10">
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-none h-11 font-black uppercase tracking-[0.2em] text-[9px] border-border/40 hover:bg-foreground hover:text-background"
                        onClick={() =>
                          navigate({ to: `/products/${listing.id}` as any })
                        }
                      >
                        Details
                      </Button>
                      {listing.company && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="rounded-none h-11 font-black uppercase tracking-[0.2em] text-[9px] hover:bg-primary/5 hover:text-primary"
                          onClick={() =>
                            navigate({
                              to: `/suppliers/${(listing.company as { id: string }).id}` as any,
                            })
                          }
                        >
                          Supplier
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="h-1 w-0 bg-primary group-hover:w-full transition-all duration-500" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
