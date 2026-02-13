import React from "react";
import { MessageSquareText, Search, Star, ArrowRight, ShieldCheck, Zap, Handshake } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useNavigate } from "react-router-dom";

const Services: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Search,
      title: "Smart Discovery",
      description: "Filter by district (e.g., Gasabo, Kicukiro) to find materials closest to your site, saving on transport costs.",
    },
    {
      icon: Handshake,
      title: "Direct Negotiation",
      description: "No middlemen. Chat with suppliers, request formal quotes, and agree on terms directly within the platform.",
    },
    {
      icon: ShieldCheck,
      title: "Verified Trust",
      description: "We verify supplier identities. Community reviews ensure you only deal with reliable partners.",
    },
  ];

  return (
    <section className="bg-stone-50 py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-4 border-primary/20 text-primary">
              Why Choose Us
            </Badge>
            <h2 className="text-3xl md:text-5xl font-black text-stone-900 font-display leading-tight">
              Built for Rwanda's <br /> Construction Market
            </h2>
          </div>
          <Button 
            variant="ghost" 
            className="group text-stone-600 font-bold hover:bg-stone-100 rounded-xl"
            onClick={() => navigate("/about")}
          >
            Learn more about our mission
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-stone-200 bg-white hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-stone-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <service.icon className="w-7 h-7 text-stone-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-stone-500 leading-relaxed font-medium">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
