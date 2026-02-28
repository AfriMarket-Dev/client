import { useNavigate } from "@tanstack/react-router";
import {
  RiArrowLeftLine,
  RiChat3Line,
  RiHeartFill,
  RiHeartLine,
  RiShieldCheckLine,
  RiStarFill,
} from "@remixicon/react";
import type React from "react";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useStartProductChatMutation } from "@/app/api/messages";
import type { CompanyRef, Product, ProductVariant } from "@/app/api/products";
import { useGetProductByIdQuery } from "@/app/api/products";
import {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "@/app/api/wishlist";
import type { RootState } from "@/app/store";
import { ImageWithFallback } from "@/components/common/image-with-fallback";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

interface ProductViewProps {
  productId: string;
  onBack: () => void;
  onSupplierClick: (supplierId: string) => void;
}

function firstVariant(product: Product): ProductVariant | null {
  return product.variants?.[0] ?? null;
}

function formatDate(value?: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const ProductView: React.FC<ProductViewProps> = ({
  productId,
  onBack,
  onSupplierClick,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { data: listing, isLoading } = useGetProductByIdQuery(productId);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState("");

  const { data: wishlist = [] } = useGetWishlistQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [startProductChat] = useStartProductChatMutation();

  const company = listing?.company as CompanyRef | undefined;
  const variant = useMemo(
    () => (listing ? firstVariant(listing) : null),
    [listing],
  );
  const images = useMemo(() => variant?.images ?? [], [variant]);
  const price = useMemo(() => (variant ? Number(variant.price) : 0), [variant]);

  const keyFacts = useMemo(
    () => [
      { label: "Category", value: listing?.category?.name ?? "-" },
      { label: "Price Type", value: listing?.priceType ?? "-" },
      { label: "Stock", value: `${variant?.stock ?? 0}` },
      { label: "Unit", value: variant?.unit ?? "unit" },
      { label: "Views", value: `${listing?.views ?? 0}` },
      { label: "Created", value: formatDate(listing?.createdAt) },
    ],
    [
      listing?.category?.name,
      listing?.createdAt,
      listing?.priceType,
      listing?.views,
      variant?.stock,
      variant?.unit,
    ],
  );

  const isInWishlist =
    Array.isArray(wishlist) &&
    wishlist.some((saved: any) => saved.id === productId);

  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to add to wishlist");
      return;
    }
    try {
      if (isInWishlist) {
        await removeFromWishlist({ id: productId, type: "product" }).unwrap();
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist({ id: productId, type: "product" }).unwrap();
        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update wishlist");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">
          Loading product...
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Product not found
          </h1>
          <Button onClick={onBack} className="mt-4">
            Back to marketplace
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-14">
      <div className="items-center justify-between hidden md:flex py-8 px-6 text-sm max-w-[1600px] mx-auto w-full">
        <Button
          variant="ghost"
          onClick={onBack}
          className="gap-2 font-heading uppercase tracking-wider text-xs rounded-sm pl-0 hover:bg-transparent hover:text-primary transition-colors text-muted-foreground"
        >
          <RiArrowLeftLine size={16} />
          Back to Marketplace
        </Button>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="font-heading uppercase tracking-wider text-xs rounded-sm border-primary/20 text-primary hover:bg-primary/5 transition-colors gap-2"
            onClick={handleToggleWishlist}
          >
            {isInWishlist ? (
              <RiHeartFill className="w-4 h-4 text-primary" />
            ) : (
              <RiHeartLine className="w-4 h-4" />
            )}
            {isInWishlist ? "Saved to Wishlist" : "Save to Wishlist"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 max-w-[1600px] mx-auto px-4 md:px-6">
        <div className="space-y-6 lg:col-span-8">
          {/* HERO SECTION */}
          <div className="hidden md:block pb-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4 text-primary">
                <div className="w-12 h-px bg-primary/30" />
                <span className="font-heading font-bold uppercase tracking-[0.3em] text-[10px] text-muted-foreground whitespace-nowrap">
                  Product
                </span>
                <div className="flex-1 h-px bg-border/20" />
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-black uppercase text-foreground tracking-tighter leading-[0.8] max-w-4xl">
                {listing.name}
              </h1>

              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-7">
                  <p className="text-xl text-muted-foreground font-light leading-relaxed">
                    {listing.description ||
                      "High-quality industrial component optimized for enterprise performance and durability."}
                  </p>
                </div>
                <div className="md:col-span-1 hidden md:flex justify-center pt-2">
                  <div className="w-px h-24 bg-border/30" />
                </div>
                <div className="md:col-span-4 flex flex-col justify-end">
                  <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-2 opacity-60">
                    Standard Unit Price
                  </div>
                  <div className="text-3xl font-heading font-black text-foreground">
                    RWF {price.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">
                    Per {variant?.unit ?? "Unit"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-7 space-y-4">
              <div className="aspect-[4/5] overflow-hidden rounded-none border border-border bg-muted/5 relative group">
                <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
                {images[selectedImageIndex] ? (
                  <ImageWithFallback
                    src={images[selectedImageIndex]}
                    alt={listing.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                    Asset Unavailable
                  </div>
                )}
                <div className="absolute bottom-6 right-6">
                  <Badge className="bg-background/80 backdrop-blur-md text-foreground border border-border rounded-none text-[9px] font-black tracking-widest uppercase">
                    {selectedImageIndex + 1} / {images.length || 1}
                  </Badge>
                </div>
              </div>

              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                  {images.map((image, index) => (
                    <button
                      type="button"
                      key={`${image}-${index}`}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-20 aspect-square shrink-0 overflow-hidden rounded-none border transition-all duration-300 ${
                        selectedImageIndex === index
                          ? "border-primary opacity-100 scale-105"
                          : "border-border opacity-40 hover:opacity-100"
                      }`}
                    >
                      <ImageWithFallback
                        src={image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="md:col-span-5 space-y-8">
              <div className="space-y-6">
                <h3 className="font-heading font-black uppercase text-xs tracking-[0.4em] text-foreground/40 pb-4 border-b border-border/40">
                  Product Architecture
                </h3>
                <div className="grid gap-px bg-border/20 border border-border/20">
                  {keyFacts.slice(0, 4).map((fact) => (
                    <div
                      key={fact.label}
                      className="bg-background p-4 group hover:bg-muted/5 transition-colors"
                    >
                      <div className="text-[9px] text-muted-foreground uppercase font-black tracking-[0.2em] mb-1">
                        {fact.label}
                      </div>
                      <div className="text-sm font-bold font-heading text-foreground">
                        {fact.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary/5 border-l-2 border-primary p-6 space-y-4">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  Quick Action
                </div>
                <Button
                  className="w-full h-14 rounded-none bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-heading font-bold uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-primary/20"
                  onClick={() => setMessageOpen(true)}
                >
                  <RiChat3Line className="mr-2 h-4 w-4" /> Message Supplier
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList variant="line">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-12 space-y-12">
                <div className="space-y-6">
                  <h3 className="font-heading font-black uppercase text-xs tracking-[0.4em] text-foreground/40 pb-4 border-b border-border/40">
                    Material Information
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground max-w-2xl">
                    {listing.description ||
                      "High-quality industrial component optimized for enterprise performance and durability."}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-16">
                  <div className="space-y-8">
                    <h3 className="font-heading font-black uppercase text-xs tracking-[0.4em] text-foreground/40 pb-4 border-b border-border/40">
                      Core Attributes
                    </h3>
                    <div className="grid gap-6">
                      {keyFacts.slice(4).map((fact) => (
                        <div
                          key={fact.label}
                          className="flex justify-between items-end group"
                        >
                          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            {fact.label}
                          </span>
                          <div className="flex-1 border-b border-dashed border-border/60 mx-4 mb-1 group-hover:border-primary/40 transition-colors" />
                          <span className="text-sm font-bold font-heading whitespace-nowrap">
                            {fact.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="specs" className="mt-12">
                <div className="border border-border p-8 bg-muted/5">
                  <div className="flex justify-between items-start border-b border-border/40 pb-6 mb-6">
                    <div>
                      <h4 className="font-display font-black text-xl uppercase tracking-tighter">
                        {variant?.name || "Standard Variant"}
                      </h4>
                      <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">
                        {variant?.sku || "SKU: PENDING"}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className="rounded-none border-primary text-primary font-black text-[9px] tracking-widest uppercase"
                    >
                      FACTORY READY
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Specifications for this hardware component are calibrated
                    for standard industrial environments. For custom
                    modifications or high-stress certifications, please contact
                    the supplier directly.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-12">
                <div className="border border-border p-12 text-center bg-muted/5">
                  <RiStarFill className="w-12 h-12 mx-auto mb-6 text-primary/10" />
                  <h3 className="font-heading font-bold uppercase tracking-widest text-sm mb-2">
                    Awaiting Performance Metrics
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                    No industrial reviews have been submitted for this product.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-4 space-y-8 sticky top-24">
            {/* Provider ID Card */}
            <div className="border border-border bg-background rounded-none relative overflow-hidden group">
              <div className="p-8">
                <h3 className="text-[9px] font-heading font-black uppercase text-muted-foreground mb-8 tracking-[0.4em] flex justify-between items-center">
                  <span>Verification Profile</span>
                  <span className="text-primary flex items-center gap-1.5">
                    <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
                    LIVE
                  </span>
                </h3>

                <div className="flex items-center gap-6 mb-10">
                  <div className="w-20 h-20 bg-muted border border-border rounded-none flex items-center justify-center text-3xl font-display font-black text-foreground relative group-hover:scale-105 transition-transform duration-500">
                    <div className="absolute inset-0 border border-primary opacity-0 group-hover:opacity-100 transition-opacity translate-x-1 translate-y-1" />
                    {company?.name?.charAt(0) ?? "S"}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-black text-2xl uppercase tracking-tighter text-foreground leading-[0.85]">
                      {company?.name ?? "AfrikaMarket Seller"}
                    </h4>
                    <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">
                      {company?.district ?? "Regional Supplier"}
                    </p>
                    <div className="flex items-center gap-1 mt-3">
                      <RiStarFill className="w-3 h-3 text-primary" />
                      <span className="text-xs font-bold font-heading">
                        4.9
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-px bg-border mb-8">
                  <div className="bg-background p-4">
                    <span className="block text-[8px] uppercase font-black text-muted-foreground tracking-[0.3em] mb-2">
                      Status
                    </span>
                    <span className="block text-sm font-bold font-heading">
                      {company?.isVerified ? "VERIFIED" : "PENDING"}
                    </span>
                  </div>
                  <div className="bg-background p-4">
                    <span className="block text-[8px] uppercase font-black text-muted-foreground tracking-[0.3em] mb-2">
                      Response
                    </span>
                    <span className="block text-sm font-bold font-heading text-emerald-600">
                      2H FAST
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full rounded-none border-border h-12 font-heading font-black uppercase tracking-[0.3em] text-[9px] hover:bg-foreground hover:text-background transition-colors"
                  onClick={() => company?.id && onSupplierClick(company.id)}
                >
                  View Professional Bio
                </Button>
              </div>
            </div>

            {/* Security Badge */}
            <div className="bg-foreground text-background p-8 rounded-none relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/20 -mr-8 -mt-8 rotate-45" />
              <RiShieldCheckLine className="w-8 h-8 opacity-20 mb-6" />
              <h4 className="font-display font-black text-lg uppercase tracking-tight mb-3">
                Elite Standard Guarantee
              </h4>
              <p className="text-xs text-background/60 leading-relaxed font-medium">
                Enterprise-grade vetting. Quality assurance protocols strictly
                enforced for every engagement.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
        <DialogContent className="sm:max-w-md rounded-none border-border">
          <DialogHeader>
            <DialogTitle className="font-heading uppercase tracking-[0.2em] text-xs font-black">
              Material Inquiry
            </DialogTitle>
          </DialogHeader>
          <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
            Initiate a professional inquiry regarding &quot;{listing.name}
            &quot;. Technical responses are typically generated within 2 hours.
          </p>
          <Textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Describe your requirements or volume needs..."
            className="min-h-32 rounded-none border-border bg-muted/5 p-4 resize-none focus-visible:ring-1 focus-visible:ring-primary text-sm"
          />
          <div className="mt-6 flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setMessageOpen(false)}
              className="rounded-none text-[10px] uppercase font-black tracking-widest h-11 px-6"
            >
              Cancel
            </Button>
            <Button
              className="rounded-none text-[10px] uppercase font-black tracking-widest h-11 px-8 bg-primary text-white"
              disabled={!messageText.trim()}
              onClick={async () => {
                try {
                  await startProductChat({
                    productId,
                    content: messageText.trim(),
                  }).unwrap();
                  toast.success("Inquiry sent successfully!");
                  setMessageOpen(false);
                  setMessageText("");
                  navigate({ to: "/messages" });
                } catch (error) {
                  console.error(error);
                  toast.error("Inquiry delivery failed.");
                }
              }}
            >
              Submit Inquiry
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductView;
