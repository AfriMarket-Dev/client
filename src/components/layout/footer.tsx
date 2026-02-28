import {
  RiFacebookFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiTwitterFill,
} from "@remixicon/react";
import type React from "react";

interface FooterProps {
  onAboutClick?: () => void;
  onHelpClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onAboutClick,
  onHelpClick,
}) => {
  const footerSections = [
    {
      title: "Marketplace",
      links: [
        "Browse Suppliers",
        "Construction Materials",
        "Heavy Equipment",
        "Labor Services",
      ],
    },
    {
      title: "For Suppliers",
      links: [
        "Join as Supplier",
        "Supplier Dashboard",
        "List Products",
        "Verify Identity",
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", onClick: onHelpClick },
        "Contact Us",
        "Safety Tips",
        "Report a Problem",
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", onClick: onAboutClick },
        "Careers",
        "Press",
        "Blog",
      ],
    },
  ];

  const socialLinks = [
    { icon: RiFacebookFill, href: "#", label: "Facebook" },
    { icon: RiTwitterFill, href: "#", label: "Twitter" },
    { icon: RiInstagramFill, href: "#", label: "Instagram" },
    { icon: RiLinkedinFill, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="relative bg-background border-t border-border/40 text-muted-foreground overflow-hidden pt-24 pb-12">
      {/* Decorative Ornaments */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/[0.02] rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/[0.03] rounded-none -rotate-45 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5 space-y-10">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-foreground mb-8 tracking-tighter uppercase leading-[0.8]">
                Afrika
                <br />
                Market
              </h2>
              <div className="w-20 h-1 bg-primary mb-8" />
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md font-medium">
                Strategic industrial node connecting verified regional
                manufacturers with enterprise contractors.
              </p>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-border/20">
              <div className="space-y-2">
                <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">
                  Operational HQ
                </span>
                <span className="text-foreground font-bold text-sm">
                  Kigali International, Rwanda
                </span>
              </div>
              <div className="space-y-2">
                <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">
                  Protocol Access
                </span>
                <span className="text-foreground font-bold text-sm">
                  terminal@afrikamarket.rw
                </span>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="flex items-center justify-center w-11 h-11 bg-muted/20 border border-border/50 rounded-none hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-500 text-muted-foreground"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links - Compact Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 lg:gap-8">
              {footerSections.map((section, index) => (
                <div key={index} className="space-y-8">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40 pb-4 border-b border-border/20">
                    {section.title}
                  </h3>
                  <ul className="space-y-4">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        {typeof link === "object" && link.onClick ? (
                          <button
                            onClick={link.onClick}
                            className="text-muted-foreground/60 hover:text-primary transition-all text-left text-[11px] font-black uppercase tracking-widest"
                          >
                            {link.label}
                          </button>
                        ) : (
                          <a
                            href="#"
                            className="text-muted-foreground/60 hover:text-primary transition-all text-[11px] font-black uppercase tracking-widest"
                          >
                            {typeof link === "string" ? link : link.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legal & Compliance */}
        <div className="mt-32 pt-12 border-t border-border/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">
            © 2026 AFRIKAMARKET RWANDA · NODE_01
          </div>
          <div className="flex gap-12">
            <a
              href="#"
              className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 hover:text-primary transition-colors"
            >
              Privacy Protocol
            </a>
            <a
              href="#"
              className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 hover:text-primary transition-colors"
            >
              Compliance Agreement
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
