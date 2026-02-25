import React, { useState } from "react";
import { toast } from "sonner";
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
  ArrowRight,
  Package,
  Truck,
  Tag,
  Heart,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "@tanstack/react-router";
import { useGetListingByIdQuery } from "@/app/api/listings";
import {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "@/app/api/wishlist";
import { useStartListingChatMutation } from "@/app/api/messages";
import { useSelector } from "react-redux";
import { type RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type {
  Listing,
  CompanyRef,
  ListingVariantRef,
} from "@/app/api/listings";
import { ImageWithFallback } from "@/components/common/image-with-fallback";

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

  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to add to wishlist");
      return;
    }
    try {
      if (isInWishlist) {
        await removeFromWishlist(productId).unwrap();
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist(productId).unwrap();
        toast.success("Added to wishlist");
      }
    } catch (error) {
      toast.error("Failed to update wishlist");
    }
  };

  const handleFollowSupplier = () => {
    if (!isAuthenticated) {
      toast.error("Please login to follow suppliers");
      return;
    }
    toast.success(`You are now following ${company?.name}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground font-heading uppercase tracking-widest text-xs">Loading Spec Sheet...</div>
      </div>
    );
  }

  const mockListing: Listing = {
    id: "mock-1",
    name: "Heavy Duty Excavator CAT-320",
    description:
      "High-performance hydraulic excavator suitable for heavy construction work. Features include a fuel-efficient engine, reinforced boom and stick, and advanced hydraulic system for precise control. Available for immediate dispatch.",
    type: "PRODUCT" as const, // Fixed enumstatus: "ACTIVE",
    companyId: "comp-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: [
      "https://images.pexels.com/photos/5953073/pexels-photo-5953073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/95687/pexels-photo-95687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/461789/pexels-photo-461789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    variants: [
      {
        id: "var-1",
        name: "Standard",
        price: 125000000,
        stock: 4,
        unit: "unit",
        images: [
          "https://images.pexels.com/photos/5953073/pexels-photo-5953073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          "https://images.pexels.com/photos/95687/pexels-photo-95687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          "https://images.pexels.com/photos/461789/pexels-photo-461789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
      updatedAt: new Date().toISOString(),
    },
    category: {
      id: "cat-1",
      name: "Construction",
      slug: "construction",
      description: "Heavy machinery and tools",
    },
  };

  const activeListing = listing || mockListing;

  // Fallback to mock data if no listing found
  const company = activeListing.company as CompanyRef | undefined;
  const variant = firstVariant(activeListing);
  const images = variantImages(variant);
  const price = variant ? Number(variant.price) : 0;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden industrial-grain">
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
          size="icon"
          className="flex-none w-11 h-11 rounded-sm border-primary/20 text-primary active:bg-primary/10 transition-colors"
          onClick={handleToggleWishlist}
        >
          <Heart className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`} />
        </Button>
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

      <div className="max-w-[1600px] mx-auto pb-24 md:pb-12">
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
        <div className="hidden md:flex items-center gap-4 py-8 px-6 text-sm">
          <Button
             variant="ghost"
             onClick={onBack}
             className="gap-2 font-heading uppercase text-xs tracking-wider rounded-sm shadow-none pl-0 hover:bg-transparent hover:text-primary transition-colors text-muted-foreground"
           >
             <ArrowLeft className="w-4 h-4" />
             Back to Marketplace
           </Button>
           <span className="text-muted-foreground/30 font-light">/</span>
           <span className="font-heading font-bold uppercase tracking-wide text-xs text-muted-foreground">
             {activeListing.category?.name}
           </span>
        </div>

        <div className="px-4 md:px-6 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* GALLEY COLUMN (5/12) */}
          <div className="lg:col-span-5 space-y-4 hidden md:block sticky top-24">
            <div className="overflow-hidden border border-border/60 shadow-none rounded-none aspect-[4/3] bg-muted/5 group relative">
              <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
              {images[selectedImageIndex] ? (
                <ImageWithFallback
                  src={images[selectedImageIndex]}
                  alt={activeListing.name}
                  className="w-full h-full object-contain p-2 mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs uppercase font-bold tracking-widest">
                  No image available
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-none overflow-hidden border bg-muted/5 transition-all relative ${
                      selectedImageIndex === index
                        ? "border-primary ring-1 ring-primary/50"
                        : "border-border/60 hover:border-primary/50"
                    }`}
                  >
                    <ImageWithFallback
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    {selectedImageIndex === index && <div className="absolute inset-0 bg-primary/10" />}
                  </button>
                ))}
              </div>
            )}
            
            <div className="grid grid-cols-[1fr,auto] gap-3 pt-4">
              <div className="grid grid-cols-2 gap-3">
                 <Button size="lg" variant="outline" className="h-12 border-primary/20 hover:border-primary text-primary font-heading uppercase tracking-widest text-xs rounded-none">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat Supplier
                 </Button>
                 <Button size="lg" className="h-12 font-heading uppercase tracking-widest text-xs rounded-none" onClick={() => setMessageOpen(true)}>
                    Request Quote
                 </Button>
              </div>
              <Button size="lg" variant="outline" className="h-12 w-12 border-primary/20 hover:border-primary hover:bg-primary/5 text-primary rounded-none px-0" onClick={handleToggleWishlist}>
                  <Heart className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`} />
              </Button>
            </div>
            {company && (
               <div className="flex items-center justify-center gap-2 pt-2 text-[10px] text-muted-foreground uppercase tracking-widest">
                 <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                 Verified Supplier: {company.name}
               </div>
            )}
          </div>

          {/* DETAILS COLUMN (7/12) */}
          <div className="lg:col-span-7 space-y-10 lg:pr-12">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-border/40 pb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 rounded-none uppercase text-[10px] font-bold tracking-widest px-2 py-0.5">
                    {activeListing.type}
                  </Badge>
                  <div className="w-px h-4 bg-border" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Ref: {activeListing.id?.slice(0,8).toUpperCase()}
                  </span>
                </div>
                {variant && variant.stock != null && (
                   <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-emerald-500 bg-emerald-500/5 px-2 py-1 border border-emerald-500/20">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                     In Stock
                   </div>
                )}
              </div>

              <h1 className="text-3xl font-display font-bold uppercase text-foreground mb-4 leading-[0.9]">
                {activeListing.name}
              </h1>

              <div className="flex items-end gap-3 mb-6">
                <span className="text-lg md:text-2xl lg:text-2xl font-display font-semibold text-primary">
                   RWF {price.toLocaleString()}
                </span>
                <span className="text-sm font-heading font-bold uppercase text-muted-foreground mb-2 tracking-widest">
                   / {variant?.unit ?? "unit"}
                </span>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                 {["Heavy Duty", "Excavator", "Construction", "CAT", "Verified"].map((tag, i) => (
                    <div key={i} className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground bg-muted/20 px-2 py-1 rounded-sm border border-border/40">
                       #{tag}
                    </div>
                 ))}
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList variant={"line"}>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="specs">Specifications</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="supplier">Supplier</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-8">
                   <div>
                     <h3 className="font-heading font-bold uppercase text-xs tracking-widest text-muted-foreground mb-4">Description</h3>
                     <p className="text-muted-foreground leading-relaxed text-sm">
                       {activeListing.description || "No description provided."}
                     </p>
                   </div>
                   
                   {/* Bulk Pricing */}
                   <div>
                      <h3 className="font-heading font-bold uppercase text-xs tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                         <Package className="w-3.5 h-3.5 text-primary" /> Bulk Pricing
                      </h3>
                      <div className="grid grid-cols-3 gap-px bg-border/40 border border-border/40 mb-2">
                         {[
                            { qty: "1-4 units", price: "RWF 125M" },
                            { qty: "5-9 units", price: "RWF 120M" },
                            { qty: "10+ units", price: "RWF 115M" },
                         ].map((tier, i) => (
                            <div key={i} className="bg-background p-4 text-center group hover:bg-muted/5 transition-colors">
                               <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">{tier.qty}</div>
                               <div className="text-sm font-bold font-heading text-primary group-hover:scale-105 transition-transform">{tier.price}</div>
                            </div>
                         ))}
                      </div>
                      <div className="flex items-center gap-4 p-4 border border-border bg-muted/5">
                         <div className="flex-1">
                            <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Minimum Order</div>
                            <div className="text-sm font-bold">1 Unit</div>
                         </div>
                         <div className="flex items-center gap-3">
                            <span className="text-xs font-bold uppercase text-muted-foreground">Quantity:</span>
                            <div className="flex items-center border border-border bg-background">
                               <button className="w-8 h-8 flex items-center justify-center hover:bg-muted border-r border-border transition-colors text-muted-foreground">-</button>
                               <input type="text" value="1" readOnly className="w-10 h-8 text-center text-sm font-bold bg-transparent outline-none" />
                               <button className="w-8 h-8 flex items-center justify-center hover:bg-muted border-l border-border transition-colors text-primary">+</button>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="grid md:grid-cols-2 gap-8 pt-4">
                      <div>
                         <h3 className="font-heading font-bold uppercase text-xs tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                           <CheckCircle className="w-4 h-4 text-primary" /> Key Features
                         </h3>
                         <ul className="space-y-2">
                           {[
                             "Zero maintenance hydraulic system",
                             "Advanced fuel monitoring sensor", 
                             "Reinforced cabin for rocky terrains",
                             "Integrated payload management system"
                           ].map((feature, i) => (
                             <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground group">
                                <div className="w-1.5 h-1.5 mt-1.5 bg-border group-hover:bg-primary transition-colors" />
                                {feature}
                             </li>
                           ))}
                         </ul>
                      </div>
                      
                      <div>
                         <h3 className="font-heading font-bold uppercase text-xs tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" /> Location
                         </h3>
                         <div className="border border-border/60 p-4 bg-muted/5">
                             <div className="font-bold text-sm uppercase mb-1">{company?.district || "Kigali, Rwanda"}</div>
                             <div className="text-xs text-muted-foreground">{company?.address || "Industrial Zone"}</div>
                         </div>
                      </div>
                   </div>
                </TabsContent>

                <TabsContent value="specs" className="mt-8">
                   <div className="space-y-6">
                      <div className="flex items-center gap-2 border-b border-border pb-2">
                        <List className="w-5 h-5 text-primary" />
                        <h3 className="font-heading font-bold uppercase text-sm tracking-widest">Technical Datasheet</h3>
                      </div>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-border/40 border border-border/40">
                         {[
                           { label: "Weight Class", value: "22,000 kg" },
                           { label: "Engine Power", value: "107 kW" },
                           { label: "Bucket Cap", value: "1.2 m³" },
                           { label: "Model Year", value: "2024" },
                           { label: "Fuel Type", value: "Diesel" },
                           { label: "Condition", value: "New" },
                           { label: "Max Dig Depth", value: "6,720 mm" },
                           { label: "Shipping Length", value: "9,530 mm" },
                           { label: "Ground Clearance", value: "450 mm" },
                         ].map((spec, i) => (
                           <div key={i} className="bg-background p-4 flex flex-col gap-1 hover:bg-muted/5 transition-colors">
                             <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{spec.label}</span>
                             <span className="text-sm font-bold text-foreground font-heading">{spec.value}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                </TabsContent>

                <TabsContent value="reviews" className="animate-in slide-in-from-bottom-2 duration-500 fade-in mt-8">
                   <div className="border border-border p-8 bg-muted/5 space-y-8">
                      <div className="flex items-center gap-6 pb-8 border-b border-border">
                         <div className="text-center">
                            <div className="text-5xl font-black font-heading text-foreground">4.8</div>
                            <div className="flex gap-1 justify-center my-2 text-primary text-xs">
                               {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-primary" />)}
                            </div>
                            <div className="text-xs uppercase font-bold tracking-wider text-muted-foreground">156 Reviews</div>
                         </div>
                         {/* Simple Rating Bar Visual */}
                         <div className="flex-1 space-y-2 hidden md:block">
                             <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Rating Breakdown</div>
                             <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[80%]" />
                             </div>
                         </div>
                      </div>
                      
                      <div className="text-center py-8 text-muted-foreground text-sm">
                         <p>Reviews coming soon. This supplier has a verified track record.</p>
                      </div>
                   </div>
                </TabsContent>

                <TabsContent value="supplier" className="mt-8">
                   <div className="border border-border p-6 bg-muted/5">
                      <div className="flex items-start gap-4 mb-8">
                         <div className="w-20 h-20 bg-background border border-border flex items-center justify-center text-3xl font-heading font-black text-muted-foreground">
                            {company?.name.charAt(0)}
                         </div>
                         <div>
                            <div className="flex items-center justify-between w-full">
                               <h3 className="text-xl font-heading font-bold uppercase text-foreground">{company?.name}</h3>
                               <Button size="sm" variant="outline" className="h-8 gap-2 rounded-none border-primary/20 text-primary hover:bg-primary/5 hover:text-primary uppercase text-[10px] font-bold tracking-wider" onClick={handleFollowSupplier}>
                                  <Heart className="w-3.5 h-3.5" /> Follow Supplier
                               </Button>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase font-bold tracking-wider mb-2">
                               <span className="text-emerald-500 flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Verified Supplier</span>
                               <span className="w-1 h-1 bg-border rounded-full" />
                               <span>{company?.district}, Rwanda</span>
                            </div>
                            <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
                               {company?.description || "Leading supplier of heavy machinery and industrial equipment in East Africa. Specialized in construction, mining, and agricultural machinery."}
                            </p>
                         </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/40 border border-border/40">
                         {[
                            { label: "Products", value: "245", icon: Package },
                            { label: "Min Order", value: "RWF 5M", icon: Briefcase },
                            { label: "Delivery", value: "7-14 Days", icon: Truck },
                            { label: "Response", value: "98%", icon: MessageCircle },
                         ].map((stat, i) => (
                            <div key={i} className="bg-background p-4 group hover:bg-muted/5 transition-colors">
                               <stat.icon className="w-4 h-4 text-primary mb-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                               <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-0.5">{stat.label}</div>
                               <div className="text-lg font-bold font-heading text-foreground">{stat.value}</div>
                            </div>
                         ))}
                      </div>
                   </div>
                </TabsContent>

              </Tabs>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
        <DialogContent className="sm:max-w-md rounded-none border-border">
          <DialogHeader>
            <DialogTitle className="font-heading uppercase tracking-widest">Message supplier</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mb-4">
            Send a message about &quot;{activeListing.name}&quot;. You can
            continue the conversation in Messages.
          </p>
          <Textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type your message..."
            className="min-h-24 rounded-none focus-visible:ring-1 focus-visible:ring-primary"
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setMessageOpen(false)} className="rounded-none font-heading uppercase tracking-wider text-xs">
              Cancel
            </Button>
            <Button
              className="rounded-none font-heading uppercase tracking-wider text-xs"
              disabled={!messageText.trim()}
              onClick={async () => {
                try {
                  await startListingChat({
                    listingId: productId,
                    content: messageText.trim(),
                  }).unwrap();
                  setMessageOpen(false);
                  setMessageText("");
                  navigate({ to: "/messages" });
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
