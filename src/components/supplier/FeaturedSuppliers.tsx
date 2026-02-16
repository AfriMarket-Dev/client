import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { ArrowRight, Star, MapPin, CheckCircle } from "lucide-react";
import { useGetCompaniesQuery } from "@/app/api/companies";
import type { Company } from "@/app/api/companies";

const FeaturedSuppliers: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useGetCompaniesQuery({ limit: 6 });
  const companies = data?.data ?? [];

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b-2 border-border pb-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase text-foreground mb-2">
            Featured Suppliers
          </h2>
          <p className="text-muted-foreground text-lg font-medium">
            Verified providers trusted by contractors
          </p>
        </div>

        <Button
          variant="ghost"
          onClick={() => navigate("/suppliers")}
          className="text-muted-foreground hover:bg-muted hover:text-foreground rounded font-bold uppercase tracking-wide hidden md:flex shadow-none"
        >
          View all suppliers
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>

      {companies.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-48 rounded-sm border border-border bg-muted/30 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {companies.map((company: Company) => {
            const categoryName = (company.category as { name?: string })?.name;
            const rating = Number(company.averageRating ?? 0);
            return (
              <Card
                key={company.id}
                className="group border border-border shadow-none hover:border-primary/50 transition-all duration-200 rounded-sm bg-card cursor-pointer relative overflow-hidden"
                onClick={() => navigate(`/suppliers/${company.id}`)}
              >
                <CardContent className="p-6 flex flex-col items-start text-left h-full">
                  <div className="w-16 h-16 rounded-sm p-1 bg-muted/50 border border-border mb-6 group-hover:border-primary transition-colors duration-200 flex items-center justify-center text-2xl font-bold text-muted-foreground">
                    {company.name?.charAt(0) ?? "?"}
                  </div>

                  <div className="mb-4 w-full">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-heading font-bold uppercase text-foreground leading-tight group-hover:text-primary transition-colors">
                        {company.name}
                      </h3>
                      {company.isVerified && (
                        <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      )}
                    </div>
                    {categoryName && (
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                        {categoryName}
                      </p>
                    )}

                    {company.district && (
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
                        <MapPin className="w-3 h-3" />
                        {company.district}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-border w-full mt-auto">
                    <div className="flex items-center gap-1 text-warning">
                      <Star className="w-4 h-4 fill-warning" />
                      <span className="font-bold text-foreground text-xs uppercase tracking-tighter">
                        {rating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                      ({company.reviewCount ?? 0})
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
          className="w-full rounded-sm h-12 uppercase font-bold border border-border shadow-none"
          onClick={() => navigate("/suppliers")}
        >
          View all suppliers
        </Button>
      </div>
    </div>
  );
};

export default FeaturedSuppliers;
