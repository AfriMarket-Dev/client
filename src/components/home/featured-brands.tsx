import React from "react";
import { SectionHeader } from "./section-header";
import { Building2 } from "lucide-react";

const BRANDS = [
  { name: "Caterpillar", logo: "CAT" },
  { name: "Bosch", logo: "BOSCH" },
  { name: "Makita", logo: "MAKITA" },
  { name: "DeWalt", logo: "DEWALT" },
  { name: "Hilti", logo: "HILTI" },
  { name: "Komatsu", logo: "KOMATSU" },
];

export const FeaturedBrands: React.FC = () => {
  return (
    <div className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-[0.05] pointer-events-none" />
      
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6 relative z-10">
        <SectionHeader 
          title="Industry Leaders"
          subtitle="Direct partnerships with global manufacturers ensuring structural integrity and performance."
          label="Strategic Alliances"
          icon={<Building2 className="w-5 h-5" />}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border/40 border border-border/40">
          {BRANDS.map((brand, idx) => (
            <div 
              key={idx} 
              className="h-40 bg-white dark:bg-slate-900 flex flex-col items-center justify-center group hover:bg-primary/5 transition-all duration-500 cursor-pointer rounded-lg"
            >
              <span className="text-3xl font-heading font-black text-muted-foreground/30 group-hover:text-primary transition-colors tracking-tighter italic">
                {brand.logo}
              </span>
              <div className="mt-4 text-[9px] font-bold text-muted-foreground/0 group-hover:text-muted-foreground/100 transition-all duration-500 uppercase tracking-widest translate-y-2 group-hover:translate-y-0">
                 Verified OEM
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
