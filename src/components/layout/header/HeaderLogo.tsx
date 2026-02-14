import React from "react";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";

export const HeaderLogo: React.FC = () => (
  <Link to="/" className="flex items-center gap-2 group">
    <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center group-hover:bg-primary/90 transition-colors">
      <Package className="w-5 h-5 text-primary-foreground" />
    </div>
    <span className="text-xl font-heading font-bold uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">
      AfrikaMarket
    </span>
  </Link>
);
