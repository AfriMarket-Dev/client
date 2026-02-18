import React, { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  ShieldCheck,
  Star,
  Users,
  Briefcase,
  Phone,
  MessageCircle,
  MessageSquare,
  List,
  CheckCircle,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetListingByIdQuery } from "@/app/api/listings";
import {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "@/app/api/wishlist";
import { useStartListingChatMutation } from "@/app/api/messages";
import { useSelector } from "react-redux";
import { type RootState } from "@/app/store";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import type {
  Listing,
  CompanyRef,
  ListingVariantRef,
} from "@/app/api/listings";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";

interface ProductViewProps {
  productId: string;
  onBack: () => void;
  onSupplierClick: (supplierId: string) => void;
}

function firstVariant(listing: Listing): ListingVariantRef | null {
  return listing.variants?.[0] ?? null;
}

function variantImages(v: ListingVariantRef | null): string[] {
  return v?.images ?? [];
}

const ProductView: React.FC<ProductViewProps> = ({
  productId,
  onBack,
  onSupplierClick,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { data: listing, isLoading, error } = useGetListingByIdQuery(productId);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState("");

  const { data: wishlist = [] } = useGetWishlistQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [startListingChat] = useStartListingChatMutation();

  const isInWishlist =
    Array.isArray(wishlist) &&
    wishlist.some((l: { id: string }) => l.id === productId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // MOCK DATA FALLBACK (for development/preview)
  const mockListing: Listing = {
    id: "mock-1",
    name: "Heavy Duty Excavator CAT-320",
    description:
      "High-performance hydraulic excavator suitable for heavy construction work. Features include a fuel-efficient engine, reinforced boom and stick, and advanced hydraulic system for precise control. Available for immediate dispatch.",
    type: "EQUIPMENT",
    status: "ACTIVE",
    categoryId: "cat-1",
    companyId: "comp-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: [
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800",
    ],
    variants: [
      {
        id: "var-1",
        listingId: "mock-1",
        name: "Standard",
        price: 125000000,
        stock: 4,
        sku: "CAT-320-STD",
        unit: "unit",
        images: [
          "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800",
        ],
      },
    ],
    company: {
      id: "comp-1",
      name: "Kigali Heavy Machinery Ltd",
      email: "sales@khm.rw",
      phone: "+250 788 000 000",
      address: "Kigali Special Economic Zone",
      district: "Gasabo, Kigali",
      description: "Leading supplier of heavy machinery in East Africa.",
      logo: "https://ui-avatars.com/api/?name=KHM&background=0D8ABC&color=fff",
      isVerified: true,
      rating: 4.8,
      joinedAt: new Date().toISOString(),
      ownerId: "user-1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    category: {
      id: "cat-1",
      name: "Construction",
      slug: "construction",
      description: "Heavy machinery and tools",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };

  const activeListing = listing || mockListing;

  // Fallback to mock data if no listing found
  const company = activeListing.company as CompanyRef | undefined;
  const variant = firstVariant(activeListing);
  const images = variantImages(variant);
  const price = variant ? Number(variant.price) : 0;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Mobile Sticky Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border px-3 py-2 z-50 flex items-center gap-1.5 safe-area-bottom shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <a
          href={`tel:${company?.phone || ""}`}
          className="flex-none w-11 h-11 flex items-center justify-center rounded-sm bg-muted border border-border text-foreground active:bg-accent transition-colors"
        >
          <Phone className="w-4 h-4" />
        </a>
        <a
          href={`https://wa.me/${company?.phone?.replace(/\D/g, "") || ""}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-none w-11 h-11 flex items-center justify-center rounded-sm bg-emerald-500 text-white active:bg-emerald-600 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
        <Button
          variant="outline"
          size="lg"
          className="flex-1 font-heading font-bold uppercase tracking-widest text-[10px] h-11 rounded-none border-primary text-primary"
          onClick={() => setMessageOpen(true)}
        >
          <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
          Chat
        </Button>
        <Button
          size="lg"
          className="flex-[1.5] font-heading font-bold uppercase tracking-widest text-[10px] h-11 rounded-none"
          onClick={() => setMessageOpen(true)}
        >
          Inquire
        </Button>
      </div>

      <div className="max-w-7xl mx-auto pb-24 md:pb-12">
        {/* Mobile Edge-to-Edge Image Carousel */}
        <div className="md:hidden -mx-4 mb-4 relative group">
          <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar aspect-[4/3]">
            {images.length > 0 ? (
              images.map((img, index) => (
                <div
                  key={index}
                  className="w-full shrink-0 snap-center relative"
                >
                  <ImageWithFallback
                    src={img}
                    alt={`${activeListing.name} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute active bottom-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest backdrop-blur-md">
                    {index + 1} / {images.length}
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full shrink-0 snap-center bg-muted/20 flex items-center justify-center">
                <span className="text-muted-foreground text-xs uppercase font-bold tracking-widest">
                  No Image
                </span>
              </div>
            )}
          </div>

          {/* Back Button Overlay */}
          <button
            onClick={onBack}
            className="absolute top-4 left-4 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Desktop Header / Breadcrumb (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-4 py-6 px-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="gap-2 font-heading uppercase text-xs tracking-wider rounded-sm shadow-none pl-0 hover:bg-transparent hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Catalog
          </Button>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-4 hidden md:block">
            <Card className="overflow-hidden border border-border shadow-none rounded-sm aspect-square relative bg-muted/10 group">
              {images[selectedImageIndex] ? (
                <ImageWithFallback
                  src={images[selectedImageIndex]}
                  alt={activeListing.name}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs uppercase font-bold tracking-widest">
                  No image available
                </div>
              )}
            </Card>
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-sm overflow-hidden border transition-all ${
                      selectedImageIndex === index
                        ? "border-primary ring-1 ring-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <ImageWithFallback
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-primary/10 text-primary border-none hover:bg-primary/20 uppercase text-xs font-bold tracking-wider">
                  {activeListing.category?.name ?? "—"}
                </Badge>
                <Badge
                  variant="outline"
                  className="border border-border uppercase text-xs font-semibold tracking-wide"
                >
                  {activeListing.type}
                </Badge>
              </div>

              <h1 className="text-2xl md:text-3xl font-heading font-bold uppercase text-foreground mb-4 tracking-wide leading-tight">
                {activeListing.name}
              </h1>

              {company && (
                <div className="flex items-center gap-3 text-muted-foreground mb-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="font-medium uppercase tracking-wide">
                      {company.district ?? "—"}
                    </span>
                  </div>
                </div>
              )}

              <p className="text-muted-foreground leading-relaxed">
                {activeListing.description || "No description."}
              </p>
            </div>

            <Card className="border border-primary bg-muted/30 rounded-sm overflow-hidden shadow-none">
              <CardContent className="p-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl md:text-4xl font-heading font-black text-primary">
                    RWF {price.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground font-bold uppercase text-xs">
                    / {variant?.unit ?? "unit"}
                  </span>
                </div>
                {variant && variant.stock != null && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    In stock: {variant.stock} units
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Rich Specifications & Details Section */}
            <div className="space-y-4 pt-4">
              <h3 className="font-heading font-bold uppercase text-xs tracking-widest text-muted-foreground border-b border-border pb-2 flex items-center gap-2">
                <List className="w-4 h-4 text-primary" />
                Technical Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                {[
                  { label: "Weight", value: "22,000 kg" },
                  { label: "Power", value: "107 kW" },
                  { label: "Bucket Cap", value: "1.2 m³" },
                  { label: "Engine", value: "CAT C4.4 ACERT" },
                  { label: "Max Speed", value: "5.4 km/h" },
                  { label: "Reach", value: "9.8 m" },
                ].map((spec, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-sm border-b border-border/40 py-1.5 hover:bg-muted/10 transition-colors"
                  >
                    <span className="text-muted-foreground font-medium">
                      {spec.label}
                    </span>
                    <span className="font-bold text-foreground uppercase tracking-tight">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="font-heading font-bold uppercase text-xs tracking-widest text-muted-foreground border-b border-border pb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                Key Features
              </h3>
              <ul className="grid grid-cols-1 gap-2">
                {[
                  "Zero maintenance hydraulic system",
                  "Advanced fuel monitoring sensor",
                  "Reinforced cabin for rocky terrains",
                  "Integrated payload management",
                ].map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground leading-snug"
                  >
                    <span className="text-primary mt-0.5">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {company && (
              <div className="border border-border rounded-sm p-4 hover:border-primary/30 transition-colors bg-card">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm bg-muted flex items-center justify-center border border-border">
                      <span className="font-heading font-bold text-muted-foreground">
                        {company.name?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm uppercase tracking-wide text-foreground flex items-center gap-1.5">
                        {company.name}
                        {company.isVerified && (
                          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                        )}
                      </h4>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {company.district || "Location N/A"}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-[10px] font-bold uppercase tracking-widest text-primary hover:text-primary hover:bg-primary/5"
                    onClick={() => onSupplierClick(company.id)}
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Message supplier</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mb-4">
            Send a message about &quot;{activeListing.name}&quot;. You can
            continue the conversation in Messages.
          </p>
          <Textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type your message..."
            className="min-h-24"
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setMessageOpen(false)}>
              Cancel
            </Button>
            <Button
              disabled={!messageText.trim()}
              onClick={async () => {
                try {
                  await startListingChat({
                    listingId: productId,
                    content: messageText.trim(),
                  }).unwrap();
                  setMessageOpen(false);
                  setMessageText("");
                  navigate("/messages");
                } catch (e) {
                  console.error(e);
                }
              }}
            >
              Send
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductView;
