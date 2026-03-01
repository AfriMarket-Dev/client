import { RiChat3Line } from "@remixicon/react";
import type React from "react";
import { Button } from "@/components/ui/button";
import type { Service } from "./types";

interface ServiceInfoProps {
  service: Service;
  onInquire: () => void;
}

export const ServiceInfo: React.FC<ServiceInfoProps> = ({
  service,
  onInquire,
}) => {
  return (
    <>
      <div className="hidden md:block pb-12">
        <div className="space-y-8">
          <div className="flex items-center gap-4 text-primary">
            <div className="w-12 h-px bg-primary/30" />
            <span className="font-heading font-bold uppercase tracking-[0.3em] text-[10px] text-muted-foreground whitespace-nowrap">
              Service
            </span>
            <div className="flex-1 h-px bg-border/20" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold uppercase text-foreground tracking-tighter leading-[0.8] max-w-4xl">
            {service.name}
          </h1>

          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7">
              <p className="text-xl text-muted-foreground font-light leading-relaxed">
                {service.description}
              </p>
            </div>
            <div className="md:col-span-1 hidden md:flex justify-center pt-2">
              <div className="w-px h-24 bg-border/30" />
            </div>
            <div className="md:col-span-4 flex flex-col justify-end">
              <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-2 opacity-60">
                {service.priceType === "NEGOTIABLE"
                  ? "Service Quotation"
                  : "Active Rate"}
              </div>
              <div className="text-3xl font-heading font-bold text-foreground uppercase">
                {service.priceType === "NEGOTIABLE" ? (
                  "Price Negotiable"
                ) : (
                  <>
                    {service.priceType === "STARTS_AT" && "Starts at "}
                    RWF {Number(service.price || 0).toLocaleString()}
                    {service.duration && (
                      <span className="text-sm text-muted-foreground ml-2">
                        / {service.duration}
                      </span>
                    )}
                  </>
                )}
              </div>

              <Button
                onClick={onInquire}
                size="lg"
                className="mt-6 rounded-none h-14 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-heading font-bold uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-primary/20"
              >
                <RiChat3Line size={16} className="mr-2" />
                Place Inquiry
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-heading font-bold text-primary">
            {service.priceType === "NEGOTIABLE"
              ? "Negotiable"
              : `RWF ${Number(service.price || 0).toLocaleString()}`}
          </span>
          <span className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest">
            {service.priceType === "STARTS_AT"
              ? "/ STARTING"
              : service.duration
                ? `/ ${service.duration}`
                : ""}
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {service.description}
        </p>
      </div>
    </>
  );
};
