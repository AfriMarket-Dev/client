import React, { useState } from "react";
import {
  ArrowLeft,
  Grid,
  List,
  Package,
  ArrowRight,
  Search,
  Building,
  MapPin,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { categories, suppliers, products } from "@/data/mockData";

import * as Icons from "lucide-react";

interface CategoriesPageProps {
  onBack: () => void;

  onSupplierClick?: (supplierId: string) => void;
}

const CategoriesPage: React.FC<CategoriesPageProps> = ({
  onBack,
  onSupplierClick,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const getIcon = (iconName: string) => {
    const IconComponent = Icons[
      iconName as keyof typeof Icons
    ] as React.ComponentType<any>;
    return IconComponent ? (
      <IconComponent className="w-8 h-8" />
    ) : (
      <Icons.Package className="w-8 h-8" />
    );
  };

  // Filter categories based on search
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.subcategories.some((sub) =>
        sub.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  // Get suppliers for selected category
  const getCategorySuppliersAndProducts = (categoryName: string) => {
    const categoryProducts = products.filter(
      (p) => p.category === categoryName,
    );
    const categorySuppliers = suppliers.filter(
      (s) =>
        s.specialties.includes(categoryName) ||
        categoryProducts.some((p) => p.supplierId === s.id),
    );
    return { suppliers: categorySuppliers, products: categoryProducts };
  };

  const selectedCategoryData = selectedCategory
    ? categories.find((c) => c.id === selectedCategory)
    : null;

  const categoryDetails = selectedCategoryData
    ? getCategorySuppliersAndProducts(selectedCategoryData.name)
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b-2 border-border sticky top-0 z-30 h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={onBack}
              className="group flex items-center text-foreground hover:text-primary mr-6 pl-0 hover:bg-transparent uppercase font-heading font-bold tracking-wider"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-heading font-bold uppercase text-foreground">
                {selectedCategory
                  ? selectedCategoryData?.name
                  : "All Categories"}
              </h1>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                {selectedCategory
                  ? `${categoryDetails?.suppliers.length || 0} SUPPLIERS • ${categoryDetails?.products.length || 0} PRODUCTS`
                  : `Browse ${categories.length} PRODUCT DIVISIONS`}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {!selectedCategory && (
              <div className="flex items-center bg-muted border border-border rounded-sm p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={`h-8 w-8 rounded-sm transition-colors ${
                    viewMode === "grid"
                      ? "bg-background text-primary shadow-sm border border-border"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={`h-8 w-8 rounded-sm transition-colors ${
                    viewMode === "list"
                      ? "bg-background text-primary shadow-sm border border-border"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            )}

            {selectedCategory && (
              <Button
                onClick={() => setSelectedCategory(null)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-bold uppercase tracking-wider rounded-sm"
              >
                View All Categories
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedCategory ? (
          <>
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none z-10" />
                <Input
                  type="text"
                  placeholder="SEARCH DIVISION..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 h-14 rounded-sm border-2 border-border focus:border-primary font-heading uppercase tracking-wider bg-card transition-colors"
                />
              </div>
            </div>

            {/* Categories Grid */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredCategories.map((category, index) => (
                <div
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="group relative bg-card p-6 border-2 border-border hover:border-primary transition-all duration-300 cursor-pointer overflow-hidden"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-primary/40 group-hover:border-primary transition-colors duration-300 pointer-events-none" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-primary/40 group-hover:border-primary transition-colors duration-300 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-primary/40 group-hover:border-primary transition-colors duration-300 pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-primary/40 group-hover:border-primary transition-colors duration-300 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="relative">
                        <div className="flex items-center justify-center w-16 h-16 bg-muted border border-border rounded-sm text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                          {getIcon(category.icon)}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-3xl font-heading font-bold text-primary">
                          {category.productCount.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
                          Units
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-heading font-bold uppercase text-foreground mb-3 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>

                    <p className="text-muted-foreground mb-6 leading-relaxed text-sm h-10 line-clamp-2">
                      {category.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {category.subcategories
                        .slice(0, 3)
                        .map((sub, subIndex) => (
                          <span
                            key={subIndex}
                            className="px-2 py-1 bg-muted text-muted-foreground text-xs font-bold uppercase tracking-wider rounded-sm border border-border"
                          >
                            {sub}
                          </span>
                        ))}
                      {category.subcategories.length > 3 && (
                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-bold uppercase tracking-wider rounded-sm border border-border">
                          +{category.subcategories.length - 3} more
                        </span>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-heading font-bold uppercase tracking-wider rounded-sm h-12 transition-all duration-300"
                    >
                      <span className="flex items-center justify-center">
                        Access Division
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredCategories.length === 0 && (
              <div className="text-center py-20 border-2 border-dashed border-border rounded-sm">
                <Package
                  className="w-16 h-16 text-muted-foreground mx-auto mb-6"
                  strokeWidth={1}
                />
                <h3 className="text-xl font-heading font-bold text-foreground mb-2 uppercase">
                  No divisions found
                </h3>
                <p className="text-muted-foreground">
                  Adjust your parameters to locate the correct sector.
                </p>
              </div>
            )}
          </>
        ) : (
          /* Category Details View */
          <div className="space-y-8">
            {/* Category Header */}
            <div className="bg-card border-l-4 border-primary p-8 shadow-sm">
              <div className="flex items-center space-x-6">
                <div className="flex items-center justify-center w-20 h-20 bg-muted border-2 border-border rounded-sm text-foreground">
                  {selectedCategoryData && getIcon(selectedCategoryData.icon)}
                </div>
                <div className="flex-1">
                  <h2 className="text-4xl font-heading font-bold uppercase text-foreground mb-2">
                    {selectedCategoryData?.name}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-4">
                    {selectedCategoryData?.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategoryData?.subcategories.map((sub, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-muted text-muted-foreground text-xs font-bold uppercase tracking-wider rounded-sm border border-border"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Suppliers in Category */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-heading font-bold uppercase text-foreground">
                  Active Suppliers ({categoryDetails?.suppliers.length || 0})
                </h3>
                <div className="h-px bg-border flex-1 ml-6"></div>
              </div>

              {categoryDetails?.suppliers &&
              categoryDetails.suppliers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryDetails.suppliers.map((supplier) => (
                    <div
                      key={supplier.id}
                      onClick={() => onSupplierClick?.(supplier.id)}
                      className="group bg-card border-2 border-border hover:border-primary transition-all duration-300 cursor-pointer overflow-hidden"
                    >
                      <div className="relative h-32 overflow-hidden border-b-2 border-border">
                        <img
                          src={supplier.coverImage}
                          alt={supplier.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-black/40"></div>
                        <div className="absolute -bottom-6 left-4">
                          <img
                            src={supplier.avatar}
                            alt={supplier.name}
                            className="w-12 h-12 rounded-sm border-2 border-white object-cover shadow-md"
                          />
                        </div>
                      </div>

                      <div className="pt-8 px-4 pb-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="text-lg font-heading font-bold uppercase text-foreground mb-1 group-hover:text-primary transition-colors">
                              {supplier.name}
                            </h4>
                            <div className="flex items-center text-muted-foreground mb-2">
                              <MapPin className="w-3 h-3 mr-1" />
                              <span className="text-xs font-bold uppercase tracking-wider">
                                {supplier.location}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center justify-end bg-muted px-2 py-1 rounded-sm">
                              <Star className="w-3 h-3 text-primary fill-current mr-1" />
                              <span className="font-bold text-foreground text-xs">
                                {supplier.rating}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 h-10">
                          {supplier.description}
                        </p>

                        <div className="grid grid-cols-3 gap-2 text-center border-t border-border pt-4">
                          <div>
                            <div className="font-heading font-bold text-foreground text-lg">
                              {supplier.totalProducts}
                            </div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                              Stock
                            </div>
                          </div>
                          <div>
                            <div className="font-heading font-bold text-foreground text-lg">
                              {supplier.services.minimumOrder}
                            </div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                              Min Order
                            </div>
                          </div>
                          <div>
                            <div className="font-heading font-bold text-foreground text-lg">
                              {supplier.rating}
                            </div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                              Rating
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-muted/20 border-2 border-dashed border-border rounded-sm">
                  <Building
                    className="w-16 h-16 text-muted-foreground mx-auto mb-6"
                    strokeWidth={1}
                  />
                  <h4 className="text-xl font-heading font-bold text-foreground mb-2 uppercase">
                    No suppliers deployed
                  </h4>
                  <p className="text-muted-foreground">
                    This sector currently has no active supply nodes.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
