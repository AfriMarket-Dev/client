import { AdminPageHeader } from "@/components/admin";
import { BroadcastLogicCard } from "@/components/admin/settings/broadcast-logic-card";
import { ProfileInfoCard } from "@/components/admin/settings/profile-info-card";
import {
  EncryptionKeyCard,
  HardenedProtocolCard,
} from "@/components/admin/settings/security-cards";
import { SignalLogsCard } from "@/components/admin/settings/signal-logs-card";
import { useAdminProfile } from "@/hooks/use-admin-profile";
import { Loader2 } from "lucide-react";

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
    isLoading,
    isUpdating,
  } = useAdminProfile();

  if (isLoading) {
  	return (
  		<div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
  			<Loader2 className="w-8 h-8 animate-spin text-primary" />
  			<p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
  				Loading Settings...
  			</p>
  		</div>
  	);
  }

  return (
  	<div className="space-y-6 pb-20">
  		<AdminPageHeader
  			title="Account Settings"
  			subtitle="Manage your profile and security"
  			badge="Profile"
  		/>

      <ProfileInfoCard
        isEditing={isEditing}
        isUpdating={isUpdating}
        formData={formData}
        onEdit={() => setIsEditing(true)}
        onCancel={() => setIsEditing(false)}
        onSave={handleSaveProfile}
        onInputChange={handleInputChange}
      />
      ...
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
