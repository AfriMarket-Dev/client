import data from "./data.json";

export const PriceType = {
  FIXED: "FIXED",
  NEGOTIABLE: "NEGOTIABLE",
  STARTS_AT: "STARTS_AT",
} as const;
export type PriceType = (typeof PriceType)[keyof typeof PriceType];

export const CompanyType = {
  MANUFACTURER: "MANUFACTURER",
  WHOLESALER: "WHOLESALER",
  RETAILER: "RETAILER",
  SERVICE_PROVIDER: "SERVICE_PROVIDER",
} as const;
export type CompanyType = (typeof CompanyType)[keyof typeof CompanyType];

export const mockCategories = data.categories;
export const mockCompanies = data.companies;
export const mockProducts = data.products;
export const mockServices = data.services;

const _mapProducts = () => {
  return mockProducts.map((p: any) => {
     const variant = p.variants?.[0];
     const categoryObj = mockCategories.find((c) => c.id === p.categoryId) || mockCategories[0];
     const companyObj = mockCompanies.find((c) => c.id === p.companyId) || mockCompanies[0];
     
     return {
        ...p,
        supplierId: p.companyId,
        images: variant?.images || [],
        category: categoryObj.name,
        subcategory: "General", // Default
        priceRange: {
           min: variant?.price || 0,
           max: variant?.price || 0,
           currency: "RWF"
        },
        minimumOrder: 1,
        availability: (variant?.stock && variant.stock > 0) ? "in-stock" : "out-of-stock",
        specifications: {},
        tags: [],
        bulkPricing: [],
        // Keep original fields for Listing compatibility
        company: {
            ...companyObj,
            slug: companyObj.name.toLowerCase().replace(/\s+/g, '-'),
            isVerified: true
        }, 
        variants: p.variants
     };
  });
};

const _mapServices = () => {
    return mockServices.map((s: any) => {
        const company = mockCompanies.find((c) => c.id === s.companyId) || mockCompanies[0];
        return {
          ...s,
          type: "SERVICE" as const,
          image: s.images?.[0] || "",
          icon: "Briefcase", // Placeholder or import from lucide? String for now
          totalRequests: 0,
          pendingRequests: 0,
          provider: {
              fullName: company.name,
              role: "Verified Supplier",
              rating: 4.8, // Default catch-all
              experience: "5 Years",
              phone: "+250 788 000 000",
              email: "info@example.com"
          },
          company: company as any, // Keep for other usages
        };
    });
};

export const products = _mapProducts();
export const services = _mapServices();
export const categories = mockCategories.map(c => ({
    ...c,
    icon: "Package", // Default icon name
    productCount: Math.floor(Math.random() * 100), // Random count
    subcategories: [] // Default empty
}));
export const suppliers = mockCompanies.map(c => ({
    ...c, 
    slug: c.name.toLowerCase().replace(/\s+/g, '-'),
    isVerified: true,
    rating: (c as any).averageRating || 4.5,
    location: (c as any).district || "Kigali",
    province: (c as any).province || "Kigali City",
    category: mockCategories.find(cat => cat.id === (c as any).categoryId) || mockCategories[0],
    avatar: `https://ui-avatars.com/api/?name=${c.name}&background=random`,
    coverImage: "https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    gallery: [],
    specialties: ["Construction", "Hardware"],
    contact: {
        email: "info@example.com",
        phone: "+250 788 000 000"
    },
    email: "info@example.com",
    phone: "+250 788 000 000",
    description: (c as any).description || "Leading supplier of quality goods in Rwanda.",
    logo: `https://ui-avatars.com/api/?name=${c.name}&background=random`,
    services: {
        shipping: ["Local Delivery"],
        paymentMethods: ["Mobile Money", "Bank Transfer"],
        minimumOrder: "5000 RWF",
        deliveryTime: "24h"
    },
    totalProducts: 100,
    joinedDate: (c as any).createdAt,
    verified: true,
    country: "Rwanda",
    isActive: true,
    sector: "Kicukiro",
    cell: "Niboye",
    village: "Nyakabanda"
}));
export const orders: any[] = [];
export const inquiries: any[] = [];

// For backward compatibility if needed
export const getMockProducts = () => products;
export const getMockServices = () => services;
