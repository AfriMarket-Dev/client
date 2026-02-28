import { useNavigate } from "@tanstack/react-router";
import { RiArrowRightLine, RiTimerLine } from "@remixicon/react";
import React from "react";
import { useState, useEffect } from "react";
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
import { HomeSection } from "./home-section";

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set countdown to end of current day
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      
      const difference = endOfDay.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  const formatNum = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-center">
        <div className="bg-primary text-white font-black text-xl px-2 py-1 rounded-none min-w-[40px] text-center shadow-lg shadow-primary/20">
          {formatNum(timeLeft.hours)}
        </div>
        <span className="text-[8px] font-black text-primary uppercase mt-1 tracking-widest">HRS</span>
      </div>
      <span className="text-primary font-black text-xl mb-4">:</span>
      <div className="flex flex-col items-center">
        <div className="bg-primary text-white font-black text-xl px-2 py-1 rounded-none min-w-[40px] text-center shadow-lg shadow-primary/20">
          {formatNum(timeLeft.minutes)}
        </div>
        <span className="text-[8px] font-black text-primary uppercase mt-1 tracking-widest">MIN</span>
      </div>
      <span className="text-primary font-black text-xl mb-4">:</span>
      <div className="flex flex-col items-center">
        <div className="bg-primary text-white font-black text-xl px-2 py-1 rounded-none min-w-[40px] text-center shadow-lg shadow-primary/20">
          {formatNum(timeLeft.seconds)}
        </div>
        <span className="text-[8px] font-black text-primary uppercase mt-1 tracking-widest">SEC</span>
      </div>
    </div>
  );
};

const HotDeals: React.FC = () => {
  const navigate = useNavigate();
  const { data: productsResult, isLoading } = useGetProductsQuery({
    hasDiscount: true,
    limit: 5,
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

  if (!isLoading && listings.length === 0) return null;

  return (
    <HomeSection 
      id="flash-deals" 
      variant="red" 
      className="py-12 lg:py-20 border-y border-primary/20"
      withGrid
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <SectionHeader
          title="Flash Sale"
          subtitle="Limited-time industrial asset procurement opportunities. Verified stock only."
          label="Urgent Deals"
          className="mb-0"
          titleClassName="text-primary"
        />
        
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-2">
            <RiTimerLine className="w-4 h-4 animate-pulse" />
            Limited Time Remaining
          </div>
          <CountdownTimer />
        </div>
      </div>

      {listings.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className="aspect-4/5 rounded-none border border-border/40 bg-muted/20"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1.5 md:gap-4 lg:gap-6">
          {listings.map((listing) => (
            <ProductCard
              key={listing.id}
              listing={listing}
              isFlashSale={true}
              onClick={() => navigate({ to: `/products/${listing.id}` as any })}
              isInWishlist={wishlist.some(
                (l: { id: string }) => l.id === listing.id,
              )}
              onToggleWishlist={(e) => handleToggleWishlist(e, listing.id)}
            />
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <Button
          variant="outline"
          size="lg"
          onClick={() =>
            navigate({ to: "/marketplace", search: { sort: "deals" } as any })
          }
          className="rounded-none border-primary/40 text-primary hover:bg-primary hover:text-white font-black uppercase tracking-[0.3em] text-[10px] px-10 h-14"
        >
          View All Deals <RiArrowRightLine className="ml-2" />
        </Button>
      </div>
    </HomeSection>
  );
};

export default HotDeals;
