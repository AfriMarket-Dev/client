import React, { useState } from "react";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  MapPin,
  MessageSquare,
  ArrowRight,
  Users,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import { suppliers } from "@/data/mockData";
import { useWishlist } from "@/hooks/useWishlist";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useNavigate } from "react-router-dom";

interface SupplierListingProps {
  onSupplierClick?: (supplierId: string) => void;
  initialSearchQuery?: string;
}

const SupplierListing: React.FC<SupplierListingProps> = ({
  onSupplierClick,
  initialSearchQuery = "",
}) => {
  const navigate = useNavigate();
  useWishlist();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredSuppliers = suppliers.filter((supplier) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      supplier.name.toLowerCase().includes(query) ||
      supplier.description.toLowerCase().includes(query) ||
      supplier.location.toLowerCase().includes(query);

    const matchesCategory =
      selectedCategory === "all" ||
      supplier.specialties.some((spec) => spec === selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* header */}
      <div className="bg-background border-b-2 border-border sticky top-0 z-30 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-2">
                <BadgeCheck className="w-4 h-4" />
                Verified Network
              </div>
              <h1 className="text-3xl font-heading font-bold uppercase text-foreground leading-tight tracking-wide">
                Construction Suppliers
              </h1>
              <p className="text-muted-foreground mt-2 text-sm">
                Direct access to Rwanda's reliable wholesalers and
                manufacturers.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-muted border border-border p-1 rounded-sm">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-none h-8 w-8"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-none h-8 w-8"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
              <Button
                variant="outline"
                className="rounded-sm border-2 border-border lg:hidden font-heading uppercase tracking-wider text-xs"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* filters sidebar */}
          <aside
            className={`lg:w-72 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="space-y-4 sticky top-28">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search suppliers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-11 pl-10 rounded-sm bg-background border-2 border-border uppercase placeholder:text-xs"
                />
              </div>

              <div>
                <h3 className="font-heading font-bold text-foreground mb-3 px-1 uppercase text-xs tracking-widest">
                  Specialties
                </h3>
                <div className="flex flex-col gap-1">
                  <Button
                    variant={selectedCategory === "all" ? "secondary" : "ghost"}
                    className="justify-start rounded-sm font-bold uppercase text-xs tracking-wider"
                    onClick={() => setSelectedCategory("all")}
                  >
                    All
                  </Button>
                  {[
                    "Cement",
                    "Steel",
                    "Heavy Machinery",
                    "Interior Finishing",
                  ].map((cat) => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? "secondary" : "ghost"}
                      className="justify-start rounded-sm font-semibold text-xs uppercase tracking-wide hover:text-primary"
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>

              <Card className="rounded-sm bg-foreground text-background border-none p-6 relative overflow-hidden">
                <div className="absolute inset-0 african-pattern opacity-10 invert" />
                <div className="relative z-10 text-center">
                  <div className="w-12 h-12 bg-background/10 rounded-sm flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-heading font-bold uppercase mb-2 tracking-wide">
                    Provider?
                  </h4>
                  <p className="text-background/70 text-xs leading-relaxed mb-6">
                    Join Rwanda's construction network.
                  </p>
                  <Button className="w-full h-11 rounded-sm font-heading font-bold uppercase tracking-wider bg-primary hover:bg-primary/90 text-xs">
                    Register
                  </Button>
                </div>
              </Card>
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-6">
              <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
                <span className="text-foreground font-bold">
                  {filteredSuppliers.length}
                </span>{" "}
                Verified Partners
              </p>
            </div>

            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {filteredSuppliers.map((supplier) => (
                <Card
                  key={supplier.id}
                  className="group border-2 border-border bg-card hover:border-primary transition-all duration-300 rounded-sm overflow-hidden flex flex-col shadow-none"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={supplier.coverImage}
                      alt={supplier.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-foreground/20" />

                    {supplier.verified && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-background/90 text-foreground border-none font-heading font-bold text-[10px] px-2.5 h-6 flex items-center gap-1.5 rounded-sm uppercase tracking-wider">
                          <ShieldCheck className="w-3 h-3 text-primary" />
                          Verified
                        </Badge>
                      </div>
                    )}

                    <div className="absolute -bottom-8 left-6">
                      <div className="relative">
                        <img
                          src={supplier.avatar}
                          alt={supplier.name}
                          className="w-16 h-16 rounded-sm border-4 border-background object-cover"
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-primary rounded-full border-4 border-background" />
                      </div>
                    </div>
                  </div>

                  <CardContent className="pt-10 px-6 pb-6 flex-grow flex flex-col">
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-3 gap-3">
                        <div>
                          <h3 className="text-xl font-heading font-bold uppercase text-foreground group-hover:text-primary transition-colors leading-tight mb-1 tracking-wide">
                            {supplier.name}
                          </h3>
                          <div className="flex items-center text-muted-foreground font-medium text-xs gap-1 uppercase tracking-wide">
                            <MapPin className="w-3 h-3 text-primary" />
                            {supplier.location}
                          </div>
                        </div>
                        <div className="flex items-center bg-muted px-2 py-1 rounded-sm border border-border shrink-0">
                          <Star className="w-3 h-3 text-warning mr-1" />
                          <span className="font-heading font-bold text-foreground text-xs">
                            {supplier.rating}
                          </span>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-5">
                        {supplier.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {supplier.specialties.map((specialty, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-muted text-muted-foreground text-[10px] font-bold border-none rounded-sm px-2 h-5 uppercase tracking-tight"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => onSupplierClick?.(supplier.id)}
                        className="flex-1 rounded-sm h-11 font-heading font-bold uppercase tracking-wider text-xs group/btn"
                      >
                        View Profile
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-0.5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-sm border-2 border-border h-11 w-11 text-primary hover:bg-primary/5"
                        onClick={() => navigate("/messages")}
                      >
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredSuppliers.length === 0 && (
              <div className="text-center py-20 bg-card rounded-sm border-2 border-border">
                <div className="w-16 h-16 bg-muted rounded-sm flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-heading font-bold uppercase text-foreground mb-2 tracking-wide">
                  No Suppliers Found
                </h3>
                <p className="text-muted-foreground max-w-sm mx-auto text-sm mb-6">
                  Try a different company name or specialty.
                </p>
                <Button
                  variant="outline"
                  className="rounded-sm border-2 border-border font-heading uppercase tracking-wider"
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierListing;
