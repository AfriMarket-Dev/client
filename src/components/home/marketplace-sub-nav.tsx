import { useLocation } from "@tanstack/react-router";
import { 
  RiFireLine, 
  RiLineChartLine, 
  RiTrophyLine, 
  RiSparklingLine, 
  RiStarLine,
  RiLayoutGridLine
} from "@remixicon/react";
import React from "react";

const anchorItems = [
  { label: "Hot Deals", href: "#hot-deals", icon: RiFireLine },
  { label: "Trending", href: "#trending", icon: RiLineChartLine },
  { label: "Best Sellers", href: "#best-sellers", icon: RiTrophyLine },
  { label: "New Arrivals", href: "#new-arrivals", icon: RiSparklingLine },
  { label: "Featured", href: "#featured-products", icon: RiStarLine },
];

export function MarketplaceSubNav() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id.replace("#", ""));
    if (element) {
      const offset = 100; // Adjusted for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  if (!isHomePage) return null;

  return (
    <div className="border-b border-border/40 bg-white sticky top-[48px] z-40 overflow-hidden hidden md:block">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
        <div className="flex items-center gap-10 h-12 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 text-foreground/40 shrink-0">
            <RiLayoutGridLine size={14} />
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Quick Access</span>
          </div>
          
          <div className="h-4 w-px bg-border/60" />

          {anchorItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="group flex items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground/60 hover:text-primary transition-all whitespace-nowrap h-full relative"
            >
              <item.icon size={14} className="group-hover:scale-110 transition-transform" />
              {item.label}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
