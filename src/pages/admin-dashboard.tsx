import { ShieldCheck, Package, Users, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminStatCard } from "@/components/admin";
import { ModerationQueue } from "@/components/admin/dashboard/moderation-queue";
import { SystemActions } from "@/components/admin/dashboard/system-actions";

export default function AdminDashboard() {
  const stats = [
    {
      label: "Verified Suppliers",
      value: "482",
      icon: ShieldCheck,
      change: "+12%",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      label: "Active Listings",
      value: "3,240",
      icon: Package,
      change: "+5%",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Platform Users",
      value: "12.5k",
      icon: Users,
      change: "+18%",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      label: "Pending Reports",
      value: "14",
      icon: AlertTriangle,
      change: "-2",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ];

  const reports = [
    {
      id: "REP-001",
      target: "Kigali Steel Ltd",
      type: "Provider",
      reason: "Inaccurate price guide",
      evidence: "Chat logs attached",
      status: "pending",
      count: 3,
      time: "2 hours ago",
    },
    {
      id: "REP-002",
      target: "River Sand Batch #44",
      type: "Listing",
      reason: "Misleading images",
      evidence: "User photo comparison",
      status: "reviewing",
      count: 1,
      time: "5 hours ago",
    },
  ];

  return (
    <div className="space-y-8 pb-20">
      <AdminPageHeader
        title="Platform Control"
        subtitle="Monitoring Rwanda's construction ecosystem"
        badge="Administrator"
        actions={
          <Button className="rounded-sm h-14 px-8 font-heading font-bold uppercase tracking-wider bg-background text-foreground hover:bg-muted border border-transparent hover:border-border transition-all shadow-none">
            Generate Audit Log
          </Button>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <AdminStatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ModerationQueue reports={reports} />
        <SystemActions />
      </div>
    </div>
  );
}
