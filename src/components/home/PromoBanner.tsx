import React from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

interface PromoBannerProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink?: string; // We'll just log or prevent default if not needed
  variant?: "primary" | "secondary" | "dark";
}

const PromoBanner: React.FC<PromoBannerProps> = ({
  title,
  subtitle,
  ctaText,
  variant = "primary",
}) => {
  const bgClass =
    variant === "primary"
      ? "bg-primary text-primary-foreground"
      : variant === "secondary"
      ? "bg-orange-100 text-orange-900 border-orange-200 border"
      : "bg-zinc-900 text-white";

  return (
    <section className={`py-16 ${bgClass} my-12`}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold uppercase mb-4 tracking-wide">
          {title}
        </h2>
        <p className="text-lg md:text-xl font-medium mb-8 max-w-2xl mx-auto opacity-90">
          {subtitle}
        </p>
        <Button
          size="lg"
          variant={variant === "primary" ? "secondary" : "default"}
          className="font-bold uppercase tracking-widest h-14 px-8"
        >
          {ctaText}
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </section>
  );
};

export default PromoBanner;
