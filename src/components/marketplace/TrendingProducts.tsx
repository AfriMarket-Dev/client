import React from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { ArrowRight, Star, MapPin } from "lucide-react";
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
      image:
        "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 2,
      name: "River Sand (Plastering)",
      category: "Aggregates",
      price: "25,000",
      unit: "per ton",
      rating: 4.5,
      district: "Gasabo",
      image:
        "https://images.pexels.com/photos/3316921/pexels-photo-3316921.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 3,
      name: "Excavator Rental (CAT 320)",
      category: "Heavy Machinery",
      price: "350,000",
      unit: "per day",
      rating: 5.0,
      district: "Kicukiro",
      image:
        "https://images.pexels.com/photos/10368549/pexels-photo-10368549.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 4,
      name: "Steel Rebar (Y12)",
      category: "Metals",
      price: "14,000",
      unit: "per piece (12m)",
      rating: 4.7,
      district: "Musanze",
      image:
        "https://images.pexels.com/photos/159293/steel-grid-reinforcement-construction-site-159293.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b-2 border-border pb-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase text-foreground mb-2 text-balance">
            Trending Products
          </h2>
          <p className="text-muted-foreground text-lg font-medium">
            Most requested materials and equipment this week
          </p>
        </div>

        <Button
          variant="ghost"
          onClick={() => navigate("/products")}
          className="text-muted-foreground hover:bg-muted hover:text-foreground rounded font-bold uppercase tracking-wide hidden md:flex shadow-none"
        >
          View all products
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="group border-2 border-border shadow-none hover:border-primary/50 transition-all duration-200 rounded-sm overflow-hidden bg-card cursor-pointer"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <div className="relative aspect-4/3 overflow-hidden bg-muted border-b-2 border-border">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-0 right-0 bg-primary/95 text-primary-foreground px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-bl-sm">
                {product.category}
              </div>
            </div>

            <CardContent className="p-5">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                <MapPin className="w-3 h-3" />
                {product.district}
              </div>
              <h3 className="text-lg font-heading font-bold uppercase text-foreground mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-xl font-bold text-foreground">
                  RWF {product.price}
                </span>
              </div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                {product.unit}
              </p>
            </CardContent>

            <CardFooter className="px-5 py-4 flex items-center justify-between border-t border-border mt-auto">
              <div className="flex items-center gap-1 text-sm font-bold text-warning">
                <Star className="w-4 h-4 fill-warning" />
                <span className="text-foreground text-xs font-black">
                  {product.rating}
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20 bg-primary/5 px-2 py-1 rounded-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                View Specs
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 md:hidden">
        <Button
          variant="outline"
          className="w-full rounded-sm h-12 uppercase font-bold border-2 border-border shadow-none"
          onClick={() => navigate("/products")}
        >
          View all products
        </Button>
      </div>
    </div>
  );
};

export default TrendingProducts;
