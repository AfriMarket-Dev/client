import { RiArrowLeftLine } from "@remixicon/react";
import { Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProviderActions } from "@/hooks/use-provider-actions";
import { useGetCompanyByIdQuery } from "@/services/api/companies";
import { useGetProductsQuery } from "@/services/api/products";
import { DetailPageSkeleton } from "@/shared/components/skeletons";
import type { Product } from "@/types";
import { ProviderContactBar } from "./details/provider-contact-bar";
import { ProviderContactModal } from "./details/provider-contact-modal";
import { ProviderHeader } from "./details/provider-header";
import { ProviderTabsContent } from "./details/provider-tabs-content";

type ProviderItem = Product;

interface ProviderDetailsProps {
  providerId: string;
  onBack: () => void;
  onProductClick: (item: ProviderItem) => void;
}

const ProviderDetails: React.FC<ProviderDetailsProps> = ({
  providerId,
  onBack,
  onProductClick,
}) => {
  const {
    data: company,
    isLoading,
    isFetching,
    error,
  } = useGetCompanyByIdQuery(providerId);
  const { data: listingsData } = useGetProductsQuery({ companyId: providerId });
  const listings = listingsData?.data || [];
  const featuredListings = listings.slice(0, 4);

  const {
    showContactModal,
    setShowContactModal,
    handleOpenContactModal,
    handleSubmitInquiry,
    sendingInquiry,
  } = useProviderActions(company);

  const rating = Number(company?.averageRating ?? 0);
  const location =
    [company?.district, company?.province].filter(Boolean).join(", ") ||
    "Kigali, Rwanda";

  if (isLoading && !company) {
    return <DetailPageSkeleton />;
  }

  if (error || (!company && !isFetching)) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <Empty className="max-w-md w-full">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Building2 className="w-4 h-4 text-primary" />
            </EmptyMedia>
            <EmptyTitle className="text-xl font-semibold">
              Provider Not Found
            </EmptyTitle>
            <EmptyDescription className="text-sm text-muted-foreground">
              The provider you are looking for may have been removed or does not
              exist.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              onClick={onBack}
              className="rounded-none h-11 px-8 font-medium"
            >
              Back to Directory
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  if (!company) return null;

  return (
    <div className="min-h-screen bg-background pb-24">
      <ProviderContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        onSubmit={handleSubmitInquiry}
        company={company}
        sendingInquiry={sendingInquiry}
      />

      <ProviderContactBar
        company={company}
        onContactClick={handleOpenContactModal}
        isMobile
      />

      {/* Top Navigation */}
      <div className="bg-background/80 backdrop-blur-md border-b border-border py-4 px-4 sm:px-8 lg:px-12 sticky top-0 z-30">
        <div className="w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="shrink-0 h-10 w-10 rounded-none hover:bg-muted/50 transition-all"
            >
              <RiArrowLeftLine className="size-6" />
            </Button>
            <div className="h-6 w-px bg-border/40 shrink-0" />
            <h1 className="font-semibold text-sm truncate text-foreground leading-none">
              {company.name}
            </h1>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Button
              onClick={handleOpenContactModal}
              className="hidden md:inline-flex h-11 px-8 rounded-none font-medium shadow-none transition-all duration-300"
            >
              Contact Provider
            </Button>
            <Badge className="bg-muted/50 text-foreground border-none text-xs font-medium px-3 py-1 rounded-none hidden sm:flex">
              {isFetching ? "Syncing..." : (company.isVerified ? "Verified Entity" : "Registered Entity")}
            </Badge>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-12 py-8 md:py-16 space-y-16">
        {/* Provider Header */}
        <div className="relative overflow-hidden bg-background">
          <div className="relative z-10">
            <ProviderHeader
              company={company}
              rating={rating}
              location={location}
              onContactClick={handleOpenContactModal}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="w-full lg:col-span-2 space-y-12">
            <Tabs defaultValue="overview" className="w-full">
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
                    Catalog ({listings.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent !rounded-none border-b-2 border-transparent py-3 px-1 !h-auto font-medium text-sm text-muted-foreground hover:text-foreground !shadow-none transition-colors"
                  >
                    Reviews ({company.reviewCount || 0})
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="animate-in fade-in duration-500">
                <ProviderTabsContent
                  company={company}
                  listings={listings}
                  onProductClick={onProductClick}
                  featuredListings={featuredListings}
                />
              </div>
            </Tabs>
          </div>

          <div className="w-full lg:col-span-1">
            <div className="space-y-12">
              {/* Contact Info Card */}
              <div className="bg-muted/5 border border-border p-8 space-y-8">
                <h4 className="text-sm font-semibold text-foreground border-b border-border pb-4">
                  Contact Info
                </h4>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Location
                    </p>
                    <p className="text-sm font-semibold">{location}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Member Since
                    </p>
                    <p className="text-sm font-semibold">
                      {company.createdAt
                        ? new Date(company.createdAt).getFullYear()
                        : "2024"}
                    </p>
                  </div>
                  <div className="pt-4">
                    <Button 
                      onClick={handleOpenContactModal}
                      className="w-full rounded-none h-12 font-semibold text-sm shadow-none transition-all duration-300"
                    >
                      Contact Provider
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetails;
