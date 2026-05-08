import { RiChat3Line } from "@remixicon/react";
import { Eye, History, ShieldCheck } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";
import type { Service } from "@/types";

interface ServiceInfoProps {
  service: Service;
  onInquire: () => void;
}

export const ServiceInfo: React.FC<ServiceInfoProps> = ({
  service,
  onInquire,
}) => {
  return (
    <div className="space-y-0">
      {/* Badges + Title */}
      <div className="pb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className="flex items-center gap-1.5 bg-muted/30 px-2 py-0.5 border border-border">
            <Eye className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">
              {service.views || 0} Views
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-primary/5 px-2 py-0.5 border border-primary/10">
            <History className="w-3 h-3 text-primary" />
            <span className="text-xs font-medium text-primary">
              {service.totalRequests || 0} Requests
            </span>
          </div>
          {service.company?.isVerified && (
            <div className="flex items-center gap-1.5 bg-emerald-500/5 px-2 py-0.5 border border-emerald-500/10">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-600">
                Certified
              </span>
            </div>
          )}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-tight">
          {service.name}
        </h1>
      </div>

      {/* Price — visually anchored in a tinted card */}
      <div className="py-5 px-5 bg-muted/30 border border-border mb-6">
        <span className="text-xs font-medium text-muted-foreground block mb-1">
          Price
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-foreground tracking-tight">
            {service.priceType === "NEGOTIABLE" ? (
              "Negotiable"
            ) : (
              <>
                {service.priceType === "STARTS_AT" && (
                  <span className="text-sm text-muted-foreground font-medium mr-1">
                    From
                  </span>
                )}
                RWF {Number(service.price || 0).toLocaleString()}
              </>
            )}
          </span>
          {service.priceType !== "NEGOTIABLE" && service.duration && (
            <span className="text-sm text-muted-foreground font-medium">
              / {service.duration}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="py-6 border-t border-border">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {service.description || "No description provided."}
        </p>
      </div>

      {/* Primary Action */}
      <div className="pt-2">
        <Button
          onClick={onInquire}
          size="lg"
          className="h-11 w-full rounded-none text-sm font-semibold shadow-none"
        >
          <RiChat3Line size={16} className="mr-2" />
          Send Inquiry
        </Button>
      </div>
    </div>
  );
};
