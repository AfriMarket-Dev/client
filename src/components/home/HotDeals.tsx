import React from "react";
import { Clock, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { products } from "@/data/mockData";

const HotDeals: React.FC = () => {
  const dealProducts = products.slice(0, 4).map((product) => ({
    ...product,
    discountPrice: Math.floor(product.priceRange.min * 0.85),
    timeLeft: "12:45:30",
  }));

  return (
    <section className="py-24 bg-background border-b-2 border-border">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center px-3 py-1 bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded-sm animate-pulse">
                <Clock className="w-3 h-3 mr-2" />
                Limited Time Offers
              </span>
              <span className="h-0.5 w-12 bg-red-500/20" />
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase text-foreground leading-none mb-4">
              Flash <span className="text-red-600">Deals</span>
            </h2>
            <p className="text-muted-foreground text-lg font-medium">
              Exclusive discounts on top-rated construction materials. Grab them
              before they're gone.
            </p>
          </div>
          <Button
            variant="outline"
            className="h-12 border-2 border-border hover:border-primary px-6 rounded-sm font-bold uppercase tracking-wide group"
          >
            View All Deals
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-card border-2 border-border hover:border-red-500 rounded-sm overflow-hidden transition-all duration-300 relative"
            >
              <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider shadow-lg">
                -15% OFF
              </div>

              <div className="relative h-64 overflow-hidden bg-muted">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    {product.category}
                  </p>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs font-bold text-foreground">
                      4.8
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-heading font-bold uppercase text-foreground mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-primary transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-end gap-3 mb-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground line-through font-bold">
                      {product.priceRange.currency}{" "}
                      {product.priceRange.min.toLocaleString()}
                    </span>
                    <span className="text-xl font-heading font-bold text-red-600">
                      {product.priceRange.currency}{" "}
                      {product.discountPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="ml-auto text-xs font-medium text-red-600 bg-red-500/10 px-2 py-1 rounded-sm border border-red-500/20">
                    Ends in {product.timeLeft}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                    <span className="text-muted-foreground">Available</span>
                    <span className="text-foreground">12 / 50</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 w-[24%]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotDeals;
