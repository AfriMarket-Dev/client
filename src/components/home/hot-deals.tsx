import React from "react";
import { Timer, Flame, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/marketplace/catalog/product-card";
import { getMockProducts } from "@/data/mock-data";
import { useGetWishlistQuery, useAddToWishlistMutation, useRemoveFromWishlistMutation } from "@/app/api/wishlist";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { type RootState } from "@/app/store";

const HotDeals: React.FC = () => {
  const navigate = useNavigate();
  // Use mock data
  const listings = getMockProducts().slice(0, 5);

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { data: wishlist = [] } = useGetWishlistQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const handleToggleWishlist = async (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error("Please login to add to wishlist");
      return;
    }
    try {
      const isInWishlist = wishlist.some((l: { id: string }) => l.id === productId);
      if (isInWishlist) {
        await removeFromWishlist(productId).unwrap();
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist(productId).unwrap();
        toast.success("Added to wishlist");
      }
    } catch (error) {
      toast.error("Failed to update wishlist");
    }
  };
  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-6 md:mb-12 gap-4 md:gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="rounded-lg px-3 py-1 h-auto bg-primary text-primary-foreground">
              <Timer className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />
              Ending Soon
            </Badge>
            <span className="text-red-600 font-bold text-[11px] tracking-[0.2em] flex items-center gap-1.5 uppercase">
              <Flame className="w-4 h-4 fill-red-600" strokeWidth={1.5} />
              Flash Deals
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-heading font-bold text-foreground leading-tight tracking-tight">
            Super <span className="text-red-600">Flash Sale</span>
          </h2>
        </div>

        <div className="hidden md:flex flex-col sm:flex-row items-start sm:items-center gap-8 border-l border-border/40 pl-8">
          <div className="text-left sm:text-right">
            <div className="text-[10px] font-bold text-muted-foreground/50 mb-3 uppercase tracking-[0.25em]">
              Offer Ends In
            </div>
            <div className="flex gap-2 text-3xl font-bold font-sans text-foreground">
              <div className="bg-white border border-border/50 px-3 py-2 rounded-lg min-w-14 text-center">
                05
              </div>
              <span className="self-center text-muted-foreground/20 font-heading">
                :
              </span>
              <div className="bg-white border border-border/50 px-3 py-2 rounded-lg min-w-14 text-center">
                42
              </div>
              <span className="self-center text-muted-foreground/20 font-heading">
                :
              </span>
              <div className="bg-white border border-border/50 px-3 py-2 rounded-lg min-w-14 text-center text-primary">
                18
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="lg"
            className="text-red-600 hover:bg-red-50 hover:text-red-700 font-bold rounded-lg px-8 h-16 uppercase text-xs tracking-widest transition-all"
            onClick={() => navigate("/products?sort=deals")}
          >
            View All Deals <ArrowRight className="ml-3 w-5 h-5" />
          </Button>
        </div>
      </div>

      {listings.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/5] rounded-lg border border-border/40 bg-muted/20"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1.5 md:gap-4 lg:gap-6">
          {listings.map((listing) => (
            <ProductCard
              key={listing.id}
              listing={listing}
              onClick={() => navigate(`/products/${listing.id}`)}
              isInWishlist={wishlist.some((l: { id: string }) => l.id === listing.id)}
              onToggleWishlist={(e) => handleToggleWishlist(e, listing.id)}
            />
          ))}
        </div>
      )}

      <div className="mt-10 text-center md:hidden">
        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate("/products?sort=deals")}
        >
          See All Deals <ArrowRight />
        </Button>
      </div>
    </>
  );
};

export default HotDeals;
