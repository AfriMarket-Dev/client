import { RiExternalLinkLine, RiMenuLine } from "@remixicon/react";
import { Link } from "@tanstack/react-router";
import type React from "react";
import { lazy, Suspense, useState } from "react";
import { DashboardOverview } from "@/components/layout/admin/dashboard-overview";
import { DashboardSidebar } from "@/components/layout/admin/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RouteLoading } from "@/shared/components/route-loading";
import type { Company, DashboardTab } from "@/types";

const AnalyticsDashboard = lazy(() => import("./analytics-dashboard"));
// const MessageCenter = lazy(() => import("./message-center")); // Deleted in messaging refactor
const ProductManagement = lazy(() => import("./product-management"));
const ProfileSettings = lazy(() => import("./profile-settings"));

interface ProviderDashboardProps {
	onLogout: () => void;
	providerData: Company | null;
}

const ProviderDashboard: React.FC<ProviderDashboardProps> = ({
	onLogout,
	providerData,
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
				providerData={providerData}
				isOpen={sidebarOpen}
			/>

			{sidebarOpen ? (
				<div
					role="button"
					tabIndex={0}
					className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-40 lg:hidden"
					onClick={() => setSidebarOpen(false)}
					onKeyDown={(e) => e.key === "Enter" && setSidebarOpen(false)}
				/>
			) : null}

			<div className="flex-1 flex flex-col h-screen overflow-hidden">
				{/* Dashboard Header */}
				<header className="bg-background border-b border-border h-16 shrink-0 px-4 md:px-8 flex items-center justify-between z-30 sticky top-0">
					<div className="flex items-center gap-3">
						<button
							type="button"
							onClick={() => setSidebarOpen(true)}
							className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
						>
							<RiMenuLine className="w-6 h-6" />
						</button>
						<span className="font-heading font-black text-foreground uppercase tracking-[0.2em] text-[11px]">
							Karibu <span className="text-primary mx-1.5">/</span> Provider
							Portal
						</span>
					</div>

					<div className="flex items-center gap-4 md:gap-8">
						<Link to="/">
							<Button
								variant="ghost"
								size="sm"
								className="text-[10px] font-black uppercase tracking-widest gap-2 h-9 px-4 border border-transparent hover:border-border hidden sm:flex"
							>
								<RiExternalLinkLine size={14} />
								Public Site
							</Button>
							<Button variant="ghost" size="icon" className="sm:hidden h-9 w-9">
								<RiExternalLinkLine size={16} />
							</Button>
						</Link>

						<div className="flex items-center gap-3 pl-4 md:pl-8 border-l border-border">
							<div className="text-right hidden md:block">
								<p className="text-[10px] font-bold uppercase text-foreground leading-none">
									{providerData?.name || "Verified Provider"}
								</p>
								<p className="text-[9px] font-mono text-muted-foreground mt-1">
									SUPPLIER PROFILE
								</p>
							</div>
							<div className="w-9 h-9 bg-muted rounded-none overflow-hidden border border-border">
								<img
									// biome-ignore lint/suspicious/noExplicitAny: bypass generic property
									src={(providerData as any)?.avatar || "/logo.svg"}
									className="w-full h-full object-cover"
									alt=""
									onError={(e) => {
										e.currentTarget.src = "/image-fallback.svg";
									}}
								/>
							</div>
						</div>
					</div>
				</header>

				<main
					className={cn(
						"flex-1 p-4 lg:p-8",
						activeTab === "messages"
							? "overflow-hidden flex flex-col"
							: "overflow-y-auto",
					)}
				>
					<Suspense fallback={<RouteLoading />}>
						{activeTab === "overview" ? (
							<DashboardOverview
								onAddProduct={() => setActiveTab("products")}
							/>
						) : null}
						{activeTab === "products" ? <ProductManagement /> : null}
						{activeTab === "messages" || activeTab === "inquiries" ? (
							<div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-muted/20 border-2 border-dashed border-border/50">
								<h3 className="text-sm font-black uppercase tracking-widest text-foreground mb-2">
									Message Center Relocated
								</h3>
								<p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 max-w-sm leading-relaxed mb-6">
									The provider messaging system has been integrated into the
									unified global communication hub for a better experience.
								</p>
								<Link to="/messages">
									<Button className="rounded-none font-black uppercase tracking-widest text-[10px] px-8 h-11 shadow-lg shadow-primary/20">
										Open Messages
									</Button>
								</Link>
							</div>
						) : null}
						{activeTab === "analytics" ? <AnalyticsDashboard /> : null}
						{activeTab === "settings" ? (
							<ProfileSettings providerData={providerData} />
						) : null}
					</Suspense>
				</main>
			</div>
		</div>
	);
};

export default ProviderDashboard;
