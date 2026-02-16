import React, { useState } from "react";
import {
  Search,
  Clock,
  AlertCircle,
  MessageSquare,
  MapPin,
  Package,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { AdminCard } from "@/components/admin/AdminCard";
import { cn } from "@/lib/utils";

interface Inquiry {
  id: string;
  customerName: string;
  customerCompany: string;
  customerAvatar: string;
  customerLocation: string;
  productName: string;
  productImage: string;
  message: string;
  requestedQuantity: number;
  urgency: "low" | "medium" | "high";
  status: "new" | "responded" | "quoted" | "closed";
  createdAt: string;
}

const InquiriesList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [inquiries] = useState<Inquiry[]>([
    {
      id: "1",
      customerName: "Jean-Paul Habimana",
      customerCompany: "Kigali Modern Builders",
      customerAvatar:
        "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      customerLocation: "Nyarugenge, Kigali",
      productName: "CIMERWA Portland Cement 32.5N",
      productImage:
        "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=300",
      message:
        "Hi, I need 200 bags of CIMERWA 32.5N delivered to my site in Gahanga. What's your best price?",
      requestedQuantity: 200,
      urgency: "high",
      status: "new",
      createdAt: "1 hour ago",
    },
    {
      id: "2",
      customerName: "Alice Umutoni",
      customerCompany: "Eco-Friendly Homes Ltd",
      customerAvatar:
        "https://images.pexels.com/photos/5625120/pexels-photo-5625120.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      customerLocation: "Gasabo, Kigali",
      productName: "Deformed Steel Bar (Y12)",
      productImage:
        "https://images.pexels.com/photos/159293/steel-grid-reinforcement-construction-site-159293.jpeg?auto=compress&cs=tinysrgb&w=300",
      message:
        "Looking for steel rebar for a 3-story residential project. Need a quote for 100 pieces.",
      requestedQuantity: 100,
      urgency: "medium",
      status: "responded",
      createdAt: "5 hours ago",
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <Badge className="bg-destructive text-destructive-foreground border-none uppercase text-[10px] font-bold tracking-widest rounded-sm">
            New Inquiry
          </Badge>
        );
      case "responded":
        return (
          <Badge className="bg-info text-info-foreground border-none uppercase text-[10px] font-bold tracking-widest rounded-sm">
            Responded
          </Badge>
        );
      case "quoted":
        return (
          <Badge className="bg-warning text-warning-foreground border-none uppercase text-[10px] font-bold tracking-widest rounded-sm">
            Quoted
          </Badge>
        );
      case "closed":
        return (
          <Badge className="bg-success text-success-foreground border-none uppercase text-[10px] font-bold tracking-widest rounded-sm">
            Closed
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8 ">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-border pb-6">
        <div>
          <h2 className="text-4xl font-heading font-bold text-foreground uppercase tracking-tight">
            Inquiries Queue
          </h2>
          <p className="text-muted-foreground font-medium uppercase text-xs tracking-widest mt-1">
            Direct requests from potential buyers in Rwanda
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="FILTER INQUIRIES..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-sm bg-background border border-border uppercase text-xs font-bold tracking-widest shadow-none"
          />
        </div>
      </div>

      <div className="grid gap-6">
        {inquiries.map((inquiry) => (
          <AdminCard
            key={inquiry.id}
            noPadding
            className="hover:border-primary transition-colors"
          >
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                {/* Product/Customer Sidebar */}
                <div className="lg:w-72 bg-muted/20 p-6 border-b lg:border-b-0 lg:border-r-2 border-border flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="relative shrink-0">
                        <img
                          src={inquiry.customerAvatar}
                          className="w-12 h-12 rounded-sm object-cover border border-border shadow-md"
                          alt=""
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border border-background shadow-sm" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-heading font-bold text-foreground uppercase text-sm truncate">
                          {inquiry.customerName}
                        </p>
                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter truncate">
                          {inquiry.customerCompany}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-wide">
                          {inquiry.customerLocation}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                          {inquiry.createdAt}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t-2 border-border border-dashed">
                    {getStatusBadge(inquiry.status)}
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8">
                  <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
                    <div className="relative shrink-0">
                      <img
                        src={inquiry.productImage}
                        className="w-24 h-24 rounded-sm object-cover border border-border shadow-lg"
                        alt=""
                      />
                      <div className="absolute inset-0 african-pattern opacity-10 pointer-events-none" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl font-heading font-bold text-foreground mb-3 truncate uppercase tracking-tight">
                        {inquiry.productName}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-sm border border-border">
                          <Package className="w-4 h-4 text-primary" />
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            {inquiry.requestedQuantity} Units
                          </span>
                        </div>
                        <div
                          className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-sm border",
                            inquiry.urgency === "high"
                              ? "bg-destructive/10 border-destructive/20 text-destructive"
                              : "bg-warning/10 border-warning/20 text-warning",
                          )}
                        >
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            {inquiry.urgency} Priority
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/10 border border-border border-dashed rounded-sm p-6 mb-8 relative">
                    <div className="absolute -top-3 left-6 px-2 bg-background text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                      Transmission Content
                    </div>
                    <p className="text-foreground leading-relaxed font-medium font-mono text-sm italic">
                      "{inquiry.message}"
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="flex-1 rounded-sm h-14 font-heading font-bold uppercase tracking-widest shadow-none gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Initialize Link
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 rounded-sm h-14 font-heading font-bold uppercase tracking-widest border border-border hover:bg-muted shadow-none gap-2"
                    >
                      <BadgeCheck className="w-5 h-5 text-primary" />
                      Acknowledge Stream
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </AdminCard>
        ))}
      </div>
    </div>
  );
};

export default InquiriesList;
