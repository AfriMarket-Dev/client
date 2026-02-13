import {
  BarChart3,
  Users,
  Package,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Flag,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";

export default function AdminDashboard() {
  const stats = [
    { label: "Verified Suppliers", value: "482", icon: ShieldCheck, change: "+12%", color: "text-emerald-600", bgColor: "bg-emerald-50" },
    { label: "Active Listings", value: "3,240", icon: Package, change: "+5%", color: "text-blue-600", bgColor: "bg-blue-50" },
    { label: "Platform Users", value: "12.5k", icon: Users, change: "+18%", color: "text-purple-600", bgColor: "bg-purple-50" },
    { label: "Pending Reports", value: "14", icon: AlertTriangle, change: "-2", color: "text-amber-600", bgColor: "bg-amber-50" },
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
      time: "2 hours ago"
    },
    {
      id: "REP-002",
      target: "River Sand Batch #44",
      type: "Listing",
      reason: "Misleading images",
      evidence: "User photo comparison",
      status: "reviewing",
      count: 1,
      time: "5 hours ago"
    }
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="bg-stone-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 african-pattern opacity-10 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <Badge className="bg-primary hover:bg-primary/90 border-none mb-4 font-black tracking-widest uppercase text-[10px]">Administrator</Badge>
            <h1 className="text-4xl md:text-6xl font-black font-display leading-tight">Platform Control</h1>
            <p className="text-stone-400 mt-2 text-lg font-medium max-w-md">Monitoring Rwanda's construction ecosystem and maintaining trust.</p>
          </div>
          <div className="flex gap-3">
            <Button size="xl" className="rounded-2xl h-16 px-8 font-black shadow-xl shadow-primary/20">
              Generate Audit Log
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <Card key={index} className="rounded-3xl border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden bg-white group">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${stat.bgColor} ${stat.color} group-hover:scale-110 transition-transform shadow-sm`}>
                  <stat.icon className="w-7 h-7" />
                </div>
                <Badge variant="outline" className={`border-none font-black text-xs ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {stat.change}
                </Badge>
              </div>
              <h3 className="font-bold text-stone-500 text-sm uppercase tracking-widest mb-1">{stat.label}</h3>
              <p className="text-4xl font-black text-stone-900">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Reports Queue */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-stone-900 font-display">Moderation Queue</h2>
              <Badge className="bg-red-100 text-red-600 border-none font-bold">Priority</Badge>
            </div>
            <Button variant="ghost" className="text-primary font-bold">View All Reports</Button>
          </div>

          <div className="space-y-4">
            {reports.map((report) => (
              <Card key={report.id} className="border-stone-200 rounded-[2rem] overflow-hidden bg-white hover:border-red-200 transition-colors">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="p-8 flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                          <Flag className="w-4 h-4 text-red-500" />
                        </div>
                        <span className="text-[10px] font-black text-stone-400 tracking-widest uppercase">{report.id}</span>
                        <Badge variant="secondary" className="bg-stone-100 text-stone-600 border-none uppercase text-[9px] font-black">
                          Target: {report.type}
                        </Badge>
                      </div>
                      
                      <h3 className="text-xl font-black text-stone-900 mb-2">{report.target}</h3>
                      <p className="text-sm font-bold text-red-600 mb-4">{report.reason}</p>
                      
                      <div className="flex items-center gap-6 text-xs font-bold text-stone-400 uppercase tracking-tighter">
                        <div className="flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>{report.count} Unique Reports</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <ArrowRight className="w-3.5 h-3.5" />
                          <span>Reported {report.time}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-stone-50/50 p-8 border-t md:border-t-0 md:border-l border-stone-100 flex flex-col justify-center gap-3 w-full md:w-64">
                      <Button className="w-full rounded-xl font-bold bg-stone-900 hover:bg-stone-800 text-xs">
                        Investigate Case
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 rounded-xl border-stone-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-100">
                          <CheckCircle2 className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" className="flex-1 rounded-xl border-stone-200 text-red-600 hover:bg-red-50 hover:border-red-100">
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions & Moderation Rules */}
        <div className="space-y-8">
          <h2 className="text-2xl font-black text-stone-900 font-display">System Actions</h2>
          
          <Card className="rounded-[2rem] border-stone-200 bg-white shadow-sm overflow-hidden">
            <CardHeader className="p-8 pb-0">
              <CardTitle className="text-lg font-black uppercase tracking-widest text-stone-400">Moderation Rules</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-stone-900">Auto-hide Listing</p>
                  <p className="text-xs text-stone-500 font-medium">Triggered after 3 unique reports within 7 days.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-stone-900">Auto-suspend Provider</p>
                  <p className="text-xs text-stone-500 font-medium">Triggered after 5 unique reports or serious breach.</p>
                </div>
              </div>
              <Separator />
              <Button variant="outline" className="w-full rounded-xl border-stone-200 font-bold h-12">
                Configure Rules
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] bg-stone-900 text-white border-none shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 african-pattern opacity-10 invert" />
            <CardContent className="p-8 relative z-10 text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-black mb-2">Review Verification</h3>
              <p className="text-stone-400 text-xs font-medium mb-8">8 suppliers are awaiting identity verification.</p>
              <Button className="w-full h-14 rounded-2xl font-black bg-primary hover:bg-primary/90">
                Open Verification Center
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
