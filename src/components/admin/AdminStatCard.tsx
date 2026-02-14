import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminStatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  color?: string;
  bgColor?: string;
  className?: string;
}

export const AdminStatCard: React.FC<AdminStatCardProps> = ({
  label,
  value,
  icon: Icon,
  change,
  color = "text-primary",
  bgColor = "bg-primary/10",
  className,
}) => {
  const isPositive = change?.startsWith("+");

  return (
    <Card
      className={cn(
        "rounded-sm border-2 border-border shadow-none hover:border-primary transition-colors bg-background group relative overflow-hidden",
        className
      )}
    >
      {/* Tech Corner */}
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary/20 group-hover:border-primary transition-colors" />
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div
            className={cn(
              "h-12 w-12 rounded-sm flex items-center justify-center border-2 border-transparent transition-transform group-hover:scale-105",
              bgColor,
              color
            )}
          >
            <Icon className="w-6 h-6" />
          </div>
          {change && (
            <Badge
              variant="outline"
              className={cn(
                "rounded-sm border-2 font-heading font-bold text-[10px] uppercase tracking-wider",
                isPositive
                  ? "text-emerald-600 border-emerald-100 bg-emerald-50"
                  : "text-amber-600 border-amber-100 bg-amber-50"
              )}
            >
              {change}
            </Badge>
          )}
        </div>
        <h3 className="font-heading font-bold text-muted-foreground text-xs uppercase tracking-widest mb-1">
          {label}
        </h3>
        <p className="text-3xl font-heading font-bold text-foreground">
          {value}
        </p>
      </CardContent>
    </Card>
  );
};
