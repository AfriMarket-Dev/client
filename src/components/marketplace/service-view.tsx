import { useRouter } from "@tanstack/react-router";
import { useId, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useServiceActions } from "@/hooks/use-service-actions";
import { ContactModal } from "./service/contact-modal";
import { MobileActions } from "./service/mobile-actions";
import { ServiceHeader } from "./service/service-header";
import { ServiceInfo } from "./service/service-info";
import { ServiceSidebar } from "./service/service-sidebar";
import { ServiceTabsContent } from "./service/service-tabs-content";
import type { Service } from "@/app/api/services";

interface ServiceViewProps {
  service: Service;
  onBack?: () => void;
}

export default function ServiceView({ service, onBack }: ServiceViewProps) {
  const router = useRouter();
  const formId = useId();
  const [activeTab, setActiveTab] = useState("overview");

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

          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList variant="line">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <TabsContent value="overview">
                <ServiceTabsContent
                  service={service}
                  activeTab="overview"
                  trackAndNavigate={trackAndNavigate}
                />
              </TabsContent>
              <TabsContent value="products">
                <ServiceTabsContent
                  service={service}
                  activeTab="products"
                  trackAndNavigate={trackAndNavigate}
                />
              </TabsContent>
              <TabsContent value="reviews">
                <ServiceTabsContent
                  service={service}
                  activeTab="reviews"
                  trackAndNavigate={trackAndNavigate}
                />
              </TabsContent>
              <TabsContent value="contact">
                <ServiceTabsContent
                  service={service}
                  activeTab="contact"
                  trackAndNavigate={trackAndNavigate}
                />
              </TabsContent>
            </div>
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
