import React from "react";
import { Package, Users, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { AdminCard } from "@/components/admin";

export const SystemActions: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-heading font-bold text-foreground uppercase tracking-wide border-b-2 border-border pb-4">
      System Actions
    </h2>

    <AdminCard title="Moderation Rules">
      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-sm bg-amber-50 flex items-center justify-center shrink-0 border border-amber-100">
            <Package className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-heading font-bold text-foreground uppercase tracking-wide">
              Auto-hide Listing
            </p>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-1">
              3 unique reports / 7 days
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-sm bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
            <Users className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-heading font-bold text-foreground uppercase tracking-wide">
              Auto-suspend Provider
            </p>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-1">
              5 reports or breach
            </p>
          </div>
        </div>
        <Separator className="bg-border h-[2px]" />
        <Button
          variant="outline"
          className="w-full rounded-sm border border-border font-heading font-bold uppercase tracking-wider h-11 hover:bg-muted text-xs shadow-none"
        >
          Configure Rules
        </Button>
      </div>
    </AdminCard>

    <div className="bg-foreground text-background border-none shadow-none overflow-hidden relative p-6 rounded-sm">
      <div className="absolute inset-0 african-pattern opacity-10 invert pointer-events-none" />
      <div className="relative z-10 text-center">
        <div className="w-12 h-12 bg-background/10 rounded-sm flex items-center justify-center mx-auto mb-4 border border-background/20">
          <ShieldCheck className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-lg font-heading font-bold uppercase tracking-wide mb-2">
          Verification Queue
        </h3>
        <p className="text-muted-foreground text-xs font-medium mb-6 uppercase tracking-wider">
          8 suppliers awaiting review
        </p>
        <Button className="w-full h-12 rounded-sm font-heading font-bold uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground shadow-none">
          Open Center
        </Button>
      </div>
    </div>
  </div>
);
