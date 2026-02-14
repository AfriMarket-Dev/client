import React, { useState } from "react";
import { Menu } from "lucide-react";
import {
  ProductManagement,
  MessageCenter,
  InquiriesList,
  AnalyticsDashboard,
  ProfileSettings,
} from "@/components/supplier";
import {
  DashboardSidebar,
  type DashboardTab,
} from "@/components/layout/admin/DashboardSidebar";
import { DashboardOverview } from "@/components/layout/admin/DashboardOverview";

interface SupplierDashboardProps {
  onLogout: () => void;
  supplierData: any;
}

const SupplierDashboard: React.FC<SupplierDashboardProps> = ({
  onLogout,
  supplierData,
}) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/30 flex">
      <DashboardSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onClose={() => setSidebarOpen(false)}
        onLogout={onLogout}
        supplierData={supplierData}
        isOpen={sidebarOpen}
      />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="bg-background border-b border-border lg:hidden p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="font-bold text-foreground uppercase tracking-wider text-sm">
              Provider Portal
            </span>
          </div>
          <div className="w-8 h-8 bg-muted rounded-full overflow-hidden border border-border">
            <img
              src={
                supplierData?.avatar ||
                "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
              }
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {activeTab === "overview" && (
            <DashboardOverview onAddProduct={() => setActiveTab("products")} />
          )}
          {activeTab === "products" && <ProductManagement />}
          {activeTab === "messages" && <MessageCenter role="provider" />}
          {activeTab === "inquiries" && <InquiriesList />}
          {activeTab === "analytics" && <AnalyticsDashboard />}
          {activeTab === "settings" && (
            <ProfileSettings supplierData={supplierData} />
          )}
        </main>
      </div>
    </div>
  );
};

export default SupplierDashboard;
