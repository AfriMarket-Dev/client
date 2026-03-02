import { ChevronLeft } from "lucide-react";
import type React from "react";
import { useGetCompanyByIdQuery } from "@/app/api/companies";
import type { Product } from "@/app/api/products";
import { useGetProductsQuery } from "@/app/api/products";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSupplierActions } from "@/hooks/use-supplier-actions";
import { SupplierActions } from "./details/supplier-actions";
import { SupplierContactModal } from "./details/supplier-contact-modal";
import { SupplierHeader } from "./details/supplier-header";
import { SupplierTabsContent } from "./details/supplier-tabs-content";

type SupplierItem = Product;

interface SupplierDetailsProps {
  supplierId: string;
  onBack: () => void;
  onProductClick: (item: SupplierItem) => void;
}

const SupplierDetails: React.FC<SupplierDetailsProps> = ({
  supplierId,
  onBack,
  onProductClick,
}) => {
  const {
    data: company,
    isLoading,
    error,
  } = useGetCompanyByIdQuery(supplierId);
  const { data: listingsData } = useGetProductsQuery({ companyId: supplierId });
  const listings = listingsData?.data || [];
  const featuredListings = listings.slice(0, 4);

  const {
    showContactModal,
    setShowContactModal,
    message,
    setMessage,
    handleSubmitInquiry,
    sendingInquiry,
  } = useSupplierActions(company);

  const rating = Number(company?.averageRating ?? 5.0);
  const location =
    [company?.district, company?.province]
      .filter(Boolean)
      .join(", ") || "Kigali, Rwanda";
  
  const tags = [
    company?.type?.replace('_', ' '),
    "Verified",
    company?.category?.name,
  ].filter((t): t is string => Boolean(t));

  const joinedYear = company?.createdAt 
    ? new Date(company.createdAt).getFullYear() 
    : "2024";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground uppercase text-[10px] font-bold tracking-[0.2em]">
          Accessing Supply Node...
        </div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4 uppercase tracking-tighter">
            Node Offline: Supplier Not Found
          </h2>
          <Button onClick={onBack} variant="outline" className="rounded-none">
            Back to Directory
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background space-y-6 overflow-x-hidden industrial-grain">
      <SupplierActions
        company={company}
        isMobile
        onContactClick={() => setShowContactModal(true)}
      />

      <div className="max-w-[1400px] mx-auto p-4 md:p-8 space-y-8">
        {/* Navigation */}
        <div className="flex items-center gap-2 mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="pl-0 gap-2 text-muted-foreground hover:text-primary font-heading uppercase text-xs tracking-wider hover:bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Network
          </Button>
        </div>

        {/* Profile Header */}
        <SupplierHeader 
          company={company} 
          location={location} 
          rating={rating} 
          onContactClick={() => setShowContactModal(true)}
        />

        <div className="space-y-6 md:ml-[232px]">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag: string, i: number) => (
              <div
                key={i}
                className="px-3 py-1 bg-muted/20 border border-border/40 rounded-sm text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
              >
                {tag}
              </div>
            ))}
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-border/40 border border-border/40">
            <div className="bg-background p-3">
              <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">
                Listings
              </div>
              <div className="text-lg font-bold font-heading text-foreground">
                {listings.length}
              </div>
            </div>
            <div className="bg-background p-3">
              <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">
                Platform Vis.
              </div>
              <div className="text-lg font-bold font-heading text-foreground">
                {company.visits || 0}
              </div>
            </div>
            <div className="bg-background p-3">
              <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">
                Joined
              </div>
              <div className="text-lg font-bold font-heading text-foreground">
                {joinedYear}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="w-full pt-8">
          <TabsList variant="line">
            {["overview", "products", "reviews", "contact"].map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <SupplierTabsContent
            company={company}
            listings={listings}
            featuredListings={featuredListings}
            onProductClick={onProductClick}
          />
        </Tabs>

        {showContactModal && (
          <SupplierContactModal
            company={company}
            message={message}
            setMessage={setMessage}
            sendingInquiry={sendingInquiry}
            isOpen={showContactModal}
            onClose={() => setShowContactModal(false)}
            onSubmit={handleSubmitInquiry}
          />
        )}
      </div>
    </div>
  );
};

export default SupplierDetails;
