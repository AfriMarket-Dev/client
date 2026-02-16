import React, { useState } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "@/app/store";
import { HeaderLogo } from "./header/HeaderLogo";
import { HeaderSearch } from "./header/HeaderSearch";
import { HeaderUserNav } from "./header/HeaderUserNav";
import { Button } from "@/components/ui/Button";
import { Menu } from "lucide-react";
import { Input } from "@/components/ui/Input";

export const Header: React.FC = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <HeaderLogo />

          <HeaderSearch value={searchQuery} onChange={setSearchQuery} />

          <div className="flex items-center gap-3">
            <HeaderUserNav
              isAuthenticated={isAuthenticated}
              user={user}
            />

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden h-10 w-10 text-foreground"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-4">
          <div className="relative">
             <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-sm border-border bg-muted/20"
            />
          </div>
          <nav className="flex flex-col space-y-2">
            <Button variant="ghost" className="justify-start font-heading uppercase text-sm tracking-wider">
              Marketplace
            </Button>
            <Button variant="ghost" className="justify-start font-heading uppercase text-sm tracking-wider">
              Suppliers
            </Button>
             <Button variant="ghost" className="justify-start font-heading uppercase text-sm tracking-wider">
              Services
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
