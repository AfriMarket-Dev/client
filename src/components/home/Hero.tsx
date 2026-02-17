import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Zap, Star, Timer } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroWidget, type HeroWidgetItem } from "./HeroWidget";
import { Badge } from "@/components/ui/Badge";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";

// Mock data helpers for the visual "4x4" requirement
const MOCK_WIDGET_ITEMS: Record<string, HeroWidgetItem[]> = {
  deals: [
    {
      id: "1",
      name: "Bosch Professional Drill",
      image:
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=300",
      price: 45000,
      label: "-50%",
    },
    {
      id: "2",
      name: "Safety Helmet Yellow",
      image:
        "https://images.unsplash.com/photo-1595429035839-c99c298ffdde?auto=format&fit=crop&q=80&w=300",
      price: 12000,
      label: "-30%",
    },
    {
      id: "3",
      name: "Industrial Gloves",
      image:
        "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=300",
      price: 8500,
      label: "-20%",
    },
    {
      id: "4",
      name: "Heavy Duty Wrench",
      image:
        "https://images.unsplash.com/photo-1619733188860-3985e5c9a4c0?auto=format&fit=crop&q=80&w=300",
      price: 95000,
      label: "-15%",
    },
  ],
  sellers: [
    {
      id: "5",
      name: "Caterpillar Excavator",
      image:
        "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&q=80&w=300",
      price: 1500000,
    },
    {
      id: "6",
      name: "Makita Circular Saw",
      image:
        "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=300",
      price: 25000,
    },
    {
      id: "7",
      name: "Welding Equipment",
      image:
        "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=300",
      price: 450000,
    },
    {
      id: "8",
      name: "Concrete Mixer",
      image:
        "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=300",
      price: 18000,
    },
  ],
  new: [
    {
      id: "9",
      name: "Laser Level Tool",
      image:
        "https://images.unsplash.com/photo-1563118351-4089903901ab?auto=format&fit=crop&q=80&w=300",
      price: 5500,
    },
    {
      id: "10",
      name: "Hydraulic Pump",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=300",
      price: 125000,
    },
    {
      id: "11",
      name: "Safety Vest Orange",
      image:
        "https://images.unsplash.com/photo-1578326457599-232537c3561a?auto=format&fit=crop&q=80&w=300",
      price: 8900,
    },
    {
      id: "12",
      name: "Steel Toe Boots",
      image:
        "https://images.unsplash.com/photo-1542280756-74b2f55e73dd?auto=format&fit=crop&q=80&w=300",
      price: 34000,
    },
  ],
  rated: [
    {
      id: "13",
      name: "Angle Grinder",
      image:
        "https://images.unsplash.com/photo-1605634289352-73a76b7db0fe?auto=format&fit=crop&q=80&w=300",
      price: 42000,
    },
    {
      id: "14",
      name: "Tool Box Set",
      image:
        "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80&w=300",
      price: 8500,
    },
    {
      id: "15",
      name: "Generator 5kW",
      image:
        "https://images.unsplash.com/photo-1596484552834-0a3fe6279f97?auto=format&fit=crop&q=80&w=300",
      price: 156000,
    },
    {
      id: "16",
      name: "Tape Measure",
      image:
        "https://plus.unsplash.com/premium_photo-1663100619890-4c3d82a16d89?auto=format&fit=crop&q=80&w=300",
      price: 1200,
    },
  ],
};

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-6 bg-background industrial-grain">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
        {/* MARKET HIGHLIGHT BANNER */}
        <div className="relative rounded-lg overflow-hidden bg-slate-900 h-[400px] md:h-[480px] mb-6 border border-border/40 group shadow-md flex items-center">
          {/* Architectural Overlay */}
          <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-5" />

          <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-40 group-hover:scale-105 transition-transform duration-[4000ms]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000"
                alt="Featured Industrial Asset"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/60 to-transparent" />
          </div>

          {/* Highlight Content */}
          <div className="relative z-10 p-8 md:p-20 max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <Badge
                variant="destructive"
                className="rounded-lg px-3 py-1 h-auto bg-primary text-white border-none"
              >
                <Zap className="w-3.5 h-3.5 mr-1.5 fill-current" />
                MARKET HIGHLIGHT
              </Badge>
              <div className="h-[1px] w-12 bg-white/20" />
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">
                Node_Ref / 772-X
              </span>
            </div>

            <h1 className="text-display text-5xl md:text-8xl text-white mb-4 leading-[0.95]">
              HEAVY DUTY <br />
              <span className="text-primary italic">PRECISION.</span>
            </h1>

            <div className="flex items-center gap-6 mb-12">
              <div className="flex flex-col">
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">
                  Valuation
                </span>
                <p className="text-2xl md:text-3xl text-white font-sans font-bold tracking-tight">
                  RWF 1,250,000
                </p>
              </div>
              <div className="w-[1px] h-10 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">
                  Availability
                </span>
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  IN STOCK
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/products")}
                className="bg-white hover:bg-slate-100 text-slate-950 rounded-lg h-14 px-10 text-sm font-bold tracking-widest uppercase transition-all shadow-md active:scale-95 group"
              >
                Acquire Asset{" "}
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Side Detail - Decorative */}
          <div className="absolute right-20 bottom-20 hidden lg:block text-right animate-in fade-in slide-in-from-right-8 duration-1000 delay-500">
            <div className="text-6xl font-display font-black text-white/5 italic mb-4 tracking-tighter">
              SPEC_01
            </div>
            <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.4em] leading-relaxed max-w-[200px]">
              Verified Industrial <br />
              Processing Standard <br />
              Grade-A Certified
            </p>
          </div>
        </div>

        {/* WIDGETS GRID (4x4 Items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <HeroWidget
            title="Flash Sales"
            items={MOCK_WIDGET_ITEMS.deals}
            href="/products?sort=deals"
            className="border-t-2 border-t-primary"
          />
          <HeroWidget
            title="Top Sellers"
            items={MOCK_WIDGET_ITEMS.sellers}
            href="/products?sort=popular"
          />
          <HeroWidget
            title="New Inventory"
            items={MOCK_WIDGET_ITEMS.new}
            href="/products?sort=newest"
          />
          <HeroWidget
            title="Verified Gear"
            items={MOCK_WIDGET_ITEMS.rated}
            href="/products?sort=rating"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
