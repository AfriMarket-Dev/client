import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Star,
  Mail,
  Phone,
  Calendar,
  Users,
  Briefcase,
  Clock,
  MessageSquare,
} from "lucide-react";
import { services as mockServices } from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function ServiceDetailsPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [showContactModal, setShowContactModal] = useState(false);
  const [message, setMessage] = useState("");

  const service = mockServices.find((s) => s.id === parseInt(serviceId || "0"));

  if (!service) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold uppercase text-foreground mb-4 tracking-wide">
            Service Not Found
          </h1>
          <Button
            onClick={() => navigate("/admin/services")}
            className="rounded-sm font-heading uppercase tracking-wider"
          >
            Back to Services
          </Button>
        </div>
      </div>
    );
  }

  const IconComponent = service.icon;

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/services")}
          className="gap-2 font-heading uppercase tracking-wider text-xs rounded-sm"
        >
          <ChevronLeft size={18} />
          Back
        </Button>
      </div>

      {/* service overview */}
      <Card className="border border-border rounded-sm shadow-none">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-6">
            <div className="flex items-start gap-4 w-full">
              <div className="p-4 bg-primary/10 rounded-sm border border-primary/20 shrink-0">
                <IconComponent size={36} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold uppercase text-foreground tracking-wide mb-2 leading-tight">
                  {service.name}
                </h1>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {service.description}
                </p>
              </div>
            </div>
            <div className="text-left md:text-right w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start border-t md:border-t-0 border-border pt-4 md:pt-0 pl-3 md:pl-0">
              <span className="text-sm text-muted-foreground font-bold uppercase tracking-widest md:hidden">Pricing</span>
              <div>
                <div className="text-3xl font-heading font-black text-primary mb-1">
                  {service.price}
                </div>
                <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest hidden md:block">
                  Pricing
                </div>
              </div>
            </div>
          </div>

          {/* key stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <div className="bg-muted/50 border border-border rounded-sm p-3 md:p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users size={16} className="text-primary" />
                <span className="text-[10px] md:text-xs font-heading font-bold uppercase tracking-widest text-muted-foreground">
                  Requests
                </span>
              </div>
              <p className="text-xl md:text-2xl font-heading font-bold text-foreground">
                {service.totalRequests || 0}
              </p>
            </div>

            <div className="bg-muted/50 border border-border rounded-sm p-3 md:p-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare size={16} className="text-primary" />
                <span className="text-[10px] md:text-xs font-heading font-bold uppercase tracking-widest text-muted-foreground">
                  Pending
                </span>
              </div>
              <p className="text-xl md:text-2xl font-heading font-bold text-foreground">
                {service.pendingRequests || 0}
              </p>
            </div>

            <div className="bg-muted/50 border border-border rounded-sm p-3 md:p-4 col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={16} className="text-primary" />
                <span className="text-[10px] md:text-xs font-heading font-bold uppercase tracking-widest text-muted-foreground">
                  Response Time
                </span>
              </div>
              <p className="text-xl md:text-2xl font-heading font-bold text-foreground">
                2-4 hrs
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* provider info */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-border rounded-sm shadow-none">
            <CardContent className="p-6">
              <h2 className="text-lg font-heading font-bold uppercase text-foreground mb-5 tracking-widest flex items-center gap-2 border-b-2 border-primary pb-2">
                <Briefcase size={20} className="text-primary" />
                Provider Details
              </h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground text-sm uppercase tracking-wide font-medium">
                    Name
                  </span>
                  <span className="font-heading font-bold text-foreground">
                    {service.provider.fullName}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground text-sm uppercase tracking-wide font-medium">
                    Role
                  </span>
                  <span className="font-heading font-bold text-foreground">
                    {service.provider.role}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground text-sm uppercase tracking-wide font-medium">
                    Experience
                  </span>
                  <span className="font-heading font-bold text-foreground">
                    {service.provider.experience}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-muted-foreground text-sm uppercase tracking-wide font-medium">
                    Rating
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < Math.floor(service.provider.rating)
                              ? "text-amber-500 fill-amber-500"
                              : "text-muted fill-muted"
                          }
                        />
                      ))}
                    </div>
                    <span className="font-heading font-bold text-foreground">
                      {service.provider.rating}/5.0
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* recent requests */}
          <Card className="border border-border rounded-sm shadow-none">
            <CardContent className="p-6">
              <h2 className="text-lg font-heading font-bold uppercase text-foreground mb-5 tracking-widest flex items-center gap-2 border-b-2 border-primary pb-2">
                <Clock size={20} className="text-primary" />
                Recent Requests
              </h2>

              <div className="space-y-2">
                {[
                  {
                    id: 1,
                    customer: "ABC Trading Co.",
                    date: "2026-01-22",
                    status: "pending",
                    message: "Need equipment rental for 2 weeks",
                  },
                  {
                    id: 2,
                    customer: "Global Imports Ltd",
                    date: "2026-01-21",
                    status: "completed",
                    message: "Bulk shipping quote for 50 containers",
                  },
                  {
                    id: 3,
                    customer: "Retail Solutions",
                    date: "2026-01-20",
                    status: "completed",
                    message: "Trade support for authentication",
                  },
                ].map((request) => (
                  <div
                    key={request.id}
                    className="border border-border rounded-sm p-4 hover:border-primary transition-colors bg-card"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-heading font-bold text-foreground text-sm uppercase tracking-wide">
                          {request.customer}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {request.message}
                        </p>
                      </div>
                      <Badge
                        className={`text-[10px] font-bold uppercase tracking-wider ${
                          request.status === "completed"
                            ? "bg-primary/10 text-primary border-primary/20"
                            : "bg-muted text-muted-foreground border-border"
                        }`}
                        variant="outline"
                      >
                        {request.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 uppercase tracking-wide">
                      <Calendar size={12} />
                      {new Date(request.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* contact & performance */}
        <div className="space-y-6">
          {/* contact card */}
          <Card className="border border-border rounded-sm shadow-none">
            <CardContent className="p-6">
              <h3 className="text-sm font-heading font-bold uppercase text-foreground mb-5 tracking-widest">
                Contact
              </h3>

              <div className="space-y-3">
                <a
                  href={`mailto:${service.provider.email}`}
                  className="flex items-center gap-3 p-3 border border-border rounded-sm hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <Mail size={18} className="text-primary shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                      Email
                    </p>
                    <p className="text-xs font-medium text-foreground truncate">
                      {service.provider.email}
                    </p>
                  </div>
                </a>

                <a
                  href={`tel:${service.provider.phone}`}
                  className="flex items-center gap-3 p-3 border border-border rounded-sm hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <Phone size={18} className="text-primary shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                      Phone
                    </p>
                    <p className="text-xs font-medium text-foreground">
                      {service.provider.phone}
                    </p>
                  </div>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* performance stats */}
          <Card className="border border-border rounded-sm shadow-none">
            <CardContent className="p-6">
              <h3 className="text-sm font-heading font-bold uppercase text-foreground mb-5 tracking-widest">
                Performance
              </h3>

              <div className="space-y-4">
                <div className="text-center py-4 border-b border-border">
                  <p className="text-3xl font-heading font-black text-primary">
                    {service.provider.rating}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide font-bold">
                    Avg Rating
                  </p>
                </div>

                <div className="text-center py-4 border-b border-border">
                  <p className="text-3xl font-heading font-black text-foreground">
                    98%
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide font-bold">
                    Satisfaction
                  </p>
                </div>

                <div className="text-center py-4">
                  <p className="text-3xl font-heading font-black text-foreground">
                    156
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide font-bold">
                    Delivered
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* action buttons */}
          <div className="space-y-2">
            <Button
              onClick={() => setShowContactModal(true)}
              className="w-full rounded-sm h-12 font-heading font-bold uppercase tracking-widest text-xs"
            >
              <MessageSquare size={16} className="mr-2" />
              Send Message
            </Button>
            <Button
              variant="outline"
              className="w-full rounded-sm border border-border h-12 font-heading font-bold uppercase tracking-widest text-xs"
            >
              View More Services
            </Button>
          </div>
        </div>
      </div>

      {/* contact modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-sm border border-border max-w-md w-full p-6">
            <h2 className="text-xl font-heading font-bold uppercase text-foreground mb-4 tracking-wide">
              Send Message
            </h2>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setShowContactModal(false);
                setMessage("");
              }}
            >
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Service inquiry"
                  className="w-full px-4 py-3 border border-border rounded-sm bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your message..."
                  className="w-full px-4 py-3 border border-border rounded-sm bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none text-sm"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowContactModal(false);
                    setMessage("");
                  }}
                  className="flex-1 rounded-sm border border-border h-11 font-heading uppercase tracking-wider"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 rounded-sm h-11 font-heading uppercase tracking-wider"
                >
                  Send
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
