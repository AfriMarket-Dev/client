import React from "react";
import { Mail, MapPin } from "lucide-react";
import {
  RiFacebookFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiTwitterFill,
} from "@remixicon/react";

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
    <footer className="bg-card border-t border-border text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-heading font-bold uppercase text-card-foreground mb-6 tracking-wide">
              AfrikaMarket
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed max-w-sm text-sm font-medium">
              Connecting verified local suppliers with contractors across all 30
              districts of Rwanda.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start text-muted-foreground">
                <MapPin className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-primary" />
                <span className="font-medium">Kigali, Rwanda</span>
              </div>
              <div className="flex items-start text-muted-foreground">
                <Mail className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-primary" />
                <span className="font-medium">support@afrikamarket.rw</span>
              </div>
            </div>

            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="flex items-center justify-center w-10 h-10 bg-muted/50 border border-border rounded hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 text-muted-foreground"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-heading font-bold uppercase mb-6 text-card-foreground tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {typeof link === "object" && link.onClick ? (
                      <button
                        onClick={link.onClick}
                        className="text-muted-foreground hover:text-primary transition-colors text-left text-sm font-medium uppercase tracking-wide"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium uppercase tracking-wide"
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

      <div className="border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <div>© 2024 AfrikaMarket Rwanda Ltd. All rights reserved.</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
