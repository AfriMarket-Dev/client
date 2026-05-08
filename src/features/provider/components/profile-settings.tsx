import {
	RiArrowRightSLine,
	RiBuilding2Line,
	RiLockLine,
	RiShieldUserLine,
	RiUserLine,
} from "@remixicon/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/shared/components/admin/page-header";
import { cn } from "@/lib/utils";
import { CompanyInfoSection } from "./settings/company-info-section";
import { ProfileInfoSection } from "./settings/profile-info-section";
import { useGetProfileQuery } from "@/services/api/users";
import type { Company } from "@/types";

interface ProviderProfileSettingsProps {
	providerData: Company | null;
}

export function ProviderProfileSettings({ providerData }: ProviderProfileSettingsProps) {
	const [activeTab, setActiveTab] = useState<"profile" | "company" | "security">(
		"profile",
	);

	const { data: userProfile, isLoading: loadingProfile } = useGetProfileQuery();

	const tabs = [
		{ id: "profile", label: "Personal Identity", icon: RiUserLine },
		{ id: "company", label: "Enterprise Data", icon: RiBuilding2Line },
		{ id: "security", label: "Access & Security", icon: RiLockLine },
	];

	if (loadingProfile) {
		return <div className="p-12 text-center text-muted-foreground animate-pulse">Synchronizing records...</div>;
	}

	return (
		<div className="space-y-8 pb-20">
			<PageHeader
				title="Account Architecture"
				subtitle="Manage your personal profile and corporate entity credentials"
				badge="Management Console"
			/>

			<div className="flex flex-col lg:flex-row gap-10">
				{/* Navigation Sidebar */}
				<aside className="w-full lg:w-72 shrink-0">
					<div className="bg-card border border-border p-2 sticky top-24 rounded-none shadow-none">
						<div className="space-y-1">
							{tabs.map((tab) => (
								<button
									key={tab.id}
									type="button"
									onClick={() => setActiveTab(tab.id as any)}
									className={cn(
										"w-full flex items-center justify-between px-4 py-4 text-[10px] font-bold uppercase tracking-widest transition-all text-left border rounded-none",
										activeTab === tab.id
											? "bg-primary text-primary-foreground border-primary shadow-none"
											: "text-muted-foreground hover:bg-muted/50 border-transparent",
									)}
								>
									<div className="flex items-center gap-3">
										<tab.icon size={16} />
										{tab.label}
									</div>
									{activeTab === tab.id && <RiArrowRightSLine size={16} />}
								</button>
							))}
						</div>

						<div className="mt-8 pt-6 border-t border-border px-4">
							<div className="flex items-center gap-3 text-muted-foreground">
								<RiShieldUserLine size={18} />
								<div className="min-w-0">
									<p className="text-[10px] font-bold uppercase tracking-widest">
										Verified Status
									</p>
									<p className="text-[9px] font-semibold text-success mt-0.5">
										{providerData?.isVerified ? "ENTERPRISE LEVEL 2" : "PENDING VERIFICATION"}
									</p>
								</div>
							</div>
						</div>
					</div>
				</aside>

				{/* Content Area */}
				<main className="flex-1 min-w-0">
					{activeTab === "profile" && userProfile && (
						<ProfileInfoSection user={userProfile} />
					)}
					{activeTab === "company" && providerData && (
						<CompanyInfoSection provider={providerData as any} />
					)}
					{activeTab === "security" && (
						<div className="bg-card border border-border p-12 text-center rounded-none shadow-none">
							<div className="w-16 h-16 bg-muted border border-border flex items-center justify-center mx-auto mb-4 rounded-none">
								<RiLockLine size={32} className="text-muted-foreground" />
							</div>
							<h3 className="text-lg font-bold text-foreground">
								Security Protocol
							</h3>
							<p className="text-sm text-muted-foreground mt-1 mb-6">
								Advanced security controls are currently being synchronized.
							</p>
							<Button variant="outline" className="h-10 rounded-none font-bold uppercase text-[10px] tracking-widest px-6 shadow-none">
								Request Access
							</Button>
						</div>
					)}
				</main>
			</div>
		</div>
	);
}

export default ProviderProfileSettings;
