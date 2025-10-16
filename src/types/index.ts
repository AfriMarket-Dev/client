export interface Supplier {
  id: string;
  name: string;
  description: string;
  location: string;
  country: string;
  avatar: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  specialties: string[];
  contact: {
    email: string;
    phone: string;
    whatsapp?: string;
  };
  services: {
    shipping: string[];
    paymentMethods: string[];
    minimumOrder: string;
    deliveryTime: string;
  };
  totalProducts: number;
  joinedDate: string;
}

export interface Product {
  id: string;
  supplierId: string;
  name: string;
  description: string;
  images: string[];
  category: string;
  subcategory: string;
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  bulkPricing: {
    quantity: number;
    price: number;
  }[];
  minimumOrder: number;
  availability: 'in-stock' | 'pre-order' | 'out-of-stock';
  specifications: Record<string, string>;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  productCount: number;
  subcategories: string[];
}

export interface SearchFilters {
  query: string;
  category: string;
  location: string;
  priceRange: {
    min: number;
    max: number;
  };
  services: string[];
  verified: boolean;
}