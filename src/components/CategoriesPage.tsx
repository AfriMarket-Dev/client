import React, { useState } from 'react';
import { ArrowLeft, Grid, List, Package, ArrowRight, Search, Building, MapPin, Star } from 'lucide-react';
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { categories, suppliers, products } from '../data/mockData';

import * as Icons from 'lucide-react';

interface CategoriesPageProps {
  onBack: () => void;

  onSupplierClick?: (supplierId: string) => void;
}

const CategoriesPage: React.FC<CategoriesPageProps> = ({ onBack, onSupplierClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const getIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<any>;
    return IconComponent ? <IconComponent className="w-8 h-8" /> : <Icons.Package className="w-8 h-8" />;
  };

  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.subcategories.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Get suppliers for selected category
  const getCategorySuppliersAndProducts = (categoryName: string) => {
    const categoryProducts = products.filter(p => p.category === categoryName);
    const categorySuppliers = suppliers.filter(s => 
      s.specialties.includes(categoryName) || 
      categoryProducts.some(p => p.supplierId === s.id)
    );
    return { suppliers: categorySuppliers, products: categoryProducts };
  };

  const selectedCategoryData = selectedCategory ? 
    categories.find(c => c.id === selectedCategory) : null;
  
  const categoryDetails = selectedCategoryData ? 
    getCategorySuppliersAndProducts(selectedCategoryData.name) : null;

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Header */}
      <div className="bg-background border-b border-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={onBack}
                className="flex items-center text-muted-foreground hover:text-primary mr-4 pl-0 hover:bg-transparent"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  {selectedCategory ? selectedCategoryData?.name : 'All Categories'}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {selectedCategory 
                    ? `${categoryDetails?.suppliers.length || 0} suppliers • ${categoryDetails?.products.length || 0} products`
                    : `Browse ${categories.length} product categories`
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {!selectedCategory && (
                <div className="flex items-center bg-muted rounded-lg p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    className={`h-8 w-8 rounded-md transition-colors ${
                      viewMode === 'grid' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setViewMode('list')}
                    className={`h-8 w-8 rounded-md transition-colors ${
                      viewMode === 'list' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              )}
              
              {selectedCategory && (
                <Button
                  onClick={() => setSelectedCategory(null)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  View All Categories
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedCategory ? (
          <>
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none z-10" />
                <Input
                  type="text"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-6 rounded-xl"
                />
              </div>
            </div>

            {/* Categories Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredCategories.map((category, index) => (
                <div
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="group relative bg-gradient-to-br from-white via-primary/5 to-primary/10 rounded-3xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl cursor-pointer overflow-hidden transform hover:-translate-y-2"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                    <svg viewBox="0 0 128 128" className="w-full h-full text-primary">
                      <pattern id={`category-pattern-${index}`} x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                        <polygon points="16,4 28,16 16,28 4,16" fill="currentColor" opacity="0.3"/>
                        <circle cx="16" cy="16" r="6" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
                      </pattern>
                      <rect width="128" height="128" fill={`url(#category-pattern-${index})`}/>
                    </svg>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-br from-primary to-primary/60 rounded-full opacity-20 group-hover:scale-125 transition-transform duration-300"></div>
                  <div className="absolute bottom-4 left-4 w-4 h-4 bg-gradient-to-br from-primary/60 to-primary/40 transform rotate-45 opacity-20 group-hover:rotate-90 transition-transform duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="relative">
                        <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-2xl text-white group-hover:scale-110 transition-all duration-300 shadow-lg">
                          {getIcon(category.icon)}
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                          <Package className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                          {category.productCount.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500 font-medium">products</div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {category.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {category.subcategories.slice(0, 3).map((sub, subIndex) => (
                        <span
                          key={subIndex}
                          className="px-3 py-1.5 bg-gradient-to-r from-primary/10 to-primary/5 text-primary text-xs font-medium rounded-full border border-primary/20"
                        >
                          {sub}
                        </span>
                      ))}
                      {category.subcategories.length > 3 && (
                        <span className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full border border-gray-200">
                          +{category.subcategories.length - 3} more
                        </span>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-2 border-primary/20 text-primary bg-white hover:bg-gradient-to-r hover:from-primary hover:to-primary/90 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-lg py-6 h-auto rounded-2xl"
                    >
                      <span className="flex items-center justify-center">
                        Explore {category.name}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
                <p className="text-gray-600">Try adjusting your search terms</p>
              </div>
            )}
          </>
        ) : (
          /* Category Details View */
          <div className="space-y-8">
            {/* Category Header */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-8 border border-primary/20">
              <div className="flex items-center space-x-6">
                <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-2xl text-white shadow-lg">
                  {selectedCategoryData && getIcon(selectedCategoryData.icon)}
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedCategoryData?.name}</h2>
                  <p className="text-gray-600 text-lg mb-4">{selectedCategoryData?.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategoryData?.subcategories.map((sub, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-gradient-to-r from-primary/10 to-primary/5 text-primary text-sm font-medium rounded-full border border-primary/20"
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
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Suppliers in {selectedCategoryData?.name} ({categoryDetails?.suppliers.length || 0})
              </h3>
              
              {categoryDetails?.suppliers && categoryDetails.suppliers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryDetails.suppliers.map(supplier => (
                    <div
                      key={supplier.id}
                      onClick={() => onSupplierClick?.(supplier.id)}
                      className="bg-card rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
                    >
                      <div className="relative h-32 overflow-hidden">
                        <img
                          src={supplier.coverImage}
                          alt={supplier.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute -bottom-6 left-4">
                          <img
                            src={supplier.avatar}
                            alt={supplier.name}
                            className="w-12 h-12 rounded-full border-4 border-white object-cover"
                          />
                        </div>
                      </div>

                      <div className="pt-8 px-4 pb-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                              {supplier.name}
                            </h4>
                            <div className="flex items-center text-muted-foreground mb-2">
                              <MapPin className="w-3 h-3 mr-1" />
                              <span className="text-sm">{supplier.location}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center">
                              <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                              <span className="font-semibold text-foreground text-sm">{supplier.rating}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {supplier.description}
                        </p>

                        <div className="grid grid-cols-3 gap-3 text-center text-xs">
                          <div>
                            <div className="font-bold text-foreground">{supplier.totalProducts}</div>
                            <div className="text-muted-foreground">Products</div>
                          </div>
                          <div>
                            <div className="font-bold text-foreground">{supplier.services.minimumOrder}</div>
                            <div className="text-muted-foreground">Min Order</div>
                          </div>
                          <div>
                            <div className="font-bold text-foreground">{supplier.rating}</div>
                            <div className="text-muted-foreground">Rating</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-card rounded-2xl">
                  <Building className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-foreground mb-2">No suppliers found</h4>
                  <p className="text-muted-foreground">No suppliers currently available in this category</p>
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