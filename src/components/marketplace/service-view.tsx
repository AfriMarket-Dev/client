import { useRouter } from "@tanstack/react-router";
import { useId } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useServiceActions } from "@/hooks/use-service-actions";
import { ContactModal } from "./service/contact-modal";
import { MobileActions } from "./service/mobile-actions";
import { ServiceHeader } from "./service/service-header";
import { ServiceInfo } from "./service/service-info";
import { ServiceSidebar } from "./service/service-sidebar";
import { ServiceTabsContent } from "./service/service-tabs-content";
import type { Service } from "./service/types";

interface ServiceViewProps {
	service: Service;
	onBack?: () => void;
}

export default function ServiceView({ service, onBack }: ServiceViewProps) {
	const router = useRouter();
	const formId = useId();

	const {
		showContactModal,
		setShowContactModal,
		message,
		setMessage,
		isInWishlist,
		handleToggleWishlist,
		trackAndNavigate,
		handleBack,
		handleSubmitInquiry,
		sendingInquiry,
	} = useServiceActions(service);

	const backHandler = onBack || handleBack;

	return (
		<div className="min-h-screen bg-background space-y-6 overflow-x-hidden pb-24 md:pb-12 industrial-grain">
			<MobileActions
				service={service}
				isInWishlist={isInWishlist}
				onToggleWishlist={handleToggleWishlist}
				onContactClick={() => setShowContactModal(true)}
				trackAndNavigate={trackAndNavigate}
			/>

			<ServiceHeader
				service={service}
				isInWishlist={isInWishlist}
				onBack={backHandler}
				onToggleWishlist={handleToggleWishlist}
				onInquire={() => setShowContactModal(true)}
			/>

			<div className="max-w-[1600px] mx-auto px-4 md:px-6 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
				<div className="lg:col-span-8 space-y-16">
					<ServiceInfo
						service={service}
						onInquire={() => setShowContactModal(true)}
					/>

					<Tabs defaultValue="overview" className="w-full">
						<TabsList variant="line">
							<TabsTrigger value="overview">Overview</TabsTrigger>
							<TabsTrigger value="products">Products</TabsTrigger>
							<TabsTrigger value="reviews">Reviews</TabsTrigger>
							<TabsTrigger value="contact">Contact</TabsTrigger>
						</TabsList>

						<ServiceTabsContent
							service={service}
							trackAndNavigate={trackAndNavigate}
						/>
					</Tabs>
				</div>

				<ServiceSidebar
					service={service}
					onViewBio={() =>
						router.navigate({ to: `/suppliers/${service.company?.id}` })
					}
				/>
			</div>

			{showContactModal && (
				<ContactModal
					service={service}
					formId={formId}
					message={message}
					setMessage={setMessage}
					sendingInquiry={sendingInquiry}
					onClose={() => setShowContactModal(false)}
					onSubmit={handleSubmitInquiry}
				/>
			)}
		</div>
	);
}
