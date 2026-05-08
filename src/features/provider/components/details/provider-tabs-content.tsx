import {
  Calendar,
  CheckCircle,
  Mail,
  MessageCircle,
  Package,
  Phone,
  Star,
  } from "lucide-react";import type React from "react";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";
import { ImageWithFallback } from "@/shared/components/image-with-fallback";
import { SpecificationList } from "@/shared/components/specification-list";
import type { Company, Product } from "@/types";

interface ProviderTabsContentProps {
  company: Company;
  listings: Product[];
  featuredListings: Product[];
  onProductClick: (item: Product) => void;
}

function firstPrice(product: Product): number {
  if (product.price) return Number(product.price);
  return product.variants?.[0] ? Number(product.variants[0].price) : 0;
}

function firstImage(product: Product): string | null {
  if (product.images?.length) return product.images[0];
  const imgs = product.variants?.[0]?.images;
  return imgs?.length ? imgs[0] : null;
}

export const ProviderTabsContent: React.FC<ProviderTabsContentProps> = ({
  company,
  listings,
  featuredListings,
  onProductClick,
}) => {
  // Use product images for the gallery if no dedicated gallery exists
  const galleryImages = useMemo(() => {
    const imgs = listings
      .flatMap((p) => p.images || [])
      .filter(Boolean)
      .slice(0, 6);

    return imgs.length > 0 ? imgs : ["/logo.svg"];
  }, [listings]);

  return (
    <>
      <TabsContent
        value="overview"
        className="space-y-12 animate-in slide-in-from-bottom-2 duration-500 fade-in mt-8"
      >
        <div className="grid md:grid-cols-3 gap-12">
          {/* Left Column (2/3) */}
          <div className="md:col-span-2 space-y-12">
            {/* Description Section */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                About the Company
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {company.description || "No detailed description available for this provider."}
              </p>
            </section>

            {/* Services & Capabilities */}
            <div>
              {(company?.capabilities ?? []).length > 0 && (
                <>
                  <div className="flex flex-col gap-4 mb-6">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      Capabilities
                    </h3>
                    <Separator className="bg-border/30" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {(company?.capabilities ?? []).map((item: string) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 p-3 border border-border bg-muted/5"
                      >
                        <div className="w-1.5 h-1.5 bg-primary/40 rounded-none" />
                        <span className="text-sm font-medium text-foreground/70">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Business Specifications */}
            <SpecificationList 
              title="Business Details" 
              specifications={{
                "Business Type": company.type?.replace(/_/g, ' ') || "Provider",
                "Operating Since": company.createdAt ? new Date(company.createdAt).getFullYear().toString() : "2024",
                "Province": company.province || "N/A",
                "District": company.district || "N/A",
                "Sector": company.sector || "N/A",
                "Verification": company.isVerified ? "Verified" : "Pending"
              }} 
            />

            {/* Gallery */}
            <div>
              <div className="flex flex-col gap-4 mb-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Gallery
                </h3>
                <Separator className="bg-border/30" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {galleryImages.map((src, idx) => (
                  <div
                    key={`${src}-${idx}`}
                    className="aspect-video bg-muted relative group overflow-hidden border border-border"
                  >
                    <ImageWithFallback
                      src={src}
                      alt={`Gallery ${idx}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Products */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Featured Products
                </h3>
                <Button
                  variant="link"
                  className="text-primary text-xs font-semibold p-0 h-auto"
                >
                  View All
                </Button>
              </div>
              <Separator className="bg-border/40 mb-6" />
              <div className="grid sm:grid-cols-2 gap-6">
                {featuredListings.map((product) => {
                  const img = firstImage(product);
                  const price = firstPrice(product);
                  return (
                    <button
                      type="button"
                      key={product.id}
                      onClick={() => onProductClick(product)}
                      className="flex gap-4 p-4 border border-border bg-background group hover:border-primary/40 transition-colors text-left w-full rounded-none"
                    >
                      <div className="w-20 h-20 bg-muted shrink-0 overflow-hidden">
                        {img && (
                          <ImageWithFallback
                            src={img}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        )}
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-sm font-semibold text-foreground leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">
                          {product.name}
                        </h4>
                        <div className="text-xs text-muted-foreground mb-2">
                          {product.category?.name || "Product"}
                        </div>
                        <div className="font-bold text-sm text-foreground">
                          RWF {price.toLocaleString()}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="products" className="mt-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-sm font-medium text-muted-foreground">
              {listings.length} Active Listings
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6">
            {listings.map((product) => {
              const img = firstImage(product);
              const price = firstPrice(product);
              return (
                <div
                  key={product.id}
                  className="group border border-border bg-card hover:border-primary/50 transition-colors cursor-pointer rounded-none overflow-hidden"
                  onClick={() => onProductClick(product)}
                >
                  <div className="aspect-square bg-muted overflow-hidden relative">
                    {img && (
                      <ImageWithFallback
                        src={img}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                    {!img && (
                      <div className="flex items-center justify-center h-full text-muted-foreground/30">
                        <Package className="w-8 h-8" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="text-sm font-semibold text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h4>
                    <div className="font-bold text-sm text-foreground">
                      RWF {price.toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="mt-8">
        <div className="border border-border p-8 bg-muted/5 space-y-8">
          <div className="flex flex-col sm:flex-row items-center gap-8 pb-8 relative">
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground">
                {Number(company.averageRating || 0).toFixed(1)}
              </div>
              <div className="flex gap-0.5 justify-center my-3 text-primary">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-3.5 h-3.5 fill-primary" />
                ))}
              </div>{" "}
              <div className="text-xs font-medium text-muted-foreground">
                {company.reviewCount || 0} Reviews
              </div>
            </div>
            <div className="flex-1 w-full space-y-3 max-w-xs">
              {[5, 4, 3, 2, 1].map((rating, i) => (
                <div
                  key={rating}
                  className="flex items-center gap-4 text-xs font-medium text-muted-foreground"
                >
                  <span className="w-2">{rating}</span>
                  <div className="flex-1 h-1.5 bg-muted rounded-none overflow-hidden">
                    <div
                      className="h-full bg-primary/60"
                      style={{
                        width: i === 0 ? "92%" : "4%",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Separator className="absolute bottom-0 left-0 bg-border/40" />
          </div>

          <div className="space-y-10 pt-4">
            {company.reviewCount === 0 || !company.reviewCount ? (
              <div className="text-center py-12 text-muted-foreground uppercase text-[10px] font-bold tracking-widest">
                No reviews yet
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground uppercase text-[10px] font-bold tracking-widest">
                Reviews disabled
              </div>
            )}
          </div>
        </div>
      </TabsContent>

      <TabsContent
        value="contact"
        className="animate-in slide-in-from-bottom-2 duration-500 fade-in mt-8"
      >
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-foreground">
                Contact Channels
              </h3>
              <Separator className="bg-border/30" />
            </div>
            <div className="space-y-4">
              {[
                {
                  label: "Business Email",
                  value: company?.email || "NOT PROVIDED",
                  icon: Mail,
                },
                {
                  label: "Direct Phone",
                  value: company.phone || "NOT PROVIDED",
                  icon: Phone,
                },
                {
                  label: "Official Hub",
                  value: company.phone || "STANDBY",
                  icon: MessageCircle,
                },
              ].map((contact) => (
                <a
                  key={contact.label}
                  href="#"
                  className="flex items-center gap-4 p-5 border border-border bg-background hover:border-primary/40 transition-all group rounded-none shadow-sm"
                >
                  <div className="w-10 h-10 bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors border border-primary/10">
                    <contact.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-muted-foreground mb-1">
                      {contact.label}
                    </div>
                    <div className="font-bold text-sm text-foreground">
                      {contact.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-foreground">
                Business Hours
              </h3>
              <Separator className="bg-border/30" />
            </div>
            <div className="border border-border bg-muted/5 p-8 space-y-6">
              <div className="flex justify-between items-center pb-4 relative">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-primary/60" />
                  <span className="font-semibold text-sm text-foreground">
                    Business Hours
                  </span>
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  08:00 - 18:00 CAT
                </span>
                <Separator className="absolute bottom-0 left-0 bg-border/20" />
              </div>
              <div className="flex justify-between items-center pb-4 relative">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground/40" />
                  <span className="font-black uppercase text-[10px] tracking-widest text-foreground/80">
                    Extended Saturday
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-muted-foreground">
                  09:00 - 16:00 CAT
                </span>
                <Separator className="absolute bottom-0 left-0 bg-border/20" />
              </div>
              <div className="flex justify-between items-center text-muted-foreground/40 grayscale">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4" />
                  <span className="font-black uppercase text-[10px] tracking-widest">
                    Sunday
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase">
                  Closed
                </span>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </>
  );
};
