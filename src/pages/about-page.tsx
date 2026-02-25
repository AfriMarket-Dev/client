import React from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Globe,
  Target,
  Eye,
  CheckCircle,
  Search,
  MessageSquare,
  FileText,
  Handshake,
  Star,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-16">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate({ to: "/" })}
            className="group flex items-center gap-2 text-foreground hover:bg-muted py-2 px-3 rounded-sm transition-colors font-heading font-bold uppercase text-xs tracking-wider"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Home
          </Button>
        </div>

        {/* Hero Section - Clean & Focused */}
        <section className="text-center py-16 px-4">
          <div className="inline-flex items-center px-4 py-1.5 border border-primary/20 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-8">
            <Globe className="w-3 h-3 mr-2" />
            Rwanda's Digital Infrastructure
          </div>

          <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
            Building the Future <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-orange-600">
              of Construction
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            AfrikaMarket is the centralized procurement engine for Rwanda. We
            verify, connect, and streamline the supply chain for contractors and
            suppliers alike.
          </p>
        </section>

        {/* Mission & Vision - Simplified */}
        <section className="grid md:grid-cols-2 gap-12 items-start py-12 border-y border-border/50">
          <div className="space-y-6">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-heading font-bold text-foreground">
              Our Mission
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              To engineer a frictionless digital marketplace that standardizes
              trust, transparency, and efficiency in Rwanda's construction
              industry. We are laying the groundwork for businesses to scale.
            </p>
            <ul className="space-y-3 pt-2">
              {[
                "Verify every supplier for safety",
                "Transparent pricing & quotes",
                "Support local business growth",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center text-sm font-medium text-foreground/80"
                >
                  <CheckCircle className="w-4 h-4 text-primary mr-3" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="w-12 h-12 bg-foreground/5 text-foreground rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-heading font-bold text-foreground">
              Our Vision
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              To construct the premier infrastructure where every business—from
              micro-contractors to large developers—operates on a unified,
              efficient platform.
            </p>
          </div>
        </section>

        {/* How It Works - Linear Flow */}
        <section className="py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A transparent process connecting you directly with verified
              suppliers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-8 left-[20%] right-[20%] h-px bg-border -z-10 border-t border-dashed border-border" />

            {[
              {
                icon: Search,
                title: "1. Discover",
                desc: "Browse verified inventory and services.",
              },
              {
                icon: MessageSquare,
                title: "2. Connect",
                desc: "Chat or request quotes directly.",
              },
              {
                icon: Handshake,
                title: "3. Transact",
                desc: "Finalize deals securely and efficienty.",
              },
            ].map((step, i) => (
              <div key={i} className="text-center bg-background pt-4">
                <div className="w-16 h-16 mx-auto bg-card border border-border rounded-xl flex items-center justify-center mb-6 shadow-xs">
                  <step.icon
                    className="w-8 h-8 text-primary"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Simple Call to Action */}
        <section className="py-24 text-center border-t border-border">
          <Building className="w-12 h-12 text-muted-foreground/30 mx-auto mb-6" />
          <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
            Ready to start building?
          </h2>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate("/products")}
              className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider px-8"
            >
              Browse Marketplace
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/auth/signup")}
              className="border-border font-bold uppercase tracking-wider px-8"
            >
              Join as Supplier
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
