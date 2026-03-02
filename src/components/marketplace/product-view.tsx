import { useRouter } from "@tanstack/react-router";
import { useState, useMemo, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProductActions } from "@/hooks/use-product-actions";
import { ProductGallery } from "./product/product-gallery";
import { ProductHeader } from "./product/product-header";
import { ProductInfo } from "./product/product-info";
import { ProductSidebar } from "./product/product-sidebar";
import { ProductTabsContent } from "./product/product-tabs-content";
import { ProductInquiryModal } from "./product/product-inquiry-modal";
import { MobileActions } from "./product/mobile-actions";
import { useGetProductByIdQuery } from "@/app/api/products";
import { Skeleton } from "@/components/ui/skeleton";
import { RiBuilding4Line, RiHistoryLine, RiPriceTag3Line } from "@remixicon/react";

interface ProductViewProps {
  productId: string;
  onBack?: () => void;
  onSupplierClick?: (supplierId: string) => void;
}

export default function ProductView({
  productId,
  onBack,
  onSupplierClick,
}: ProductViewProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data: product, isLoading } = useGetProductByIdQuery(productId);

  const {
    messageOpen: showContactModal,
    setMessageOpen: setShowContactModal,
    messageText: message,
    setMessageText: setMessage,
    isInWishlist,
    handleToggleWishlist,
    trackAndNavigate,
    handleSubmitInquiry,
  } = useProductActions(productId);

  const handleBack = useCallback(() => {
    router.history.back();
  }, [router.history]);

  const images = useMemo(() => {
    if (!product) return [];
    if (product.variants?.length) {
      const vImgs = product.variants.flatMap((v) => v.images || []);
      if (vImgs.length > 0) return vImgs;
    }
    return product.images || [];
  }, [product]);

  const keyFacts = useMemo(() => {
    if (!product) return [];
    const facts = [];
    if (product.category?.name)
      facts.push({ label: "Category", value: product.category.name });
    const sku = (product as any).sku || product.variants?.[0]?.sku;
    if (sku) facts.push({ label: "SKU", value: sku });
    return facts;
  }, [product]);

  if (isLoading) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 space-y-8">
        <Skeleton className="h-8 w-48" />
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5 aspect-[4/5] bg-muted animate-pulse" />
          <div className="md:col-span-7 space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-24 w-full" />
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product)
    return (
      <div className="p-20 text-center uppercase font-black tracking-widest text-muted-foreground">
        Protocol Error: Material Not Found
      </div>
    );

  const backHandler = onBack || handleBack;

  return (
    <div className="min-h-screen bg-background space-y-6 overflow-x-hidden industrial-grain pb-24">
      <MobileActions
        productName={product.name}
        phone={(product.company as any)?.phone}
        isInWishlist={isInWishlist}
        onToggleWishlist={handleToggleWishlist}
        onContactClick={() => setShowContactModal(true)}
        trackAndNavigate={trackAndNavigate}
      />

      <div className="max-w-[1400px] mx-auto p-4 md:p-8 space-y-12">
        {/* Navigation */}
        <ProductHeader
          onBack={backHandler}
          isInWishlist={isInWishlist}
          onToggleWishlist={handleToggleWishlist}
        />

        {/* Standard Product Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Visuals */}
          <div className="lg:col-span-6 xl:col-span-5">
            <ProductGallery
              name={product.name}
              images={images}
              selectedImageIndex={selectedImageIndex}
              onImageSelect={setSelectedImageIndex}
            />
          </div>

          {/* Right Column: Key Details & Actions */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-10">
            <ProductInfo
              name={product.name}
              description={product.description}
              price={Number(product.price || 0)}
              unit={product.unit || product.variants?.[0]?.unit}
              priceType={product.priceType}
              stock={product.stock}
              views={product.views}
              onInquire={() => setShowContactModal(true)}
            />

            {/* Quick Specs Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border/40 border border-border/40 overflow-hidden shadow-sm">
              <div className="bg-background p-4 flex flex-col gap-1">
                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <RiPriceTag3Line size={12} className="text-primary" />
                  Classification
                </span>
                <span className="text-[11px] font-bold uppercase truncate">
                  {product.category?.name || "General Material"}
                </span>
              </div>
              <div className="bg-background p-4 flex flex-col gap-1">
                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <RiHistoryLine size={12} className="text-primary" />
                  Analytics
                </span>
                <span className="text-[11px] font-bold uppercase">
                  {product.views || 0} Platform Scans
                </span>
              </div>
              <div className="bg-background p-4 flex flex-col gap-1 col-span-2 md:col-span-1">
                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <RiBuilding4Line size={12} className="text-primary" />
                  Origin Node
                </span>
                <span className="text-[11px] font-bold uppercase truncate">
                  {product.company?.name || "Verified Provider"}
                </span>
              </div>
            </div>

            {/* Provider Section */}
            <div className="pt-2">
               <ProductSidebar
                company={product.company as any}
                productName={product.name}
                trackAndNavigate={trackAndNavigate}
                onSupplierClick={(id) =>
                  onSupplierClick
                    ? onSupplierClick(id)
                    : router.navigate({ to: `/suppliers/${id}` })
                }
              />
            </div>
          </div>
        </div>

        {/* Detailed Tabs Section */}
        <div className="pt-12 border-t border-border/40">
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList variant="line" className="justify-start mb-8">
              <TabsTrigger value="overview" className="uppercase text-[10px] font-black tracking-[0.2em]">General Info</TabsTrigger>
              <TabsTrigger value="specs" className="uppercase text-[10px] font-black tracking-[0.2em]">Technical Specs</TabsTrigger>
              <TabsTrigger value="reviews" className="uppercase text-[10px] font-black tracking-[0.2em]">Customer Reviews</TabsTrigger>
            </TabsList>

            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <ProductTabsContent
                description={product.description || ""}
                keyFacts={[...keyFacts, { label: "ID", value: product.id }]}
                variantName={product.variants?.[0]?.name}
                variantSku={product.variants?.[0]?.sku}
              />
            </div>
          </Tabs>
        </div>
      </div>

      <ProductInquiryModal
        isOpen={showContactModal}
        onOpenChange={setShowContactModal}
        productName={product.name}
        messageText={message}
        setMessageText={setMessage}
        onSubmit={handleSubmitInquiry}
      />
    </div>
  );
}
