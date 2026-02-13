import React from "react";
import {
  Star,
  MapPin,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Heart,
  Award,
  Building,
  Settings,
  Wrench,
  HardHat,
  Hammer,
} from "lucide-react";
import { useWishlist } from "../hooks/useWishlist";

interface ConstructionSuppliersProps {
  onViewSupplier?: (supplierId: string) => void;
  onViewAllSuppliers?: () => void;
}

const ConstructionSuppliers: React.FC<ConstructionSuppliersProps> = ({
  onViewSupplier,
  onViewAllSuppliers,
}) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const constructionSuppliers = [
    {
      id: "const-1",
      name: "Lagos Heavy Equipment Co.",
      description:
        "Premier provider of construction equipment rental and heavy machinery across West Africa. Specializing in excavators, cranes, and bulldozers.",
      location: "Lagos, Nigeria",
      country: "Nigeria",
      avatar:
        "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      coverImage:
        "https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop",
      rating: 4.9,
      reviewCount: 89,
      verified: true,
      specialties: ["Heavy Equipment", "Excavators", "Construction Machinery"],
      services: {
        equipment: ["Excavators", "Bulldozers", "Cranes", "Loaders"],
        pricing: "From $350/day",
        availability: "24/7 Support",
        coverage: "West Africa",
        shipping: ["Site Delivery"],
        paymentMethods: ["Bank Transfer"],
        minimumOrder: "1 Day",
        deliveryTime: "24 Hours",
      },
      totalEquipment: 45,
      yearsExperience: 12,
      contact: {
        email: "info@lagosheavy.com",
        phone: "+234 123 456 7890",
        website: "www.lagosheavy.com",
      },
      totalProducts: 45,
      joinedDate: "2020-01-01",
    },
    {
      id: "const-2",
      name: "East Africa Construction Supplies",
      description:
        "Leading supplier of construction materials and equipment rental services. Quality cement, steel, and heavy machinery for all project sizes.",
      location: "Nairobi, Kenya",
      country: "Kenya",
      avatar:
        "https://images.pexels.com/photos/5625120/pexels-photo-5625120.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      coverImage:
        "https://images.pexels.com/photos/162539/architecture-building-construction-work-162539.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 134,
      verified: true,
      specialties: [
        "Construction Materials",
        "Equipment Rental",
        "Project Supplies",
      ],
      services: {
        equipment: ["Cranes", "Mixers", "Generators", "Tools"],
        pricing: "From $280/day",
        availability: "Same Day Delivery",
        coverage: "East Africa",
        shipping: ["Site Delivery"],
        paymentMethods: ["Mobile Money"],
        minimumOrder: "1 Day",
        deliveryTime: "Same Day",
      },
      totalEquipment: 67,
      yearsExperience: 15,
      contact: {
        email: "sales@eastafrica.com",
        phone: "+254 123 456 7890",
        website: "www.eastafrica.com",
      },
      totalProducts: 67,
      joinedDate: "2019-05-15",
    },
    {
      id: "const-3",
      name: "Cape Construction Solutions",
      description:
        "Comprehensive construction services provider offering equipment rental, materials supply, and project management across Southern Africa.",
      location: "Cape Town, South Africa",
      country: "South Africa",
      avatar:
        "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      coverImage:
        "https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop",
      rating: 4.8,
      reviewCount: 156,
      verified: true,
      specialties: [
        "Project Management",
        "Equipment Rental",
        "Material Supply",
      ],
      services: {
        equipment: ["Excavators", "Dump Trucks", "Compactors", "Scaffolding"],
        pricing: "From $420/day",
        availability: "Project Planning",
        coverage: "Southern Africa",
        shipping: ["Site Delivery"],
        paymentMethods: ["Bank Transfer"],
        minimumOrder: "1 Week",
        deliveryTime: "48 Hours",
      },
      totalEquipment: 89,
      yearsExperience: 18,
      contact: {
        email: "contact@capeconst.com",
        phone: "+27 123 456 7890",
        website: "www.capeconst.com",
      },
      totalProducts: 89,
      joinedDate: "2018-11-20",
    },
    {
      id: "const-4",
      name: "Sahara Construction Equipment",
      description:
        "Specialized in desert and challenging terrain construction equipment. Providing robust machinery for infrastructure projects across North Africa.",
      location: "Cairo, Egypt",
      country: "Egypt",
      avatar:
        "https://images.pexels.com/photos/5625135/pexels-photo-5625135.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      coverImage:
        "https://images.pexels.com/photos/162539/architecture-building-construction-work-162539.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop",
      rating: 4.6,
      reviewCount: 98,
      verified: true,
      specialties: ["Desert Construction", "Infrastructure", "Heavy Machinery"],
      services: {
        equipment: [
          "Desert Excavators",
          "Sand Movers",
          "Road Equipment",
          "Drilling Rigs",
        ],
        pricing: "From $380/day",
        availability: "Extreme Conditions",
        coverage: "North Africa",
        shipping: ["Specialized Transport"],
        paymentMethods: ["Bank Transfer"],
        minimumOrder: "3 Days",
        deliveryTime: "72 Hours",
      },
      totalEquipment: 52,
      yearsExperience: 14,
      contact: {
        email: "info@saharaconst.com",
        phone: "+20 123 456 7890",
        website: "www.saharaconst.com",
      },
      totalProducts: 52,
      joinedDate: "2021-03-10",
    },
  ];

  const stats = [
    {
      icon: Building,
      value: "150+",
      label: "Construction Suppliers",
      color: "from-primary to-primary/80",
    },
    {
      icon: Settings,
      value: "500+",
      label: "Equipment Available",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: MapPin,
      value: "25+",
      label: "Cities Covered",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Award,
      value: "99%",
      label: "Equipment Uptime",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-primary/20 text-white relative overflow-hidden">
      {/* Construction Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <pattern
              id="construction-pattern"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="10"
                y="10"
                width="60"
                height="60"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                opacity="0.3"
              />
              <path
                d="M20,20 L60,60 M60,20 L20,60"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.2"
              />
              <circle cx="40" cy="40" r="8" fill="currentColor" opacity="0.1" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#construction-pattern)"
            className="text-primary"
          />
        </svg>
      </div>

      {/* Floating Construction Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-primary/20 rounded-lg transform rotate-12 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-primary/20 rounded-full animate-bounce"></div>
      <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-primary/20 transform rotate-45 animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-8 py-4 bg-primary/20 backdrop-blur-sm rounded-full text-sm font-semibold text-primary border-2 border-primary/30 mb-8 shadow-lg">
            <HardHat className="w-5 h-5 mr-3" />
            <span className="bg-gradient-to-r from-primary/80 to-primary/60 bg-clip-text text-transparent">
              Construction Equipment & Services
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Build Africa
            </span>
            <span className="block text-white">with Trusted Partners</span>
          </h2>

          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            Connect with verified construction equipment suppliers and service
            providers across Africa. From heavy machinery rental to construction
            materials, find everything you need to build your projects.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4">
                  <div
                    className={`flex items-center justify-center w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Construction Suppliers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {constructionSuppliers.map((supplier, index) => (
            <div
              key={supplier.id}
              className="group relative bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/20 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl cursor-pointer transform hover:-translate-y-3"
              style={{
                animationDelay: `${index * 150}ms`,
              }}
              onClick={() => onViewSupplier?.(supplier.id)}
            >
              {/* Construction Equipment Background */}
              <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                <svg viewBox="0 0 96 96" className="w-full h-full text-primary">
                  <rect
                    x="10"
                    y="10"
                    width="76"
                    height="76"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M20,20 L76,76 M76,20 L20,76"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="12"
                    fill="currentColor"
                    opacity="0.3"
                  />
                </svg>
              </div>

              {/* Floating Decorations */}
              <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-br from-primary to-primary/60 rounded-full opacity-30 group-hover:scale-125 transition-transform duration-300"></div>
              <div className="absolute bottom-4 left-4 w-4 h-4 bg-gradient-to-br from-primary/60 to-primary/40 transform rotate-45 opacity-30 group-hover:rotate-90 transition-transform duration-300"></div>

              {/* Cover Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={supplier.coverImage}
                  alt={supplier.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                {/* Verified Badge */}
                {supplier.verified && (
                  <div className="absolute top-3 right-3 flex items-center bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </div>
                )}

                {/* Wishlist Button */}
                <div className="absolute top-3 left-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isInWishlist(supplier.id, "supplier")) {
                        removeFromWishlist(supplier.id, "supplier");
                      } else {
                        addToWishlist(supplier, "supplier");
                      }
                    }}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isInWishlist(supplier.id, "supplier")
                          ? "text-destructive fill-current"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                </div>

                {/* Avatar */}
                <div className="absolute -bottom-6 left-4">
                  <img
                    src={supplier.avatar}
                    alt={supplier.name}
                    className="w-12 h-12 rounded-full border-4 border-white object-cover shadow-lg"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 pt-8 px-6 pb-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">
                      {supplier.name}
                    </h3>
                    <div className="flex items-center text-gray-300 mb-2">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span className="text-sm">{supplier.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-warning fill-current mr-1" />
                      <span className="font-semibold text-white text-sm">
                        {supplier.rating}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {supplier.reviewCount} reviews
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {supplier.description}
                </p>

                {/* Equipment Types */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {supplier.services.equipment
                    .slice(0, 2)
                    .map((equipment, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/30 text-primary text-xs font-medium rounded-full border border-primary/30"
                      >
                        {equipment}
                      </span>
                    ))}
                  {supplier.services.equipment.length > 2 && (
                    <span className="px-2 py-1 bg-gray-500/30 text-gray-300 text-xs font-medium rounded-full border border-gray-400/30">
                      +{supplier.services.equipment.length - 2}
                    </span>
                  )}
                </div>

                {/* Service Info */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                  <div className="bg-white/10 rounded-lg p-2 text-center">
                    <div className="font-bold text-white">
                      {supplier.totalEquipment}
                    </div>
                    <div className="text-gray-300">Equipment</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-2 text-center">
                    <div className="font-bold text-white">
                      {supplier.yearsExperience}y
                    </div>
                    <div className="text-gray-300">Experience</div>
                  </div>
                </div>

                {/* Pricing & Action */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-lg font-bold text-primary">
                      {supplier.services.pricing}
                    </div>
                    <div className="text-xs text-gray-400">
                      {supplier.services.availability}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewSupplier?.(supplier.id);
                    }}
                    className="flex-1 bg-gradient-to-r from-primary to-primary/80 text-white py-3 rounded-xl font-semibold hover:from-primary/90 hover:to-primary/70 transition-colors flex items-center justify-center"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-3 border-2 border-primary/50 text-primary rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Service Categories */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Wrench,
              title: "Heavy Equipment Rental",
              description:
                "Excavators, bulldozers, cranes, and specialized construction machinery",
              features: [
                "Daily/Weekly/Monthly rates",
                "Operator training included",
                "Maintenance support",
                "24/7 breakdown service",
              ],
              color: "from-primary to-primary/80",
            },
            {
              icon: HardHat,
              title: "Construction Materials",
              description:
                "Quality cement, steel, aggregates, and building supplies",
              features: [
                "Bulk pricing available",
                "Quality certification",
                "Timely delivery",
                "Technical support",
              ],
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: Hammer,
              title: "Project Services",
              description:
                "Complete project management and specialized construction services",
              features: [
                "Project planning",
                "Site supervision",
                "Quality control",
                "Safety compliance",
              ],
              color: "from-green-500 to-emerald-500",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-primary/50 transition-all duration-300 hover:bg-white/15"
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl text-white mb-6 shadow-lg`}
              >
                <service.icon className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {service.title}
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-sm text-gray-300"
                  >
                    <CheckCircle className="w-4 h-4 text-success mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Construction Project?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Connect with verified construction suppliers and equipment
            providers. Get competitive quotes and reliable service for your next
            project.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={onViewAllSuppliers}
              className="group bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-primary hover:via-primary/80 hover:to-primary/70 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <span className="flex items-center justify-center">
                Browse All Suppliers
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-xl">
              Request Equipment Quote
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-16">
          <path
            d="M0,60 C300,20 600,100 900,60 C1000,40 1100,80 1200,60 L1200,120 L0,120 Z"
            fill="url(#construction-wave-gradient)"
            opacity="0.3"
          />
          <defs>
            <linearGradient
              id="construction-wave-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="50%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="var(--color-primary)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default ConstructionSuppliers;
