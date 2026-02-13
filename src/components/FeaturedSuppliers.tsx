import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { suppliers } from "@/data/mockData";
import { MapPin, Star, ShieldCheck, ArrowRight } from "lucide-react";

const FeaturedSuppliers: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-white relative overflow-hidden section-divider">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-orange-600 font-semibold tracking-wide uppercase text-sm mb-2 block">
              Verified Partners
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4 leading-tight">
              Connect with Trusted <br /> Manufacturers & Wholesalers
            </h2>
            <p className="text-stone-500 text-lg">
              Every supplier on AfrikaMarket is vetted for business legitimacy,
              product quality, and reliable delivery.
            </p>
          </div>
          <Button
            className="bg-stone-900 text-white hover:bg-stone-800"
            onClick={() => navigate("/suppliers")}
          >
            Browse All Suppliers
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {suppliers.slice(0, 3).map((supplier) => (
            <div
              key={supplier.id}
              className="group bg-white rounded-xl border border-stone-100 hover:border-orange-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
              onClick={() => navigate(`/suppliers/${supplier.id}`)}
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={supplier.avatar}
                      alt={supplier.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-stone-100 group-hover:border-orange-200 transition-colors"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-stone-900 group-hover:text-orange-600 transition-colors">
                        {supplier.name}
                      </h3>
                      <div className="flex items-center text-sm text-stone-500 mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {supplier.location}
                      </div>
                    </div>
                  </div>
                  {supplier.verified && (
                    <div
                      className="bg-orange-50 text-orange-600 p-1.5 rounded-full"
                      title="Verified Supplier"
                    >
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6 flex-grow">
                  <p className="text-stone-600 text-sm line-clamp-2">
                    {supplier.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {supplier.specialties.slice(0, 3).map((specialty, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium px-2 py-1 bg-stone-50 text-stone-600 rounded-md border border-stone-100"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-auto">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                    <span className="font-bold text-stone-900">
                      {supplier.rating}
                    </span>
                    <span className="text-stone-400 text-sm">/ 5.0</span>
                  </div>
                  <span className="text-sm font-medium text-orange-600 group-hover:translate-x-1 transition-transform inline-flex items-center">
                    View Profile
                    <ArrowRight className="ml-1 w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSuppliers;
