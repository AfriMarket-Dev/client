import { AdminPageHeader } from "@/components/admin";
import { BroadcastLogicCard } from "@/components/admin/settings/broadcast-logic-card";
import { ProfileInfoCard } from "@/components/admin/settings/profile-info-card";
import {
	EncryptionKeyCard,
	HardenedProtocolCard,
} from "@/components/admin/settings/security-cards";
import { SignalLogsCard } from "@/components/admin/settings/signal-logs-card";
import { useAdminProfile } from "@/hooks/use-admin-profile";

export default function AdminProfileSettingsPage() {
	const {
		isEditing,
		setIsEditing,
		showPassword,
		setShowPassword,
		showNewPassword,
		setShowNewPassword,
		formData,
		passwordData,
		notifications,
		securitySettings,
		handleInputChange,
		handlePasswordChange,
		handleNotificationToggle,
		handleSecurityToggle,
		handleSessionTimeoutChange,
		handleSaveProfile,
	} = useAdminProfile();

	return (
		<div className="space-y-6 pb-20">
			<AdminPageHeader
				title="Settings"
				subtitle="Manage secure account parameters"
				badge="Account Config"
			/>

			<ProfileInfoCard
				isEditing={isEditing}
				formData={formData}
				onEdit={() => setIsEditing(true)}
				onCancel={() => setIsEditing(false)}
				onSave={handleSaveProfile}
				onInputChange={handleInputChange}
			/>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<EncryptionKeyCard
					passwordData={passwordData}
					showPassword={showPassword}
					setShowPassword={setShowPassword}
					showNewPassword={showNewPassword}
					setShowNewPassword={setShowNewPassword}
					onPasswordChange={handlePasswordChange}
				/>

				{/* Placeholder or other cards can go here if needed to balance grid */}
			</div>

			<BroadcastLogicCard
				notifications={notifications}
				onToggle={handleNotificationToggle}
			/>

			<HardenedProtocolCard
				securitySettings={securitySettings}
				onSecurityToggle={handleSecurityToggle}
				onSessionTimeoutChange={handleSessionTimeoutChange}
			/>

			<SignalLogsCard />
		</div>
	);
}
