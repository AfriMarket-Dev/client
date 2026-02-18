import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Star,
  Phone,
  Calendar,
  Briefcase,
  Clock,
  MessageSquare,
  MessageCircle,
  ShieldCheck,
  CheckCircle,
  Users,
  Layout,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Service } from "@/types"; // You might need to define this type or import carefully

interface ServiceViewProps {
  service: any; // Using any for now to facilitate the move, should be typed properly
  onBack?: () => void;
}

export default function ServiceView({ service, onBack }: ServiceViewProps) {
  const navigate = useNavigate();
  const [showContactModal, setShowContactModal] = useState(false);
  const [message, setMessage] = useState("");

  const IconComponent = service.icon || Layout;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 space-y-6 overflow-x-hidden pb-24 md:pb-12">
      {/* Mobile Sticky Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border px-3 py-2 z-50 flex items-center gap-1.5 safe-area-bottom shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <a
          href={`tel:${service.provider.phone}`}
          className="flex-none w-11 h-11 flex items-center justify-center rounded-sm bg-muted border border-border text-foreground active:bg-accent transition-colors"
        >
          <Phone className="w-4 h-4" />
        </a>
        <a
          href={`https://wa.me/${service.provider.phone.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-none w-11 h-11 flex items-center justify-center rounded-sm bg-emerald-500 text-white active:bg-emerald-600 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
        <Button
          variant="outline"
          size="lg"
          className="flex-1 font-heading font-bold uppercase tracking-widest text-[10px] h-11 rounded-none border-primary text-primary"
          onClick={() => setShowContactModal(true)}
        >
          <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
          Message
        </Button>
        <Button
          size="lg"
          className="flex-[1.5] font-heading font-bold uppercase tracking-widest text-[10px] h-11 rounded-none"
          onClick={() => setShowContactModal(true)}
        >
          Inquire
        </Button>
      </div>

      {/* header */}
      <div className="flex items-center gap-4 hidden md:flex mb-6">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="gap-2 font-heading uppercase tracking-wider text-xs rounded-sm pl-0 hover:bg-transparent hover:text-primary"
        >
          <ChevronLeft size={18} />
          Back
        </Button>
      </div>

      {/* Mobile Edge-to-Edge Header */}
      <div className="md:hidden -mx-4 -mt-4 mb-6 relative aspect-video bg-muted/20 flex items-center justify-center overflow-hidden">
        <IconComponent size={64} className="text-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <Badge className="bg-primary text-white border-none uppercase text-[10px] font-bold tracking-wider mb-2">
            Service
          </Badge>
          <h1 className="text-2xl font-heading font-bold uppercase text-foreground tracking-wide leading-tight">
            {service.name}
          </h1>
        </div>

        {/* Back Button Overlay */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-border rounded-sm shadow-none md:p-6 p-5">
            <div className="hidden md:flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-primary/10 rounded-sm border border-primary/20 shrink-0">
                  <IconComponent size={36} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-heading font-bold uppercase text-foreground tracking-wide mb-2 leading-tight">
                    {service.name}
                  </h1>
                  <p className="text-muted-foreground leading-relaxed text-sm max-w-xl">
                    {service.description}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-heading font-black text-primary mb-1 whitespace-nowrap">
                  RWF {Number(service.price).toLocaleString()}
                </div>
                <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                  Starting Price
                </div>
              </div>
            </div>

            <div className="md:hidden mb-6">
              <p className="text-muted-foreground leading-relaxed text-sm">
                {service.description}
              </p>
            </div>

            <div className="md:hidden flex items-baseline gap-2 mb-8 border-b border-border pb-6">
              <span className="text-3xl font-heading font-black text-primary">
                RWF {Number(service.price).toLocaleString()}
              </span>
              <span className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest">
                / BASE
              </span>
            </div>

            {/* Service Features & Inclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 border-t border-border/60">
              <div className="space-y-4">
                <h3 className="font-heading font-bold uppercase text-xs tracking-widest text-muted-foreground flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  What's Included
                </h3>
                <ul className="space-y-3">
                  {[
                    "Precision data collection",
                    "High-accuracy reporting",
                    "Industry standard formats",
                    "Certified professional survey",
                    "Site-wide accessibility",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-foreground/80"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-heading font-bold uppercase text-xs tracking-widest text-muted-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  Process Workflow
                </h3>
                <div className="space-y-4">
                  {[
                    { step: "01", label: "Consultation" },
                    { step: "02", label: "Observation" },
                    { step: "03", label: "Analysis" },
                    { step: "04", label: "Delivery" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-primary bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                        {item.step}
                      </span>
                      <span className="text-sm font-medium text-foreground/80">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="border border-border rounded-sm shadow-none">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6 border-b border-border pb-3">
                <h2 className="text-sm font-heading font-bold uppercase text-foreground tracking-widest flex items-center gap-2">
                  <Briefcase size={18} className="text-primary" />
                  Service History
                </h2>
                <Badge
                  variant="outline"
                  className="text-[10px] uppercase font-bold tracking-widest"
                >
                  {service.totalRequests} Requests
                </Badge>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 1,
                    customer: "ABC Trading Co.",
                    date: "Feb 2026",
                    status: "completed",
                  },
                  {
                    id: 2,
                    customer: "Global Assets Ltd",
                    date: "Jan 2026",
                    status: "completed",
                  },
                ].map((request) => (
                  <div
                    key={request.id}
                    className="border border-border rounded-sm p-4 bg-muted/10 hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-heading font-bold text-foreground text-sm uppercase tracking-wide">
                          {request.customer}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1 uppercase font-bold tracking-widest">
                          <Calendar size={12} /> {request.date}
                        </p>
                      </div>
                      <Badge className="bg-primary/10 text-primary border-none text-[9px] font-bold uppercase tracking-wider px-2 py-0.5">
                        {request.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="border border-border rounded-sm p-5 bg-card">
            <h3 className="text-xs font-heading font-bold uppercase text-muted-foreground mb-5 tracking-widest border-b border-border pb-2">
              Service Provider
            </h3>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-14 h-14 rounded-sm bg-muted flex items-center justify-center border border-border">
                <span className="font-heading font-bold text-xl text-muted-foreground">
                  {service.provider.fullName.charAt(0)}
                </span>
              </div>
              <div>
                <h4 className="font-heading font-bold text-base uppercase tracking-wide text-foreground">
                  {service.provider.fullName}
                </h4>
                <p className="text-xs text-muted-foreground font-medium">
                  {service.provider.role}
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground uppercase tracking-wider font-bold">
                  Experience
                </span>
                <span className="font-bold text-foreground bg-muted/30 px-2 py-1 rounded-sm">
                  {service.provider.experience}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground uppercase tracking-wider font-bold">
                  Verification
                </span>
                <span className="font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-sm border border-emerald-100">
                  <ShieldCheck size={12} /> Verified
                </span>
              </div>
            </div>
          </div>

          <div className="border border-border rounded-sm p-5 bg-card">
            <h3 className="text-xs font-heading font-bold uppercase text-muted-foreground mb-5 tracking-widest border-b border-border pb-2">
              Performance Stats
            </h3>
            <div className="flex items-center justify-between">
              <div className="text-center">
                <div className="text-2xl font-black font-heading text-primary flex items-center justify-center gap-1">
                  {service.provider.rating}{" "}
                  <Star className="fill-primary text-primary w-4 h-4" />
                </div>
                <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mt-1">
                  Rating
                </div>
              </div>
              <div className="h-10 w-px bg-border/60" />
              <div className="text-center">
                <div className="text-2xl font-black font-heading text-foreground">
                  98.4%
                </div>
                <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mt-1">
                  Efficiency
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:block space-y-3">
            <Button
              onClick={() => setShowContactModal(true)}
              className="w-full rounded-sm h-12 font-heading font-bold uppercase tracking-widest text-xs"
            >
              <MessageSquare size={16} className="mr-2" />
              Send Inquiry
            </Button>
            <Button
              variant="outline"
              className="w-full rounded-sm border border-border h-12 font-heading font-bold uppercase tracking-widest text-xs"
              onClick={handleBack}
            >
              Back to Marketplace
            </Button>
          </div>
        </div>
      </div>

      {showContactModal && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
          <Card className="bg-background rounded-sm border border-border max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-xl font-heading font-bold uppercase text-foreground mb-6 tracking-wide border-b border-border pb-4">
              Service Inquiry
            </h2>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setShowContactModal(false);
                setMessage("");
              }}
            >
              <div className="space-y-1.5">
                <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Inquiry about service"
                  className="w-full px-4 py-3 border border-border rounded-sm bg-muted/10 outline-none text-sm focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground">
                  Detailed Message
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 border border-border rounded-sm bg-muted/10 outline-none resize-none text-sm focus:border-primary transition-colors"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowContactModal(false)}
                  className="flex-1 rounded-sm h-11 font-heading uppercase tracking-wider text-[10px]"
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  className="flex-1 rounded-sm h-11 font-heading uppercase tracking-wider text-[10px]"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
