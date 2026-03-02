import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AdminStatCardProps {
  label: string;
  value: string | number;
  icon: any;
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
        "rounded-sm py-0 border border-border shadow-none hover:border-primary transition-colors bg-background group relative overflow-hidden",
        className,
      )}
    >
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/20 group-hover:border-primary transition-colors" />

      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div
            className={cn(
              "h-12 w-12 rounded-sm flex items-center justify-center border border-transparent transition-colors",
              bgColor,
              color,
            )}
          >
            <Icon className="w-6 h-6" />
          </div>
          {change && (
            <Badge
              variant="outline"
              className={cn(
                "rounded-sm border font-heading font-bold text-[10px] uppercase tracking-wider",
                isPositive
                  ? "text-success border-success/20 bg-success/10"
                  : "text-warning border-warning/20 bg-warning/10",
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
