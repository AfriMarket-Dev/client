import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroWidget, type HeroWidgetItem } from "./hero-widget";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/common/image-with-fallback";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const MOCK_WIDGET_ITEMS: Record<string, HeroWidgetItem[]> = {
  deals: [
    {
      id: "stat-1",
      type: "stat",
      stat: "50%",
      statDesc: "Up to off",
    },
    {
      id: "d1",
      name: "Industrial Drill Set",
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=300",
      price: 45000,
      label: "-30%",
    },
    {
      id: "d2",
      name: "Safety Boots Pro",
      image: "https://images.unsplash.com/photo-1509453721491-c3af5961df76?q=80&w=735&auto=format&fit=crop",
      price: 12000,
      label: "-25%",
    },
    {
      id: "d3",
      name: "Power Generator",
      image: "https://images.unsplash.com/photo-1667339242123-3c1f5fd9a3b0?q=80&w=1170&auto=format&fit=crop",
      price: 156000,
      label: "-40%",
    },
  ],
  products: [
    {
      id: "stat-2",
      type: "stat",
      stat: "50K+",
      statDesc: "Available",
    },
    {
      id: "p1",
      name: "Concrete Mixer 500L",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=300",
      price: "850k",
      label: "BESTSELLER",
      subtext: "Machinery",
    },
    {
      id: "p2",
      name: "Portland Cement (50kg)",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=300",
      price: "11,500",
      label: "NEW",
      subtext: "Materials",
    },
    {
      id: "p3",
      name: "T12 Steel Rebar",
      image: "https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?auto=format&fit=crop&q=80&w=300",
      price: "9,500",
      label: "TRENDING",
      subtext: "Steel",
    },
  ],
  suppliers: [
    {
      id: "stat-3",
      type: "stat",
      stat: "2.5K+",
      statDesc: "Verified",
    },
    {
      id: "s1",
      type: "supplier",
      name: "Kigali Heavy Machinery",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=300",
      subtext: "Kigali, Rwanda",
      rating: 4.9,
      label: "Verified",
    },
    {
      id: "s2",
      type: "supplier",
      name: "BuildRight Materials",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=300",
      subtext: "Musanze, Rwanda",
      rating: 4.7,
      label: "Verified",
    },
    {
      id: "s3",
      type: "supplier",
      name: "Kigali Home Solutions",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=300",
      subtext: "Kigali, Rwanda",
      rating: 4.7,
      label: "Verified",
    },
  ],
  services: [
    {
      id: "stat-4",
      type: "stat",
      stat: "24/7",
      statDesc: "Support",
    },
    {
      id: "sv1",
      type: "service",
      name: "Equipment Rental",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=300",
      subtext: "Heavy machinery & tools",
      price: "From $350/day",
    },
    {
      id: "sv2",
      type: "service",
      name: "Bulk Shipping",
      image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=300",
      subtext: "Freight & logistics",
      price: "Custom quotes",
    },
    {
      id: "sv3",
      type: "service",
      name: "Trade Support",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=300",
      subtext: "24/7 customer service",
      price: "Free included",
    },
  ],
};

const MOCK_CAROUSEL_ITEMS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000",
    title: "HEAVY DUTY PRECISION",
    highlight: "PRECISION.",
    subtitle: "Essential Industrial Tools",
    price: "RWF 1,250,000",
    tag: "MARKET HIGHLIGHT",
    ref: "Node_Ref / 772-X"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=2000",
    title: "POWER TOOLS COLLECTION",
    highlight: "POWER.",
    subtitle: "Professional Grade Equipment",
    price: "RWF 450,000",
    tag: "NEW ARRIVAL",
    ref: "Tool_Set / 550-Z"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?auto=format&fit=crop&q=80&w=2000",
    title: "CONSTRUCTION MATERIALS",
    highlight: "MATERIALS.",
    subtitle: "High Quality Steel & Cement",
    price: "Bulk Pricing",
    tag: "BEST SELLERS",
    ref: "Mat_Bundle / 990-A"
  }
];


const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    const intervalId = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 8000);

    return () => clearInterval(intervalId);
  }, [api]);

  return (
    <section className="relative py-3 md:py-6 bg-background industrial-grain">
      <div className="max-w-[1600px] mx-auto px-3 md:px-4 lg:px-6">
        {/* CAROUSEL BANNER */}
        <div className="relative rounded-lg overflow-hidden bg-slate-900 border border-border/40 group shadow-md mb-4 md:mb-6">
          <Carousel className="w-full" opts={{ loop: true }} setApi={setApi}>
            <CarouselContent>
              {MOCK_CAROUSEL_ITEMS.map((item) => (
                <CarouselItem key={item.id}>
                  <div className="relative h-[220px] md:h-[320px] lg:h-[380px] w-full overflow-hidden flex items-center">
                    
                    {/* Background Image & Overlay */}
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 opacity-40 hover:scale-105 transition-transform duration-[4000ms]">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-900/80 to-slate-900/20" />
                    </div>

                    {/* Creative Architectural Grid - Masked & Subtle */}
                    <div 
                      className="absolute inset-0 blueprint-grid pointer-events-none opacity-[0.03] z-10 mix-blend-overlay" 
                      style={{ maskImage: "linear-gradient(to right, transparent, black 40%, transparent)" }}
                    />
                    
                     {/* Second decorative grid layer for depth */}
                    <div 
                      className="absolute right-0 top-0 bottom-0 w-1/3 blueprint-grid pointer-events-none opacity-[0.05] z-10"
                      style={{ maskImage: "linear-gradient(to left, black, transparent)" }}
                    />

                    {/* Highlight Content */}
                    <div className="relative z-20 p-5 md:p-8 lg:p-16 max-w-3xl w-full">
                      <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-6">
                        <Badge
                          variant="destructive"
                          className="rounded-lg px-2 md:px-3 py-1 h-auto bg-primary text-white border-none text-[10px] md:text-xs shadow-lg shadow-primary/20"
                        >
                          <Zap className="w-3 h-3 md:w-3.5 md:h-3.5 mr-1.5 fill-current" />
                          {item.tag}
                        </Badge>
                        <div className="h-px w-8 md:w-12 bg-white/20" />
                        <span className="text-[9px] md:text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">
                          {item.ref}
                        </span>
                      </div>

                      <h1 className="text-display text-2xl md:text-4xl lg:text-7xl text-white mb-2 md:mb-4 leading-[0.95] drop-shadow-xl font-bold">
                        {item.title.split(' ').slice(0, -1).join(' ')} <br />
                        <span className="text-primary italic inline-block transform -skew-x-6">{item.highlight}</span>
                      </h1>

                      <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-8">
                        <div className="flex flex-col">
                          <span className="text-[8px] md:text-[9px] text-white/40 font-bold uppercase tracking-widest mb-1">
                            Price
                          </span>
                          <p className="text-base md:text-xl lg:text-2xl text-white font-sans font-bold tracking-tight">
                            {item.price}
                          </p>
                        </div>
                        <div className="w-px h-8 md:h-10 bg-white/10" />
                        <div className="flex flex-col">
                          <span className="text-[8px] md:text-[9px] text-white/40 font-bold uppercase tracking-widest mb-1">
                            Availability
                          </span>
                          <div className="flex items-center gap-1.5 md:gap-2 text-emerald-400 text-xs md:text-sm font-bold">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            IN STOCK
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button
                          size="lg"
                          onClick={() => navigate({ to: "/marketplace" })}
                          className="bg-white hover:bg-slate-100 text-slate-950 rounded-lg h-8 md:h-12 px-5 md:px-8 text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all shadow-lg active:scale-95 group"
                        >
                          Shop Now{" "}
                          <ArrowRight className="ml-2 md:ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom Indicators (Bottom Right) */}
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-30 flex gap-2">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`h-1.5 rounded-sm transition-all duration-300 ${
                    current === index + 1 
                      ? "w-8 bg-primary" 
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </Carousel>
        </div>

        {/* WIDGETS GRID (4x4 Items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          <HeroWidget
            title="Hot Deals"
            subtitle="Limited time offers"
            items={MOCK_WIDGET_ITEMS.deals}
            href="/products?sort=deals"
            variant="default"
          />
          <HeroWidget
            title="Top Products"
            subtitle="Trending items"
            items={MOCK_WIDGET_ITEMS.products}
            href="/products?sort=popular"
            variant="blue"
          />
          <HeroWidget
            title="Top Suppliers"
            subtitle="Verified partners"
            items={MOCK_WIDGET_ITEMS.suppliers}
            href="/suppliers"
            variant="emerald"
          />
          <HeroWidget
            title="Top Services"
            subtitle="Professional solutions"
            items={MOCK_WIDGET_ITEMS.services}
            href="/services"
            variant="orange"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
