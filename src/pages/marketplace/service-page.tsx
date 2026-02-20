import { useParams, useNavigate } from "react-router-dom";
import { services as mockServices } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import { Layout } from "lucide-react";
import ServiceView from "@/components/marketplace/service-view";

// Supplemental mock data for UI display since data.json is primitive
const getServiceUIExtras = (id: string) => ({
  totalRequests: 156,
  pendingRequests: 12,
  provider: {
    fullName: "James Nkurunziza",
    role: "Senior Consultant",
    experience: "8+ Years",
    phone: "+250 788 000 000",
    rating: 4.9,
  },
  icon: Layout, // Fallback icon
});

export default function ServicePage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const rawService = mockServices.find((s) => s.id === serviceId);

  if (!rawService) {
    return (
      <div className="flex items-center justify-center h-screen bg-background p-4">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold uppercase text-foreground mb-4 tracking-wide">
            Service Not Found
          </h1>
          <Button
            onClick={() => navigate("/")}
            className="rounded-sm font-heading uppercase tracking-wider"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  // Merge raw service with UI extras
  const uiExtras = getServiceUIExtras(rawService.id);
  const service = { ...rawService, ...uiExtras };

  return (
    <ServiceView service={service} onBack={() => navigate("/marketplace")} />
  );
}
