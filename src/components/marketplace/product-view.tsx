import { useNavigate } from "@tanstack/react-router";
import {
  RiArrowLeftLine,
  RiChat3Line,
  RiHeartFill,
  RiHeartLine,
  RiMapPinLine,
  RiPhoneLine,
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
  const variant = listing ? firstVariant(listing) : null;
  const images = variant?.images ?? [];
  const price = variant ? Number(variant.price) : 0;

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
      <div className="mx-auto max-w-[1400px] px-4 py-6 md:px-6">
        <div className="mb-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className="gap-2 px-0 text-xs uppercase tracking-wider text-muted-foreground hover:bg-transparent hover:text-primary"
          >
            <RiArrowLeftLine className="h-4 w-4" /> Back to marketplace
          </Button>
          <Button variant="outline" onClick={handleToggleWishlist}>
            {isInWishlist ? (
              <RiHeartFill className="mr-2 h-4 w-4" />
            ) : (
              <RiHeartLine className="mr-2 h-4 w-4" />
            )}
            {isInWishlist ? "Saved" : "Save"}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-5">
            <div className="aspect-[4/3] overflow-hidden rounded-sm border border-border bg-muted/10">
              {images[selectedImageIndex] ? (
                <ImageWithFallback
                  src={images[selectedImageIndex]}
                  alt={listing.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  No image available
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    type="button"
                    key={`${image}-${index}`}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square overflow-hidden rounded-sm border ${
                      selectedImageIndex === index
                        ? "border-primary"
                        : "border-border"
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

          <div className="space-y-6 lg:col-span-7">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="text-[10px] uppercase tracking-wider"
                >
                  Product
                </Badge>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Ref {listing.id.slice(0, 8)}
                </span>
              </div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                {listing.name}
              </h1>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-primary">
                  RWF {price.toLocaleString()}
                </span>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  / {variant?.unit ?? "unit"}
                </span>
              </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList variant="line">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="supplier">Supplier</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-6">
                <div>
                  <h3 className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                    Description
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {listing.description || "No description provided."}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {keyFacts.map((fact) => (
                    <div
                      key={fact.label}
                      className="rounded-sm border border-border bg-muted/10 p-3"
                    >
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {fact.label}
                      </p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {fact.value}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="specs" className="mt-6">
                <div className="rounded-sm border border-border bg-muted/5 p-4 text-sm text-muted-foreground">
                  Variant: {variant?.name || "Default"}
                  {variant?.sku ? ` | SKU: ${variant.sku}` : ""}
                </div>
              </TabsContent>

              <TabsContent value="supplier" className="mt-6">
                <div className="space-y-4 rounded-sm border border-border bg-muted/5 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-lg font-heading font-bold text-foreground">
                        {company?.name ?? "Unknown supplier"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {company?.district ?? "-"}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => company?.id && onSupplierClick(company.id)}
                    >
                      View supplier
                    </Button>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <RiShieldCheckLine className="h-3.5 w-3.5 text-emerald-500" />
                      {company?.isVerified
                        ? "Verified supplier"
                        : "Unverified supplier"}
                    </span>
                    <span className="flex items-center gap-1">
                      <RiMapPinLine className="h-3.5 w-3.5" />{" "}
                      {company?.address ?? "Address not provided"}
                    </span>
                    {company?.phone && (
                      <a
                        href={`tel:${company.phone}`}
                        className="flex items-center gap-1 text-primary hover:underline"
                      >
                        <RiPhoneLine className="h-3.5 w-3.5" />
                        Call supplier
                      </a>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="rounded-sm border border-border bg-muted/5 p-5 text-center">
                  <div className="mb-2 flex justify-center gap-1 text-primary">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <RiStarFill key={i} className="h-4 w-4" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ratings and written reviews are not available yet.
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-3 border-t border-border pt-4">
              <Button
                className="h-11 rounded-sm"
                onClick={() => setMessageOpen(true)}
              >
                <RiChat3Line className="mr-2 h-4 w-4" /> Message
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
        <DialogContent className="sm:max-w-md rounded-none border-border">
          <DialogHeader>
            <DialogTitle className="font-heading uppercase tracking-widest">
              Message supplier
            </DialogTitle>
          </DialogHeader>
          <p className="mb-4 text-sm text-muted-foreground">
            Send a message about &quot;{listing.name}&quot;. Continue the
            conversation in Messages.
          </p>
          <Textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type your message..."
            className="min-h-24 rounded-none focus-visible:ring-1 focus-visible:ring-primary"
          />
          <div className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setMessageOpen(false)}
              className="rounded-none text-xs uppercase tracking-wider"
            >
              Cancel
            </Button>
            <Button
              className="rounded-none text-xs uppercase tracking-wider"
              disabled={!messageText.trim()}
              onClick={async () => {
                try {
                  await startProductChat({
                    productId,
                    content: messageText.trim(),
                  }).unwrap();
                  toast.success("Message sent successfully!");
                  setMessageOpen(false);
                  setMessageText("");
                  navigate({ to: "/messages" });
                } catch (error) {
                  console.error(error);
                  toast.error("Failed to send message.");
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
