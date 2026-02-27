import { Outlet } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./admin/admin-sidebar";
import { Separator } from "@/components/ui/separator";

export const AdminLayout = () => {
	const { user } = useSelector((state: RootState) => state.auth);

	return (
		<SidebarProvider>
			<AdminSidebar user={user} />
			<SidebarInset className="flex flex-col bg-background">
				<header className="flex h-16 shrink-0 items-center gap-2 border-b border-border px-6 sticky top-0 bg-background z-20">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<div className="flex-1 flex items-center justify-between">
						<h2 className="text-sm font-heading font-bold uppercase tracking-widest text-muted-foreground">
							AfrikaMarket <span className="text-primary mx-2">/</span> Admin Control
						</h2>
						<div className="flex items-center gap-4">
							<div className="text-right hidden sm:block">
								<p className="text-[10px] font-bold uppercase text-foreground leading-none">
									{user?.name}
								</p>
								<p className="text-[9px] font-mono text-muted-foreground mt-1">
									{user?.role?.toUpperCase()}
								</p>
							</div>
						</div>
					</div>
				</header>
				<main className="flex-1 overflow-auto">
					<div className="px-8 md:px-12 lg:px-16 py-10 max-w-[1800px] mx-auto">
						<Outlet />
					</div>
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
};
