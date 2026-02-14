import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Users,
  Package,
  Star,
  Shield,
  CheckCircle,
  MapPin,
  Truck,
  Zap,
  Percent,
} from "lucide-react";
import { PromoCard } from "./PromoCard";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-b from-muted/10 to-background overflow-hidden font-sans border-b border-border/50">
      <div className="absolute inset-0 african-pattern opacity-[0.03] pointer-events-none" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-success/5 pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">
        <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="bg-gradient-to-r from-foreground via-foreground to-foreground/95 rounded-lg p-5 text-background shadow-xl border border-foreground/10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center bg-destructive rounded-md px-3.5 py-1.5 animate-pulse shadow-lg shadow-destructive/20">
                  <Zap className="w-4 h-4 mr-2 fill-current" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Flash Sale
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm md:text-base font-bold uppercase tracking-wide mb-0.5">
                    Up to 50% OFF Heavy Machinery
                  </h3>
                  <p className="text-xs text-background/70">
                    Limited time offer for verified contractors
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="flex gap-4 text-center">
                  {[
                    { label: "Days", value: "02" },
                    { label: "Hours", value: "14" },
                    { label: "Mins", value: "35" },
                  ].map((unit) => (
                    <div key={unit.label} className="min-w-[44px]">
                      <div className="text-2xl font-heading font-bold leading-none text-primary-foreground mb-1">
                        {unit.value}
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-background/60 font-medium">
                        {unit.label}
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  size="sm"
                  onClick={() => navigate("/products?filter=sale")}
                  className="bg-background text-foreground hover:bg-background/90 font-bold uppercase text-xs tracking-wider h-9 px-6 shadow-none transition-all hover:scale-[1.02]"
                >
                  View Deals
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center max-w-5xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-8 border border-primary/20">
            <Shield className="w-3.5 h-3.5" />
            Rwanda's Premier Marketplace
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-foreground uppercase leading-[0.95] mb-8 tracking-tight">
            Connect with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-orange-500">
              Trusted Suppliers
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-normal">
            Source construction materials, equipment, and professional services
            from verified local partners with confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => navigate("/products")}
              className="h-14 px-10 text-base font-bold uppercase tracking-widest rounded-sm bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Browse Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/services")}
              className="h-14 px-10 text-base font-bold uppercase tracking-widest rounded-sm border border-border hover:border-foreground/30 hover:bg-muted/50 text-foreground bg-transparent shadow-none transition-all hover:-translate-y-0.5"
            >
              Find Services
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <PromoCard
            title="Hot Deals"
            subtitle="Limited time offers"
            icon={Zap}
            iconColor="text-destructive"
            bgColor="bg-destructive/5"
            hoverBorder="hover:border-destructive/30"
            badge={
              <div className="text-2xl font-bold text-destructive">-50%</div>
            }
            onClick={() => navigate("/products?filter=sale")}
            buttonText="View All Deals"
            buttonColor="text-destructive hover:text-destructive"
          >
            <div className="grid grid-cols-4 gap-2.5 mb-6 relative z-10">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className="aspect-square bg-muted rounded-md relative overflow-hidden ring-1 ring-border hover:ring-2 hover:ring-destructive/40 transition-all duration-300 cursor-pointer group/img"
                >
                  <div className="absolute top-0 right-0 bg-destructive text-destructive-foreground text-[9px] font-bold px-1.5 py-0.5 rounded-bl-md z-10">
                    -{Math.floor(Math.random() * 30 + 10)}%
                  </div>
                  <img
                    src={`https://images.pexels.com/photos/${100000 + item}/pexels-photo-${100000 + item}.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop`}
                    alt={`Deal ${item}`}
                    className="w-full h-full object-cover opacity-90 group-hover/img:opacity-100 group-hover/img:scale-110 transition-all duration-500"
                  />
                </div>
              ))}
            </div>
          </PromoCard>

          <PromoCard
            title="Top Products"
            subtitle="Trending this month"
            icon={Package}
            iconColor="text-primary"
            bgColor="bg-primary/5"
            hoverBorder="hover:border-primary/30"
            onClick={() => navigate("/products")}
            buttonText="Browse Catalog"
            buttonColor="text-foreground"
          >
            <div className="space-y-3 mb-6 relative z-10">
              {[
                {
                  name: "Premium Cement 50kg",
                  cat: "Building Materials",
                  price: "12,000",
                  badge: "HOT",
                  badgeColor: "bg-orange-500/10 text-orange-600",
                },
                {
                  name: "Steel Rebar 12mm",
                  cat: "Structural Steel",
                  price: "8,500",
                  badge: "NEW",
                  badgeColor: "bg-blue-500/10 text-blue-600",
                },
                {
                  name: "Safety Helmet Pro",
                  cat: "Safety Equipment",
                  price: "15,000",
                  badge: "SALE",
                  badgeColor: "bg-green-500/10 text-green-600",
                },
              ].map((product, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 group/item cursor-pointer hover:bg-primary/5 p-2.5 rounded-md -mx-2.5 transition-all duration-300 hover:translate-x-1"
                >
                  <div className="w-12 h-12 bg-muted rounded-md overflow-hidden ring-1 ring-border group-hover/item:ring-2 group-hover/item:ring-primary/40 transition-all duration-300 flex-shrink-0">
                    <img
                      src={`https://images.pexels.com/photos/${200000 + i}/pexels-photo-${200000 + i}.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop`}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold truncate text-foreground mb-0.5">
                      {product.name}
                    </div>
                    <div className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">
                      {product.cat}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-bold text-primary mb-1">
                      RWF {product.price}
                    </div>
                    <div
                      className={cn(
                        "text-[9px] font-bold px-2 py-0.5 rounded-md inline-block",
                        product.badgeColor,
                      )}
                    >
                      {product.badge}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </PromoCard>

          <PromoCard
            title="Verified Suppliers"
            subtitle="Trusted partners"
            icon={Users}
            iconColor="text-success"
            bgColor="bg-success/5"
            hoverBorder="hover:border-success/30"
            badge={<div className="text-2xl font-bold text-success">2.5k+</div>}
            onClick={() => navigate("/suppliers")}
            buttonText="View Directory"
            buttonColor="text-foreground"
          >
            <div className="space-y-3 mb-6 relative z-10">
              {[
                { name: "Kigali Cement Co.", loc: "Kigali", rating: "4.9" },
                { name: "Rwanda Steel Works", loc: "Rubavu", rating: "4.8" },
                { name: "BuildFast Importers", loc: "Musanze", rating: "4.7" },
              ].map((supplier, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 group/item cursor-pointer hover:bg-success/5 p-2.5 rounded-md -mx-2.5 transition-all duration-300 hover:translate-x-1"
                >
                  <div className="w-12 h-12 bg-muted rounded-full overflow-hidden ring-2 ring-border group-hover/item:ring-success/40 transition-all duration-300 flex-shrink-0">
                    <img
                      src={`https://images.pexels.com/photos/${300000 + i}/pexels-photo-${300000 + i}.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop`}
                      alt={supplier.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold truncate text-foreground mb-0.5">
                      {supplier.name}
                    </div>
                    <div className="text-[11px] text-muted-foreground uppercase tracking-wide flex items-center gap-1 font-medium">
                      <MapPin className="w-3 h-3" /> {supplier.loc}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-1 rounded-md flex-shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span className="text-xs font-bold text-amber-700">
                      {supplier.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </PromoCard>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: Percent,
              label: "Bulk Discounts",
              sub: "Save more on large orders",
              val: "Up to 15%",
              color: "text-primary",
              bgColor: "bg-primary/5",
            },
            {
              icon: Truck,
              label: "Logistics Support",
              sub: "Reliable nationwide delivery",
              val: "24/7",
              color: "text-success",
              bgColor: "bg-success/5",
            },
            {
              icon: Shield,
              label: "Verified Only",
              sub: "100% vetted suppliers",
              val: <CheckCircle className="w-6 h-6" />,
              color: "text-info",
              bgColor: "bg-info/5",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-background border-2 border-border p-5 rounded-lg flex items-center justify-between group hover:border-foreground/20 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-3.5 flex-1">
                <div
                  className={cn(
                    "w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110",
                    item.bgColor,
                  )}
                >
                  <item.icon className={cn("w-5 h-5", item.color)} />
                </div>
                <div className="flex-1">
                  <span className="font-heading font-bold uppercase text-sm text-foreground block mb-1">
                    {item.label}
                  </span>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.sub}
                  </p>
                </div>
              </div>
              <div
                className={cn(
                  "text-xl font-heading font-bold opacity-30 group-hover:opacity-100 transition-all duration-300 ml-4",
                  item.color,
                )}
              >
                {item.val}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
