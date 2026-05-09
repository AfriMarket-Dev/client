import { useRouter } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useServiceActions } from "@/hooks/use-service-actions";
import { ContactActions } from "@/shared/components/contact-actions";
import { ImageWithFallback } from "@/shared/components/image-with-fallback";
import { DetailsPageLayout } from "@/shared/components/layouts/details-page-layout";
import { ResourceInquiryModal } from "@/shared/components/modals/resource-inquiry-modal";
import type { Service } from "@/types";
import { MobileActions } from "./service/mobile-actions";
import { ServiceHeader } from "./service/service-header";
import { ServiceInfo } from "./service/service-info";
import { ServiceSidebar } from "./service/service-sidebar";
import { ServiceTabsContent } from "./service/service-tabs-content";

interface ServiceViewProps {
	service: Service;
	onBack?: () => void;
}

export default function ServiceView({ service, onBack }: ServiceViewProps) {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState("overview");

	const {
		showContactModal,
		setShowContactModal,
		isInWishlist,
		handleToggleWishlist,
		trackAndNavigate,
		handleBack,
		handleSubmitInquiry,
		sendingInquiry,
	} = useServiceActions(service);

	const backHandler = onBack || handleBack;

	const mainImage = useMemo(() => {
		return service.images?.[0] || null;
	}, [service]);

	return (
		<DetailsPageLayout
			title={service.name}
			badgeText={service.category?.name || "Service"}
			onBack={backHandler}
			mobileActions={
				<MobileActions
					service={service}
					isInWishlist={isInWishlist}
					onToggleWishlist={handleToggleWishlist}
					onContactClick={() => setShowContactModal(true)}
					trackAndNavigate={trackAndNavigate}
				/>
			}
			headerAction={
				<ContactActions
					phone={service.company?.phone}
					whatsapp={service.company?.phone}
					email={service.company?.email}
					companyName={service.company?.name}
					companyId={service.company?.id}
					serviceId={service.id}
					variant="dropdown"
					label="Request Quote"
					onCustomInquiry={() => setShowContactModal(true)}
					className="hidden md:flex"
				/>
			}
			gallery={
				<div className="aspect-square md:aspect-auto h-full overflow-hidden bg-muted/5 relative group border-none shadow-none">
					{mainImage ? (
						<ImageWithFallback
							src={mainImage}
							alt={service.name}
							className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
						/>
					) : (
						<div className="flex h-full items-center justify-center text-sm font-medium text-muted-foreground text-center px-12">
							Preview Unavailable
						</div>
					)}
				</div>
			}
			info={
				<div className="space-y-12 md:space-y-16">
					<ServiceHeader
						service={service}
						isInWishlist={isInWishlist}
						onToggleWishlist={handleToggleWishlist}
						onInquire={() => setShowContactModal(true)}
					/>

					<ServiceInfo
						service={service}
						onInquire={() => setShowContactModal(true)}
					/>
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
						defaultValue="overview"
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
									value="products"
									className="data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent !rounded-none border-b-2 border-transparent py-3 px-1 !h-auto font-medium text-sm text-muted-foreground hover:text-foreground !shadow-none transition-colors"
								>
									Assets
								</TabsTrigger>
								<TabsTrigger
									value="reviews"
									className="data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent !rounded-none border-b-2 border-transparent py-3 px-1 !h-auto font-medium text-sm text-muted-foreground hover:text-foreground !shadow-none transition-colors"
								>
									Reviews
								</TabsTrigger>
								<TabsTrigger
									value="contact"
									className="data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent !rounded-none border-b-2 border-transparent py-3 px-1 !h-auto font-medium text-sm text-muted-foreground hover:text-foreground !shadow-none transition-colors"
								>
									Consultancy
								</TabsTrigger>
							</TabsList>
						</div>

						<div className="animate-in fade-in duration-500">
							<TabsContent value="overview" className="mt-0 outline-none">
								<ServiceTabsContent
									service={service}
									activeTab="overview"
									trackAndNavigate={trackAndNavigate as never}
								/>
							</TabsContent>
							<TabsContent value="products" className="mt-0 outline-none">
								<ServiceTabsContent
									service={service}
									activeTab="products"
									trackAndNavigate={trackAndNavigate as never}
								/>
							</TabsContent>
							<TabsContent value="reviews" className="mt-0 outline-none">
								<ServiceTabsContent
									service={service}
									activeTab="reviews"
									trackAndNavigate={trackAndNavigate as never}
								/>
							</TabsContent>
							<TabsContent value="contact" className="mt-0 outline-none">
								<ServiceTabsContent
									service={service}
									activeTab="contact"
									trackAndNavigate={trackAndNavigate as never}
								/>
							</TabsContent>
						</div>
					</Tabs>
				</div>
			}
			sidebar={
				<div className="lg:sticky lg:top-36">
					<ServiceSidebar
						service={service}
						onViewBio={() =>
							router.navigate({ to: `/providers/${service.company?.id}` })
						}
					/>
				</div>
			}
			modals={
				<ResourceInquiryModal
					isOpen={showContactModal}
					onOpenChange={setShowContactModal}
					onSubmit={handleSubmitInquiry}
					resourceName={service.name}
					resourceType="SERVICE"
					company={service.company}
					isLoading={sendingInquiry}
				/>
			}
		/>
	);
}
