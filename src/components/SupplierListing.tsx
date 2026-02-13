import React, { useState } from "react";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  MapPin,
  MessageSquare,
  Heart,
  CheckCircle,
  ArrowRight,
  Users,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import { suppliers, products, categories as mockCategories } from "../data/mockData";
import { type Supplier } from "../types";
import { useWishlist } from "../hooks/useWishlist";
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
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
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
    <div className="min-h-screen bg-stone-50/50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-3">
                <BadgeCheck className="w-5 h-5" />
                Verified Network
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-stone-900 font-display leading-tight">
                Construction <br /> Suppliers in Rwanda
              </h1>
              <p className="text-stone-500 mt-4 text-xl font-medium max-w-xl">
                Direct access to Rwanda's most reliable wholesalers, manufacturers, and importers.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-stone-100 p-1.5 rounded-2xl">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-xl"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-5 h-5" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-xl"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-5 h-5" />
                </Button>
              </div>
              <Button
                variant="outline"
                className="rounded-2xl border-stone-200 h-12 lg:hidden px-6 font-bold"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Filters Sidebar */}
          <aside className={`lg:w-80 space-y-10 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="space-y-8 sticky top-28">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <Input
                  placeholder="Search by company or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 pl-11 rounded-2xl bg-white border-stone-200 shadow-sm focus:ring-primary/10"
                />
              </div>

              <div>
                <h3 className="font-black text-stone-900 mb-6 uppercase text-[10px] tracking-[0.2em] px-1">Specialties</h3>
                <div className="flex flex-col gap-1.5">
                  <Button
                    variant={selectedCategory === "all" ? "secondary" : "ghost"}
                    className="justify-start rounded-xl font-bold h-11"
                    onClick={() => setSelectedCategory("all")}
                  >
                    All Specialties
                  </Button>
                  {["Cement", "Steel", "Heavy Machinery", "Interior Finishing"].map((cat) => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? "secondary" : "ghost"}
                      className="justify-start rounded-xl font-bold h-11 text-stone-600"
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>

              <Card className="rounded-[2rem] bg-stone-900 text-white border-none p-8 relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 african-pattern opacity-10 invert pointer-events-none" />
                <div className="relative z-10 text-center">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
                    <ShieldCheck className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-black mb-2">Are you a provider?</h4>
                  <p className="text-stone-400 text-xs font-medium leading-relaxed mb-8">Join Rwanda's fastest growing construction network and list your inventory.</p>
                  <Button className="w-full h-12 rounded-xl font-black bg-primary hover:bg-primary/90">
                    Register Now
                  </Button>
                </div>
              </Card>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-10 flex items-center justify-between">
              <p className="text-stone-500 font-bold uppercase tracking-widest text-[10px]">
                Showing <span className="text-stone-900 font-black">{filteredSuppliers.length}</span> verified partners
              </p>
            </div>

            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 gap-10" 
              : "flex flex-col gap-8"
            }>
              {filteredSuppliers.map((supplier) => (
                <Card
                  key={supplier.id}
                  className={`group border-stone-200/60 bg-white hover:border-primary/30 transition-all duration-500 rounded-[2.5rem] overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:shadow-primary/5`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={supplier.coverImage}
                      alt={supplier.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-stone-900/10 transition-colors" />
                    
                    {supplier.verified && (
                      <div className="absolute top-6 right-6">
                        <Badge className="bg-white/95 text-stone-900 border-none backdrop-blur-md shadow-lg font-black text-[10px] px-3 h-7 flex items-center gap-1.5 rounded-full">
                          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                          VERIFIED
                        </Badge>
                      </div>
                    )}

                    <div className="absolute -bottom-10 left-8">
                      <div className="relative">
                        <img
                          src={supplier.avatar}
                          alt={supplier.name}
                          className="w-20 h-20 rounded-3xl border-[6px] border-white object-cover shadow-2xl"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow-lg" />
                      </div>
                    </div>
                  </div>

                  <CardContent className="pt-14 px-8 pb-8 flex-grow flex flex-col">
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-4 gap-4">
                        <div>
                          <h3 className="text-2xl font-black text-stone-900 group-hover:text-primary transition-colors leading-tight mb-1">
                            {supplier.name}
                          </h3>
                          <div className="flex items-center text-stone-400 font-bold text-xs gap-1">
                            <MapPin className="w-3.5 h-3.5 text-primary" />
                            {supplier.location}
                          </div>
                        </div>
                        <div className="flex items-center bg-amber-50 px-2 py-1 rounded-lg border border-amber-100 shrink-0">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 mr-1" />
                          <span className="font-black text-stone-900 text-xs">{supplier.rating}</span>
                        </div>
                      </div>

                      <p className="text-stone-500 text-sm font-medium leading-relaxed line-clamp-2 mb-6">
                        {supplier.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {supplier.specialties.map((specialty, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-stone-50 text-stone-500 text-[10px] font-black border-stone-100 rounded-lg px-2.5 h-6 uppercase tracking-tight"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={() => onSupplierClick?.(supplier.id)}
                        className="flex-1 rounded-2xl h-12 font-black shadow-lg shadow-primary/10 group/btn"
                      >
                        View Profile
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-2xl h-12 w-12 border-stone-200 text-primary hover:bg-primary/5 hover:border-primary/20 shadow-sm"
                        onClick={() => navigate("/messages")}
                      >
                        <MessageSquare className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredSuppliers.length === 0 && (
              <div className="text-center py-32 bg-white rounded-[3rem] border border-stone-100 shadow-sm">
                <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-stone-50">
                  <Users className="w-12 h-12 text-stone-200" />
                </div>
                <h3 className="text-3xl font-black text-stone-900 mb-2 font-display">
                  Supplier not found
                </h3>
                <p className="text-stone-500 font-medium max-w-sm mx-auto">
                  Try searching for a different company name or specialty.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-10 rounded-2xl h-12 px-8 font-black border-stone-200 shadow-sm"
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
