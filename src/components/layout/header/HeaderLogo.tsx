import React from "react";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";

export const HeaderLogo: React.FC = () => (
  <Link to="/" className="flex items-center gap-1.5 md:gap-2 group shrink-0">
    <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-lg flex items-center justify-center group-hover:bg-primary/90 transition-all duration-300">
      <Package className="w-4 h-4 md:w-6 md:h-6 text-primary-foreground" />
    </div>
    <span className="text-lg md:text-2xl font-heading font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
      AfrikaMarket
    </span>
  </Link>
);
