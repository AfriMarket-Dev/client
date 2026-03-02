import React from "react";
import { RiLockLine, RiEyeLine, RiEyeOffLine, RiShieldLine } from "@remixicon/react";
import { AdminCard } from "@/components/admin";
import { Button } from "@/components/ui/button";

interface EncryptionKeyCardProps {
  passwordData: any;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  showNewPassword: boolean;
  setShowNewPassword: (show: boolean) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EncryptionKeyCard: React.FC<EncryptionKeyCardProps> = ({
  passwordData,
  showPassword,
  setShowPassword,
  showNewPassword,
  setShowNewPassword,
  onPasswordChange,
}) => {
  return (
    <AdminCard
      title="Encryption Key"
      subtitle="Rotate access credentials"
      headerActions={<RiLockLine size={16} className="text-primary" />}
    >
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
              onChange={onPasswordChange}
              placeholder="ENTER CURRENT..."
              className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary h-12 text-sm bg-background font-mono"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              {showPassword ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
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
              onChange={onPasswordChange}
              placeholder="ENTER NEW..."
              className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary h-12 text-sm bg-background font-mono"
            />
            <button
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              {showNewPassword ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
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
            onChange={onPasswordChange}
            placeholder="RE-ENTER NEW..."
            className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary h-12 text-sm bg-background font-mono"
          />
        </div>

        <Button className="w-full h-12 rounded-sm font-heading font-bold uppercase text-xs tracking-widest mt-2 shadow-lg shadow-primary/10">
          Rotate Access Key
        </Button>
      </div>
    </AdminCard>
  );
};

interface HardenedProtocolCardProps {
  securitySettings: any;
  onSecurityToggle: (key: string) => void;
  onSessionTimeoutChange: (value: number) => void;
}

export const HardenedProtocolCard: React.FC<HardenedProtocolCardProps> = ({
  securitySettings,
  onSecurityToggle,
  onSessionTimeoutChange,
}) => {
  return (
    <AdminCard
      title="Hardened Protocol"
      subtitle="Account fortification parameters"
      headerActions={<RiShieldLine size={16} className="text-primary" />}
    >
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
              onClick={() => onSecurityToggle("twoFactorAuth")}
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
              onClick={() => onSecurityToggle("loginAlerts")}
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
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">
              Auto-Termination
            </p>
            <h4 className="text-xl font-heading font-bold uppercase mb-4 leading-none">
              Session Pulse
            </h4>
            <div className="space-y-4">
              <select
                value={securitySettings.sessionTimeout}
                onChange={(e) => onSessionTimeoutChange(parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-background/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary text-xs font-heading font-bold uppercase tracking-widest h-12 bg-background/5 text-background"
              >
                <option value={30} className="text-foreground">
                  30 CYCLE PULSE
                </option>
                <option value={60} className="text-foreground">
                  60 CYCLE PULSE
                </option>
                <option value={120} className="text-foreground">
                  120 CYCLE PULSE
                </option>
                <option value={480} className="text-foreground">
                  EXTENDED PULSE (8H)
                </option>
              </select>
              <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">
                Active sessions will be purged after the specified interval of
                inactivity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminCard>
  );
};
