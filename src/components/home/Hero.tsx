import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  Timer,
  Zap,
  ChevronLeft,
  ChevronRight,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroWidget, type HeroWidgetItem } from "./HeroWidget";

// Mock data helpers for the visual "4x4" requirement
const MOCK_WIDGET_ITEMS: Record<string, HeroWidgetItem[]> = {
  deals: [
    { id: "1", name: "Bosch Professional Drill", image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=300", price: 45000, label: "-50%" },
    { id: "2", name: "Safety Helmet Yellow", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=300", price: 12000, label: "-30%" },
    { id: "3", name: "Industrial Gloves", image: "https://images.unsplash.com/photo-1540638349517-3abd5afc675f?auto=format&fit=crop&q=80&w=300", price: 8500, label: "-20%" },
    { id: "4", name: "Heavy Duty Wrench", image: "https://images.unsplash.com/photo-1456428746243-a41050a06b0d?auto=format&fit=crop&q=80&w=300", price: 95000, label: "-15%" },
  ],
  sellers: [
    { id: "5", name: "Caterpillar Excavator", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=300", price: 1500000 },
    { id: "6", name: "Makita Circular Saw", image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&q=80&w=300", price: 25000 },
    { id: "7", name: "Welding Equipment", image: "https://images.unsplash.com/photo-1581094794329-cd56b5095bb4?auto=format&fit=crop&q=80&w=300", price: 450000 },
    { id: "8", name: "Concrete Mixer", image: "https://images.unsplash.com/photo-1588622180802-b06cb46b3e85?auto=format&fit=crop&q=80&w=300", price: 18000 },
  ],
  new: [
    { id: "9", name: "Laser Level Tool", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=300", price: 5500 },
    { id: "10", name: "Hydraulic Pump", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=300", price: 125000 },
    { id: "11", name: "Safety Vest Orange", image: "https://images.unsplash.com/photo-1584992236310-6eddd724a4c5?auto=format&fit=crop&q=80&w=300", price: 8900 },
    { id: "12", name: "Steel Toe Boots", image: "https://images.unsplash.com/photo-1617526738882-1ea945ce3e56?auto=format&fit=crop&q=80&w=300", price: 34000 },
  ],
  rated: [
    { id: "13", name: "Angle Grinder", image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=300", price: 42000 },
    { id: "14", name: "Tool Box Set", image: "https://images.unsplash.com/photo-1530983852271-0086932c8636?auto=format&fit=crop&q=80&w=300", price: 8500 },
    { id: "15", name: "Generator 5kW", image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=300", price: 156000 },
    { id: "16", name: "Tape Measure", image: "https://images.unsplash.com/photo-1581577908354-972facca589e?auto=format&fit=crop&q=80&w=300", price: 1200 },
  ],
};

const BANNER_SLIDES = [
    {
        id: 1,
        bgImage: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=2000",
        label: "Mega Sale Event",
        titlePrefix: "Up to",
        titleHighlight: "50% OFF",
        subtitle: "On Heavy Machinery & Tools",
        description: "Limited time offer on excavators, power tools, and construction safety equipment from top rated suppliers.",
        cta: "Shop the Sale",
        ctaLink: "/products?sort=discount",
        gradientFrom: "from-red-900",
        gradientVia: "via-red-800",
        gradientTo: "to-primary/90",
        accentColor: "text-yellow-400",
        badgeIcon: Zap
    },
    {
        id: 2,
        bgImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000",
        label: "New Arrivals",
        titlePrefix: "Brand New",
        titleHighlight: "Equipment",
        subtitle: "Just Landed in Stock",
        description: "Check out the latest construction technology and heavy machinery just added to our catalog.",
        cta: "View New Arrivals",
        ctaLink: "/products?sort=newest",
        gradientFrom: "from-blue-900",
        gradientVia: "via-blue-800",
        gradientTo: "to-blue-600/90",
        accentColor: "text-blue-300",
        badgeIcon: Star
    },
    {
        id: 3,
        bgImage: "https://images.unsplash.com/photo-1535732820275-9ffd998cac22?auto=format&fit=crop&q=80&w=2000",
        label: "Top Suppliers",
        titlePrefix: "Verified",
        titleHighlight: "Partners",
        subtitle: "Source from the Best",
        description: "Connect safely with our top-rated, verified suppliers for all your construction needs.",
        cta: "Find Suppliers",
        ctaLink: "/suppliers",
        gradientFrom: "from-emerald-900",
        gradientVia: "via-emerald-800",
        gradientTo: "to-emerald-600/90",
        accentColor: "text-emerald-300",
        badgeIcon: Timer
    }
];

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? BANNER_SLIDES.length - 1 : prev - 1));

  const slide = BANNER_SLIDES[currentSlide];
  const BadgeIcon = slide.badgeIcon;

  return (
    <section className="py-6 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* CAROUSEL BANNER */}
        <div className={`relative rounded-sm overflow-hidden bg-gradient-to-r ${slide.gradientFrom} ${slide.gradientVia} ${slide.gradientTo} h-[350px] md:h-[400px] mb-8 border border-white/10 flex items-center group shadow-2xl transition-all duration-700`}>
             {/* Background with overlay */}
            <div key={slide.id} className="absolute inset-0 transition-opacity duration-700 opacity-100">
                <div className={`absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000`} style={{ backgroundImage: `url('${slide.bgImage}')` }} />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            </div>
            
            {/* Promo Content */}
            <div className="relative z-10 p-8 md:p-14 max-w-2xl animate-in fade-in slide-in-from-left-4 duration-500">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white font-bold text-xs uppercase tracking-widest mb-6 border border-white/20">
                    <BadgeIcon className={`w-3.5 h-3.5 fill-current ${slide.accentColor}`} />
                    <span className={slide.accentColor}>{slide.label}</span>
                 </div>
                 
                 <h1 className="text-4xl md:text-6xl font-heading font-black uppercase text-white mb-2 leading-none drop-shadow-lg">
                    {slide.titlePrefix} <span className={`text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70`}>{slide.titleHighlight}</span>
                 </h1>
                 <h2 className="text-xl md:text-3xl font-heading font-bold uppercase text-white/90 mb-6 tracking-wide">
                    {slide.subtitle}
                 </h2>
                 
                 <p className="text-white/80 mb-8 max-w-md leading-relaxed hidden sm:block font-medium">
                    {slide.description}
                 </p>
                 
                 <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                        size="lg" 
                        onClick={() => navigate(slide.ctaLink)}
                        className="bg-white hover:bg-slate-100 text-slate-900 font-black uppercase tracking-widest h-12 px-8 rounded-sm shadow-xl hover:shadow-2xl transition-all"
                    >
                        {slide.cta} <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                 </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 right-4 flex gap-2 z-20">
                <button onClick={prevSlide} className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-colors border border-white/10">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextSlide} className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-colors border border-white/10">
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {BANNER_SLIDES.map((_, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${currentSlide === idx ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"}`}
                    />
                ))}
            </div>
        </div>
        
        {/* WIDGETS GRID (4x4 Items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <HeroWidget 
                title="Super Flash Deals" 
                items={MOCK_WIDGET_ITEMS.deals} 
                href="/products?sort=deals"
                className="hover:border-red-500/50 transition-colors"
            />
            <HeroWidget 
                title="Top Selling Products" 
                items={MOCK_WIDGET_ITEMS.sellers} 
                href="/products?sort=popular"
            />
            <HeroWidget 
                title="New Arrivals" 
                items={MOCK_WIDGET_ITEMS.new} 
                href="/products?sort=newest"
            />
            <HeroWidget 
                title="Top Rated Gear" 
                items={MOCK_WIDGET_ITEMS.rated} 
                href="/products?sort=rating"
            />
        </div>

      </div>
    </section>
  );
};

export default Hero;
