import { useNavigate } from "@tanstack/react-router";
import { RiPagesLine } from "@remixicon/react";
import type React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useGetProductsQuery } from "@/app/api/products";
import {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "@/app/api/wishlist";
import type { RootState } from "@/app/store";
import { ProductCard } from "@/components/marketplace/catalog/product-card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./section-header";

const FeaturedProducts: React.FC = () => {
  const navigate = useNavigate();
  const { data: productsResult } = useGetProductsQuery({
    isFeatured: true,
    limit: 10,
  });
  const listings = productsResult?.data || [];

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { data: wishlist = [] } = useGetWishlistQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const handleToggleWishlist = async (
    e: React.MouseEvent,
    productId: string,
  ) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error("Please login to add to wishlist");
      return;
    }
    try {
      const isInWishlist = wishlist.some(
        (l: { id: string }) => l.id === productId,
      );
      if (isInWishlist) {
        await removeFromWishlist({ id: productId, type: "product" }).unwrap();
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist({ id: productId, type: "product" }).unwrap();
        toast.success("Added to wishlist");
      }
    } catch (error) {
      toast.error("Failed to update wishlist");
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
      <SectionHeader
        title="Featured Products"
        subtitle="High-quality construction materials and specialized tools for your next project."
        label="Marketplace"
        icon={<RiPagesLine className="w-5 h-5" />}
        viewAllHref="/products?type=PRODUCT"
        viewAllLabel="View all products"
      />

      {listings.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-lg border border-border/40 bg-muted/20"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {listings.map((listing) => (
            <ProductCard
              key={listing.id}
              listing={listing}
              onClick={() => navigate({ to: `/products/${listing.id}` as any })}
              isInWishlist={wishlist.some(
                (l: { id: string }) => l.id === listing.id,
              )}
              onToggleWishlist={(e) => handleToggleWishlist(e, listing.id)}
            />
          ))}
        </div>
      )}

      <div className="mt-10 md:hidden">
        <Button
          variant="outline"
          size="lg"
          onClick={() =>
            navigate({ to: "/marketplace", search: { type: "PRODUCT" } as any })
          }
        >
          View all products
        </Button>
      </div>
    </div>
  );
};

export default FeaturedProducts;
