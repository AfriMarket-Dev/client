import React, { useState } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "@/app/store";
import { HeaderLogo } from "./header/HeaderLogo";
import { HeaderSearch } from "./header/HeaderSearch";
import { HeaderUserNav } from "./header/HeaderUserNav";
import { Button } from "@/components/ui/Button";
import { Menu } from "lucide-react";

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
    </header>
  );
};
