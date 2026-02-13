import React, { useState } from "react";
import {
  Search,
  Clock,
  AlertCircle,
  MessageSquare,
  MapPin,
  Package,
  ArrowRight,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";

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
      customerAvatar: "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      customerLocation: "Nyarugenge, Kigali",
      productName: "CIMERWA Portland Cement 32.5N",
      productImage: "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=300",
      message: "Hi, I need 200 bags of CIMERWA 32.5N delivered to my site in Gahanga. What's your best price?",
      requestedQuantity: 200,
      urgency: "high",
      status: "new",
      createdAt: "1 hour ago",
    },
    {
      id: "2",
      customerName: "Alice Umutoni",
      customerCompany: "Eco-Friendly Homes Ltd",
      customerAvatar: "https://images.pexels.com/photos/5625120/pexels-photo-5625120.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      customerLocation: "Gasabo, Kigali",
      productName: "Deformed Steel Bar (Y12)",
      productImage: "https://images.pexels.com/photos/159293/steel-grid-reinforcement-construction-site-159293.jpeg?auto=compress&cs=tinysrgb&w=300",
      message: "Looking for steel rebar for a 3-story residential project. Need a quote for 100 pieces.",
      requestedQuantity: 100,
      urgency: "medium",
      status: "responded",
      createdAt: "5 hours ago",
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new": return <Badge className="bg-red-500 hover:bg-red-600 border-none">New Inquiry</Badge>;
      case "responded": return <Badge className="bg-blue-500 hover:bg-blue-600 border-none">Responded</Badge>;
      case "quoted": return <Badge className="bg-orange-500 hover:bg-orange-600 border-none">Quoted</Badge>;
      case "closed": return <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none">Closed</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-stone-900 font-display">Inquiries Queue</h2>
          <p className="text-stone-500 font-medium mt-1">Direct requests from potential buyers in Rwanda.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
          <Input
            placeholder="Search inquiries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-2xl bg-white border-stone-200"
          />
        </div>
      </div>

      <div className="grid gap-6">
        {inquiries.map((inquiry) => (
          <Card key={inquiry.id} className="border-stone-200 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md rounded-3xl overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                {/* Product/Customer Sidebar */}
                <div className="lg:w-72 bg-stone-50/50 p-6 border-b lg:border-b-0 lg:border-r border-stone-100 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="relative">
                        <img src={inquiry.customerAvatar} className="w-12 h-12 rounded-2xl object-cover shadow-sm" alt="" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
                      </div>
                      <div>
                        <p className="font-bold text-stone-900 leading-tight">{inquiry.customerName}</p>
                        <p className="text-xs text-stone-500 font-medium truncate">{inquiry.customerCompany}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-stone-600">
                        <MapPin className="w-3 h-3 text-primary" />
                        <span className="text-xs font-bold">{inquiry.customerLocation}</span>
                      </div>
                      <div className="flex items-center gap-2 text-stone-600">
                        <Clock className="w-3 h-3 text-stone-400" />
                        <span className="text-xs font-bold uppercase tracking-tighter">{inquiry.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-stone-100">
                    {getStatusBadge(inquiry.status)}
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8">
                  <div className="flex items-start gap-6 mb-8">
                    <img src={inquiry.productImage} className="w-24 h-24 rounded-2xl object-cover shadow-lg border-4 border-white" alt="" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-black text-stone-900 mb-2 truncate">{inquiry.productName}</h3>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 rounded-xl">
                          <Package className="w-4 h-4 text-primary" />
                          <span className="text-sm font-black">{inquiry.requestedQuantity} Units</span>
                        </div>
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${inquiry.urgency === 'high' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-sm font-black uppercase tracking-tighter">{inquiry.urgency} Priority</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-stone-50 rounded-2xl p-6 mb-8 relative">
                    <div className="absolute -top-3 left-6 px-2 bg-stone-50 text-[10px] font-black uppercase tracking-widest text-stone-400">Customer Message</div>
                    <p className="text-stone-700 leading-relaxed font-medium">"{inquiry.message}"</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="flex-1 rounded-2xl h-14 font-black shadow-lg shadow-primary/20 gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Open Chat Thread
                    </Button>
                    <Button variant="outline" className="rounded-2xl h-14 font-bold border-stone-200 hover:bg-stone-50 gap-2">
                      <BadgeCheck className="w-5 h-5" />
                      Mark as Handled
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InquiriesList;
