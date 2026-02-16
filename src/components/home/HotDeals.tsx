import React from "react";
import { ArrowRight, Timer, Flame } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useGetListingsQuery } from "@/app/api/listings";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import { ProductCard } from "@/components/catalog/ProductCard";

const HotDeals: React.FC = () => {
  const navigate = useNavigate();
  // Fetch more deals - increased limit for better grid filling
  const { data } = useGetListingsQuery({ limit: 10, sortOrder: "DESC" });
  const listings = data?.data ?? [];

  return (
    <section className="py-12 bg-red-50/30 border-y border-red-100/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="destructive" className="rounded-full px-2.5 py-0.5 h-6 animate-pulse text-[10px] font-bold uppercase tracking-wider">
                <Timer className="w-3 h-3 mr-1.5" />
                Ending Soon
              </Badge>
               <span className="text-red-600 font-bold text-xs tracking-wide uppercase flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-red-600" />
                  Flash Deals
               </span>
            </div>
            
            <h2 className="text-3xl font-heading font-bold uppercase text-foreground leading-tight">
              Super <span className="text-red-600">Flash Sale</span>
            </h2>
          </div>

          <div className="hidden md:flex items-center gap-4">
             <div className="text-right">
                 <div className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Offer Ends In</div>
                 <div className="flex gap-1.5 text-xl font-bold font-heading text-foreground">
                    <div className="bg-white border border-border px-2 py-0.5 rounded-sm min-w-10 text-center shadow-sm">05</div>
                    <span className="self-center text-muted-foreground/50">:</span>
                    <div className="bg-white border border-border px-2 py-0.5 rounded-sm min-w-10 text-center shadow-sm">42</div>
                    <span className="self-center text-muted-foreground/50">:</span>
                    <div className="bg-white border border-border px-2 py-0.5 rounded-sm min-w-10 text-center shadow-sm text-red-600">18</div>
                 </div>
             </div>
             <div className="h-10 w-px bg-border/60 mx-2" />
             <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:bg-red-50 hover:text-red-700 font-bold uppercase tracking-widest text-xs"
                onClick={() => navigate("/products?sort=deals")}
                >
                View All <ArrowRight className="ml-2 w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {listings.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="aspect-4/5 rounded-sm border border-border bg-muted/30 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {listings.map((listing) => (
               <ProductCard
                 key={listing.id}
                 listing={listing}
                 onClick={() => navigate(`/products/${listing.id}`)}
               />
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center md:hidden">
            <Button
            variant="outline"
            className="w-full text-red-600 border-red-200 hover:bg-red-50 font-bold uppercase tracking-widest"
            onClick={() => navigate("/products?sort=deals")}
            >
            See All Deals <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
        </div>
      </div>
    </section>
  );
};

export default HotDeals;
