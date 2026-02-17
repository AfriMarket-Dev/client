import React from "react";
import { cn } from "@/lib/utils";

interface HomeSectionProps {
  children: React.ReactNode;
  variant?: "white" | "background" | "muted" | "dark" | "red";
  withGrid?: boolean;
  borderTop?: boolean;
  borderBottom?: boolean;
  className?: string;
  containerClassName?: string;
  id?: string;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  children,
  variant = "background",
  withGrid = false,
  borderTop = false,
  borderBottom = true,
  className,
  containerClassName,
  id,
}) => {
  const variants = {
    white: "bg-white dark:bg-slate-950",
    background: "bg-background",
    muted: "bg-muted/10",
    dark: "bg-slate-950 text-white",
    red: "bg-red-50/10 border-red-100/20",
  };

  return (
    <section
      id={id}
      className={cn(
        "py-8 relative overflow-hidden",
        variants[variant],
        borderTop && "border-t border-border/40",
        borderBottom && "border-b border-border/40",
        className
      )}
    >
      {withGrid && (
        <div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none" />
      )}
      <div className={cn("max-w-[1600px] mx-auto px-4 lg:px-6 relative z-10", containerClassName)}>
        {children}
      </div>
    </section>
  );
};
