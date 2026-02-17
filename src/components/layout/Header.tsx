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
    <header className="bg-background/80 backdrop-blur-md border-b border-border/40 sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <HeaderLogo />

          <HeaderSearch value={searchQuery} onChange={setSearchQuery} />

          <div className="flex items-center gap-4">
            <HeaderUserNav
              isAuthenticated={isAuthenticated}
              user={user}
            />

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden h-10 w-10 text-foreground rounded-lg hover:bg-muted/50"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-lg px-4 py-6 space-y-6 animate-in slide-in-from-top-4 duration-300">
          <div className="relative">
             <Input
              placeholder="Search products or services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 w-full rounded-lg border-border/50 bg-muted/20"
            />
          </div>
          <nav className="flex flex-col space-y-1">
            <Button variant="ghost" className="justify-start font-semibold text-base py-3 rounded-lg">
              Marketplace
            </Button>
            <Button variant="ghost" className="justify-start font-semibold text-base py-3 rounded-lg">
              Suppliers
            </Button>
             <Button variant="ghost" className="justify-start font-semibold text-base py-3 rounded-lg">
              Services
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
