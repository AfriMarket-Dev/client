import { useState, useCallback } from "react";
import { Search, Edit, Trash2, Eye, Star, Mail, Phone } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { services as mockServices } from "@/data/mock-data";
import { AdminPageHeader, AdminCard } from "@/components/admin";

export default function AdminServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleNavigateToService = useCallback(
    (serviceId: string) => {
      navigate({ to: `/admin/services/${serviceId}` as any });
    },
    [navigate],
  );

  const filteredServices = mockServices.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6 pb-12">
      <AdminPageHeader
        title="Services"
        subtitle="Professional services on platform"
      />

      {/* search */}
      <AdminCard noPadding>
        <div className="p-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-3 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              placeholder="SEARCH SERVICES..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary uppercase text-sm tracking-wider placeholder:text-muted-foreground/60 h-11 bg-background"
            />
          </div>
        </div>
      </AdminCard>

      {/* services grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => {
          const IconComponent = service.icon;
          return (
            <AdminCard key={service.id} noPadding className="hover:border-primary transition-colors flex flex-col">
              {/* image */}
              <div className="relative h-40 overflow-hidden bg-muted">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>

              {/* content */}
              <div className="p-4 flex-1 flex flex-col space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-primary/10 rounded-sm shrink-0 border border-primary/20">
                    <IconComponent size={20} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-heading font-bold uppercase tracking-wide text-foreground line-clamp-1">
                      {service.name}
                    </h3>
                    <p className="text-[10px] text-muted-foreground line-clamp-2 mt-1 uppercase tracking-wider font-medium">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-sm p-2.5 border border-primary/20">
                  <p className="text-xs font-heading font-bold text-primary uppercase tracking-widest text-center">
                    {service.price}
                  </p>
                </div>

                {/* stats */}
                <div className="grid grid-cols-2 gap-2 bg-muted/50 rounded-sm p-3 border border-border">
                  <div className="text-center">
                    <p className="text-lg font-heading font-bold text-blue-600">
                      {service.totalRequests}
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                      Requests
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-heading font-bold text-yellow-600">
                      {service.pendingRequests}
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                      Pending
                    </p>
                  </div>
                </div>

                {/* provider info */}
                <div className="border-t-2 border-border pt-4 space-y-3">
                  <div>
                    <p className="text-[10px] font-heading font-bold text-muted-foreground uppercase tracking-widest mb-1">
                      Service Provider
                    </p>
                    <p className="font-heading font-bold text-foreground text-sm">
                      {service.provider.fullName}
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">
                      {service.provider.role}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <Star
                      size={12}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <span className="font-heading font-bold text-foreground">
                      {service.provider.rating}
                    </span>
                    <span className="text-muted-foreground uppercase tracking-wider text-[10px] font-bold">
                      ({service.provider.experience})
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      <Phone size={12} className="text-primary" />
                      <span className="text-[10px] font-bold tracking-wider">{service.provider.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      <Mail size={12} className="text-primary" />
                      <span className="truncate text-[10px] font-bold tracking-wider">{service.provider.email}</span>
                    </div>
                  </div>
                </div>

                {/* actions */}
                <div className="flex items-center gap-2 pt-4 border-t-2 border-border mt-auto">
                  <button
                    onClick={() => handleNavigateToService(String(service.id))}
                    className="flex-1 h-10 px-2 hover:bg-primary text-primary hover:text-primary-foreground rounded-sm transition-all font-heading font-bold text-xs uppercase tracking-widest border border-primary/20 hover:border-primary"
                  >
                    <Eye size={14} className="inline mr-1.5" />
                    View
                  </button>
                  <button className="flex-1 h-10 px-2 hover:bg-muted rounded-sm transition-colors text-muted-foreground font-heading font-bold text-xs uppercase tracking-widest border border-border">
                    <Edit size={14} className="inline mr-1.5" />
                    Edit
                  </button>
                  <button className="flex-1 h-10 px-2 hover:bg-destructive hover:text-destructive-foreground rounded-sm transition-all text-destructive font-heading font-bold text-xs uppercase tracking-widest border border-destructive/20 hover:border-destructive">
                    <Trash2 size={14} className="inline mr-1.5" />
                    Del
                  </button>
                </div>
              </div>
            </AdminCard>
          );
        })}
      </div>
    </div>
  );
}
