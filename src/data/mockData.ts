import { Supplier, Product, Category } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    icon: 'Smartphone',
    description: 'Mobile phones, computers, gadgets',
    productCount: 1250,
    subcategories: ['Mobile Phones', 'Computers', 'Audio Equipment', 'Cameras']
  },
  {
    id: '2',
    name: 'Fashion & Textiles',
    icon: 'Shirt',
    description: 'Clothing, accessories, fabrics',
    productCount: 890,
    subcategories: ['Women\'s Clothing', 'Men\'s Clothing', 'Accessories', 'Fabrics']
  },
  {
    id: '3',
    name: 'Home & Garden',
    icon: 'Home',
    description: 'Furniture, appliances, decor',
    productCount: 650,
    subcategories: ['Furniture', 'Kitchen Appliances', 'Garden Tools', 'Home Decor']
  },
  {
    id: '4',
    name: 'Beauty & Health',
    icon: 'Heart',
    description: 'Cosmetics, skincare, wellness',
    productCount: 420,
    subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Health Products']
  },
  {
    id: '5',
    name: 'Automotive',
    icon: 'Car',
    description: 'Auto parts, accessories, tools',
    productCount: 380,
    subcategories: ['Car Parts', 'Accessories', 'Tools', 'Maintenance']
  },
  {
    id: '6',
    name: 'Industrial Equipment',
    icon: 'Settings',
    description: 'Machinery, tools, industrial supplies',
    productCount: 290,
    subcategories: ['Machinery', 'Power Tools', 'Safety Equipment', 'Raw Materials']
  }
];

export const suppliers: Supplier[] = [
  {
    id: '1',
    name: 'AfroTech Imports',
    description: 'Leading importer of electronics and technology products from Asia. Specializing in mobile devices, computers, and smart home solutions.',
    location: 'Lagos, Nigeria',
    country: 'Nigeria',
    avatar: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    coverImage: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop',
    rating: 4.8,
    reviewCount: 156,
    verified: true,
    specialties: ['Electronics', 'Mobile Phones', 'Computers'],
    contact: {
      email: 'info@afrotechimports.com',
      phone: '+234-809-123-4567',
      whatsapp: '+234-809-123-4567'
    },
    services: {
      shipping: ['Express Delivery', 'Standard Shipping', 'Bulk Shipping'],
      paymentMethods: ['Bank Transfer', 'Letters of Credit', 'PayPal'],
      minimumOrder: '$2,000',
      deliveryTime: '7-14 days'
    },
    totalProducts: 245,
    joinedDate: '2021-03-15'
  },
  {
    id: '2',
    name: 'Sahara Fashion Hub',
    description: 'Premium fashion and textile wholesaler importing from India, Turkey, and China. Quality fabrics and trendy clothing for retailers.',
    location: 'Accra, Ghana',
    country: 'Ghana',
    avatar: 'https://images.pexels.com/photos/5625120/pexels-photo-5625120.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    coverImage: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop',
    rating: 4.6,
    reviewCount: 89,
    verified: true,
    specialties: ['Fashion', 'Textiles', 'Accessories'],
    contact: {
      email: 'orders@saharafashion.com',
      phone: '+233-24-567-8901',
      whatsapp: '+233-24-567-8901'
    },
    services: {
      shipping: ['Air Freight', 'Sea Freight', 'Door-to-Door'],
      paymentMethods: ['Bank Transfer', 'Western Union', 'Cryptocurrency'],
      minimumOrder: '$1,500',
      deliveryTime: '10-21 days'
    },
    totalProducts: 189,
    joinedDate: '2020-11-20'
  },
  {
    id: '3',
    name: 'Kigali Home Solutions',
    description: 'Comprehensive home and garden supplier offering furniture, appliances, and decor items from various international markets.',
    location: 'Kigali, Rwanda',
    country: 'Rwanda',
    avatar: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    coverImage: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop',
    rating: 4.7,
    reviewCount: 112,
    verified: true,
    specialties: ['Home & Garden', 'Furniture', 'Appliances'],
    contact: {
      email: 'info@kigalihome.rw',
      phone: '+250-78-901-2345',
      whatsapp: '+250-78-901-2345'
    },
    services: {
      shipping: ['Standard Delivery', 'Express Shipping', 'Installation Service'],
      paymentMethods: ['Bank Transfer', 'Mobile Money', 'Cash on Delivery'],
      minimumOrder: '$1,000',
      deliveryTime: '5-12 days'
    },
    totalProducts: 167,
    joinedDate: '2022-01-10'
  },
  {
    id: '4',
    name: 'Cape Beauty Distributors',
    description: 'Exclusive distributor of premium beauty and health products from South Korea, Japan, and Europe. Serving salons and retailers.',
    location: 'Cape Town, South Africa',
    country: 'South Africa',
    avatar: 'https://images.pexels.com/photos/5625135/pexels-photo-5625135.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    coverImage: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop',
    rating: 4.9,
    reviewCount: 203,
    verified: true,
    specialties: ['Beauty', 'Health', 'Cosmetics'],
    contact: {
      email: 'sales@capebeauty.co.za',
      phone: '+27-21-456-7890',
      whatsapp: '+27-21-456-7890'
    },
    services: {
      shipping: ['Same Day (Local)', 'Next Day', 'Standard'],
      paymentMethods: ['EFT', 'Credit Card', 'PayFast'],
      minimumOrder: '$800',
      deliveryTime: '2-7 days'
    },
    totalProducts: 134,
    joinedDate: '2021-08-05'
  }
];

export const products: Product[] = [
  {
    id: '1',
    supplierId: '1',
    name: 'Samsung Galaxy A54 5G (Bulk Pack)',
    description: 'Latest Samsung Galaxy A54 5G smartphones in bulk packaging. Perfect for retailers looking to stock premium mid-range devices with excellent camera quality and 5G connectivity.',
    images: [
      'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1482476/pexels-photo-1482476.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    category: 'Electronics',
    subcategory: 'Mobile Phones',
    priceRange: {
      min: 280,
      max: 320,
      currency: 'USD'
    },
    bulkPricing: [
      { quantity: 10, price: 310 },
      { quantity: 50, price: 295 },
      { quantity: 100, price: 280 }
    ],
    minimumOrder: 10,
    availability: 'in-stock',
    specifications: {
      'Screen Size': '6.4 inches',
      'Storage': '128GB/256GB',
      'RAM': '6GB/8GB',
      'Camera': '50MP Triple Camera',
      'Battery': '5000mAh',
      'OS': 'Android 13',
      'Connectivity': '5G, WiFi 6'
    },
    tags: ['5G', 'Android', 'Samsung', 'Smartphone', 'Bulk']
  },
  {
    id: '2',
    supplierId: '2',
    name: 'Premium Cotton Ankara Fabric Rolls',
    description: 'High-quality 100% cotton Ankara fabric rolls imported from West Africa. Perfect for fashion designers and tailors creating authentic African-inspired clothing.',
    images: [
      'https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/8313205/pexels-photo-8313205.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    category: 'Fashion & Textiles',
    subcategory: 'Fabrics',
    priceRange: {
      min: 8,
      max: 15,
      currency: 'USD'
    },
    bulkPricing: [
      { quantity: 50, price: 12 },
      { quantity: 100, price: 10 },
      { quantity: 500, price: 8 }
    ],
    minimumOrder: 50,
    availability: 'in-stock',
    specifications: {
      'Material': '100% Cotton',
      'Width': '46 inches',
      'Length': '6 yards per piece',
      'Weight': '120 GSM',
      'Care': 'Machine Washable',
      'Origin': 'West Africa',
      'Pattern': 'Traditional Ankara'
    },
    tags: ['Ankara', 'Cotton', 'African Print', 'Fabric', 'Traditional']
  },
  {
    id: '3',
    supplierId: '3',
    name: 'Modern Living Room Furniture Set',
    description: 'Complete modern living room furniture set including sofa, coffee table, and side tables. Perfect for hotels, offices, and residential spaces.',
    images: [
      'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    category: 'Home & Garden',
    subcategory: 'Furniture',
    priceRange: {
      min: 800,
      max: 1200,
      currency: 'USD'
    },
    bulkPricing: [
      { quantity: 5, price: 1100 },
      { quantity: 10, price: 950 },
      { quantity: 20, price: 800 }
    ],
    minimumOrder: 5,
    availability: 'in-stock',
    specifications: {
      'Material': 'Solid Wood Frame',
      'Upholstery': 'Premium Fabric',
      'Sofa Dimensions': '200cm x 90cm x 85cm',
      'Coffee Table': '120cm x 60cm x 45cm',
      'Side Tables': '50cm x 50cm x 55cm',
      'Color Options': 'Gray, Beige, Navy',
      'Assembly': 'Required'
    },
    tags: ['Furniture', 'Living Room', 'Modern', 'Set', 'Wholesale']
  },
  {
    id: '4',
    supplierId: '4',
    name: 'Korean Skincare Bundle Pack',
    description: 'Premium Korean skincare products bundle including cleanser, toner, serum, and moisturizer. Perfect for beauty retailers and salons.',
    images: [
      'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    category: 'Beauty & Health',
    subcategory: 'Skincare',
    priceRange: {
      min: 45,
      max: 65,
      currency: 'USD'
    },
    bulkPricing: [
      { quantity: 20, price: 60 },
      { quantity: 50, price: 52 },
      { quantity: 100, price: 45 }
    ],
    minimumOrder: 20,
    availability: 'in-stock',
    specifications: {
      'Products Included': '4 items',
      'Cleanser': '150ml',
      'Toner': '200ml',
      'Serum': '30ml',
      'Moisturizer': '50ml',
      'Skin Type': 'All skin types',
      'Origin': 'South Korea',
      'Certification': 'K-Beauty Certified'
    },
    tags: ['Korean', 'Skincare', 'Bundle', 'Beauty', 'K-Beauty']
  },
  {
    id: '5',
    supplierId: '1',
    name: 'Wireless Bluetooth Earbuds (Bulk)',
    description: 'High-quality wireless Bluetooth earbuds with noise cancellation and long battery life. Perfect for electronics retailers.',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    category: 'Electronics',
    subcategory: 'Audio Equipment',
    priceRange: {
      min: 25,
      max: 45,
      currency: 'USD'
    },
    bulkPricing: [
      { quantity: 50, price: 40 },
      { quantity: 100, price: 32 },
      { quantity: 500, price: 25 }
    ],
    minimumOrder: 50,
    availability: 'in-stock',
    specifications: {
      'Battery Life': '6 hours + 24h case',
      'Connectivity': 'Bluetooth 5.0',
      'Water Resistance': 'IPX4',
      'Noise Cancellation': 'Active',
      'Charging': 'USB-C',
      'Colors': 'Black, White, Blue',
      'Warranty': '1 Year'
    },
    tags: ['Bluetooth', 'Earbuds', 'Wireless', 'Audio', 'Electronics']
  },
  {
    id: '6',
    supplierId: '2',
    name: 'African Print Dress Collection',
    description: 'Beautiful collection of African print dresses in various sizes and patterns. Perfect for fashion retailers targeting African fashion market.',
    images: [
      'https://images.pexels.com/photos/9558618/pexels-photo-9558618.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/9558619/pexels-photo-9558619.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    category: 'Fashion & Textiles',
    subcategory: 'Women\'s Clothing',
    priceRange: {
      min: 35,
      max: 55,
      currency: 'USD'
    },
    bulkPricing: [
      { quantity: 20, price: 50 },
      { quantity: 50, price: 42 },
      { quantity: 100, price: 35 }
    ],
    minimumOrder: 20,
    availability: 'in-stock',
    specifications: {
      'Sizes': 'S, M, L, XL, XXL',
      'Material': '100% Cotton',
      'Patterns': '10 different designs',
      'Length': 'Midi and Maxi options',
      'Care': 'Machine wash cold',
      'Origin': 'Ghana',
      'Style': 'Traditional African'
    },
    tags: ['African Print', 'Dresses', 'Fashion', 'Women', 'Traditional']
  }
];