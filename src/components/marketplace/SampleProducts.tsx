import React from "react";
import { ArrowRight, MapPin, Package, Star, Heart } from "lucide-react";
import { products, suppliers } from "@/data/mockData";
import { type Product } from "@/types";
import { useWishlist } from "@/hooks/useWishlist";

interface SampleProductsProps {
  onViewProducts?: () => void;
  onProductClick?: (product: Product) => void;
}

const SampleProducts: React.FC<SampleProductsProps> = ({
  onViewProducts,
  onProductClick,
}) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  // Get first 6 products for display
  const sampleProducts = products.slice(0, 6);

  const getSupplier = (supplierId: string) =>
    suppliers.find((s) => s.id === supplierId);

  return (
    <section className="py-20 bg-background relative overflow-hidden border-t border-border">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-xs font-bold uppercase tracking-wider text-primary rounded-sm border border-primary/20 mb-6">
            <Package className="w-4 h-4 mr-2" />
            Sample Products
          </div>

          <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase text-foreground mb-6">
            Quality Products from{" "}
            <span className="text-primary">Trusted Suppliers</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
            Discover a sample of quality products available from our verified
            suppliers. From electronics to fashion, find everything you need to
            grow your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {sampleProducts.map((product) => {
            const supplier = getSupplier(product.supplierId);

            return (
              <div
                key={product.id}
                className="group relative bg-card rounded-sm overflow-hidden border border-border hover:border-primary transition-all duration-300 cursor-pointer"
                onClick={() => onProductClick?.(product)}
              >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden bg-muted">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-background/90 text-foreground text-[10px] font-bold uppercase tracking-wider rounded-sm border border-border/50">
                      {product.category}
                    </span>
                  </div>

                  {/* View Button */}
                  <div className="absolute top-3 right-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isInWishlist(product.id, "product")) {
                            removeFromWishlist(product.id, "product");
                          } else {
                            addToWishlist(product, "product");
                          }
                        }}
                        className="p-2 bg-background/90 rounded-sm hover:bg-background transition-colors border border-transparent hover:border-border"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isInWishlist(product.id, "product")
                              ? "text-destructive fill-current"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Availability Badge */}
                  <div className="absolute bottom-3 right-3">
                    <span
                      className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm border ${
                        product.availability === "in-stock"
                          ? "bg-success/10 text-success border-success/20"
                          : product.availability === "pre-order"
                            ? "bg-warning/10 text-warning border-warning/20"
                            : "bg-destructive/10 text-destructive border-destructive/20"
                      }`}
                    >
                      {product.availability.replace("-", " ")}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Product Info */}
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1 uppercase">
                    {product.name}
                  </h3>

                  <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed text-sm">
                    {product.description}
                  </p>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
                    <div>
                      <div className="text-lg font-heading font-bold text-foreground">
                        ${product.priceRange.min.toLocaleString()} - $
                        {product.priceRange.max.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground font-bold uppercase tracking-wide mt-1">
                        Min: {product.minimumOrder} units
                      </div>
                    </div>
                  </div>

                  {/* Supplier Information */}
                  {supplier && (
                    <div className="flex items-center space-x-3">
                      <img
                        src={supplier.avatar}
                        alt={supplier.name}
                        className="w-10 h-10 rounded-sm border border-border object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-heading font-bold text-foreground uppercase tracking-wide truncate">
                          {supplier.name}
                        </div>
                        <div className="flex items-center text-muted-foreground text-xs gap-2 mt-0.5">
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {supplier.location}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-border" />
                          <span className="flex items-center text-warning font-bold">
                            <Star className="w-3 h-3 fill-current mr-1" />
                            {supplier.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* View More Products Button */}
        <div className="text-center">
          <button
            onClick={onViewProducts}
            className="group inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 rounded-sm font-heading font-bold uppercase tracking-widest hover:bg-primary/90 transition-all border border-transparent shadow-none"
          >
            View More Products
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/30 to-primary/40 rounded-full opacity-20 transform -translate-x-16 translate-y-16"></div>
      <div className="absolute top-1/4 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/30 transform rotate-45 opacity-20 translate-x-12"></div>
    </section>
  );
};

export default SampleProducts;
