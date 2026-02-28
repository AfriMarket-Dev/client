import { useRouter } from "@tanstack/react-router";
import {
  RiBuildingLine,
  RiCalendarLine,
  RiCheckboxCircleLine,
  RiArrowLeftSLine,
  RiTimeLine,
  RiHeartLine,
  RiHeartFill,
  RiMailLine,
  RiMapPinLine,
  RiChat1Line,
  RiChat3Line,
  RiPhoneLine,
  RiShieldCheckLine,
  RiStarLine,
  RiStarFill,
} from "@remixicon/react";
import { Package } from "lucide-react";
import { useId, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useLogInteractionMutation } from "@/app/api/interactions";
import { useStartServiceChatMutation } from "@/app/api/messages";
import {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "@/app/api/wishlist";
import type { RootState } from "@/app/store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ServiceViewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  service: Record<string, unknown> & { [key: string]: any };
  onBack?: () => void;
}

export default function ServiceView({ service, onBack }: ServiceViewProps) {
  const router = useRouter();
  const formId = useId();
  const [showContactModal, setShowContactModal] = useState(false);
  const [message, setMessage] = useState("");

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.history.back();
    }
  };

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { data: wishlist = [] } = useGetWishlistQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [startServiceChat, { isLoading: sendingInquiry }] =
    useStartServiceChatMutation();
  const [logInteraction] = useLogInteractionMutation();

  // resolve contact info from real data
  const phone: string =
    service?.company?.phone ?? service?.provider?.phone ?? "";
  const email: string =
    service?.company?.email ?? service?.provider?.email ?? "";

  const trackAndNavigate = (
    type: "CALL_CLICK" | "EMAIL_CLICK" | "WHATSAPP_CLICK",
    href: string,
  ) => {
    logInteraction({ type, serviceId: service.id });
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const isInWishlist =
    Array.isArray(wishlist) && wishlist.some((l: any) => l.id === service.id);

  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to add to wishlist");
      return;
    }
    try {
      if (isInWishlist) {
        await removeFromWishlist({ id: service.id, type: "service" }).unwrap();
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist({ id: service.id, type: "service" }).unwrap();
        toast.success("Added to wishlist");
      }
    } catch {
      toast.error("Failed to update wishlist");
    }
  };

  return (
    <div className="min-h-screen bg-background space-y-6 overflow-x-hidden pb-24 md:pb-12 industrial-grain">
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border px-3 py-2 z-50 flex items-center gap-1.5 safe-area-bottom shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        {phone && (
          <button
            type="button"
            onClick={() => trackAndNavigate("CALL_CLICK", `tel:${phone}`)}
            className="flex-none w-11 h-11 flex items-center justify-center rounded-sm bg-muted border border-border text-foreground active:bg-accent transition-colors"
          >
            <RiPhoneLine className="w-4 h-4" />
          </button>
        )}
        {phone && (
          <button
            type="button"
            onClick={() =>
              trackAndNavigate(
                "WHATSAPP_CLICK",
                `https://wa.me/${phone.replace(/\D/g, "")}`,
              )
            }
            className="flex-none w-11 h-11 flex items-center justify-center rounded-sm bg-emerald-500 text-white active:bg-emerald-600 transition-colors"
          >
            <RiChat1Line className="w-5 h-5" />
          </button>
        )}
        <Button
          variant="outline"
          size="icon"
          className="flex-none w-11 h-11 rounded-sm border-primary/20 text-primary active:bg-primary/10 transition-colors"
          onClick={handleToggleWishlist}
        >
          {isInWishlist ? (
            <RiHeartFill className="w-5 h-5 text-primary" />
          ) : (
            <RiHeartLine className="w-5 h-5" />
          )}
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="flex-1 font-heading font-bold uppercase tracking-widest text-[10px] h-11 rounded-none border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
          onClick={() => setShowContactModal(true)}
        >
          <RiChat3Line className="w-3.5 h-3.5 mr-1.5" />
          Message
        </Button>
        <Button
          size="lg"
          className="flex-[1.5] font-heading font-bold uppercase tracking-widest text-[10px] h-11 rounded-none bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20 transition-all duration-300"
          onClick={() => setShowContactModal(true)}
        >
          Inquire
        </Button>
      </div>

      {/* header */}
      <div className="items-center justify-between hidden md:flex py-8 px-6 text-sm max-w-[1600px] mx-auto w-full">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="gap-2 font-heading uppercase tracking-wider text-xs rounded-sm pl-0 hover:bg-transparent hover:text-primary transition-colors text-muted-foreground"
        >
          <RiArrowLeftSLine size={16} />
          Back to Marketplace
        </Button>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="font-heading uppercase tracking-wider text-xs rounded-sm border-primary/20 text-primary hover:bg-primary/5 transition-colors gap-2"
            onClick={handleToggleWishlist}
          >
            {isInWishlist ? (
              <RiHeartFill className="w-4 h-4 text-primary" />
            ) : (
              <RiHeartLine className="w-4 h-4" />
            )}
            {isInWishlist ? "Saved to Wishlist" : "Save to Wishlist"}
          </Button>
        </div>
      </div>

      {/* Mobile Edge-to-Edge Header */}
      <div className="md:hidden -mt-4 mb-8 relative h-[40vh] bg-background flex flex-col justify-end p-6 overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />

        <div className="relative z-10 space-y-4">
          <Badge className="bg-primary text-white border-none uppercase text-[10px] font-bold tracking-[0.2em] px-3 py-1 rounded-none shadow-lg">
            Service Listing
          </Badge>
          <h1 className="text-4xl font-display font-black uppercase text-foreground tracking-tighter leading-[0.85]">
            {service.name}
          </h1>
        </div>

        {/* Back Button Overlay */}
        <button
          onClick={handleBack}
          className="absolute top-6 left-6 w-10 h-10 border border-border bg-background/80 backdrop-blur-sm rounded-none flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-sm"
          type="button"
        >
          <RiArrowLeftSLine className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-8 space-y-16">
          <div className="hidden md:block pb-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4 text-primary">
                <div className="w-12 h-px bg-primary/30" />
                <span className="font-heading font-bold uppercase tracking-[0.3em] text-[10px] text-muted-foreground whitespace-nowrap">
                  Service
                </span>
                <div className="flex-1 h-px bg-border/20" />
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black uppercase text-foreground tracking-tighter leading-[0.8] max-w-4xl">
                {service.name}
              </h1>

              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-7">
                  <p className="text-xl text-muted-foreground font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="md:col-span-1 hidden md:flex justify-center pt-2">
                  <div className="w-px h-24 bg-border/30" />
                </div>
                <div className="md:col-span-4 flex flex-col justify-end">
                  <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-2 opacity-60">
                    Starting Professional Tier
                  </div>
                  <div className="text-3xl font-heading font-black text-foreground">
                    RWF {Number(service.price).toLocaleString()}
                  </div>

                  <Button
                    onClick={() => setShowContactModal(true)}
                    size="lg"
                    className="mt-6 rounded-none h-14 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-heading font-bold uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-primary/20"
                  >
                    <RiChat3Line size={16} className="mr-2" />
                    Place Inquiry
                  </Button>
                </div>
              </div>
            </div>
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
            <p className="text-sm text-muted-foreground leading-relaxed">
              {service.description}
            </p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList variant="line">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-16 mt-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/20 border border-border/20 overflow-hidden">
                {[
                  {
                    label: "Execution Time",
                    value: "~2 Hrs",
                    icon: RiTimeLine,
                  },
                  {
                    label: "Track Record",
                    value: "203+ Jobs",
                    icon: RiCheckboxCircleLine,
                  },
                  { label: "Performance", value: "4.9/5.0", icon: RiStarLine },
                  {
                    label: "Industry Since",
                    value: "2021",
                    icon: RiCalendarLine,
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-background/40 backdrop-blur-xs p-8 group hover:bg-background transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    <stat.icon className="w-5 h-5 text-primary mb-6 opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                    <div className="space-y-1">
                      <div className="text-[9px] text-muted-foreground uppercase font-black tracking-[0.2em]">
                        {stat.label}
                      </div>
                      <div className="text-2xl font-bold font-heading text-foreground tracking-tight">
                        {stat.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-16">
                <div className="space-y-8">
                  <h3 className="font-heading font-black uppercase text-xs tracking-[0.4em] text-foreground/40 pb-4 border-b border-border/40">
                    Service Deliverables
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Precision data collection",
                      "High-accuracy reporting",
                      "Industry standard formats",
                      "Certified professional survey",
                      "Site-wide accessibility",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-5 group">
                        <div className="mt-1.5 w-1 h-1 bg-primary shrink-0 transition-transform group-hover:rotate-45" />
                        <span className="text-sm font-medium text-foreground/80 leading-snug group-hover:text-foreground transition-colors">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-8">
                  <h3 className="font-heading font-black uppercase text-xs tracking-[0.4em] text-foreground/40 pb-4 border-b border-border/40">
                    Operational Workflow
                  </h3>
                  <div className="space-y-8 pt-2">
                    {[
                      { step: "I", label: "Consultation" },
                      { step: "II", label: "Assessment" },
                      { step: "III", label: "Execution" },
                      { step: "IV", label: "Final Phase" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-6 group">
                        <span className="text-[10px] font-black font-heading text-primary/40 group-hover:text-primary transition-colors">
                          {item.step}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/60 group-hover:text-foreground transition-colors mr-auto">
                          {item.label}
                        </span>
                        <div className="w-12 h-px bg-border group-hover:w-24 group-hover:bg-primary transition-all duration-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="products" className="mt-8">
              <div className="border border-border border-dashed p-12 text-center text-muted-foreground bg-muted/5">
                <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="font-heading font-bold uppercase tracking-wide mb-2">
                  No Products Listed
                </h3>
                <p className="text-sm max-w-sm mx-auto">
                  This provider hasn't listed any separate products yet. Check
                  back later or inquire directly.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <div className="border border-border p-8 bg-muted/5 space-y-8">
                <div className="flex items-center gap-6 pb-8 border-b border-border">
                  <div className="text-center">
                    <div className="text-5xl font-black font-heading text-foreground">
                      4.9
                    </div>
                    <div className="flex gap-1 justify-center my-2 text-primary text-xs">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <RiStarFill key={i} className="w-4 h-4 fill-primary" />
                      ))}
                    </div>
                    <div className="text-xs uppercase font-bold tracking-wider text-muted-foreground">
                      203 Reviews
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((rating, i) => (
                      <div
                        key={rating}
                        className="flex items-center gap-3 text-xs"
                      >
                        <span className="font-bold w-3">{rating}</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{
                              width: i === 0 ? "85%" : i === 1 ? "10%" : "2%",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="border-b border-border/40 pb-6 last:border-0 last:pb-0"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-sm uppercase">
                            John Doe
                          </h4>
                          <span className="text-xs text-muted-foreground uppercase tracking-widest">
                            Feb 14, 2026
                          </span>
                        </div>
                        <div className="flex gap-0.5 text-primary">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <RiStarFill
                              key={s}
                              className="w-3 h-3 fill-primary"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        "Exceptional service delivery. The team was
                        professional, timely, and the final report was exactly
                        what we needed for our compliance audit."
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
                    {email && (
                      <button
                        type="button"
                        onClick={() =>
                          trackAndNavigate("EMAIL_CLICK", `mailto:${email}`)
                        }
                        className="flex items-center gap-4 p-4 border border-border bg-background hover:border-primary/50 hover:bg-muted/10 transition-colors group text-left w-full"
                      >
                        <div className="w-10 h-10 bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                          <RiMailLine className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
                            Email Us
                          </div>
                          <div className="font-bold text-foreground">
                            {email}
                          </div>
                        </div>
                      </button>
                    )}
                    {phone && (
                      <button
                        type="button"
                        onClick={() =>
                          trackAndNavigate("CALL_CLICK", `tel:${phone}`)
                        }
                        className="flex items-center gap-4 p-4 border border-border bg-background hover:border-primary/50 hover:bg-muted/10 transition-colors group text-left w-full"
                      >
                        <div className="w-10 h-10 bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                          <RiPhoneLine className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
                            Call Us
                          </div>
                          <div className="font-bold text-foreground">
                            {phone}
                          </div>
                        </div>
                      </button>
                    )}
                    {phone && (
                      <button
                        type="button"
                        onClick={() =>
                          trackAndNavigate(
                            "WHATSAPP_CLICK",
                            `https://wa.me/${phone.replace(/\D/g, "")}`,
                          )
                        }
                        className="flex items-center gap-4 p-4 border border-border bg-background hover:border-primary/50 hover:bg-muted/10 transition-colors group text-left w-full"
                      >
                        <div className="w-10 h-10 bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0">
                          <RiChat1Line className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
                            WhatsApp
                          </div>
                          <div className="font-bold text-emerald-600">
                            {phone}
                          </div>
                        </div>
                      </button>
                    )}
                    {!email && !phone && (
                      <p className="text-sm text-muted-foreground">
                        No contact details available. Use the message button.
                      </p>
                    )}
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
                        <RiMapPinLine className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                          Location
                        </span>
                      </div>
                      <div className="font-bold text-sm">
                        Cape Town, South Africa
                      </div>
                    </div>
                    <div className="bg-background p-4">
                      <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                        <RiBuildingLine className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                          Established
                        </span>
                      </div>
                      <div className="font-bold text-sm">2021</div>
                    </div>
                    <div className="bg-background p-4">
                      <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                        <Package className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                          Total Products
                        </span>
                      </div>
                      <div className="font-bold text-sm">134 items</div>
                    </div>
                    <div className="bg-background p-4">
                      <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                        <RiStarLine className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                          Rating
                        </span>
                      </div>
                      <div className="font-bold text-sm text-primary">
                        4.9/5.0{" "}
                        <span className="text-muted-foreground font-normal text-xs">
                          (203 reviews)
                        </span>
                      </div>
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

          {/* Provider ID Card */}
          <div className="border border-border bg-background rounded-none relative overflow-hidden group">
            <div className="p-8">
              <h3 className="text-[9px] font-heading font-black uppercase text-muted-foreground mb-8 tracking-[0.4em] flex justify-between items-center">
                <span>Verification Profile</span>
                <span className="text-primary flex items-center gap-1.5">
                  <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
                  LIVE
                </span>
              </h3>

              <div className="flex items-center gap-6 mb-10">
                <div className="w-20 h-20 bg-muted border border-border rounded-none flex items-center justify-center text-3xl font-display font-black text-foreground relative group-hover:scale-105 transition-transform duration-500">
                  <div className="absolute inset-0 border border-primary opacity-0 group-hover:opacity-100 transition-opacity translate-x-1 translate-y-1" />
                  {service.provider.fullName.charAt(0)}
                </div>
                <div className="space-y-1">
                  <h4 className="font-display font-black text-2xl uppercase tracking-tighter text-foreground leading-[0.85]">
                    {service.provider.fullName}
                  </h4>
                  <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">
                    {service.provider.role}
                  </p>
                  <div className="flex items-center gap-1 mt-3">
                    <RiStarFill className="w-3 h-3 text-primary" />
                    <span className="text-xs font-bold font-heading">
                      {service.provider.rating}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest ml-1">
                      (203 Jobs)
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-px bg-border mb-8">
                <div className="bg-background p-4">
                  <span className="block text-[8px] uppercase font-black text-muted-foreground tracking-[0.3em] mb-2">
                    Tenure
                  </span>
                  <span className="block text-sm font-bold font-heading">
                    {service.provider.experience}
                  </span>
                </div>
                <div className="bg-background p-4">
                  <span className="block text-[8px] uppercase font-black text-muted-foreground tracking-[0.3em] mb-2">
                    Response
                  </span>
                  <span className="block text-sm font-bold font-heading text-emerald-600">
                    2H FAST
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full rounded-none border-border h-12 font-heading font-black uppercase tracking-[0.3em] text-[9px] hover:bg-foreground hover:text-background transition-colors"
                onClick={() =>
                  router.navigate({ to: `/suppliers/${service.company?.id}` })
                }
              >
                View Professional Bio
              </Button>
            </div>
          </div>

          {/* Security Badge */}
          <div className="bg-foreground text-background p-8 rounded-none relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/20 -mr-8 -mt-8 rotate-45" />
            <RiShieldCheckLine className="w-8 h-8 opacity-20 mb-6" />
            <h4 className="font-display font-black text-lg uppercase tracking-tight mb-3">
              Elite Standard Guarantee
            </h4>
            <p className="text-xs text-background/60 leading-relaxed font-medium">
              Enterprise-grade vetting. Quality assurance protocols strictly
              enforced for every engagement.
            </p>
          </div>
        </div>
      </div>

      {showContactModal && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="bg-background rounded-none border border-border max-w-md w-full p-8 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">Close</span>
              <div className="w-6 h-6 flex items-center justify-center text-xl">
                ×
              </div>
            </button>

            <h2 className="text-2xl font-heading font-bold uppercase text-foreground mb-2 tracking-wide">
              Initial Inquiry
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Connect with{" "}
              {service.provider?.fullName ??
                service.company?.name ??
                "the provider"}{" "}
              regarding this service.
            </p>

            <form
              className="space-y-5"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!message.trim()) {
                  toast.error("Please enter your inquiry message.");
                  return;
                }
                try {
                  await startServiceChat({
                    serviceId: service.id,
                    content: message.trim(),
                  }).unwrap();
                  toast.success("Inquiry sent successfully!");
                  setShowContactModal(false);
                  setMessage("");
                  router.navigate({ to: "/messages" });
                } catch (err) {
                  console.error(err);
                  toast.error("Failed to send inquiry.");
                }
              }}
            >
              <div className="space-y-1.5">
                <label
                  htmlFor={`${formId}-subject`}
                  className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground"
                >
                  Subject Ref
                </label>
                <input
                  id={`${formId}-subject`}
                  type="text"
                  readOnly
                  value={`REQ: ${service.name} [ID: ${service.id?.slice(0, 6) || "N/A"}]`}
                  className="w-full px-4 py-3 border border-border rounded-none bg-muted/20 outline-none text-xs font-mono text-muted-foreground cursor-not-allowed"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor={`${formId}-message`}
                  className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground"
                >
                  Message Details
                </label>
                <textarea
                  id={`${formId}-message`}
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
                  disabled={!message.trim() || sendingInquiry}
                  className="w-full rounded-none h-11 font-heading uppercase tracking-wider text-[10px] bg-primary text-white hover:bg-primary/90"
                >
                  {sendingInquiry ? "Sending..." : "Submit Inquiry"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
