import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";
import { RiArrowRightLine } from "@remixicon/react";

interface PromoCardProps {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
  hoverBorder: string;
  badge?: React.ReactNode;
  onClick: () => void;
  buttonText: string;
  buttonColor: string;
  children: React.ReactNode;
}

export const PromoCard: React.FC<PromoCardProps> = ({
  title,
  subtitle,
  icon: Icon,
  iconColor,
  bgColor,
  hoverBorder,
  badge,
  onClick,
  buttonText,
  buttonColor,
  children,
}) => {
  return (
    <div
      className={cn(
        "bg-background rounded-sm p-6 border border-border group hover:border-primary/50 transition-all duration-300 relative overflow-hidden",
        hoverBorder,
      )}
    >
      <div
        className={cn(
          "absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700",
          bgColor,
        )}
      />

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-11 h-11 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300",
              bgColor,
            )}
          >
            <Icon className={cn("w-5 h-5", iconColor)} />
          </div>
          <div>
            <h3 className="font-heading font-bold uppercase text-sm text-foreground">
              {title}
            </h3>
            <p className="text-xs text-muted-foreground font-medium">
              {subtitle}
            </p>
          </div>
        </div>
        {badge && <div className="text-right">{badge}</div>}
      </div>

      {children}

      <Button
        variant="ghost"
        className={cn(
          "w-full justify-between hover:bg-muted font-bold uppercase text-xs tracking-wider shadow-none transition-all",
          buttonColor,
        )}
        onClick={onClick}
      >
        {buttonText} <RiArrowRightLine />
      </Button>
    </div>
  );
};
