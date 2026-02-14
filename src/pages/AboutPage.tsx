import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { AdminCard } from "@/components/admin/AdminCard";
import { ShieldCheck, Users, Globe, Award } from "lucide-react";

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12 ">
      <PageHeader
        title="About AfrikaMarket"
        subtitle="Transforming Rwanda's construction supply chain through digital innovation and verified partnerships"
        badge="Our Mission"
        showPattern
      />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-3xl font-heading font-bold text-foreground uppercase tracking-tight">
            The Marketplace for <br />
            <span className="text-primary">Reliable Construction</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed font-medium">
            AfrikaMarket is Rwanda's premier digital platform connecting
            contractors, project managers, and property developers with a
            curated network of verified construction material suppliers and
            equipment providers.
          </p>
          <p className="text-muted-foreground leading-relaxed font-medium">
            We solve the fragmentation in the local construction industry by
            providing a unified interface for sourcing, quote comparison, and
            supply chain management.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              icon: ShieldCheck,
              label: "Verified Nodes",
              val: "100%",
              color: "text-primary",
            },
            {
              icon: Users,
              label: "Active Partners",
              val: "2.5k+",
              color: "text-info",
            },
            {
              icon: Globe,
              label: "Coverage",
              val: "30 Districts",
              color: "text-success",
            },
            {
              icon: Award,
              label: "Quality Std",
              val: "ISO Cert",
              color: "text-warning",
            },
          ].map((stat, i) => (
            <AdminCard
              key={i}
              noPadding
              className="hover:border-primary transition-colors"
            >
              <div className="p-6 text-center">
                <stat.icon className={cn("w-8 h-8 mx-auto mb-4", stat.color)} />
                <div className="text-2xl font-heading font-bold text-foreground mb-1">
                  {stat.val}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </AdminCard>
          ))}
        </div>
      </div>
    </div>
  );
};

// Internal utility since cn might be missing in this scope
const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");

export default AboutPage;
