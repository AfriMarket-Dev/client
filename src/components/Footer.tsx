import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Globe,
} from "lucide-react";

interface FooterProps {
  onAboutClick?: () => void;
  onHelpClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAboutClick, onHelpClick }) => {
  const footerSections = [
    {
      title: "Marketplace",
      links: [
        "Browse Suppliers",
        "Construction Materials",
        "Heavy Equipment",
        "Labor Services",
        "Bulk Deals",
      ],
    },
    {
      title: "For Suppliers",
      links: [
        "Join as Supplier",
        "Supplier Dashboard",
        "List Products",
        "Verify Identity",
        "Success Stories",
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", onClick: onHelpClick },
        "Contact Us",
        "Safety Tips",
        "Community Guidelines",
        "Report a Problem",
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", onClick: onAboutClick },
        "Mission & Vision",
        "Careers in Kigali",
        "Press",
        "Blog",
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-foreground text-background border-t border-background/10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                AfrikaMarket
              </h2>
              <p className="text-sm text-muted-foreground/60 mt-1">
                Rwanda's #1 Construction Hub
              </p>
            </div>

            <p className="text-muted-foreground/80 mb-6 leading-relaxed">
              connect verified local suppliers with contractors and individual
              builders across all 30 districts of Rwanda.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center text-stone-400">
                <MapPin className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                <span className="text-sm">
                  Kigali, Rwanda (Serving Nationwide)
                </span>
              </div>
              <div className="flex items-center text-stone-400">
                <Mail className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                <span className="text-sm">support@afrikamarket.rw</span>
              </div>
              <div className="flex items-center text-stone-400">
                <Phone className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                <span className="text-sm">+250 788 000 000</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-8">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="flex items-center justify-center w-10 h-10 bg-background/5 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 group text-muted-foreground"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4 text-background">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {typeof link === "object" && link.onClick ? (
                      <button
                        onClick={link.onClick}
                        className="text-muted-foreground/70 hover:text-primary transition-colors text-sm text-left"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href="#"
                        className="text-muted-foreground/70 hover:text-primary transition-colors text-sm"
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

      {/* Bottom Bar */}
      <div className="border-t border-background/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground/50 text-center md:text-left">
              © 2024 AfrikaMarket Rwanda Ltd. All rights reserved.
            </div>

            {/* Language & Links */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground/80 bg-background/5 px-3 py-1 rounded-full">
                <Globe className="w-3 h-3" />
                <span>English</span>
                <span className="text-muted-foreground/30">|</span>
                <span className="text-muted-foreground hover:text-background cursor-pointer">
                  Kinyarwanda
                </span>
              </div>

              <a
                href="#"
                className="text-stone-500 hover:text-primary transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-stone-500 hover:text-primary transition-colors"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
