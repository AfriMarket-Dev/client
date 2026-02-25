import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

interface PromoBannerProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink?: string;
  variant?: "primary" | "secondary" | "dark";
}

const PromoBanner: React.FC<PromoBannerProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink = "/products",
  variant = "primary",
}) => {
  const navigate = useNavigate();

  const bgClass =
    variant === "primary"
      ? "bg-primary text-primary-foreground"
      : variant === "secondary"
        ? "bg-orange-50 text-orange-900 border-orange-100/50 border"
        : "bg-slate-900 text-white";

  return (
    <section className="py-4 md:py-8 my-6 md:my-12">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
        <div
          className={`${bgClass} rounded-xl p-6 md:p-10 lg:p-20 text-center md:text-left relative overflow-hidden shadow-xl`}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-black/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
            <div className="max-w-3xl">
              <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-heading font-bold mb-3 md:mb-6 tracking-tight leading-tight">
                {title}
              </h2>
              <p className="text-sm md:text-lg lg:text-2xl font-normal opacity-90 max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            </div>

            <Button
              size="lg"
              onClick={() => navigate({ to: ctaLink as any })}
              variant={variant === "primary" ? "secondary" : "default"}
              className="font-semibold h-12 md:h-16 px-6 md:px-10 text-sm md:text-lg rounded-lg shadow-lg transition-all hover:scale-105 active:scale-95 group shrink-0 w-full md:w-auto"
            >
              {ctaText}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
