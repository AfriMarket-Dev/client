import { RiBuilding2Line, RiNotification3Line, RiShieldKeyholeLine, RiUserLine } from "@remixicon/react";
import type React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { Card as AdminCard } from "@/shared/components/admin/card";
import type { Provider } from "@/types";
import type { RootState } from "@/store";
import { CompanyInfoSection } from "./settings/company-info-section";
import { NotificationsSection } from "./settings/notifications-section";
import { ProfileInfoSection } from "./settings/profile-info-section";
import { SecuritySection } from "./settings/security-section";

interface ProfileSettingsProps {
	providerData: Provider | null;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ providerData }) => {
	const { user } = useSelector((state: RootState) => state.auth);
	const [activeTab, setActiveTab] = useState("profile");

	const tabs = [
		{ id: "profile", label: "Personal Profile", icon: RiUserLine },
		{ id: "company", label: "Business Details", icon: RiBuilding2Line },
		{ id: "security", label: "Security & Privacy", icon: RiShieldKeyholeLine },
		{ id: "notifications", label: "Notifications", icon: RiNotification3Line },
	];

	const activeTabData = tabs.find((t) => t.id === activeTab);

	return (
		<div className="flex flex-col lg:flex-row gap-8 pb-20">
			{/* Sidebar Tabs */}
			<aside className="w-full lg:w-72 shrink-0">
				<div className="bg-background border border-border/40 rounded-none overflow-hidden sticky top-24">
					<div className="p-6 border-b border-border/40 bg-muted/5">
						<p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Settings Navigation</p>
					</div>
					<div className="p-2 space-y-1">
						{tabs.map((tab) => (
							<button
								type="button"
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={cn(
									"w-full flex items-center gap-3 px-4 py-3.5 text-[10px] font-black uppercase tracking-widest transition-all text-left rounded-none",
									activeTab === tab.id
										? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
										: "text-muted-foreground hover:bg-muted/50",
								)}
							>
								<tab.icon className="w-4 h-4" />
								{tab.label}
							</button>
						))}
					</div>
				</div>
			</aside>

			{/* Content Area */}
			<div className="flex-1 min-w-0">
				<AdminCard
					title={activeTabData?.label}
					subtitle="Manage your localized platform identity"
				>
					<div className="pt-4">
						{activeTab === "profile" && user && (
							<ProfileInfoSection user={user as any} />
						)}

						{activeTab === "company" && providerData && (
							<CompanyInfoSection provider={providerData} />
						)}
						
						{activeTab === "company" && !providerData && (
							<div className="py-20 text-center border border-dashed border-border/40">
								<p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">No business profile found</p>
							</div>
						)}

						{activeTab === "security" && <SecuritySection />}

						{activeTab === "notifications" && <NotificationsSection />}
					</div>
				</AdminCard>
			</div>
		</div>
	);
};

export default ProfileSettings;
