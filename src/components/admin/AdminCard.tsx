import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface AdminCardProps {
  title?: string;
  subtitle?: string;
  headerActions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  noPadding?: boolean;
}

export const AdminCard: React.FC<AdminCardProps> = ({
  title,
  subtitle,
  headerActions,
  children,
  className,
  contentClassName,
  noPadding = false,
}) => {
  return (
    <Card
      className={cn(
        "border border-border rounded-sm bg-background shadow-none overflow-hidden relative",
        className,
      )}
    >
      {/* Tech Corner */}
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/20 group-hover:border-primary transition-colors" />

      {(title || headerActions) && (
        <CardHeader className="p-6 border-b border-border bg-muted/5">
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <CardTitle className="text-sm font-heading font-bold uppercase tracking-widest text-foreground">
                  {title}
                </CardTitle>
              )}
              {subtitle && (
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-1">
                  {subtitle}
                </p>
              )}
            </div>
            {headerActions && <div>{headerActions}</div>}
          </div>
        </CardHeader>
      )}
      <CardContent className={cn(noPadding ? "p-0" : "p-6", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
};
