import React, { useState } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import {
  Plus,
  MessageSquare,
  Settings,
  FileText,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ReviewModal } from "@/components/common/review-modal";

const UserDashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedAgreement, setSelectedAgreement] = useState<{
    provider: string;
    item: string;
  } | null>(null);

  const agreements = [
    {
      id: "AGR-2024-001",
      provider: "Kigali Cement & Steel",
      item: "CIMERWA 32.5N (200 Bags)",
      status: "active",
      progress: 65,
      nextStep: "Delivery scheduled for Feb 15",
      amount: "RWF 2,500,000",
    },
    {
      id: "AGR-2024-002",
      provider: "Musanze Equipment Rental",
      item: "CAT 320 GC Excavator (3 Days)",
      status: "completed",
      progress: 100,
      nextStep: "Review pending",
      amount: "RWF 1,200,000",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <Badge className="bg-primary/10 text-primary border-none mb-3 font-heading font-bold uppercase tracking-wider text-xs">
            Buyer Dashboard
          </Badge>
          <h1 className="text-4xl font-heading font-bold uppercase text-foreground leading-tight tracking-wide">
            Muraho, {user?.name?.split(" ")[0] || "Buyer"}!
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            Manage your construction projects and supplier relationships.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            size="lg"
            className="rounded-sm h-12 font-heading font-bold uppercase tracking-wider gap-2"
          >
            <Plus className="w-5 h-5" />
            New Request
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-sm border border-border h-12 w-12 p-0"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="rounded-sm border border-border shadow-none bg-card group hover:border-primary transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-5">
              <div className="h-12 w-12 bg-primary/10 rounded-sm flex items-center justify-center text-primary border border-primary/20">
                <FileText className="w-6 h-6" />
              </div>
              <Badge
                variant="outline"
                className="text-[10px] font-heading font-bold uppercase tracking-widest border-border"
              >
                Quotes
              </Badge>
            </div>
            <h3 className="font-heading font-bold uppercase text-foreground text-sm mb-1 tracking-wide">
              Active Quotes
            </h3>
            <p className="text-3xl font-heading font-black text-primary">5</p>
            <div className="mt-3 flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-wide">
              <Clock className="w-3.5 h-3.5" />2 awaiting response
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-sm border border-border shadow-none bg-card group hover:border-primary transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-5">
              <div className="h-12 w-12 bg-muted rounded-sm flex items-center justify-center text-foreground border border-border">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <Badge
                variant="outline"
                className="text-[10px] font-heading font-bold uppercase tracking-widest border-border"
              >
                Agreements
              </Badge>
            </div>
            <h3 className="font-heading font-bold uppercase text-foreground text-sm mb-1 tracking-wide">
              In Progress
            </h3>
            <p className="text-3xl font-heading font-black text-foreground">
              3
            </p>
            <div className="mt-3 flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-wide">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
              12 completed total
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-sm border border-border shadow-none bg-card group hover:border-primary transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-5">
              <div className="h-12 w-12 bg-muted rounded-sm flex items-center justify-center text-foreground border border-border">
                <MessageSquare className="w-6 h-6" />
              </div>
              <Badge
                variant="outline"
                className="text-[10px] font-heading font-bold uppercase tracking-widest border-border"
              >
                Inbox
              </Badge>
            </div>
            <h3 className="font-heading font-bold uppercase text-foreground text-sm mb-1 tracking-wide">
              Unread
            </h3>
            <p className="text-3xl font-heading font-black text-foreground">
              8
            </p>
            <div className="mt-3 flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-wide">
              <ArrowRight className="w-3.5 h-3.5" />
              Open inbox
            </div>
          </CardContent>
        </Card>
      </div>

      {/* main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* agreements list */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-heading font-bold uppercase text-foreground tracking-widest border-b-2 border-primary pb-2 inline-block">
              My Agreements
            </h2>
            <Button
              variant="ghost"
              className="text-primary font-heading font-bold uppercase tracking-wider text-xs rounded-sm"
            >
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {agreements.map((agreement) => (
              <Card
                key={agreement.id}
                className="border border-border hover:border-primary transition-all duration-300 shadow-none rounded-sm bg-card"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          className={`${agreement.status === "completed" ? "bg-primary" : "bg-muted text-foreground"} uppercase text-xs font-heading font-bold tracking-wider`}
                        >
                          {agreement.status}
                        </Badge>
                        <span className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">
                          {agreement.id}
                        </span>
                      </div>
                      <h3 className="text-lg font-heading font-bold uppercase text-foreground mb-1 tracking-wide">
                        {agreement.item}
                      </h3>
                      <p className="text-sm font-bold text-primary uppercase tracking-wide">
                        Provider: {agreement.provider}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-heading font-bold uppercase tracking-widest text-muted-foreground mb-1">
                        Amount
                      </p>
                      <p className="text-2xl font-heading font-black text-foreground">
                        {agreement.amount}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-heading font-bold uppercase tracking-widest text-muted-foreground">
                      <span>Progress</span>
                      <span>{agreement.progress}%</span>
                    </div>
                    <Progress
                      value={agreement.progress}
                      className="h-2 bg-muted"
                    />
                    <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground bg-muted p-3 rounded-sm">
                      <Clock className="w-4 h-4 text-primary" />
                      Next: {agreement.nextStep}
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t-2 border-border flex gap-3">
                    <Button
                      className="flex-1 rounded-sm font-heading font-bold uppercase tracking-wider h-11 text-xs"
                      variant="secondary"
                    >
                      Message Provider
                    </Button>
                    {agreement.status === "completed" && (
                      <Button
                        className="flex-1 rounded-sm font-heading font-bold uppercase tracking-wider h-11 gap-2 text-xs"
                        variant="default"
                        onClick={() => {
                          setSelectedAgreement({
                            provider: agreement.provider,
                            item: agreement.item,
                          });
                          setReviewModalOpen(true);
                        }}
                      >
                        <Star className="w-4 h-4" />
                        Review
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* sidebar */}
        <div className="space-y-6">
          <h2 className="text-xl font-heading font-bold uppercase text-foreground tracking-widest">
            Resources
          </h2>

          <Card className="rounded-sm bg-foreground text-background border-none overflow-hidden relative">
            <div className="absolute inset-0 african-pattern opacity-10 invert" />
            <CardContent className="p-6 relative z-10">
              <h3 className="text-lg font-heading font-bold uppercase mb-3 tracking-wide">
                Need Help?
              </h3>
              <p className="text-background/70 text-sm leading-relaxed mb-6">
                Support available from 8 AM to 6 PM (Kigali time).
              </p>
              <Button className="w-full h-12 rounded-sm font-heading font-bold uppercase tracking-wider bg-primary hover:bg-primary/90">
                Contact Support
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-sm border border-dashed border-border bg-muted/50">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 bg-background rounded-sm border border-border flex items-center justify-center mx-auto mb-5">
                <Star className="w-7 h-7 text-amber-500 fill-amber-500" />
              </div>
              <h3 className="font-heading font-bold uppercase text-foreground mb-2 tracking-wide">
                Build Trust
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Complete more agreements and leave honest reviews to get
                preferred pricing.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        providerName={selectedAgreement?.provider || ""}
        itemName={selectedAgreement?.item || ""}
      />
    </div>
  );
};

export default UserDashboard;
