import { useNavigate } from "@tanstack/react-router";
import { useGetWishlistQuery } from "@/app/api/wishlist";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Heart } from "lucide-react";
import type { Listing } from "@/app/api/listings";
import { useRemoveFromWishlistMutation } from "@/app/api/wishlist";

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
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-heading font-bold uppercase text-foreground mb-2">
          My Wishlist
        </h1>
        <p className="text-muted-foreground mb-8">
          {listings.length} saved listing{listings.length !== 1 ? "s" : ""}
        </p>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 rounded-sm border border-border bg-muted/30 animate-pulse" />
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-sm border border-border">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="text-xl font-heading font-bold text-foreground mb-2">
              No saved items
            </h2>
            <p className="text-muted-foreground mb-6">
              Save listings you like to find them here.
            </p>
            <Button onClick={() => navigate("/products")}>
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(listings as Listing[]).map((listing) => {
              const img = firstImage(listing);
              const price = firstPrice(listing);
              return (
                <Card key={listing.id} className="overflow-hidden">
                  <div className="aspect-[4/3] bg-muted relative">
                    {img ? (
                      <img
                        src={img}
                        alt={listing.name}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => navigate({ to: `/products/${listing.id}` as any })}
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center cursor-pointer"
                        onClick={() => navigate({ to: `/products/${listing.id}` as any })}
                      >
                        <Package className="w-10 h-10 text-muted-foreground" />
                      </div>
                    )}
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute top-2 right-2 h-9 w-9 rounded-full"
                      onClick={async () => {
                        try {
                          await removeFromWishlist(listing.id).unwrap();
                        } catch (e) {
                          console.error(e);
                        }
                      }}
                    >
                      <Heart className="w-4 h-4 fill-current text-destructive" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">
                      {listing.category?.name ?? "—"}
                    </p>
                    <h3
                      className="font-heading font-bold text-foreground mb-2 cursor-pointer hover:text-primary"
                      onClick={() => navigate({ to: `/products/${listing.id}` as any })}
                    >
                      {listing.name}
                    </h3>
                    <p className="text-lg font-bold text-primary">
                      RWF {price.toLocaleString()}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => navigate({ to: `/products/${listing.id}` as any })}
                      >
                        View
                      </Button>
                      {listing.company && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="flex-1"
                          onClick={() =>
                            navigate(`/suppliers/${(listing.company as { id: string }).id}`)
                          }
                        >
                          Supplier
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
