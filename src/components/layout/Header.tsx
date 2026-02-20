import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "@/app/store";
import { HeaderLogo } from "./header/header-logo";
import { HeaderUserNav } from "./header/header-user-nav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { Portal, PortalBackdrop } from "@/components/ui/portal";
import { RiCloseLine, RiMenuLine } from "@remixicon/react";

const navLinks = [
  { label: "Marketplace", href: "/marketplace" },
  { label: "Suppliers", href: "/suppliers" },
];

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <div className="md:hidden">
      <Button
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label="Toggle menu"
        className="md:hidden h-10 w-10 p-0"
        onClick={() => setOpen(!open)}
        size="icon"
        variant="ghost"
      >
        {open ? (
          <RiCloseLine className="size-5" />
        ) : (
          <RiMenuLine className="size-5" />
        )}
      </Button>
      {open && (
        <Portal className="top-14" id="mobile-menu">
          <PortalBackdrop />
          <div
            className={cn(
              "data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in",
              "size-full p-4 bg-background border-t border-border/40"
            )}
            data-slot={open ? "open" : "closed"}
          >
            <div className="grid gap-y-2">
              {navLinks.map((link) => (
                <Button 
                  className="justify-start text-base font-semibold" 
                  key={link.label} 
                  variant="ghost" 
                  onClick={() => {
                    navigate(link.href);
                    setOpen(false);
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </div>
            {!isAuthenticated && (
              <div className="mt-8 flex flex-col gap-3">
                <Button 
                  className="w-full h-11 text-base font-bold" 
                  variant="outline"
                  onClick={() => {
                    navigate("/auth/signin");
                    setOpen(false);
                  }}
                >
                  Sign In
                </Button>
                <Button 
                  className="w-full h-11 text-base font-bold"
                  onClick={() => {
                    navigate("/auth/signup");
                    setOpen(false);
                  }}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </Portal>
      )}
    </div>
  );
}

export const Header: React.FC = () => {
  const scrolled = useScroll(10);
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );
  const navigate = useNavigate();

  return (
    <header
      className={cn("sticky top-0 z-50 w-full border-transparent border-b transition-all duration-300", {
        "border-border/40 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/50":
          scrolled,
      })}
    >
      <div className="mx-auto flex h-12 w-full max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <HeaderLogo />
        
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Button 
              key={link.label} 
              size="sm" 
              variant="ghost" 
              onClick={() => navigate(link.href)}
              className="font-heading font-bold text-[11px] tracking-[0.15em] text-muted-foreground/70 hover:text-primary hover:bg-primary/5 rounded-lg px-4 uppercase transition-all"
            >
              {link.label}
            </Button>
          ))}
          
          <div className="ml-2 pl-2 border-l border-border/40 flex items-center gap-2">
            {!isAuthenticated ? (
               <>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => navigate("/auth/signin")}
                  className="font-heading font-bold uppercase tracking-[0.15em] hover:text-primary hover:bg-primary/5 text-[11px] px-4"
                >
                  Sign In
                </Button>
                <Button 
                  size="sm"
                  onClick={() => navigate("/auth/signup")}
                  className="font-heading font-bold text-[11px] uppercase tracking-[0.15em] px-5 bg-primary hover:bg-primary/90"
                >
                  Get Started
                </Button>
               </>
            ) : (
                <HeaderUserNav isAuthenticated={isAuthenticated} user={user} />
            )}
          </div>
        </div>
        
        {/* Mobile View - Logo and Menu mapped differently */}
        <div className="flex md:hidden items-center gap-2">
           {isAuthenticated && <HeaderUserNav isAuthenticated={isAuthenticated} user={user} />}
           <MobileNav />
        </div>
      </div>
    </header>
  );
};
