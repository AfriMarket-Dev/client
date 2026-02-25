import { Outlet } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { type RootState } from "@/app/store";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "./admin/admin-sidebar";
import { AdminTopBar } from "./admin/admin-top-bar";

export const AdminLayout = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background font-body">
        <AdminSidebar user={user} />

        <SidebarInset className="flex-1 flex flex-col min-w-0 bg-background overflow-hidden relative border-l border-border">
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
