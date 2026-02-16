import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Building2, CheckCircle } from "lucide-react";

const CTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-12 md:py-24 overflow-hidden bg-foreground text-background border-t border-border">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, var(--color-primary) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary/10 to-transparent" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 text-primary-foreground text-[10px] font-bold uppercase tracking-widest mb-6 rounded-sm border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Join the Network
            </div>

            <h2 className="text-3xl md:text-5xl font-heading font-bold text-background mb-6 uppercase leading-tight">
              Ready to Build <br />
              <span className="text-primary">Something Great?</span>
            </h2>

            <p className=" text-muted-foreground mb-8 leading-relaxed max-w-xl uppercase tracking-widest text-xs font-bold">
              Join thousands of contractors, suppliers, and project managers
              transforming the construction industry in Rwanda.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                onClick={() => navigate("/auth/signup")}
                className="h-14 px-8 text-base font-bold uppercase tracking-widest rounded-sm bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/about")}
                className="h-14 px-8 text-base font-bold uppercase tracking-widest rounded-sm border border-background/20 hover:border-background hover:bg-background/10 text-background bg-transparent shadow-none"
              >
                Learn More
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Free to Join</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>No Credit Card</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Cancel Anytime</span>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8">
                <div className="bg-background/5 backdrop-blur-md p-6 rounded-sm border border-background/10 shadow-xl">
                  <Building2 className="w-8 h-8 text-primary mb-4" />
                  <div className="text-2xl font-heading font-bold text-background mb-1">
                    500+
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">
                    Active Projects
                  </div>
                </div>
                <div className="bg-background/5 backdrop-blur-md p-6 rounded-sm border border-background/10">
                  <Building2 className="w-8 h-8 text-info mb-4" />
                  <div className="text-2xl font-heading font-bold text-background mb-1">
                    2.5k
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">
                    Verified Suppliers
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-background/5 backdrop-blur-md p-6 rounded-sm border border-background/10">
                  <Building2 className="w-8 h-8 text-success mb-4" />
                  <div className="text-2xl font-heading font-bold text-background mb-1">
                    98%
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">
                    Satisfaction Rate
                  </div>
                </div>
                <div className="bg-background/5 backdrop-blur-md p-6 rounded-sm border border-background/10">
                  <Building2 className="w-8 h-8 text-warning mb-4" />
                  <div className="text-2xl font-heading font-bold text-background mb-1">
                    24/7
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">
                    Support Available
                  </div>
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
