import React from "react";
import { useNavigate } from "react-router-dom";
// import { useGetCompaniesQuery } from "@/app/api/companies";
// import type { Company } from "@/app/api/companies";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Star, MapPin, CheckCircle } from "lucide-react";
import { SectionHeader } from "../home/SectionHeader";
import { mockCompanies } from "@/data/mockData";

const FeaturedSuppliers: React.FC = () => {
  const navigate = useNavigate();
  // const { data } = useGetCompaniesQuery({ limit: 6 });
  // const companies = data?.data ?? [];
  const companies = mockCompanies.slice(0, 6);

  return (
    <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
      <SectionHeader 
        title="Featured Suppliers"
        subtitle="Verified industry leaders trusted by contractors and developers."
        label="Verified Partners"
        icon={<CheckCircle className="w-5 h-5" />}
        viewAllHref="/suppliers"
        viewAllLabel="View all suppliers"
      />

      {companies.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-56 rounded-lg border border-border/40 bg-muted/20"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {companies.map((company) => {
            const rating = Number(company.averageRating ?? 0);
            return (
              <Card
                key={company.id}
                className="group border border-border/30 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 rounded-lg bg-card cursor-pointer relative overflow-hidden"
                onClick={() => navigate(`/suppliers/${company.id}`)}
              >
                <CardContent className="p-8 flex flex-col items-start text-left h-full">
                  <div className="w-16 h-16 rounded-lg p-1 bg-primary/5 border border-primary/10 mb-8 group-hover:border-primary/30 transition-all duration-300 flex items-center justify-center text-2xl font-bold text-primary">
                    {company.name?.charAt(0) ?? "?"}
                  </div>

                  <div className="mb-6 w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-heading font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                        {company.name}
                      </h3>
                    </div>
                    <p className="text-xs font-semibold text-primary/70 mb-4 tracking-wide uppercase">
                      {company.type}
                    </p>

                    {company.district && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
                        <MapPin className="w-3.5 h-3.5" />
                        {company.district}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 pt-6 border-t border-border/40 w-full mt-auto">
                    <div className="flex items-center gap-1.5 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-bold text-foreground text-sm font-sans">
                        {rating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground/70 font-medium font-sans">
                      ({company.reviewCount ?? 0} reviews)
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <div className="mt-12 md:hidden">
        <Button
          variant="outline"
          size="lg"
          className="w-full rounded-lg h-14 font-semibold border-border/60 shadow-none"
          onClick={() => navigate("/suppliers")}
        >
          View all suppliers
        </Button>
      </div>
    </div>
  );
};

export default FeaturedSuppliers;
