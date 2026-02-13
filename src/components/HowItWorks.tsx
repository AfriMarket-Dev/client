import React from "react";
import {
  Search,
  MessageSquare,
  Handshake,
  Star,
  CheckCircle,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";

const HowItWorks: React.FC = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: Search,
      title: "Discovery",
      description: "Search local listings by category and district.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: MessageSquare,
      title: "Negotiation",
      description: "Direct chat with providers to discuss requirements.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: FileText,
      title: "The Quote",
      description: "Receive and accept formal offers digitally.",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: Handshake,
      title: "Agreement",
      description: "Lock in terms and pay the provider offline.",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      icon: Star,
      title: "Trust",
      description: "Confirm delivery and leave a transparent review.",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ];

  return (
    <section className="bg-background py-24 relative overflow-hidden">
      <div className="absolute inset-0 african-pattern opacity-[0.03] pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge variant="outline" className="mb-4 border-primary/20 text-primary">
            Safe & Simple
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 font-display">
            How AfrikaMarket Works
          </h2>
          <p className="text-muted-foreground text-lg">
            We simplify the construction supply chain in Rwanda through a transparent, accountability-focused process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-24 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-stone-200 -z-10 translate-y-[-2rem]" />

          {steps.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className={`w-20 h-20 rounded-2xl ${item.bgColor} ${item.color} flex items-center justify-center mb-6 shadow-sm border border-stone-100 group-hover:scale-110 transition-transform duration-300 relative bg-white`}>
                <item.icon className="w-10 h-10" strokeWidth={1.5} />
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-foreground text-white text-[10px] font-bold flex items-center justify-center border-2 border-background">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed px-4">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="bg-foreground text-white overflow-hidden relative border-none rounded-3xl shadow-2xl">
          <div className="absolute inset-0 african-pattern opacity-10 invert pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 blur-3xl rounded-full translate-x-1/3 pointer-events-none"></div>

          <CardContent className="relative z-10 px-6 py-16 md:py-24 md:px-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-display">
              Ready to Start Building?
            </h2>
            <p className="text-stone-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Join Rwanda's fastest growing network of contractors and verified suppliers. Start your project with confidence today.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
              <Button
                size="xl"
                className="rounded-2xl px-12 font-bold shadow-xl shadow-primary/20"
                onClick={() => navigate("/auth/signup")}
              >
                Create Free Account
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="rounded-2xl px-12 border-white/20 text-white hover:bg-white/10 hover:border-white font-bold"
                onClick={() => navigate("/contact")}
              >
                Learn More
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-stone-400 text-sm font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span>Verified Providers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Rwanda-Only Focus</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Accountability via Reviews</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HowItWorks;
