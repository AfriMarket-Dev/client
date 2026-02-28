import { useNavigate } from "@tanstack/react-router";
import {
  RiArrowRightLine,
  RiBriefcaseLine,
  RiPagesLine,
} from "@remixicon/react";
import type React from "react";
import { Button } from "../ui/button";

const CTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-32 md:py-48 overflow-hidden bg-background border-y border-border/20">
      {/* Editorial Background Elements */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/2 -skew-x-12 translate-x-1/4 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-3 mb-10">
              <div className="w-8 h-px bg-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                Supply Chain Protocol
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-8xl font-display font-black text-foreground mb-8 tracking-tighter uppercase leading-[0.8]">
              Industrial
              <br />
              Intelligence
            </h2>

            <p className="text-muted-foreground text-xl leading-relaxed max-w-md font-medium mb-12 border-l-2 border-primary/20 pl-6">
              Connect with Rwanda's premier industrial network. Verified
              procurement from regional manufacturers to specialized field
              labor.
            </p>

            <div className="flex gap-4">
              <Button
                size="lg"
                onClick={() => navigate({ to: "/marketplace" })}
                className="bg-primary text-white hover:bg-primary/90 rounded-none h-14 px-10 font-heading font-black uppercase tracking-widest text-xs"
              >
                Enter Marketplace
              </Button>
            </div>
          </div>

          <div className="lg:col-span-1" />

          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
            {/* Source Protocol */}
            <div
              onClick={() =>
                navigate({
                  to: "/marketplace",
                  search: { type: "PRODUCT" } as any,
                })
              }
              className="group cursor-pointer bg-muted/20 border border-border/40 hover:border-primary/50 p-10 rounded-none transition-all duration-500 hover:bg-background relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 -translate-y-1/2 translate-x-1/2 rotate-45 group-hover:bg-primary/10 transition-colors" />

              <div className="relative z-10">
                <div className="text-primary mb-12">
                  <RiPagesLine className="w-10 h-10" />
                </div>

                <h3 className="text-2xl font-display font-black text-foreground mb-4 uppercase tracking-tight leading-none text-primary">
                  Source
                  <br />
                  Assets
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed mb-10 font-bold uppercase tracking-widest opacity-60">
                  Bulk Procurement · Local Inventory · Equipment Rental
                </p>

                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] group-hover:text-primary transition-colors">
                  Initialize Source{" "}
                  <RiArrowRightLine className="w-3 h-3 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>

            {/* Service Protocol */}
            <div
              onClick={() =>
                navigate({
                  to: "/marketplace",
                  search: { type: "SERVICE" } as any,
                })
              }
              className="group cursor-pointer bg-muted/20 border border-border/40 hover:border-primary/50 p-10 rounded-none transition-all duration-500 hover:bg-background relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 -translate-y-1/2 translate-x-1/2 rotate-45 group-hover:bg-primary/10 transition-colors" />

              <div className="relative z-10">
                <div className="text-primary mb-12">
                  <RiBriefcaseLine className="w-10 h-10" />
                </div>

                <h3 className="text-2xl font-display font-black text-foreground mb-4 uppercase tracking-tight leading-none text-primary">
                  Deploy
                  <br />
                  Services
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed mb-10 font-bold uppercase tracking-widest opacity-60">
                  Certified Engineering · Field Logistics · Site Support
                </p>

                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] group-hover:text-primary transition-colors">
                  Initialize Operations{" "}
                  <RiArrowRightLine className="w-3 h-3 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
