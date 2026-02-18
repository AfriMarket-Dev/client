import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Package, Briefcase, CheckCircle2 } from "lucide-react";

const CTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 overflow-hidden bg-slate-950 text-white">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase rounded-lg mb-6 border border-primary/20">
            <div className="w-1.5 h-1.5 rounded-lg bg-primary animate-pulse" />
            Unified Procurement
          </div>

          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 tracking-tight">
            Connect with Rwanda's <br />
            <span className="text-primary">Industrial Network</span>
          </h2>

          <p className="text-slate-400 text-lg leading-relaxed">
            A centralized platform verifying the supply chain from manufacturer
            to job site.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Product Gateway */}
          <div
            onClick={() => navigate("/products?type=PRODUCT")}
            className="group cursor-pointer bg-white/5 border border-white/10 hover:border-primary/50 p-8 rounded-xl transition-all duration-300 hover:bg-white/[0.07]"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
              <ArrowRight className="text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>

            <h3 className="text-2xl font-heading font-bold text-white mb-2 uppercase tracking-wide">
              Sourcing
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Browse verified inventory: heavy machinery, raw materials, and
              tools.
            </p>

            <span className="text-xs font-bold text-primary uppercase tracking-widest group-hover:underline decoration-primary/50 underline-offset-4">
              View Catalog
            </span>
          </div>

          {/* Service Gateway */}
          <div
            onClick={() => navigate("/products?type=SERVICE")}
            className="group cursor-pointer bg-white/5 border border-white/10 hover:border-sky-500/50 p-8 rounded-xl transition-all duration-300 hover:bg-white/[0.07]"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="w-12 h-12 bg-sky-500/20 text-sky-500 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6" />
              </div>
              <ArrowRight className="text-white/20 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
            </div>

            <h3 className="text-2xl font-heading font-bold text-white mb-2 uppercase tracking-wide">
              Services
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Hire certified contractors, engineers, and specialized labor.
            </p>

            <span className="text-xs font-bold text-sky-500 uppercase tracking-widest group-hover:underline decoration-sky-500/50 underline-offset-4">
              Find Professionals
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
