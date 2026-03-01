import { useNavigate } from "@tanstack/react-router";
import { RiArrowRightLine } from "@remixicon/react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  label?: string;
  icon?: React.ReactNode;
  viewAllHref?: string;
  viewAllLabel?: string;
  titleClassName?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  label,
  viewAllHref,
  viewAllLabel = "View All",
  titleClassName,
}) => {
  const navigate = useNavigate();

  return (
    <div className="relative mb-8 md:mb-12 group">
      <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-primary/20 hidden lg:block" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-12">
        <div className="space-y-4">
          {label && (
            <div className="flex items-center gap-4">
              <div className="w-10 h-px bg-primary" />
              <span className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase">
                {label}
              </span>
            </div>
          )}
          <h2
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-foreground tracking-tight leading-[0.9] uppercase",
              titleClassName,
            )}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground/60 text-xs md:text-sm max-w-2xl font-medium leading-relaxed uppercase tracking-wider">
              {subtitle}
            </p>
          )}
        </div>

        {viewAllHref && (
          <div className="flex shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate({ to: viewAllHref as any })}
              className="border border-border/40 hover:bg-foreground hover:text-background rounded-none font-bold transition-all px-6 h-10 uppercase text-[10px] tracking-[0.2em] group/btn shadow-none bg-transparent"
            >
              {viewAllLabel}
              <RiArrowRightLine className="ml-3 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>

      <div className="mt-8 md:mt-12 h-px bg-border/20 w-full relative">
        <div className="absolute left-0 top-0 w-24 h-px bg-primary/40" />
      </div>
    </div>
  );
};
