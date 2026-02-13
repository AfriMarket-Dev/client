import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  MapPin,
  ShieldCheck,
  Search,
  ChevronDown,
  LayoutGrid,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/Input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [district, setDistrict] = useState("Kigali");

  const districts = [
    "Kigali",
    "Gasabo",
    "Kicukiro",
    "Nyarugenge",
    "Musanze",
    "Rubavu",
    "Huye",
    "Rwamagana",
  ];

  return (
    <section className="relative min-h-[600px] flex items-center pt-20 overflow-hidden">
      {/* Background with African Pattern */}
      <div className="absolute inset-0 z-0 bg-stone-50">
        <div className="absolute inset-0 african-pattern opacity-[0.05]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 animate-in fade-in slide-in-from-left-4 duration-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Rwanda's #1 Construction Marketplace
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1] text-foreground font-display animate-in fade-in slide-in-from-bottom-4 duration-700">
            Build Better with <br /> Verified{" "}
            <span className="text-primary italic">Local Partners</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-2xl font-light animate-in fade-in slide-in-from-bottom-6 duration-700">
            Discover materials, request quotes, and connect directly with suppliers across Rwanda. No middlemen, no hidden fees.
          </p>

          {/* Search Block */}
          <div className="bg-card rounded-2xl border border-border shadow-2xl p-2 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="md:w-1/4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between h-14 text-base rounded-xl hover:bg-muted"
                    >
                      <span className="flex items-center gap-2 truncate">
                        <MapPin className="w-4 h-4 text-primary" />
                        {district}
                      </span>
                      <ChevronDown className="w-4 h-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 max-h-60 overflow-y-auto">
                    {districts.map((d) => (
                      <DropdownMenuItem key={d} onClick={() => setDistrict(d)}>
                        {d}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search cement, sand, heavy machinery..."
                  className="h-14 pl-12 bg-transparent border-none text-lg rounded-xl focus-visible:ring-0"
                />
              </div>
              <Button
                size="xl"
                className="rounded-xl px-10 shadow-lg shadow-primary/20"
                onClick={() => navigate("/products")}
              >
                Search
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 items-center animate-in fade-in slide-in-from-bottom-10 duration-700">
            <Button
              variant="outline"
              size="lg"
              className="rounded-xl gap-2 h-12"
              onClick={() => navigate("/products")}
            >
              <LayoutGrid className="w-4 h-4" />
              Browse Categories
            </Button>
            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="flex items-center gap-1.5 text-stone-600">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span>Verified Providers</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-stone-300" />
              <div className="text-stone-600">
                <span className="font-bold text-foreground">500+</span> Suppliers in Kigali
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
