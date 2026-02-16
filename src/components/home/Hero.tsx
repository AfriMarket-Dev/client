import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-background overflow-hidden border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Label */}
          <div className="inline-flex items-center gap-2 text-muted-foreground font-heading font-medium tracking-widest uppercase text-xs mb-8">
            <span className="w-8 h-[1px] bg-border block"></span>
            Rwanda's Construction Marketplace
            <span className="w-8 h-[1px] bg-border block"></span>
          </div>

          <h1 className="text-5xl md:text-7xl font-heading font-bold text-foreground tracking-tight leading-[1.1] mb-8">
            Connect with Trusted <br className="hidden md:block" />
            <span className="text-primary italic">Suppliers</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-normal">
            Source high-quality construction materials, heavy equipment, and
            professional labor services from verified local partners across
            Rwanda.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Button
              size="lg"
              onClick={() => navigate("/products")}
              className="h-12 px-8 text-sm font-bold uppercase tracking-wider rounded-sm w-full sm:w-auto"
            >
              Browse Marketplace
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/suppliers")}
              className="h-12 px-8 text-sm font-bold uppercase tracking-wider rounded-sm w-full sm:w-auto border-foreground hover:bg-foreground hover:text-background"
            >
              Find Suppliers
            </Button>
          </div>

          <div className="border-t border-border pt-12">
            <div className="grid grid-cols-3 gap-8 md:gap-16">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-1">
                  2.5k+
                </div>
                <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest">
                  Verified Suppliers
                </div>
              </div>
              <div className="text-center border-l border-r border-border/50">
                <div className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-1">
                  24/7
                </div>
                <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest">
                  Support
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-1">
                  100%
                </div>
                <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest">
                  Secure
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
