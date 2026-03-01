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
import { useGetProductByIdQuery } from "@/app/api/products";
import { Skeleton } from "@/components/ui/skeleton";

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
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-12 space-y-8">
        <Skeleton className="h-12 w-1/3" />
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-12">
            <Skeleton className="aspect-video w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
          <div className="lg:col-span-4">
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product)
    return (
      <div className="p-20 text-center uppercase font-bold tracking-widest text-muted-foreground">
        Material Not Found
      </div>
    );

  const backHandler = onBack || handleBack;

  return (
    <div className="min-h-screen bg-background space-y-6 overflow-x-hidden pb-24 md:pb-12 industrial-grain">
      <ProductHeader
        onBack={backHandler}
        isInWishlist={isInWishlist}
        onToggleWishlist={handleToggleWishlist}
      />

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-8 space-y-16">
          <ProductGallery
            name={product.name}
            images={images}
            selectedImageIndex={selectedImageIndex}
            onImageSelect={setSelectedImageIndex}
          />

          <ProductInfo
            name={product.name}
            description={product.description}
            price={Number(product.price || 0)}
            unit={product.variants?.[0]?.unit}
          />

          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList variant="line">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <ProductTabsContent
                description={product.description || ""}
                keyFacts={keyFacts}
                variantName={product.variants?.[0]?.name}
                variantSku={product.variants?.[0]?.sku}
              />
            </div>
          </Tabs>
        </div>

        <ProductSidebar
          company={product.company as any}
          onSupplierClick={(id) =>
            onSupplierClick
              ? onSupplierClick(id)
              : router.navigate({ to: `/suppliers/${id}` })
          }
        />
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
