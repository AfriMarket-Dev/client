import { Link, useLocation } from "@tanstack/react-router";

const menuItems = [
  { label: "All Items", href: "/marketplace" },
  {
    label: "Construction Products",
    href: "/products",
    search: { type: "PRODUCT" },
  },
  {
    label: "Specialized Services",
    href: "/services",
    search: { type: "SERVICE" },
  },
  { label: "Verified Suppliers", href: "/suppliers" },
];

export function MarketplaceSubNav() {
  const location = useLocation();

  return (
    <div className="border-b border-border/40 bg-white sticky top-[64px] z-40">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
        <div className="flex items-center gap-8 h-12 overflow-x-auto scrollbar-hide">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.label}
                to={item.href as any}
                search={item.search as any}
                className={`text-[11px] font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${
                  isActive
                    ? "text-primary border-b-2 border-primary h-full flex items-center"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
