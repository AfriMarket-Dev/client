import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  RiMapPinLine,
  RiStarFill,
  RiVerifiedBadgeFill,
  RiMessage2Line,
} from "@remixicon/react";
import type { Service } from "@/app/api/services";

interface ServiceHeaderProps {
  service: Service;
  isInWishlist?: boolean;
  onBack?: () => void;
  onToggleWishlist?: () => void;
  onInquire?: () => void;
}

export const ServiceHeader: React.FC<ServiceHeaderProps> = ({ service }) => {
  return (
    <div className="py-8 lg:py-12 border-b border-border/40 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12">
          {/* Main Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge
                variant="outline"
                className="rounded-none uppercase tracking-widest text-[9px] font-bold border-primary/20 text-primary bg-primary/5"
              >
                {service.category?.name || "Professional Service"}
              </Badge>
              {service.company?.isVerified && (
                <Badge
                  variant="outline"
                  className="rounded-none uppercase tracking-widest text-[9px] font-bold border-emerald-500/20 text-emerald-600 bg-emerald-50"
                >
                  <RiVerifiedBadgeFill className="w-3 h-3 mr-1" /> Verified
                  Provider
                </Badge>
              )}
            </div>

            <h1 className="text-3xl lg:text-5xl font-black uppercase tracking-tight mb-4 text-slate-950">
              {service.name}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-1.5 grayscale opacity-80">
                <RiStarFill className="w-4 h-4 text-amber-500 grayscale-0 opacity-100" />
                <span className="text-xs font-black text-slate-900">
                  {service.company?.rating || 5.0}
                </span>
                <span className="text-xs uppercase tracking-tighter font-bold">
                  (Professional)
                </span>
              </div>
              <div className="flex items-center gap-1.5 opacity-80">
                <RiMapPinLine className="w-4 h-4" />
                <span className="text-xs uppercase tracking-tighter font-bold">
                  Kigali, Rwanda
                </span>
              </div>
            </div>
          </div>

          {/* Action Area */}
          <div className="flex flex-col sm:flex-row items-center gap-4 min-w-[320px]">
            <div className="flex-1 w-full p-6 bg-slate-50 border border-slate-200 text-center lg:text-left">
              <span className="text-[10px] block uppercase font-bold text-muted-foreground tracking-widest mb-1">
                Starting Rate
              </span>
              <div className="flex items-baseline justify-center lg:justify-start gap-1">
                <span className="text-sm font-bold text-slate-500 uppercase">
                  RWF
                </span>
                <span className="text-3xl font-black text-slate-950">
                  {service.price ? service.price.toLocaleString() : "Contact"}
                </span>
                {/* {service.unit && (
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">
                    / {service.unit}
                  </span>
                )} */}
              </div>
            </div>
            <Button
              size="lg"
              className="w-full sm:w-auto px-10 h-[76px] rounded-none font-black uppercase tracking-widest text-[11px] bg-slate-950 hover:bg-slate-900 shadow-xl shadow-slate-950/10"
            >
              <RiMessage2Line className="w-5 h-5 mr-3" /> Inquire Service
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default ServiceHeader;
