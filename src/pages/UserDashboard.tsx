import React, { useState } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "@/app/store";
import { Button } from "@/components/ui/Button";
import { 
  Plus, 
  Package, 
  MessageSquare, 
  Settings, 
  FileText, 
  CheckCircle2, 
  Clock,
  ArrowRight,
  ShieldCheck,
  Star
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import ReviewModal from "@/components/ReviewModal";

const UserDashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedAgreement, setSelectedAgreement] = useState<{provider: string, item: string} | null>(null);

  const agreements = [
    {
      id: "AGR-2024-001",
      provider: "Kigali Cement & Steel",
      item: "CIMERWA 32.5N (200 Bags)",
      status: "active",
      progress: 65,
      nextStep: "Delivery scheduled for Feb 15",
      amount: "RWF 2,500,000"
    },
    {
      id: "AGR-2024-002",
      provider: "Musanze Equipment Rental",
      item: "CAT 320 GC Excavator (3 Days)",
      status: "completed",
      progress: 100,
      nextStep: "Review pending",
      amount: "RWF 1,200,000"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <Badge className="bg-primary/10 text-primary border-none mb-4 font-bold">Buyer Account</Badge>
          <h1 className="text-4xl md:text-6xl font-black text-stone-900 font-display leading-tight">
            Muraho, {user?.name?.split(" ")[0] || "Buyer"}!
          </h1>
          <p className="text-stone-500 text-lg mt-2 font-medium">
            Manage your construction projects and supplier relationships.
          </p>
        </div>
        <div className="flex gap-3">
          <Button size="lg" className="rounded-2xl h-14 font-black shadow-xl shadow-primary/20 gap-2">
            <Plus className="w-5 h-5" />
            New Request
          </Button>
          <Button size="lg" variant="outline" className="rounded-2xl h-14 w-14 p-0 border-stone-200">
            <Settings className="w-5 h-5 text-stone-600" />
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="rounded-3xl border-stone-200 shadow-sm overflow-hidden bg-white group hover:border-primary/30 transition-all duration-300">
          <CardContent className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <FileText className="w-7 h-7" />
              </div>
              <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest text-stone-400">Quotes</Badge>
            </div>
            <h3 className="font-black text-stone-900 text-xl mb-1">Active Quotes</h3>
            <p className="text-4xl font-black text-primary">5</p>
            <div className="mt-4 flex items-center gap-2 text-stone-400 text-xs font-bold uppercase tracking-tighter">
              <Clock className="w-3.5 h-3.5" />
              2 awaiting response
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-stone-200 shadow-sm overflow-hidden bg-white group hover:border-primary/30 transition-all duration-300">
          <CardContent className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="h-14 w-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest text-stone-400">Agreements</Badge>
            </div>
            <h3 className="font-black text-stone-900 text-xl mb-1">In Progress</h3>
            <p className="text-4xl font-black text-blue-600">3</p>
            <div className="mt-4 flex items-center gap-2 text-stone-400 text-xs font-bold uppercase tracking-tighter">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              12 completed total
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-stone-200 shadow-sm overflow-hidden bg-white group hover:border-primary/30 transition-all duration-300">
          <CardContent className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="h-14 w-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-7 h-7" />
              </div>
              <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest text-stone-400">Inbox</Badge>
            </div>
            <h3 className="font-black text-stone-900 text-xl mb-1">Unread</h3>
            <p className="text-4xl font-black text-purple-600">8</p>
            <div className="mt-4 flex items-center gap-2 text-stone-400 text-xs font-bold uppercase tracking-tighter">
              <ArrowRight className="w-3.5 h-3.5" />
              Open conversation center
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Agreements List */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-stone-900 font-display underline decoration-primary decoration-4 underline-offset-8">
              My Agreements
            </h2>
            <Button variant="ghost" className="text-primary font-bold">View History</Button>
          </div>

          <div className="space-y-6">
            {agreements.map((agreement) => (
              <Card key={agreement.id} className="border-stone-200 hover:border-primary/30 transition-all duration-300 shadow-sm rounded-3xl overflow-hidden bg-white">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={agreement.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-500'}>
                          {agreement.status.toUpperCase()}
                        </Badge>
                        <span className="text-[10px] font-black text-stone-400 tracking-widest uppercase">{agreement.id}</span>
                      </div>
                      <h3 className="text-xl font-black text-stone-900 mb-1">{agreement.item}</h3>
                      <p className="text-sm font-bold text-primary">Provider: {agreement.provider}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-1">Agreement Total</p>
                      <p className="text-2xl font-black text-stone-900">{agreement.amount}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between text-xs font-black uppercase tracking-widest text-stone-500">
                      <span>Delivery Progress</span>
                      <span>{agreement.progress}%</span>
                    </div>
                    <Progress value={agreement.progress} className="h-3 bg-stone-100" />
                    <div className="flex items-center gap-2 text-sm font-bold text-stone-600 bg-stone-50 p-4 rounded-2xl">
                      <Clock className="w-4 h-4 text-primary" />
                      Next: {agreement.nextStep}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-stone-100 flex gap-4">
                    <Button className="flex-1 rounded-xl font-bold h-12" variant="secondary">
                      Message Provider
                    </Button>
                    {agreement.status === 'completed' && (
                      <Button 
                        className="flex-1 rounded-xl font-bold h-12 gap-2 shadow-lg shadow-amber-500/20" 
                        variant="default"
                        onClick={() => {
                          setSelectedAgreement({ provider: agreement.provider, item: agreement.item });
                          setReviewModalOpen(true);
                        }}
                      >
                        <Star className="w-4 h-4 fill-white" />
                        Leave Review
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar Context */}
        <div className="space-y-8">
          <h2 className="text-2xl font-black text-stone-900 font-display">Resources</h2>
          
          <Card className="rounded-3xl bg-foreground text-white border-none overflow-hidden relative shadow-xl">
            <div className="absolute inset-0 african-pattern opacity-10 invert" />
            <CardContent className="p-8 relative z-10">
              <h3 className="text-xl font-black mb-4">Need Help?</h3>
              <p className="text-stone-400 text-sm leading-relaxed mb-8 font-medium">
                Our support team is available from 8 AM to 6 PM (Kigali time) to assist with any provider issues.
              </p>
              <Button className="w-full h-14 rounded-2xl font-black bg-primary hover:bg-primary/90">
                Contact Support
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-stone-200 border-dashed bg-stone-50/50">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-stone-100 flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
              </div>
              <h3 className="font-black text-stone-900 mb-2">Build Your Trust</h3>
              <p className="text-stone-500 text-xs font-medium leading-relaxed">
                Complete more agreements and leave honest reviews to get preferred pricing from top suppliers.
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
