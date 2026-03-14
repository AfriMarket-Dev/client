import { useRouter } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProductActions } from "@/hooks/use-product-actions";
import { useGetProductByIdQuery } from "@/services/api/products";
import { DetailsPageLayout } from "@/shared/components/layouts/details-page-layout";
import { ResourceInquiryModal } from "@/shared/components/modals/resource-inquiry-modal";
import { DetailPageSkeleton } from "@/shared/components/skeletons";
import { SpecificationList } from "@/shared/components/specification-list";
import { MobileActions } from "./product/mobile-actions";
import { ProductGallery } from "./product/product-gallery";
import { ProductInfo } from "./product/product-info";
import { ProductSidebar } from "./product/product-sidebar";
import { ProductTabsContent } from "./product/product-tabs-content";
import { cn } from "@/lib/utils";
import { logger } from "@/lib/logger";

interface ProductViewProps {
	productId: string;
	onBack?: () => void;
	onProviderClick?: (providerId: string) => void;
}

export default function ProductView({
	productId,
	onBack,
	onProviderClick,
}: ProductViewProps) {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState("overview");
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);
	const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

	const { data: product, isLoading, isFetching } = useGetProductByIdQuery(productId);

	const {
		messageOpen: showContactModal,
		setMessageOpen: setShowContactModal,
		isInWishlist,
		handleToggleWishlist,
		trackAndNavigate,
		handleSubmitInquiry,
	} = useProductActions(productId);

	const handleBack = useCallback(() => {
		router.history.back();
	}, [router.history]);

	const variants = product?.variants || [];
	const selectedVariant = useMemo(() => {
		if (selectedVariantId) {
			const found = variants.find(v => v.id === selectedVariantId);
			if (found) return found;
		}
		return variants[0];
	}, [variants, selectedVariantId]);

	const handleVariantSelect = (vId: string) => {
		logger.debug({ productId, variantId: vId }, "Variant selected");
		setSelectedVariantId(vId);
		setSelectedImageIndex(0);
	};

	const images = useMemo(() => {
		if (!product) return [];
		if (selectedVariant?.images?.length) {
			return selectedVariant.images;
		}
		if (product.images?.length) return product.images;
		if (product.variants?.length) {
			const vImgs = product.variants.flatMap((v) => v.images || []);
			if (vImgs.length > 0) return vImgs;
		}
		return [];
	}, [product, selectedVariant]);

	const keyFacts = useMemo(() => {
		if (!product) return [];
		const facts = [
			{ label: "Internal ID", value: product.id.slice(0, 8).toUpperCase() },
			{ label: "Industry", value: product.category?.name || "Manufacturing" },
		];
		const sku = selectedVariant?.sku || product.id.substring(0, 8);
		if (sku) facts.push({ label: "Technical SKU", value: sku });
		return facts;
	}, [product, selectedVariant]);

	const backHandler = onBack || handleBack;

	if (isLoading && !product) {
		return <DetailPageSkeleton />;
	}

	if (!product && !isFetching)
		return (
			<Empty className="max-w-md w-full">
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<Building2 className="w-4 h-4 text-primary" />
					</EmptyMedia>
					<EmptyTitle className="text-xl font-display font-black uppercase">
						Product Missing
					</EmptyTitle>
					<EmptyDescription className="uppercase tracking-widest text-[10px]">
						The requested resource is unavailable or has been archived.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<Button
						onClick={backHandler}
						className="rounded-none h-11 px-8 font-black uppercase text-[10px] tracking-widest"
					>
						Return to Catalog
					</Button>
				</EmptyContent>
			</Empty>
		);

	if (!product) return null;

	return (
		<DetailsPageLayout
			title={product.name}
			badgeText={isFetching && product ? "Syncing..." : (product.category?.name || "Standardized Item")}
			onBack={backHandler}
			mobileActions={
				<MobileActions
					productName={product.name}
					phone={product.company?.phone}
					isInWishlist={isInWishlist}
					onToggleWishlist={handleToggleWishlist}
					onContactClick={() => setShowContactModal(true)}
					trackAndNavigate={trackAndNavigate}
				/>
			}
			headerAction={
				<div className="flex items-center gap-4">
					<div className="hidden lg:flex flex-col items-end">
						<span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Listing Status</span>
						<span className="text-[10px] font-bold text-success uppercase">Active & Verified</span>
					</div>
					<Button
						onClick={() => setShowContactModal(true)}
						className="hidden md:inline-flex h-10 px-6 rounded-none text-[10px] font-black uppercase tracking-[0.3em] shadow-lg shadow-primary/20"
					>
						Direct Inquiry
					</Button>
				</div>
			}
			gallery={
				<div className="space-y-6 md:space-y-8">
					<ProductGallery
						images={images}
						name={product.name}
						selectedImageIndex={selectedImageIndex}
						onImageSelect={setSelectedImageIndex}
					/>
					
					{/* Integrated Trust Signals */}
					<div className="grid grid-cols-1 xs:grid-cols-2 gap-3 md:gap-4">
						<div className="p-4 border border-border/40 bg-muted/5 flex items-center gap-4">
							<div className="w-1 h-8 bg-primary/20" />
							<div className="space-y-1">
								<p className="text-[9px] font-black uppercase tracking-widest text-foreground">QC Verified</p>
								<p className="text-[8px] font-medium uppercase text-muted-foreground">Certified quality standards</p>
							</div>
						</div>
						<div className="p-4 border border-border/40 bg-muted/5 flex items-center gap-4">
							<div className="w-1 h-8 bg-primary/20" />
							<div className="space-y-1">
								<p className="text-[9px] font-black uppercase tracking-widest text-foreground">Bulk Available</p>
								<p className="text-[8px] font-medium uppercase text-muted-foreground">Enterprise volume support</p>
							</div>
						</div>
					</div>
				</div>
			}
			info={
				<div className="space-y-10">
					<ProductInfo
						name={product.name}
						description={product.description}
						price={selectedVariant?.price ?? product.price ?? 0}
						priceType={product.priceType}
						stock={selectedVariant?.stock ?? product.stock ?? 0}
						views={product.views}
						categoryName={product.category?.name}
						brandName={product.specifications?.["Brand"] || product.specifications?.["brand"]}
						onInquire={() => setShowContactModal(true)}
					/>

					{/* Variant Selector Interface */}
					{variants.length > 1 && (
						<div className="p-5 md:p-6 border border-border/40 bg-background relative group">
							<div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-500" />
							<div className="space-y-6">
								<div className="flex items-center justify-between">
									<span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground">
										Configuration Selection
									</span>
									<span className="text-[9px] font-bold text-primary uppercase tracking-widest">
										{variants.length} Options
									</span>
								</div>
								<div className="flex flex-wrap gap-2">
									{variants.map((v) => {
										const isActive = selectedVariantId === v.id || (!selectedVariantId && v === variants[0]);
										return (
											<button
												key={v.id}
												type="button"
												onClick={() => handleVariantSelect(v.id)}
												className={cn(
													"flex-1 min-w-[110px] px-3 py-3 text-[9px] font-black uppercase tracking-widest border transition-all duration-300 rounded-none text-center",
													isActive
														? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
														: "border-border/60 text-muted-foreground hover:border-primary/40 hover:bg-muted/5"
												)}
											>
												{v.name}
											</button>
										);
									})}
								</div>
							</div>
						</div>
					)}
				</div>
			}
			tabs={
				<div className="space-y-8 md:space-y-10">
					<div className="flex items-center gap-4">
						<h2 className="text-xl md:text-2xl font-display font-black text-foreground uppercase tracking-tighter">
							Technical Documentation
						</h2>
						<div className="flex-1 h-px bg-border/40" />
					</div>

					<Tabs
						value={activeTab}
						onValueChange={setActiveTab}
						className="w-full"
					>
						<div className="relative mb-8">
							<TabsList className="!flex w-full justify-start !rounded-none !bg-transparent !border-b !border-border/40 !h-auto !p-0 !gap-6 md:gap-8 overflow-x-auto no-scrollbar whitespace-nowrap">
								<TabsTrigger
									value="overview"
									className="data-[state=active]:!text-primary !rounded-none !border-b-2 !border-transparent data-[state=active]:!border-primary !pb-4 !px-0 !h-auto font-heading font-black uppercase text-[10px] tracking-[0.2em] !shadow-none !bg-transparent"
								>
									Overview
								</TabsTrigger>
								<TabsTrigger
									value="specifications"
									className="data-[state=active]:!text-primary !rounded-none !border-b-2 !border-transparent data-[state=active]:!border-primary !pb-4 !px-0 !h-auto font-heading font-black uppercase text-[10px] tracking-[0.2em] !shadow-none !bg-transparent"
								>
									Specifications
								</TabsTrigger>
								<TabsTrigger
									value="reviews"
									className="data-[state=active]:!text-primary !rounded-none !border-b-2 !border-transparent data-[state=active]:!border-primary !pb-4 !px-0 !h-auto font-heading font-black uppercase text-[10px] tracking-[0.2em] !shadow-none !bg-transparent"
								>
									Reviews
								</TabsTrigger>
							</TabsList>
							{/* Swipe Indicator Overlay */}
							<div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none sm:hidden" />
						</div>
						
						<div className="mt-8 md:mt-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
							<TabsContent value="overview" className="mt-0 outline-none">
								<ProductTabsContent
									description={product.description || ""}
									keyFacts={keyFacts}
									variantName={selectedVariant?.name}
									variantSku={selectedVariant?.sku}
								/>
							</TabsContent>
							<TabsContent value="specifications" className="mt-0 outline-none">
								<SpecificationList 
									specifications={product.specifications} 
									title="Material Specifications"
								/>
							</TabsContent>
							<TabsContent value="reviews" className="mt-0 outline-none">
								<div className="py-24 text-center border border-dashed border-border/40 bg-muted/5 relative overflow-hidden">
									<div className="absolute inset-0 blueprint-grid opacity-[0.02] pointer-events-none" />
									<div className="relative z-10 space-y-2">
										<p className="text-[11px] font-black uppercase tracking-[0.4em] text-foreground/40">
											Verification Pending
										</p>
										<p className="text-[9px] font-bold uppercase text-muted-foreground tracking-widest">
											User reports are being aggregated for this listing
										</p>
									</div>
								</div>
							</TabsContent>
						</div>
					</Tabs>
				</div>
			}
			sidebar={
				<div className="space-y-8">
					<ProductSidebar
						company={product.company}
						productName={product.name}
						onProviderClick={onProviderClick || (() => {})}
					/>
					
					{/* Additional Sidebar Context */}
					<div className="p-6 md:p-8 border border-border/40 bg-muted/10 relative overflow-hidden">
						<div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
						<div className="relative z-10 space-y-4">
							<h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">
								Procurement Logistics
							</h4>
							<ul className="space-y-3">
								{[
									"Direct site delivery",
									"Standard lead time: 48h",
									"Bulk order discounts",
									"Technical consultancy"
								].map((item, i) => (
									<li key={i} className="flex items-center gap-3">
										<div className="w-1 h-1 bg-primary/40 rotate-45" />
										<span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{item}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			}
			modals={
				<ResourceInquiryModal
					isOpen={showContactModal}
					onOpenChange={setShowContactModal}
					onSubmit={handleSubmitInquiry}
					resourceName={product.name}
					resourceType="PRODUCT"
				/>
			}
		/>
	);
}
