import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  label?: string;
  icon?: React.ReactNode;
  viewAllHref?: string;
  viewAllLabel?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  label,
  icon,
  viewAllHref,
  viewAllLabel = "View All",
}) => {
  const navigate = useNavigate();

  return (
    <div className="relative mb-5 md:mb-8 group">
      {/* Decorative vertical line */}
      <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-primary/30 transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-700 hidden lg:block" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 md:gap-6">
        <div className="space-y-2">
          {label && (
            <div className="flex items-center gap-3">
              <div className="w-6 h-[1.5px] bg-primary" />
              <span className="text-[10px] font-bold tracking-[0.25em] text-primary uppercase">
                {label}
              </span>
            </div>
          )}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground tracking-tight leading-none">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground/70 text-xs md:text-sm lg:text-base max-w-xl font-normal leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {viewAllHref && (
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate({ to: viewAllHref as any })}
              className="border border-border hover:bg-foreground hover:text-background rounded-lg font-bold transition-all px-5 h-9 uppercase text-[9px] tracking-widest group/btn shadow-none"
            >
              {viewAllLabel}
              <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
