import { RiBuilding4Line, RiMapPinLine, RiStarFill } from "@remixicon/react";
import { Link } from "@tanstack/react-router";
import { memo } from "react";
import type { Company } from "@/app/api/companies";

interface SupplierCardProps {
  company: Company;
  onViewProfile?: () => void;
}

export const SupplierCard = memo(
  ({ company, onViewProfile }: SupplierCardProps) => {
    return (
      <Link
        to="/suppliers/$supplierId"
        params={{ supplierId: company.id }}
        onClick={(e: React.MouseEvent) => {
          if (onViewProfile) {
            e.preventDefault();
            onViewProfile();
          }
        }}
        className="group block bg-white border border-border/40 hover:border-primary/20 transition-all duration-500 overflow-hidden rounded-none"
      >
        <div className="relative h-24 overflow-hidden bg-slate-950">
          <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-slate-700 to-slate-900" />
          {company.logoUrl && (
            <div className="absolute -bottom-6 left-6 w-20 h-20 bg-white border border-border/20 flex items-center justify-center p-2 z-10">
              <img
                src={company.logoUrl}
                alt={company.name}
                className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
          )}
        </div>

        <div className="p-6 pt-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] font-bold uppercase tracking-widest text-primary bg-primary/5 px-2 py-0.5">
              {company.category?.name || "Supplier"}
            </span>
            <div className="flex items-center gap-1">
              <RiStarFill className="w-3 h-3 text-amber-500" />
              <span className="text-[10px] font-bold">
                {company.averageRating || 5.0}
              </span>
            </div>
          </div>

          <h3 className="text-sm font-black uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">
            {company.name}
          </h3>

          <div className="flex items-center gap-4 text-muted-foreground mb-6">
            <div className="flex items-center gap-1.5 opacity-80">
              <RiMapPinLine className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase tracking-tight">
                {company.district || "Kigali"}, {company.province || "Rwanda"}
              </span>
            </div>
            <div className="flex items-center gap-1.5 opacity-80">
              <RiBuilding4Line className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase tracking-tight whitespace-nowrap">
                Verified Stock
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-border/40 flex items-center justify-between">
            <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 group-hover:text-primary transition-colors">
              Explore Inventory
            </span>
            <div className="w-6 h-6 border border-border/40 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
              <div className="w-1.5 h-1.5 border-t border-r border-slate-400 group-hover:border-white transform rotate-45 -ml-0.5" />
            </div>
          </div>
        </div>
      </Link>
    );
  },
);

SupplierCard.displayName = "SupplierCard";
