import React from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Star, MessageSquare, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TrendingProducts: React.FC = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Portland Cement 32.5N",
      category: "Building Materials",
      price: "12,500",
      unit: "per 50kg bag",
      rating: 4.8,
      district: "Nyarugenge",
      image: "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 2,
      name: "River Sand (Plastering)",
      category: "Aggregates",
      price: "25,000",
      unit: "per ton",
      rating: 4.5,
      district: "Gasabo",
      image: "https://images.pexels.com/photos/3316921/pexels-photo-3316921.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 3,
      name: "Excavator Rental (CAT 320)",
      category: "Heavy Machinery",
      price: "350,000",
      unit: "per day",
      rating: 5.0,
      district: "Kicukiro",
      image: "https://images.pexels.com/photos/10368549/pexels-photo-10368549.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 4,
      name: "Steel Rebar (Y12)",
      category: "Metals",
      price: "14,000",
      unit: "per piece (12m)",
      rating: 4.7,
      district: "Musanze",
      image: "https://images.pexels.com/photos/159293/steel-grid-reinforcement-construction-site-159293.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  return (
    <section className="bg-stone-50/50 py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <Badge variant="outline" className="mb-4 border-primary/20 text-primary">
              Trending Now
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground font-display leading-tight">
              Most Requested in Rwanda
            </h2>
          </div>
          <Button
            variant="ghost"
            className="hidden md:flex group text-primary hover:bg-primary/5 font-semibold h-12 rounded-xl"
            onClick={() => navigate("/products")}
          >
            Explore Marketplace
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-border/60 bg-card hover:border-primary/30 transition-all duration-300 flex flex-col h-full"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1 border border-stone-100">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  {product.rating}
                </div>
                <div className="absolute bottom-3 left-3 flex gap-1">
                  <Badge className="bg-black/60 backdrop-blur-sm border-none text-[10px] font-bold uppercase tracking-wider">
                    {product.category}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6 flex-grow">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-3">
                  <MapPin className="w-3 h-3 text-primary" />
                  {product.district}, Rwanda
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-primary">RWF {product.price}</span>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {product.unit}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button className="w-full rounded-xl h-11 font-bold group" variant="secondary">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message Provider
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Button
            variant="outline"
            className="w-full h-14 rounded-xl text-lg font-bold"
            onClick={() => navigate("/products")}
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
