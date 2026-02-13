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
import { products, suppliers } from "../data/mockData";
import { useWishlist } from "../hooks/useWishlist";
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
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Button onClick={onBack}>Go Back to Marketplace</Button>
      </div>
    );
  }

  const handleSendMessage = () => {
    // In a real app, this would create a thread and redirect to chat
    console.log("Sending message to supplier:", {
      supplierId: supplier.id,
      productId: product.id,
      message: messageText,
      requestedQuantity: quantity,
    });
    setIsMessageDialogOpen(false);
    setMessageText("");
    
    // Redirect to the buyer messages page
    navigate("/messages");
  };

  return (
    <div className="min-h-screen bg-stone-50/50">
      {/* Navigation */}
      <div className="bg-white border-b border-stone-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
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
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div className="space-y-4">
            <Card className="overflow-hidden border-stone-200 shadow-sm rounded-3xl aspect-square">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </Card>

            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index
                      ? "border-primary shadow-md"
                      : "border-transparent hover:border-stone-300"
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-primary/10 text-primary border-none hover:bg-primary/20">
                  {product.category}
                </Badge>
                <Badge variant="outline" className="border-stone-200 text-stone-500">
                  {product.subcategory}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-stone-900 mb-4 font-display">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 text-stone-600 mb-6">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{supplier.location}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-stone-300" />
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-stone-900">{product.availability.replace("-", " ")}</span>
                </div>
              </div>

              <p className="text-lg text-stone-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Pricing Card */}
            <Card className="border-primary/20 bg-primary/5 rounded-3xl overflow-hidden shadow-sm">
              <CardContent className="p-8">
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-black text-primary">
                    {product.priceRange.currency} {product.priceRange.min.toLocaleString()}
                  </span>
                  <span className="text-stone-500 font-medium">/ unit</span>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-bold text-stone-700 uppercase tracking-wider">Bulk Price Guide</p>
                  {product.bulkPricing.map((tier, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-primary/10 last:border-0">
                      <span className="text-stone-600 font-medium">{tier.quantity}+ units</span>
                      <span className="font-bold text-stone-900">
                        {product.priceRange.currency} {tier.price.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-stone-200 rounded-2xl p-1 bg-white">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl h-12 w-12"
                    onClick={() => setQuantity(Math.max(product.minimumOrder, quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <div className="w-16 text-center font-bold text-lg">{quantity}</div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl h-12 w-12"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-stone-500 text-sm">
                  Min. order: <span className="font-bold text-stone-900">{product.minimumOrder}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="xl"
                  className="flex-1 rounded-2xl h-16 text-lg font-bold shadow-xl shadow-primary/20"
                  onClick={() => setIsMessageDialogOpen(true)}
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Message Provider
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-16" />

        {/* Details and Supplier */}
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 mb-6 font-display underline decoration-primary decoration-4 underline-offset-8">
                Specifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between p-4 bg-white rounded-2xl border border-stone-100 shadow-sm">
                    <span className="text-stone-500 font-medium">{key}</span>
                    <span className="text-stone-900 font-bold">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-stone-900 mb-6 font-display underline decoration-primary decoration-4 underline-offset-8">
                Features
              </h2>
              <div className="flex flex-wrap gap-3">
                {product.tags.map((tag, index) => (
                  <div key={index} className="flex items-center gap-2 px-4 py-2 bg-stone-100 text-stone-700 rounded-xl text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-stone-900 mb-6 font-display">
              The Provider
            </h2>
            <Card className="rounded-3xl border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-24 bg-primary/10 relative">
                <div className="absolute inset-0 african-pattern opacity-10" />
              </div>
              <CardContent className="px-6 pb-6 relative">
                <div className="flex justify-between items-end -translate-y-10">
                  <img
                    src={supplier.avatar}
                    alt={supplier.name}
                    className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg object-cover"
                  />
                  <Button
                    variant="outline"
                    className="rounded-xl border-primary text-primary hover:bg-primary/5"
                    onClick={() => onSupplierClick(supplier.id)}
                  >
                    View Profile
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <h4 className="font-bold text-xl text-stone-900">{supplier.name}</h4>
                      {supplier.verified && (
                        <ShieldCheck className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="flex items-center text-stone-500 text-sm gap-1">
                      <MapPin className="w-3 h-3" />
                      {supplier.location}
                    </div>
                  </div>

                  <p className="text-sm text-stone-600 line-clamp-3">
                    {supplier.description}
                  </p>

                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-stone-900">{supplier.rating}</span>
                    <span className="text-stone-400">({supplier.reviewCount} reviews)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Message Dialog */}
      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Message Provider</DialogTitle>
            <DialogDescription>
              Start a conversation with <span className="font-bold text-foreground">{supplier.name}</span> about this product.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-center gap-4 p-3 bg-stone-50 rounded-2xl border border-stone-100 mb-4">
              <img src={product.images[0]} className="w-12 h-12 rounded-lg object-cover" alt="" />
              <div className="flex-1">
                <div className="text-sm font-bold text-stone-900 truncate">{product.name}</div>
                <div className="text-xs text-stone-500">Qty: {quantity} units</div>
              </div>
            </div>

            <textarea
              className="w-full h-32 p-4 bg-stone-50 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none text-sm"
              placeholder="Hi, I'm interested in this product. Could you provide more details about delivery to my site?"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button variant="ghost" className="flex-1 rounded-xl h-12" onClick={() => setIsMessageDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="flex-1 rounded-xl h-12 shadow-lg shadow-primary/20" onClick={handleSendMessage}>
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetails;
