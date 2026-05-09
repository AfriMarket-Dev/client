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
import { logger } from "@/lib/logger";
import { cn } from "@/lib/utils";
import { useGetProductByIdQuery } from "@/services/api/products";
import { ContactActions } from "@/shared/components/contact-actions";
import { DetailsPageLayout } from "@/shared/components/layouts/details-page-layout";
import { ResourceInquiryModal } from "@/shared/components/modals/resource-inquiry-modal";
import { DetailPageSkeleton } from "@/shared/components/skeletons";
import { SpecificationList } from "@/shared/components/specification-list";
import { MobileActions } from "./product/mobile-actions";
import { ProductGallery } from "./product/product-gallery";
import { ProductInfo } from "./product/product-info";
import { ProductSidebar } from "./product/product-sidebar";
import { ProductTabsContent } from "./product/product-tabs-content";
import { AddReviewDialog } from "./reviews/add-review-dialog";
import { ReviewList } from "./reviews/review-list";

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
	const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
		null,
	);

	const {
		data: product,
		isLoading,
		isFetching,
	} = useGetProductByIdQuery(productId);

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
			const found = variants.find((v) => v.id === selectedVariantId);
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
			<Empty className="max-w-md w-full border-y border-border rounded-none shadow-none py-12">
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<Building2 className="w-8 h-8 text-muted-foreground" />
					</EmptyMedia>
					<EmptyTitle className="text-xl font-semibold tracking-tight">
						Resource Missing
					</EmptyTitle>
					<EmptyDescription className="text-sm text-muted-foreground">
						The requested item is currently offline or archived.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<Button
						onClick={backHandler}
						className="h-12 px-8 font-medium rounded-none shadow-none"
					>
						Return to Index
					</Button>
				</EmptyContent>
			</Empty>
		);

	if (!product) return null;

	return (
		<DetailsPageLayout
			title={product.name}
			badgeText={
				isFetching && product
					? "Synchronizing..."
					: product.category?.name || "Standardized Item"
			}
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
				<div className="flex items-center gap-6">
					<div className="hidden lg:flex flex-col items-end">
						<span className="text-xs font-medium text-muted-foreground">
							Verification Status
						</span>
						<span className="text-sm font-semibold text-emerald-600 dark:text-emerald-500">
							Active & Authenticated
						</span>
					</div>
					<ContactActions
						phone={product.company?.phone}
						whatsapp={product.company?.phone}
						email={product.company?.email}
						companyName={product.company?.name}
						companyId={product.company?.id}
						productId={product.id}
						variant="dropdown"
						label="Submit Inquiry"
						onCustomInquiry={() => setShowContactModal(true)}
						className="hidden md:flex"
					/>
				</div>
			}
			gallery={
				<ProductGallery
					images={images}
					name={product.name}
					selectedImageIndex={selectedImageIndex}
					onImageSelect={setSelectedImageIndex}
				/>
			}
			info={
				<div className="space-y-16">
					<ProductInfo
						name={product.name}
						description={product.description}
						price={selectedVariant?.price ?? product.price ?? 0}
						priceType={product.priceType}
						stock={selectedVariant?.stock ?? product.stock ?? 0}
						views={product.views}
						categoryName={product.category?.name}
						brandName={
							product.specifications?.Brand || product.specifications?.brand
						}
						averageRating={product.averageRating}
						reviewCount={product.reviewCount}
						onInquire={() => setShowContactModal(true)}
					/>

					{/* Variant Selection */}
					{variants.length > 1 && (
						<div className="space-y-5">
							<div className="flex items-center gap-4">
								<h3 className="text-sm font-semibold text-foreground">
									Configuration Options
								</h3>
								<div className="flex-1 h-px bg-border/30" />
							</div>
							<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
								{variants.map((v) => {
									const isActive =
										selectedVariantId === v.id ||
										(!selectedVariantId && v === variants[0]);
									return (
										<button
											key={v.id}
											type="button"
											onClick={() => handleVariantSelect(v.id)}
											className={cn(
												"px-4 py-3 text-sm font-medium rounded-none transition-all duration-300 text-center border shadow-none",
												isActive
													? "bg-primary/5 border-primary text-primary"
													: "bg-background border-border text-foreground hover:bg-muted/50",
											)}
										>
											{v.name}
										</button>
									);
								})}
							</div>
						</div>
					)}
				</div>
			}
			tabs={
				<div className="space-y-8">
					<div className="flex items-center gap-6">
						<h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
							Details
						</h2>
						<div className="flex-1 h-px bg-border/30" />
					</div>

					<Tabs
						value={activeTab}
						onValueChange={setActiveTab}
						className="w-full"
					>
						<div className="relative mb-8">
							<TabsList className="!flex w-full justify-start !rounded-none !bg-transparent border-b border-border !h-auto !p-0 gap-8 overflow-x-auto no-scrollbar whitespace-nowrap">
								<TabsTrigger
									value="overview"
									className="data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent !rounded-none border-b-2 border-transparent py-3 px-1 !h-auto font-medium text-sm text-muted-foreground hover:text-foreground !shadow-none transition-colors"
								>
									Overview
								</TabsTrigger>
								<TabsTrigger
									value="specifications"
									className="data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent !rounded-none border-b-2 border-transparent py-3 px-1 !h-auto font-medium text-sm text-muted-foreground hover:text-foreground !shadow-none transition-colors"
								>
									Specifications
								</TabsTrigger>
								<TabsTrigger
									value="reviews"
									className="data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent !rounded-none border-b-2 border-transparent py-3 px-1 !h-auto font-medium text-sm text-muted-foreground hover:text-foreground !shadow-none transition-colors"
								>
									Reviews
								</TabsTrigger>
							</TabsList>
						</div>

						<div className="animate-in fade-in duration-500">
							<TabsContent value="overview" className="mt-0 outline-none">
								<ProductTabsContent
									productId={product.id}
									description={product.description || ""}
									keyFacts={keyFacts}
									variantName={selectedVariant?.name}
									variantSku={selectedVariant?.sku}
								/>
							</TabsContent>
							<TabsContent value="specifications" className="mt-0 outline-none">
								<SpecificationList
									specifications={product.specifications}
									title="Material Properties"
								/>
							</TabsContent>
							<TabsContent value="reviews" className="mt-0 outline-none">
								<div className="space-y-12">
									<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-border/40 pb-8">
										<div className="space-y-2">
											<h3 className="text-sm font-black uppercase tracking-widest text-foreground">
												Partner Feedback
											</h3>
											<p className="text-xs text-muted-foreground">
												Performance metrics verified by the industrial ledger.
											</p>
										</div>
										<AddReviewDialog
											productId={product.id}
											trigger={
												<Button className="rounded-none h-11 px-8 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20">
													Log Experience
												</Button>
											}
										/>
									</div>

									<ReviewList productId={product.id} />
								</div>
							</TabsContent>
						</div>
					</Tabs>
				</div>
			}
			sidebar={
				<div className="space-y-16">
					<ProductSidebar
						company={product.company}
						productName={product.name}
						onProviderClick={onProviderClick || (() => {})}
					/>
				</div>
			}
			modals={
				<ResourceInquiryModal
					isOpen={showContactModal}
					onOpenChange={setShowContactModal}
					onSubmit={handleSubmitInquiry}
					resourceName={product.name}
					resourceType="PRODUCT"
					company={product.company}
				/>
			}
		/>
	);
}
