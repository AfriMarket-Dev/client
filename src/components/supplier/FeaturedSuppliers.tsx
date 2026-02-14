import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { ArrowRight, Star, MapPin, CheckCircle } from "lucide-react";

const FeaturedSuppliers: React.FC = () => {
  const navigate = useNavigate();

  const suppliers = [
    {
      id: 1,
      name: "Kigali Building Supplies",
      category: "Building Materials",
      rating: 4.9,
      reviews: 127,
      district: "Gasabo",
      verified: true,
      logo: "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
    {
      id: 2,
      name: "Rwanda Heavy Equipment",
      category: "Machinery Rental",
      rating: 5.0,
      reviews: 84,
      district: "Kicukiro",
      verified: true,
      logo: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
    {
      id: 3,
      name: "East Africa Steel Ltd",
      category: "Metals & Steel",
      rating: 4.8,
      reviews: 156,
      district: "Nyarugenge",
      verified: true,
      logo: "https://images.pexels.com/photos/162568/steel-reinforcement-bar-rebar-162568.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
    {
      id: 4,
      name: "Modern Aggregates",
      category: "Sand & Gravel",
      rating: 4.7,
      reviews: 93,
      district: "Musanze",
      verified: true,
      logo: "https://images.pexels.com/photos/3316921/pexels-photo-3316921.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
  ];

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b-2 border-border pb-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase text-foreground mb-2">
            Featured Suppliers
          </h2>
          <p className="text-muted-foreground text-lg font-medium">
            Verified providers trusted by contractors
          </p>
        </div>

        <Button
          variant="ghost"
          onClick={() => navigate("/suppliers")}
          className="text-muted-foreground hover:bg-muted hover:text-foreground rounded font-bold uppercase tracking-wide hidden md:flex shadow-none"
        >
          View all suppliers
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {suppliers.map((supplier) => (
          <Card
            key={supplier.id}
            className="group border-2 border-border shadow-none hover:border-primary/50 transition-all duration-200 rounded-sm bg-card cursor-pointer relative overflow-hidden"
            onClick={() => navigate(`/suppliers/${supplier.id}`)}
          >
            <CardContent className="p-6 flex flex-col items-start text-left h-full">
              <div className="w-16 h-16 rounded-sm p-1 bg-muted/50 border-2 border-border mb-6 group-hover:border-primary transition-colors duration-200">
                <img
                  src={supplier.logo}
                  alt={supplier.name}
                  className="w-full h-full object-cover rounded-sm"
                />
              </div>

              <div className="mb-4 w-full">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-heading font-bold uppercase text-foreground leading-tight group-hover:text-primary transition-colors">
                    {supplier.name}
                  </h3>
                  {supplier.verified && (
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  )}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  {supplier.category}
                </p>

                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
                  <MapPin className="w-3 h-3" />
                  {supplier.district}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-border w-full mt-auto">
                <div className="flex items-center gap-1 text-warning">
                  <Star className="w-4 h-4 fill-warning" />
                  <span className="font-black text-foreground text-xs uppercase tracking-tighter">
                    {supplier.rating}
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                  ({supplier.reviews})
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 md:hidden">
        <Button
          variant="outline"
          className="w-full rounded-sm h-12 uppercase font-bold border-2 border-border shadow-none"
          onClick={() => navigate("/suppliers")}
        >
          View all suppliers
        </Button>
      </div>
    </div>
  );
};

export default FeaturedSuppliers;
