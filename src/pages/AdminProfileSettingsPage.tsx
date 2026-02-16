import { useState } from "react";
import { User, Lock, Bell, Shield, Eye, EyeOff, Save, X, Activity } from "lucide-react";
import { AdminPageHeader, AdminCard, AdminTable } from "@/components/admin";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function AdminProfileSettingsPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "Admin User",
    email: "admin@afrimarket.com",
    phone: "+234-123-456-7890",
    location: "Lagos, Nigeria",
    bio: "Platform administrator managing AfrikaMarket operations and customer relationships.",
    avatar:
      "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    orderAlerts: true,
    customerMessages: true,
    systemUpdates: false,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: 60,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSecurityToggle = (key: keyof typeof securitySettings) => {
    if (key === "twoFactorAuth" || key === "loginAlerts") {
      setSecuritySettings((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    }
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Save profile changes
  };

  return (
    <div className="space-y-6 pb-20">
      <AdminPageHeader
        title="Settings"
        subtitle="Manage secure account parameters"
        badge="Account Config"
      />

      {/* Profile Information Card */}
      <AdminCard noPadding className="overflow-hidden">
        <div className="bg-muted h-32 relative">
          <div className="absolute inset-0 african-pattern opacity-10" />
          <div className="absolute inset-0 bg-linear-to-t from-muted/80 to-transparent" />
        </div>

        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row gap-8 -mt-12 relative z-10">
            <div className="relative group shrink-0">
              <div className="w-28 h-28 rounded-sm border-4 border-background overflow-hidden shadow-xl">
                <img
                  src={formData.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-sm hover:bg-primary/90 transition-all shadow-lg translate-y-1/4 translate-x-1/4 border border-background">
                <User size={16} />
              </button>
            </div>

            <div className="flex flex-col justify-end flex-1 pt-12 md:pt-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-1">
                <div>
                  <h2 className="text-3xl font-heading font-bold text-foreground uppercase tracking-tight leading-none mb-3">
                    {formData.fullName}
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-heading font-bold text-[9px] uppercase tracking-widest px-2.5 py-1">
                      Platform Root
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100 font-heading font-bold text-[9px] uppercase tracking-widest px-2.5 py-1">
                      Stream Active
                    </Badge>
                  </div>
                </div>

                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="rounded-sm h-11 px-8 font-heading font-bold uppercase text-xs tracking-widest shadow-xl shadow-primary/20"
                  >
                    Modify Profile
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </AdminCard>

      {/* Profile Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personal Information */}
        <AdminCard title="Identity Stream" subtitle="Primary agent identifiers" headerActions={<User size={16} className="text-primary" />}>
          {isEditing ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                  Full Identification
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary h-12 text-sm bg-background font-bold uppercase tracking-wider"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                  Secure Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary h-12 text-sm bg-background font-mono font-bold"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                    Phone Link
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary h-12 text-sm bg-background font-mono font-bold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                    Operational Grid
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary h-12 text-sm bg-background font-bold uppercase tracking-wider"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                  Agent Dossier
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary text-sm resize-none bg-background font-medium uppercase tracking-wider"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t-2 border-border">
                <Button
                  onClick={handleSaveProfile}
                  className="flex-1 rounded-sm h-12 font-heading font-bold uppercase text-xs tracking-widest shadow-xl shadow-primary/20"
                >
                  <Save size={16} className="mr-2" />
                  Synchronize
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 rounded-sm h-12 border border-border font-heading font-bold uppercase text-xs tracking-widest"
                >
                  <X size={16} className="mr-2" />
                  Abort
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="border-b-2 border-border border-dashed pb-4">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-heading font-bold mb-2">
                  Full Identification
                </p>
                <p className="text-foreground font-black text-sm uppercase tracking-tight">
                  {formData.fullName}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b-2 border-border border-dashed pb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-heading font-bold mb-2">
                    Secure Email
                  </p>
                  <p className="text-foreground font-bold text-xs font-mono">
                    {formData.email}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-heading font-bold mb-2">
                    Phone Link
                  </p>
                  <p className="text-foreground font-bold text-xs font-mono">
                    {formData.phone}
                  </p>
                </div>
              </div>
              <div className="border-b-2 border-border border-dashed pb-4">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-heading font-bold mb-2">
                  Operational Grid
                </p>
                <p className="text-foreground font-bold text-sm uppercase tracking-wide">
                  {formData.location}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-heading font-bold mb-2">
                  Agent Dossier
                </p>
                <p className="text-muted-foreground font-medium text-xs italic leading-relaxed border-l-4 border-primary/10 pl-4 py-2 bg-muted/5">
                  "{formData.bio}"
                </p>
              </div>
            </div>
          )}
        </AdminCard>

        {/* Change Password */}
        <AdminCard title="Encryption Key" subtitle="Rotate access credentials" headerActions={<Lock size={16} className="text-primary" />}>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Active Key
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="ENTER CURRENT..."
                  className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary h-12 text-sm bg-background font-mono"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                New Key Matrix
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="ENTER NEW..."
                  className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary h-12 text-sm bg-background font-mono"
                />
                <button
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Key Verification
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="RE-ENTER NEW..."
                className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary h-12 text-sm bg-background font-mono"
              />
            </div>

            <Button className="w-full h-12 rounded-sm font-heading font-bold uppercase text-xs tracking-widest mt-2 shadow-lg shadow-primary/10">
              Rotate Access Key
            </Button>
          </div>
        </AdminCard>
      </div>

      {/* Notification Settings */}
      <AdminCard title="Broadcast Logic" subtitle="Manage signal preferences" headerActions={<Bell size={16} className="text-primary" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              key: "emailNotifications",
              label: "Email Protocol",
              description: "Primary outbound communication stream",
            },
            {
              key: "orderAlerts",
              label: "Supply Signal",
              description: "Real-time verification of new inventory flow",
            },
            {
              key: "customerMessages",
              label: "Inquiry Stream",
              description: "Intercept buyer communication signals",
            },
            {
              key: "systemUpdates",
              label: "Core Matrix",
              description: "Critical platform infrastructure updates",
            },
          ].map(({ key, label, description }) => (
            <div
              key={key}
              className="flex items-center justify-between p-5 bg-muted/20 border border-border border-dashed rounded-sm hover:border-primary/20 transition-colors group"
            >
              <div className="min-w-0 pr-4">
                <p className="font-heading font-bold text-sm text-foreground uppercase tracking-widest leading-none mb-2">
                  {label}
                </p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
                  {description}
                </p>
              </div>
              <button
                onClick={() =>
                  handleNotificationToggle(key as keyof typeof notifications)
                }
                className={`relative w-12 h-6 rounded-sm transition-all border ${
                  notifications[key as keyof typeof notifications]
                    ? "bg-primary border-primary"
                    : "bg-muted border-border"
                }`}
              >
                <div
                  className={`absolute top-1 w-3 h-3 rounded-sm transition-all ${
                    notifications[key as keyof typeof notifications]
                      ? "translate-x-7 bg-white"
                      : "translate-x-1 bg-muted-foreground"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </AdminCard>

      {/* Security Settings */}
      <AdminCard title="Hardened Protocol" subtitle="Account fortification parameters" headerActions={<Shield size={16} className="text-primary" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between p-5 bg-muted/30 border border-border rounded-sm">
              <div className="min-w-0 pr-4">
                <p className="font-heading font-bold text-sm text-foreground uppercase tracking-widest leading-none mb-2">
                  Double Factor
                </p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
                  Cryptographic verification requirement
                </p>
              </div>
              <button
                onClick={() => handleSecurityToggle("twoFactorAuth")}
                className={`relative w-12 h-6 rounded-sm transition-all border ${
                  securitySettings.twoFactorAuth
                    ? "bg-primary border-primary"
                    : "bg-muted border-border"
                }`}
              >
                <div
                  className={`absolute top-1 w-3 h-3 rounded-sm transition-all ${
                    securitySettings.twoFactorAuth
                      ? "translate-x-7 bg-white"
                      : "translate-x-1 bg-muted-foreground"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-5 bg-muted/30 border border-border rounded-sm">
              <div className="min-w-0 pr-4">
                <p className="font-heading font-bold text-sm text-foreground uppercase tracking-widest leading-none mb-2">
                  Access Alerts
                </p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
                  Notify on new session establishment
                </p>
              </div>
              <button
                onClick={() => handleSecurityToggle("loginAlerts")}
                className={`relative w-12 h-6 rounded-sm transition-all border ${
                  securitySettings.loginAlerts
                    ? "bg-primary border-primary"
                    : "bg-muted border-border"
                }`}
              >
                <div
                  className={`absolute top-1 w-3 h-3 rounded-sm transition-all ${
                    securitySettings.loginAlerts
                      ? "translate-x-7 bg-white"
                      : "translate-x-1 bg-muted-foreground"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="p-6 bg-foreground text-background rounded-sm relative overflow-hidden flex flex-col justify-center">
            <div className="absolute inset-0 african-pattern opacity-10 invert" />
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">Auto-Termination</p>
              <h4 className="text-xl font-heading font-bold uppercase mb-4 leading-none">Session Pulse</h4>
              <div className="space-y-4">
                <select
                  value={securitySettings.sessionTimeout}
                  onChange={(e) =>
                    setSecuritySettings((prev) => ({
                      ...prev,
                      sessionTimeout: parseInt(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-3 border border-background/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary text-xs font-heading font-bold uppercase tracking-widest h-12 bg-background/5 text-background"
                >
                  <option value={30} className="text-foreground">30 CYCLE PULSE</option>
                  <option value={60} className="text-foreground">60 CYCLE PULSE</option>
                  <option value={120} className="text-foreground">120 CYCLE PULSE</option>
                  <option value={480} className="text-foreground">EXTENDED PULSE (8H)</option>
                </select>
                <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">
                  Active sessions will be purged after the specified interval of inactivity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AdminCard>

      {/* Account Activity */}
      <AdminCard title="Signal Logs" subtitle="Verified access audit stream" headerActions={<Activity size={16} className="text-primary" />}>
        <AdminTable headers={["Signal Type", "Terminal ID", "Temporal Marker"]}>
          {[
            {
              action: "AUTH_ESTABLISHED",
              device: "CHROME_WIN_NT_10.0",
              time: "2.0 HOURS_AGO",
            },
            {
              action: "KEY_ROTATION",
              device: "IOS_MOBILE_SAFARI",
              time: "1.0 DAYS_AGO",
            },
            {
              action: "AUTH_ESTABLISHED",
              device: "MACOS_FIREFOX_ENT",
              time: "3.0 DAYS_AGO",
            },
            {
              action: "PARAMETER_SYNC",
              device: "CHROME_WIN_NT_10.0",
              time: "5.0 DAYS_AGO",
            },
          ].map((activity, index) => (
            <tr key={index} className="hover:bg-muted/50 transition-colors">
              <td className="px-4 py-4">
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-mono text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm">
                  {activity.action}
                </Badge>
              </td>
              <td className="px-4 py-4 text-[10px] text-muted-foreground font-mono font-bold uppercase tracking-widest">
                {activity.device}
              </td>
              <td className="px-4 py-4 text-[10px] text-foreground font-mono font-black text-right uppercase tracking-tighter">
                {activity.time}
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>
    </div>
  );
}
