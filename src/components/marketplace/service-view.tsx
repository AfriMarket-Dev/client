import { useState } from "react";
import { useNavigate, useRouter } from "@tanstack/react-router";
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
  MapPin,
  Globe,
  Mail,
  Building,
  Award,
  Package,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Service } from "@/types"; // You might need to define this type or import carefully

interface ServiceViewProps {
  service: any; // Using any for now to facilitate the move, should be typed properly
  onBack?: () => void;
}

export default function ServiceView({ service, onBack }: ServiceViewProps) {
  const navigate = useNavigate();
  const router = useRouter();
  const [showContactModal, setShowContactModal] = useState(false);
  const [message, setMessage] = useState("");

  const IconComponent = service.icon || Layout;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-background space-y-6 overflow-x-hidden pb-24 md:pb-12 industrial-grain">
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
      <div className="items-center gap-4 hidden md:flex py-8 px-6 text-sm max-w-[1600px] mx-auto w-full">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="gap-2 font-heading uppercase tracking-wider text-xs rounded-sm pl-0 hover:bg-transparent hover:text-primary transition-colors text-muted-foreground"
        >
          <ChevronLeft size={16} />
          Back to Marketplace
        </Button>
      </div>

      {/* Mobile Edge-to-Edge Header */}
      <div className="md:hidden -mt-4 mb-6 relative aspect-video bg-muted/20 flex items-center justify-center overflow-hidden border-b border-border">
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
        <IconComponent size={64} className="text-primary/20" />
        <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <Badge className="bg-primary text-white border-none uppercase text-[10px] font-bold tracking-wider mb-2 rounded-none">
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

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* MAIN CONTENT COLUMN (8/12) */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Title Section */}
          <div className="hidden md:block border-b border-border/40 pb-8">
             <div className="flex items-center gap-3 text-primary mb-4">
               <div className="p-2 bg-primary/10 rounded-none border border-primary/20">
                  <IconComponent size={24} />
               </div>
               <span className="font-heading font-bold uppercase tracking-widest text-xs text-muted-foreground">Professional Service</span>
             </div>
             
             <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold uppercase text-foreground tracking-tight leading-[0.9] mb-4">
               {service.name}
             </h1>
             
             <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-3xl">
               {service.description}
             </p>
          </div>

          <div className="md:hidden space-y-4">
             <div className="flex items-baseline gap-2">
              <span className="text-3xl font-heading font-black text-primary">
                RWF {Number(service.price).toLocaleString()}
              </span>
              <span className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest">
                / STARTING
              </span>
             </div>
             <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList variant="line">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-12 mt-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/40 border border-border/40">
                {[
                  { label: "Response", value: "~2 Hrs", icon: Clock },
                  { label: "Delivered", value: "203+", icon: CheckCircle },
                  { label: "Rating", value: "4.9/5.0", icon: Star },
                  { label: "Since", value: "2021", icon: Calendar },
                ].map((stat, i) => (
                  <div key={i} className="bg-background p-4 group hover:bg-muted/5 transition-colors">
                    <stat.icon className="w-4 h-4 text-primary mb-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-0.5">{stat.label}</div>
                    <div className="text-lg font-bold font-heading text-foreground">{stat.value}</div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="font-heading font-bold uppercase text-sm tracking-widest text-foreground border-b border-primary/20 pb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Service Inclusions
                  </h3>
                  <ul className="space-y-0 divide-y divide-border/40">
                    {[
                      "Precision data collection",
                      "High-accuracy reporting",
                      "Industry standard formats",
                      "Certified professional survey",
                      "Site-wide accessibility",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-4 py-3 text-sm text-foreground/80 group hover:bg-muted/30 transition-colors px-2"
                      >
                        <div className="w-1.5 h-1.5 bg-primary/40 group-hover:bg-primary transition-colors rotate-45" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-6">
                  <h3 className="font-heading font-bold uppercase text-sm tracking-widest text-foreground border-b border-primary/20 pb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Workflow Protocol
                  </h3>
                  <div className="space-y-4 pt-2">
                    {[
                      { step: "01", label: "Initial Consultation" },
                      { step: "02", label: "On-Site Observation" },
                      { step: "03", label: "Data Analysis" },
                      { step: "04", label: "Report Delivery" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 group">
                        <span className="text-xs font-black font-heading text-background bg-foreground w-8 h-8 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                          {item.step}
                        </span>
                        <span className="text-sm font-bold uppercase tracking-wide text-foreground/70 group-hover:text-foreground transition-colors">
                          {item.label}
                        </span>
                        <div className="flex-1 h-px bg-border/40 group-hover:bg-primary/20" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
                <div className="border border-border/60 bg-muted/5 p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-heading font-bold uppercase text-foreground tracking-widest flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary" /> Recent Deployments
                    </h2>
                    <Badge variant="outline" className="rounded-none border-primary/20 text-primary uppercase text-[10px] font-bold tracking-widest">
                      {service.totalRequests} Verified Jobs
                    </Badge>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        id: 1,
                        customer: "ABC Trading Co.",
                        date: "FEB 2026",
                        status: "completed",
                      },
                      {
                        id: 2,
                        customer: "Global Assets Ltd",
                        date: "JAN 2026",
                        status: "completed",
                      },
                    ].map((request) => (
                      <div key={request.id} className="bg-background border border-border p-4 hover:border-primary/40 transition-colors group">
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-heading font-bold uppercase text-sm">{request.customer}</span>
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                            <span>{request.date}</span>
                            <span className="group-hover:text-primary transition-colors">View Report</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="products" className="mt-8">
              <div className="border border-border border-dashed p-12 text-center text-muted-foreground bg-muted/5">
                <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="font-heading font-bold uppercase tracking-wide mb-2">No Products Listed</h3>
                <p className="text-sm max-w-sm mx-auto">This provider hasn't listed any separate products yet. Check back later or inquire directly.</p>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <div className="border border-border p-8 bg-muted/5 space-y-8">
                 <div className="flex items-center gap-6 pb-8 border-b border-border">
                    <div className="text-center">
                       <div className="text-5xl font-black font-heading text-foreground">4.9</div>
                       <div className="flex gap-1 justify-center my-2 text-primary text-xs">
                          {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-primary" />)}
                       </div>
                       <div className="text-xs uppercase font-bold tracking-wider text-muted-foreground">203 Reviews</div>
                    </div>
                    <div className="flex-1 space-y-2">
                       {[5,4,3,2,1].map((rating, i) => (
                          <div key={rating} className="flex items-center gap-3 text-xs">
                             <span className="font-bold w-3">{rating}</span>
                             <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: i === 0 ? '85%' : i === 1 ? '10%' : '2%' }} />
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
                 
                 <div className="space-y-6">
                    {[1, 2].map(i => (
                       <div key={i} className="border-b border-border/40 pb-6 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start mb-2">
                             <div>
                                <h4 className="font-bold text-sm uppercase">John Doe</h4>
                                <span className="text-xs text-muted-foreground uppercase tracking-widest">Feb 14, 2026</span>
                             </div>
                             <div className="flex gap-0.5 text-primary">
                                {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-primary" />)}
                             </div>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                             "Exceptional service delivery. The team was professional, timely, and the final report was exactly what we needed for our compliance audit."
                          </p>
                       </div>
                    ))}
                 </div>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                 {/* Get in Touch */}
                 <div className="space-y-6">
                    <h3 className="font-heading font-bold uppercase text-sm tracking-widest text-foreground border-b border-primary/20 pb-4">
                       Get in Touch
                    </h3>
                    <div className="grid gap-4">
                       <a href="#" className="flex items-center gap-4 p-4 border border-border bg-background hover:border-primary/50 hover:bg-muted/10 transition-colors group">
                          <div className="w-10 h-10 bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                             <Mail className="w-5 h-5" />
                          </div>
                          <div>
                             <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Email Us</div>
                             <div className="font-bold text-foreground">contact@example.com</div>
                          </div>
                       </a>
                       <a href="#" className="flex items-center gap-4 p-4 border border-border bg-background hover:border-primary/50 hover:bg-muted/10 transition-colors group">
                          <div className="w-10 h-10 bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                             <Phone className="w-5 h-5" />
                          </div>
                          <div>
                             <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Call Us</div>
                             <div className="font-bold text-foreground">+27 21 000 0000</div>
                          </div>
                       </a>
                       <a href="#" className="flex items-center gap-4 p-4 border border-border bg-background hover:border-primary/50 hover:bg-muted/10 transition-colors group">
                          <div className="w-10 h-10 bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                             <MessageCircle className="w-5 h-5" />
                          </div>
                          <div>
                             <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">WhatsApp</div>
                             <div className="font-bold text-foreground text-emerald-600">+27 21 000 0000</div>
                          </div>
                       </a>
                    </div>
                 </div>

                 {/* Business Information */}
                 <div className="space-y-6">
                    <h3 className="font-heading font-bold uppercase text-sm tracking-widest text-foreground border-b border-primary/20 pb-4">
                       Business Information
                    </h3>
                    <div className="grid grid-cols-2 gap-px bg-border/40 border border-border/40">
                       <div className="bg-background p-4">
                          <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                             <MapPin className="w-4 h-4" />
                             <span className="text-[10px] font-bold uppercase tracking-widest">Location</span>
                          </div>
                          <div className="font-bold text-sm">Cape Town, South Africa</div>
                       </div>
                       <div className="bg-background p-4">
                          <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                             <Building className="w-4 h-4" />
                             <span className="text-[10px] font-bold uppercase tracking-widest">Established</span>
                          </div>
                          <div className="font-bold text-sm">2021</div>
                       </div>
                       <div className="bg-background p-4">
                          <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                             <Package className="w-4 h-4" />
                             <span className="text-[10px] font-bold uppercase tracking-widest">Total Products</span>
                          </div>
                          <div className="font-bold text-sm">134 items</div>
                       </div>
                       <div className="bg-background p-4">
                          <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                             <Star className="w-4 h-4" />
                             <span className="text-[10px] font-bold uppercase tracking-widest">Rating</span>
                          </div>
                          <div className="font-bold text-sm text-primary">4.9/5.0 <span className="text-muted-foreground font-normal text-xs">(203 reviews)</span></div>
                       </div>
                    </div>
                 </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* SIDEBAR (4/12) */}
        <div className="lg:col-span-4 space-y-8 sticky top-24">
            {/* Price Card */}
            <div className="hidden md:block bg-muted/10 border-l-4 border-primary p-6">
               <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">
                 Starting From
               </div>
               <div className="text-4xl lg:text-5xl font-heading font-black text-foreground mb-1">
                 RWF {Number(service.price).toLocaleString()}
               </div>
               <div className="text-xs text-muted-foreground">
                  *Final quote varies by project scope
               </div>
               
               <div className="grid gap-3 mt-6">
                 <Button
                    onClick={() => setShowContactModal(true)}
                    size="lg"
                    className="w-full rounded-none h-12 font-heading font-bold uppercase tracking-widest text-xs"
                  >
                    <MessageSquare size={16} className="mr-2" />
                    Inquire Now
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full rounded-none border-border h-12 font-heading font-bold uppercase tracking-widest text-xs hover:bg-background hover:text-primary hover:border-primary"
                    onClick={handleBack}
                  >
                    Back to Listings
                  </Button>
               </div>
            </div>

            {/* Provider ID Card */}
            <div className="border border-border bg-card relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary via-primary/50 to-transparent" />
               <div className="p-6">
                  <h3 className="text-[10px] font-heading font-bold uppercase text-muted-foreground mb-6 tracking-[0.2em] flex justify-between">
                     <span>Service Provider ID</span>
                     <span className="text-primary">VERIFIED</span>
                  </h3>
                  
                  <div className="flex items-center gap-4 mb-6">
                     <div className="w-16 h-16 bg-muted border border-border flex items-center justify-center text-2xl font-heading font-bold text-muted-foreground">
                        {service.provider.fullName.charAt(0)}
                     </div>
                     <div>
                        <h4 className="font-heading font-bold text-lg uppercase tracking-wide text-foreground">
                           {service.provider.fullName}
                        </h4>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                           {service.provider.role}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                           {[1,2,3,4,5].map(s => (
                              <Star key={s} className="w-3 h-3 fill-primary text-primary" />
                           ))}
                           <span className="text-[10px] font-bold ml-1">{service.provider.rating}</span>
                        </div>
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-px bg-border/40 border border-border/40 mb-6">
                     <div className="bg-background p-3">
                        <span className="block text-[9px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Experience</span>
                        <span className="block text-sm font-bold font-heading">{service.provider.experience}</span>
                     </div>
                     <div className="bg-background p-3">
                        <span className="block text-[9px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Response</span>
                        <span className="block text-sm font-bold font-heading text-emerald-600">~2 Hrs</span>
                     </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs border-t border-border pt-4">
                     <span className="text-muted-foreground">Member since 2023</span>
                     <Button variant="link" className="h-auto p-0 text-primary text-[10px] uppercase font-bold tracking-widest hover:text-foreground">
                        View Full Profile
                     </Button>
                  </div>
               </div>
            </div>
            
             {/* Security Badge */}
             <div className="bg-muted/30 p-4 border border-border/40 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                   <h4 className="font-bold text-xs uppercase tracking-wide text-foreground mb-1">Secure Service Guarantee</h4>
                   <p className="text-[10px] text-muted-foreground leading-relaxed">
                      All services are vetted for quality and compliance. Payments are held in escrow until completion.
                   </p>
                </div>
             </div>
        </div>
      </div>

      {showContactModal && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="bg-background rounded-none border border-border max-w-md w-full p-8 shadow-2xl relative">
            <button 
               onClick={() => setShowContactModal(false)}
               className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
               <span className="sr-only">Close</span>
               <div className="w-6 h-6 flex items-center justify-center text-xl">×</div>
            </button>
            
            <h2 className="text-2xl font-heading font-bold uppercase text-foreground mb-2 tracking-wide">
              Initial Inquiry
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
               Connect with {service.provider.fullName} regarding this service.
            </p>
            
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setShowContactModal(false);
                setMessage("");
              }}
            >
              <div className="space-y-1.5">
                <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground">
                  Subject Ref
                </label>
                <input
                  type="text"
                  readOnly
                  value={`REQ: ${service.name} [ID: ${service.id?.slice(0,6) || "N/A"}]`}
                  className="w-full px-4 py-3 border border-border rounded-none bg-muted/20 outline-none text-xs font-mono text-muted-foreground cursor-not-allowed"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground">
                  Message Details
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your project requirements..."
                  className="w-full px-4 py-3 border border-border rounded-none bg-background outline-none resize-none text-sm focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowContactModal(false)}
                  className="w-full rounded-none h-11 font-heading uppercase tracking-wider text-[10px]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-full rounded-none h-11 font-heading uppercase tracking-wider text-[10px]"
                >
                  Submit Inquiry
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
