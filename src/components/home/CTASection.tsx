import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Package, Briefcase, CheckCircle2 } from "lucide-react";

const CTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-slate-950 text-white industrial-grain">
      {/* Architectural Background */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.05] pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-full bg-sky-500/5 blur-3xl rounded-full -translate-x-1/2 translate-y-1/4 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 lg:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/10 backdrop-blur-md text-primary text-[10px] font-bold tracking-[0.25em] mb-8 rounded-lg border border-primary/20 uppercase">
              <div className="w-2 h-2 rounded-full bg-primary" />
              Unified Procurement
            </div>

            <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-8 leading-[0.95] tracking-tighter">
              TOTAL PROJECT <br />
              <span className="text-primary italic">INTEGRATION.</span>
            </h2>

            <p className="text-white/60 text-lg md:text-xl mb-12 leading-relaxed max-w-xl font-normal">
              From raw structural materials to heavy asset acquisition and specialized labor—access the complete industrial supply chain in one professional interface.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm font-bold tracking-wide text-white/80">
                  <CheckCircle2 className="w-5 h-5 text-primary" strokeWidth={2.5} />
                  15k+ Verified Products
                </div>
                <div className="flex items-center gap-3 text-sm font-bold tracking-wide text-white/80">
                  <CheckCircle2 className="w-5 h-5 text-primary" strokeWidth={2.5} />
                  Nationwide Logistics Node
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm font-bold tracking-wide text-white/80">
                  <CheckCircle2 className="w-5 h-5 text-primary" strokeWidth={2.5} />
                  Certified Service Experts
                </div>
                <div className="flex items-center gap-3 text-sm font-bold tracking-wide text-white/80">
                  <CheckCircle2 className="w-5 h-5 text-primary" strokeWidth={2.5} />
                  Project Oversight Tools
                </div>
              </div>
            </div>
          </div>

          {/* DUAL GATEWAY CARDS */}
          <div className="grid sm:grid-cols-2 gap-6">
            
            {/* Product Gateway */}
            <div className="group bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-lg hover:border-primary/40 transition-all duration-500 flex flex-col items-start h-full">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-lg mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                <Package className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-4 tracking-tight uppercase">Industrial Inventory</h3>
              <p className="text-white/40 text-sm mb-8 leading-relaxed font-sans">
                Source premium materials, power tools, and heavy machinery directly from verified manufacturers and global dealers.
              </p>
              <Button 
                variant="ghost" 
                onClick={() => navigate("/products?type=PRODUCT")}
                className="mt-auto text-primary hover:text-white hover:bg-primary font-bold text-xs tracking-widest uppercase p-0 h-auto group/link"
              >
                Browse Catalog <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Service Gateway */}
            <div className="group bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-lg hover:border-sky-400/40 transition-all duration-500 flex flex-col items-start h-full mt-0 sm:mt-12">
              <div className="w-14 h-14 bg-sky-400/10 text-sky-400 flex items-center justify-center rounded-lg mb-8 group-hover:bg-sky-400 group-hover:text-slate-950 transition-all">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-4 tracking-tight uppercase">Solutions & Labor</h3>
              <p className="text-white/40 text-sm mb-8 leading-relaxed font-sans">
                Deploy certified contractors, engineering consultants, and specialized rental services for complex project nodes.
              </p>
              <Button 
                variant="ghost" 
                onClick={() => navigate("/products?type=SERVICE")}
                className="mt-auto text-sky-400 hover:text-slate-950 hover:bg-sky-400 font-bold text-xs tracking-widest uppercase p-0 h-auto group/link"
              >
                Find Solutions <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default CTASection;
