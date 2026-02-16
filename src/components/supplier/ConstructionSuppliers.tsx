import React from "react";
import {
  Star,
  MapPin,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Building,
  Settings,
  Award,
  HardHat,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface ConstructionSuppliersProps {
  onViewSupplier?: (supplierId: string) => void;
  onViewAllSuppliers?: () => void;
}

const ConstructionSuppliers: React.FC<ConstructionSuppliersProps> = ({
  onViewSupplier,
  onViewAllSuppliers,
}) => {
  const constructionSuppliers = [
    {
      id: "const-1",
      name: "Lagos Heavy Equipment Co.",
      description:
        "Premier provider of construction equipment rental and heavy machinery across West Africa.",
      location: "Lagos, Nigeria",
      avatar:
        "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      coverImage:
        "https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop",
      rating: 4.9,
      reviewCount: 89,
      verified: true,
      specialties: ["Heavy Equipment", "Excavators"],
      services: {
        pricing: "From $350/day",
        availability: "24/7 Support",
        equipment: ["Excavators", "Cranes"],
      },
      totalEquipment: 45,
      yearsExperience: 12,
    },
    {
      id: "const-2",
      name: "East Africa Construction",
      description:
        "Leading supplier of construction materials and equipment rental services.",
      location: "Nairobi, Kenya",
      avatar:
        "https://images.pexels.com/photos/5625120/pexels-photo-5625120.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      coverImage:
        "https://images.pexels.com/photos/162539/architecture-building-construction-work-162539.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 134,
      verified: true,
      specialties: ["Materials", "Rental"],
      services: {
        pricing: "From $280/day",
        availability: "Same Day Delivery",
        equipment: ["Cranes", "Mixers"],
      },
      totalEquipment: 67,
      yearsExperience: 15,
    },
  ];

  const stats = [
    {
      icon: Building,
      value: "150+",
      label: "Suppliers",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: Settings,
      value: "500+",
      label: "Equipment",
      color: "text-info",
      bg: "bg-info/10",
    },
    {
      icon: MapPin,
      value: "25+",
      label: "Cities",
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      icon: Award,
      value: "99%",
      label: "Uptime",
      color: "text-warning",
      bg: "bg-warning/10",
    },
  ];

  return (
    <section className="py-24 bg-foreground text-background relative overflow-hidden rounded-sm border border-border shadow-2xl">
      <div className="absolute inset-0 african-pattern opacity-10 pointer-events-none invert" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-1.5 bg-background/5 border border-background/10 rounded-sm text-[10px] font-heading font-bold uppercase tracking-widest text-primary mb-8">
            <HardHat className="w-4 h-4 mr-2" /> Authorized Equipment Nodes
          </div>

          <h2 className="text-5xl md:text-7xl font-heading font-bold uppercase mb-8 leading-[0.9] tracking-tight">
            Build with <br />
            <span className="text-primary">Trusted Parameters</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-16 uppercase tracking-wider text-xs font-bold">
            Consolidated network of verified construction equipment suppliers
            and industrial service providers across the region.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-background/5 border border-background/10 p-8 rounded-sm group hover:border-primary/40 transition-colors"
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-sm flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110",
                    stat.bg,
                    stat.color,
                  )}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-4xl font-heading font-bold text-background mb-1">
                  {stat.value}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {constructionSuppliers.map((supplier) => (
            <div
              key={supplier.id}
              className="group bg-background rounded-sm overflow-hidden border border-background/10 hover:border-primary transition-all duration-500 cursor-pointer"
              onClick={() => onViewSupplier?.(supplier.id)}
            >
              <div className="relative h-40 overflow-hidden border-b-2 border-background/10">
                <img
                  src={supplier.coverImage}
                  alt={supplier.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-foreground/60 to-transparent"></div>
                {supplier.verified && (
                  <div className="absolute top-3 right-3 bg-success text-success-foreground px-2 py-1 rounded-sm text-[9px] font-black uppercase tracking-widest border border-success/20">
                    <CheckCircle className="w-3 h-3 mr-1 inline" /> Verified
                  </div>
                )}
                <div className="absolute -bottom-6 left-4">
                  <img
                    src={supplier.avatar}
                    alt={supplier.name}
                    className="w-12 h-12 rounded-sm border border-background object-cover shadow-xl"
                  />
                </div>
              </div>

              <div className="pt-8 px-5 pb-6">
                <div className="flex items-start justify-between mb-4 gap-2">
                  <div className="overflow-hidden">
                    <h3 className="text-sm font-heading font-bold text-foreground uppercase tracking-widest group-hover:text-primary transition-colors truncate">
                      {supplier.name}
                    </h3>
                    <div className="flex items-center text-muted-foreground text-[10px] uppercase font-bold tracking-tighter mt-1">
                      <MapPin className="w-3 h-3 mr-1" /> {supplier.location}
                    </div>
                  </div>
                  <div className="flex items-center bg-muted/50 px-1.5 py-0.5 rounded-sm border border-border shrink-0">
                    <Star className="w-3 h-3 text-warning fill-warning mr-1" />
                    <span className="font-heading font-bold text-foreground text-[10px]">
                      {supplier.rating}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-6">
                  {supplier.specialties.map((s, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="text-[8px] font-black uppercase tracking-tighter px-1.5 h-4"
                    >
                      {s}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 mb-6">
                  <div className="bg-muted/30 p-2 rounded-sm text-center border border-border">
                    <div className="font-heading font-bold text-foreground text-xs">
                      {supplier.totalEquipment}
                    </div>
                    <div className="text-[8px] font-black text-muted-foreground uppercase">
                      Nodes
                    </div>
                  </div>
                  <div className="bg-muted/30 p-2 rounded-sm text-center border border-border">
                    <div className="font-heading font-bold text-foreground text-xs">
                      {supplier.yearsExperience}y
                    </div>
                    <div className="text-[8px] font-black text-muted-foreground uppercase">
                      Exp
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 rounded-sm font-heading font-bold uppercase text-[10px] h-9 shadow-none"
                  >
                    Initialize
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-sm border"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center bg-background/5 border border-background/10 p-12 rounded-sm relative overflow-hidden">
          <div className="absolute inset-0 african-pattern opacity-5 pointer-events-none" />
          <h3 className="text-3xl font-heading font-bold uppercase mb-6 text-background">
            Initialize New Project Stream
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Button
              size="lg"
              onClick={onViewAllSuppliers}
              className="px-8 h-12 font-heading font-bold uppercase text-xs tracking-widest shadow-none"
            >
              Browse Node Directory <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 h-12 font-heading font-bold uppercase text-xs tracking-widest border border-background/20 text-background bg-transparent hover:bg-background/10 shadow-none"
            >
              Request Transmission
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstructionSuppliers;
