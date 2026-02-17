import React from "react";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";

export const HeaderLogo: React.FC = () => (
  <Link to="/" className="flex items-center gap-2 group">
    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:bg-primary/90 transition-all duration-300">
      <Package className="w-6 h-6 text-primary-foreground" />
    </div>
    <span className="text-2xl font-heading font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
      AfrikaMarket
    </span>
  </Link>
);
