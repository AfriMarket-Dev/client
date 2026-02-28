import {
  RiAlertLine,
  RiShieldCheckLine,
  RiTruckLine,
  RiFlashlightLine,
} from "@remixicon/react";
import { HardHat, Package, TrendingUp } from "lucide-react";
import React from "react";
import { LiveDealsTicker } from "@/components/home/live-deals-ticker";
import { cn } from "@/lib/utils";

const QUICK_NODES = [
  {
    icon: <RiFlashlightLine size={16} />,
    label: "Flash Deals",
    href: "#flash-deals",
  },
  {
    icon: <TrendingUp size={16} />,
    label: "Market Trending",
    href: "#trending",
  },
  { icon: <Package size={16} />, label: "Best Sellers", href: "#best-sellers" },
  { icon: <HardHat size={16} />, label: "Pro Services", href: "#services" },
  {
    icon: <RiShieldCheckLine size={16} />,
    label: "Verified Suppliers",
    href: "#suppliers",
  },
  {
    icon: <RiTruckLine size={16} />,
    label: "New Inventory",
    href: "#new-arrivals",
  },
];

export const MarketplaceSubNav: React.FC = () => {
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 180;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full sticky top-12 z-40 transition-all duration-300">
      <div className="bg-primary text-white py-1.5 px-3 md:px-4 overflow-hidden border-b border-white/10">
        <div className="max-w-[1600px] mx-auto flex items-center justify-center gap-2 md:gap-4 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em]">
          <RiAlertLine size={12} />
          <span>
            Seasonal Industrial Liquidation: Up to 40% OFF select inventory
            nodes
          </span>
          <div className="h-3 w-[1px] bg-white/20 mx-2 hidden sm:block" />
          <span className="hidden sm:inline">Use Code: AFRICA_PRO_2026</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border-b border-border/40 py-2 md:py-3 industrial-grain shadow-sm overflow-hidden relative z-20">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
          <div className="flex items-center gap-4 md:gap-8 overflow-x-auto no-scrollbar py-1">
            <div className="hidden md:flex items-center gap-1.5 shrink-0 border-r border-border/40 pr-6 mr-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground whitespace-nowrap font-heading">
                Quick Links
              </span>
            </div>

            <div className="flex items-center gap-4 md:gap-6 flex-1 min-w-max px-1">
              {QUICK_NODES.map((node, i) => (
                <a
                  key={i}
                  href={node.href}
                  onClick={(e) => scrollToSection(e, node.href)}
                  className="flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.2em] text-foreground/70 hover:text-primary transition-all whitespace-nowrap group"
                >
                  <div className="text-primary/40 group-hover:text-primary transition-colors">
                    {node.icon}
                  </div>
                  {node.label}
                </a>
              ))}
            </div>

            <div className="hidden xl:flex items-center gap-4 border-l border-border/40 pl-8 ml-2 font-sans">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
                Status: <span className="text-emerald-600">LIVE</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <LiveDealsTicker />
    </div>
  );
};
