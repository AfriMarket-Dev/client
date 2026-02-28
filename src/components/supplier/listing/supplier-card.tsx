import { ArrowRight, Hexagon, MapPin, ShieldCheck, Star } from "lucide-react";
import type React from "react";
import type { Company } from "@/app/api/companies";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SupplierCardProps {
  company: Company;
  onViewProfile: () => void;
}

export const SupplierCard: React.FC<SupplierCardProps> = ({
  company,
  onViewProfile,
}) => {
  const rating = Number(company.averageRating ?? 0);
  const location = [company.district, company.province]
    .filter(Boolean)
    .join(", ");

  return (
    <Card className="group border py-0 border-border/10 bg-card hover:border-primary/40 transition-all duration-500 rounded-none overflow-hidden flex flex-col shadow-none h-full relative">
      <div className="absolute top-0 left-0 w-[1px] h-full bg-primary/0 group-hover:bg-primary/40 transition-all duration-500 z-20" />

      <div className="relative h-56 overflow-hidden bg-muted/20">
        {company.logoUrl ? (
          <img
            src={company.logoUrl}
            alt={company.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
            <Hexagon className="w-16 h-16 text-muted-foreground/20 stroke-1" />
            <span className="absolute text-4xl font-bold text-muted-foreground/30">
              {company.name.charAt(0)}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

        {company.isVerified && (
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-white/90 dark:bg-slate-950/90 text-foreground border border-border/10 font-display font-black text-[9px] px-3 h-6 flex items-center gap-2 rounded-none uppercase tracking-[0.2em] backdrop-blur-md shadow-2xl">
              <ShieldCheck className="w-3 h-3 text-primary" />
              Verified
            </Badge>
          </div>
        )}

        <div className="absolute inset-0 bg-slate-950/80 group-hover:bg-slate-950/40 transition-colors duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute bottom-6 left-6 right-6 text-white z-10">
          <h3 className="text-xl font-display font-black uppercase leading-[0.9] mb-2 tracking-tighter group-hover:text-primary transition-colors duration-500">
            {company.name}
          </h3>
          {location && (
            <div className="flex items-center text-white/50 font-bold text-[9px] gap-2 uppercase tracking-[0.2em]">
              <MapPin className="w-3 h-3 text-primary/60" />
              {location}
            </div>
          )}
        </div>
      </div>

      <CardContent className="pt-8 px-8 pb-8 flex-grow flex flex-col bg-card relative">
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-6 gap-2">
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="bg-muted/10 text-muted-foreground/60 text-[9px] font-black border-border/20 rounded-none px-3 h-6 uppercase tracking-[0.1em]"
              >
                {company.type?.replace(/_/g, " ") || "Supplier"}
              </Badge>
            </div>
            <div className="flex items-center bg-muted/50 px-2 py-1 rounded-none border border-border/10 shrink-0">
              <Star className="w-3 h-3 text-primary fill-primary mr-1.5" />
              <span className="font-display font-black text-foreground text-[10px] tracking-widest">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>

          <p className="text-muted-foreground/60 text-[11px] leading-relaxed line-clamp-2 mb-8 h-10 font-medium uppercase tracking-widest">
            {company.description ||
              "Leading provider of construction materials and heavy equipment solutions."}
          </p>
        </div>

        <Button
          onClick={onViewProfile}
          className="w-full rounded-none h-14 font-display font-black uppercase tracking-[0.2em] text-[10px] group/btn bg-primary hover:bg-primary/90 text-primary-foreground shadow-none border border-primary/20"
        >
          View Profile
          <ArrowRight className="w-3.5 h-3.5 ml-3 transition-transform duration-500 group-hover/btn:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
};
