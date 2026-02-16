import React, { useState } from "react";
import { ArrowLeft, MapPin, ShieldCheck, Heart, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetListingByIdQuery } from "@/app/api/listings";
import { useGetWishlistQuery, useAddToWishlistMutation, useRemoveFromWishlistMutation } from "@/app/api/wishlist";
import { useStartListingChatMutation } from "@/app/api/messages";
import { useSelector } from "react-redux";
import { type RootState } from "@/app/store";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import type { Listing, CompanyRef, ListingVariantRef } from "@/app/api/listings";

interface ProductDetailsProps {
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

const ProductDetails: React.FC<ProductDetailsProps> = ({
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

  const { data: wishlist = [] } = useGetWishlistQuery(undefined, { skip: !isAuthenticated });
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [startListingChat] = useStartListingChatMutation();

  const isInWishlist = Array.isArray(wishlist) && wishlist.some((l: { id: string }) => l.id === productId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-heading font-bold uppercase mb-4">
          Product Not Found
        </h2>
        <Button onClick={onBack} className="rounded-sm">
          Go Back
        </Button>
      </div>
    );
  }

  const company = listing.company as CompanyRef | undefined;
  const variant = firstVariant(listing);
  const images = variantImages(variant);
  const price = variant ? Number(variant.price) : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background border-b-2 border-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className="gap-2 font-heading uppercase text-xs tracking-wider rounded-sm shadow-none"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          {isAuthenticated && (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10"
                onClick={async () => {
                  if (isInWishlist) {
                    try { await removeFromWishlist(productId).unwrap(); } catch (e) { console.error(e); }
                  } else {
                    try { await addToWishlist(productId).unwrap(); } catch (e) { console.error(e); }
                  }
                }}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? "fill-destructive text-destructive" : ""}`} />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setMessageOpen(true)}>
                <MessageSquare className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Card className="overflow-hidden border-2 border-border shadow-none rounded-sm aspect-square relative bg-muted">
              {images[selectedImageIndex] ? (
                <img
                  src={images[selectedImageIndex]}
                  alt={listing.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No image
                </div>
              )}
            </Card>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-sm overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? "border-primary"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-primary/10 text-primary border-none hover:bg-primary/20 uppercase text-xs font-bold tracking-wider">
                  {listing.category?.name ?? "—"}
                </Badge>
                <Badge variant="outline" className="border-2 border-border uppercase text-xs font-semibold tracking-wide">
                  {listing.type}
                </Badge>
              </div>

              <h1 className="text-3xl font-heading font-bold uppercase text-foreground mb-4 tracking-wide leading-tight">
                {listing.name}
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
                {listing.description || "No description."}
              </p>
            </div>

            <Card className="border-2 border-primary bg-muted/30 rounded-sm overflow-hidden shadow-none">
              <CardContent className="p-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-heading font-black text-primary">
                    RWF {price.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground font-bold uppercase text-xs">
                    / {variant?.unit ?? "unit"}
                  </span>
                </div>
                {variant && variant.stock != null && (
                  <p className="text-sm text-muted-foreground">
                    In stock: {variant.stock}
                  </p>
                )}
              </CardContent>
            </Card>

            {company && (
              <Card className="rounded-sm border border-border overflow-hidden shadow-none hover:border-primary transition-colors">
                <div className="h-16 bg-primary/5" />
                <CardContent className="px-5 pb-5 relative">
                  <div className="flex justify-between items-end -translate-y-6">
                    <div className="w-14 h-14 rounded-sm border-2 border-background bg-muted flex items-center justify-center text-lg font-bold text-muted-foreground">
                      {company.name?.charAt(0) ?? "?"}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-sm border border-primary text-primary hover:bg-primary/5 text-xs uppercase tracking-wider font-heading font-bold shadow-none"
                      onClick={() => onSupplierClick(company.id)}
                    >
                      View Profile
                    </Button>
                  </div>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-heading font-bold text-lg text-foreground uppercase tracking-wide">
                        {company.name}
                      </h4>
                      {company.isVerified && (
                        <ShieldCheck className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    {company.district && (
                      <div className="flex items-center text-muted-foreground text-xs gap-1 uppercase tracking-wide">
                        <MapPin className="w-3 h-3" />
                        {company.district}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
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
            Send a message about &quot;{listing.name}&quot;. You can continue the conversation in Messages.
          </p>
          <Textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type your message..."
            className="min-h-24"
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setMessageOpen(false)}>Cancel</Button>
            <Button
              disabled={!messageText.trim()}
              onClick={async () => {
                try {
                  await startListingChat({ listingId: productId, content: messageText.trim() }).unwrap();
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

export default ProductDetails;
