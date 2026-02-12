import React from 'react';
import { categories } from '../data/mockData';
import * as Icons from 'lucide-react';

interface CategoryGridProps {
  onViewCategory?: (categoryId: string) => void;
  onViewAllCategories?: () => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onViewCategory, onViewAllCategories }) => {
  const getIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<any>;
    return IconComponent ? <IconComponent className="w-8 h-8" /> : <Icons.Package className="w-8 h-8" />;
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* African-inspired background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <pattern id="category-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M50,10 L90,50 L50,90 L10,50 Z" fill="currentColor" opacity="0.1"/>
              <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.1"/>
              <path d="M25,25 L75,75 M75,25 L25,75" stroke="currentColor" strokeWidth="1" opacity="0.05"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#category-pattern)" className="text-primary"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/10 to-amber-100 rounded-full text-sm font-medium text-primary border border-primary/20 mb-6">
            <Icons.Grid className="w-4 h-4 mr-2" />
            Product Categories
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Shop by 
            <span className="relative ml-3">
              <span className="bg-gradient-to-r from-primary via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Category
              </span>
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12">
                <path d="M5,6 Q100,1 195,6" stroke="url(#category-gradient)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="category-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--color-primary)"/>
                    <stop offset="50%" stopColor="var(--color-primary)"/>
                    <stop offset="100%" stopColor="var(--color-primary)"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover thousands of quality products from trusted suppliers across Africa. 
            Find exactly what you need to grow your business in every category.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group relative bg-gradient-to-br from-white via-primary/5 to-primary/10 rounded-3xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl cursor-pointer overflow-hidden transform hover:-translate-y-2"
              onClick={() => onViewCategory?.(category.id)}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* African-inspired background pattern for each card */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <svg viewBox="0 0 128 128" className="w-full h-full text-primary">
                  <pattern id={`card-pattern-${index}`} x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                    <polygon points="16,4 28,16 16,28 4,16" fill="currentColor" opacity="0.3"/>
                    <circle cx="16" cy="16" r="6" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
                  </pattern>
                  <rect width="128" height="128" fill={`url(#card-pattern-${index})`}/>
                </svg>
              </div>
              
              {/* Floating geometric decoration */}
              <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-br from-primary to-primary/60 rounded-full opacity-20 group-hover:scale-125 transition-transform duration-300"></div>
              <div className="absolute bottom-4 left-4 w-4 h-4 bg-gradient-to-br from-primary/60 to-primary/40 transform rotate-45 opacity-20 group-hover:rotate-90 transition-transform duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="relative">
                    <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-2xl text-white group-hover:scale-110 transition-all duration-300 shadow-lg">
                      {getIcon(category.icon)}
                    </div>
                    {/* Small decorative element */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                      <Icons.Check className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                      {category.productCount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">products</div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {category.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {category.subcategories.slice(0, 3).map((sub, subIndex) => (
                    <span
                      key={subIndex}
                      className="px-3 py-1.5 bg-gradient-to-r from-primary/10 to-primary/5 text-primary text-xs font-medium rounded-full border border-primary/20 hover:from-primary/20 hover:to-primary/10 transition-colors"
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

                <button className="w-full bg-white border-2 border-primary/20 text-primary py-4 rounded-2xl font-semibold hover:bg-gradient-to-r hover:from-primary hover:to-primary/90 hover:text-white hover:border-transparent transition-all duration-300 group-hover:translate-y-0 translate-y-1 shadow-sm hover:shadow-lg">
                  <span className="flex items-center justify-center">
                    Browse {category.name}
                    <Icons.ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={onViewAllCategories}
            className="group bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-primary/90 hover:via-primary hover:to-primary/90 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <span className="flex items-center justify-center">
              View All Categories
              <Icons.Grid className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
            </span>
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/30 to-amber-200 rounded-full opacity-20 transform -translate-x-16 translate-y-16"></div>
      <div className="absolute top-1/4 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 transform rotate-45 opacity-20 translate-x-12"></div>
    </section>
  );
};

export default CategoryGrid;