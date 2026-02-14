import React, { useState } from "react";
import {
  ArrowLeft,
  Star,
  MapPin,
  Heart,
  MessageSquare,
  ShieldCheck,
  Plus,
  Minus,
  CheckCircle2,
} from "lucide-react";
import { products, suppliers } from "@/data/mockData";
import { useWishlist } from "@/hooks/useWishlist";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { Separator } from "@/components/ui/Separator";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/Dialog";

interface ProductDetailsProps {
  productId: string;
  onBack: () => void;
  onSupplierClick: (supplierId: string) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  productId,
  onBack,
  onSupplierClick,
}) => {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const product = products.find((p) => p.id === productId);
  const supplier = product
    ? suppliers.find((s) => s.id === product.supplierId)
    : null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(product?.minimumOrder || 1);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [messageText, setMessageText] = useState("");

  if (!product || !supplier) {
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

  const handleSendMessage = () => {
    console.log("Sending message to supplier:", {
      supplierId: supplier.id,
      productId: product.id,
      message: messageText,
      requestedQuantity: quantity,
    });
    setIsMessageDialogOpen(false);
    setMessageText("");
    navigate("/messages");
  };

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
          <Button
            variant="outline"
            size="icon"
            className="rounded-sm border-2 shadow-none"
            onClick={() => {
              if (isInWishlist(product.id, "product")) {
                removeFromWishlist(product.id, "product");
              } else {
                addToWishlist(product, "product");
              }
            }}
          >
            <Heart
              className={`w-5 h-5 ${
                isInWishlist(product.id, "product")
                  ? "text-destructive fill-current"
                  : "text-muted-foreground"
              }`}
            />
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Card className="overflow-hidden border-2 border-border shadow-none rounded-sm aspect-square relative">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 african-pattern opacity-10 pointer-events-none" />
            </Card>

            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-sm overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index
                      ? "border-primary"
                      : "border-border hover:border-muted-foreground"
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-primary/10 text-primary border-none hover:bg-primary/20 uppercase text-xs font-bold tracking-wider">
                  {product.category}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-2 border-border uppercase text-xs font-semibold tracking-wide"
                >
                  {product.subcategory}
                </Badge>
              </div>

              <h1 className="text-3xl font-heading font-bold uppercase text-foreground mb-4 tracking-wide leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 text-muted-foreground mb-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-medium uppercase tracking-wide">
                    {supplier.location}
                  </span>
                </div>
                <div className="w-1 h-1 rounded-full bg-border" />
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-foreground uppercase tracking-wide">
                    {product.availability.replace("-", " ")}
                  </span>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <Card className="border-2 border-primary bg-muted/30 rounded-sm overflow-hidden shadow-none">
              <CardContent className="p-6">
                <div className="flex items-baseline gap-2 mb-5">
                  <span className="text-4xl font-heading font-black text-primary">
                    {product.priceRange.currency}{" "}
                    {product.priceRange.min.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground font-bold uppercase text-xs">
                    / unit
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-heading font-bold text-foreground uppercase tracking-widest mb-3">
                    Bulk Pricing
                  </p>
                  {product.bulkPricing.map((tier, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-border last:border-0"
                    >
                      <span className="text-muted-foreground font-medium text-sm uppercase tracking-wide">
                        {tier.quantity}+ units
                      </span>
                      <span className="font-heading font-bold text-foreground">
                        {product.priceRange.currency}{" "}
                        {tier.price.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-border rounded-sm p-1 bg-background">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-sm h-10 w-10 shadow-none"
                    onClick={() =>
                      setQuantity(Math.max(product.minimumOrder, quantity - 1))
                    }
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <div className="w-14 text-center font-heading font-bold text-lg">
                    {quantity}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-sm h-10 w-10 shadow-none"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-muted-foreground text-xs uppercase tracking-wide">
                  Min:{" "}
                  <span className="font-bold text-foreground">
                    {product.minimumOrder}
                  </span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full rounded-sm h-14 text-sm font-heading font-bold uppercase tracking-widest shadow-none"
                onClick={() => setIsMessageDialogOpen(true)}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Message Provider
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-heading font-bold uppercase text-foreground mb-5 tracking-widest border-b-2 border-primary pb-2 inline-block">
                Specifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between p-4 bg-card rounded-sm border-2 border-border shadow-none"
                  >
                    <span className="text-muted-foreground font-medium text-xs uppercase tracking-wide">
                      {key}
                    </span>
                    <span className="text-foreground font-heading font-bold text-sm">
                      {String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-heading font-bold uppercase text-foreground mb-5 tracking-widest border-b-2 border-primary pb-2 inline-block">
                Features
              </h2>
              <div className="flex flex-wrap gap-2 mt-5">
                {product.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-sm text-xs font-bold uppercase tracking-wide border border-border shadow-none"
                  >
                    <CheckCircle2 className="w-3 h-3 text-primary" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-heading font-bold uppercase text-foreground tracking-widest">
              Supplier
            </h2>
            <Card className="rounded-sm border-2 border-border overflow-hidden shadow-none hover:border-primary transition-colors">
              <div className="h-20 bg-primary/10 relative">
                <div className="absolute inset-0 african-pattern opacity-10" />
              </div>
              <CardContent className="px-5 pb-5 relative">
                <div className="flex justify-between items-end -translate-y-8">
                  <img
                    src={supplier.avatar}
                    alt={supplier.name}
                    className="w-16 h-16 rounded-sm border-4 border-background object-cover"
                  />
                  <Button
                    variant="outline"
                    className="rounded-sm border-2 border-primary text-primary hover:bg-primary/5 text-xs uppercase tracking-wider font-heading font-bold shadow-none"
                    onClick={() => onSupplierClick(supplier.id)}
                  >
                    View Profile
                  </Button>
                </div>

                <div className="space-y-3 mt-2">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <h4 className="font-heading font-bold text-lg text-foreground uppercase tracking-wide">
                        {supplier.name}
                      </h4>
                      {supplier.verified && (
                        <ShieldCheck className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <div className="flex items-center text-muted-foreground text-xs gap-1 uppercase tracking-wide">
                      <MapPin className="w-3 h-3" />
                      {supplier.location}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {supplier.description}
                  </p>

                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="font-heading font-bold text-foreground">
                      {supplier.rating}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      ({supplier.reviewCount})
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="max-w-md rounded-sm border-2 border-border p-0 overflow-hidden shadow-none">
          <DialogHeader className="bg-muted/30 p-6 border-b-2 border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary/20" />
            <DialogTitle className="text-xl font-heading font-bold uppercase tracking-wide">
              Message Provider
            </DialogTitle>
            <DialogDescription className="text-sm">
              Start a conversation with{" "}
              <span className="font-bold text-foreground uppercase">
                {supplier.name}
              </span>{" "}
              about this product.
            </DialogDescription>
          </DialogHeader>

          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-sm border border-border shadow-none">
              <img
                src={product.images[0]}
                className="w-12 h-12 rounded-sm object-cover border border-border"
                alt=""
              />
              <div className="flex-1">
                <div className="text-sm font-heading font-bold text-foreground truncate uppercase tracking-wide">
                  {product.name}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  Qty: {quantity} units
                </div>
              </div>
            </div>

            <textarea
              className="w-full h-28 p-3 bg-background rounded-sm border-2 border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none text-sm"
              placeholder="Enter your message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
          </div>

          <DialogFooter className="p-6 bg-muted/30 border-t-2 border-border gap-2">
            <Button
              variant="ghost"
              className="flex-1 rounded-sm h-11 font-heading uppercase tracking-wider shadow-none"
              onClick={() => setIsMessageDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 rounded-sm h-11 font-heading uppercase tracking-wider shadow-none"
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetails;
