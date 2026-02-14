import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "@/app/store";
import { SidebarInset, SidebarProvider } from "@/components/ui/Sidebar";
import { AdminSidebar } from "./admin/AdminSidebar";
import { AdminTopBar } from "./admin/AdminTopBar";

export const AdminLayout = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background font-body">
        <AdminSidebar user={user} />

        <SidebarInset className="flex-1 flex flex-col min-w-0 bg-background overflow-hidden relative border-l-2 border-border">
          <div
            className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <AdminTopBar user={user} />

          <main className="flex-1 overflow-auto relative z-10">
            <div className="max-w-7xl mx-auto p-8">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
