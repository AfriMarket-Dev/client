import React, { useState } from "react";
import {
  Save,
  Upload,
  Eye,
  EyeOff,
  Building,
  User,
  Globe,
  Shield,
  Camera,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AdminCard } from "@/components/admin/admin-card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ProfileSettingsProps {
  supplierData: any;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ supplierData }) => {
  const [activeTab, setActiveTab] = useState<
    "profile" | "company" | "security" | "preferences"
  >("profile");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: supplierData?.representativeName || "John Doe",
    email: supplierData?.email || "john@afrikamarket.com",
    phone: supplierData?.phone || "+250 788 123 456",
    position: supplierData?.position || "Sales Manager",
    avatar:
      supplierData?.avatar ||
      "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  });

  const [companyData] = useState({
    companyName: supplierData?.name || "AfroTech Imports",
    description:
      supplierData?.description ||
      "Leading importer of electronics and technology products from Asia.",
    industry: "Electronics",
    registrationId: "TIN123456789",
    location: supplierData?.location || "Lagos, Nigeria",
    address: "123 Business District, Lagos, Nigeria",
    website: "https://afrotechimports.com",
    coverImage:
      supplierData?.coverImage ||
      "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop",
    specialties: supplierData?.specialties || [
      "Electronics",
      "Mobile Phones",
      "Computers",
    ],
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
  });

  const [preferencesData, setPreferencesData] = useState({
    emailNotifications: true,
    smsNotifications: false,
    inquiryAlerts: true,
    marketingEmails: false,
    language: "en",
    timezone: "Africa/Lagos",
    currency: "USD",
  });

  const tabs = [
    { id: "profile", label: "Personal Profile", icon: User },
    { id: "company", label: "Company Info", icon: Building },
    { id: "security", label: "Security", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Globe },
  ];

  return (
    <div className="space-y-8 ">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="text-4xl font-heading font-bold text-foreground uppercase tracking-tight">
            Configuration
          </h2>
          <p className="text-muted-foreground font-medium uppercase text-xs tracking-widest mt-1">
            Manage entity & secure parameters
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:w-72 flex-shrink-0">
          <AdminCard noPadding className="sticky top-24">
            <nav className="p-2 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "w-full flex items-center px-4 py-3 text-xs font-heading font-bold uppercase tracking-widest rounded-sm transition-all border",
                    activeTab === tab.id
                      ? "bg-foreground text-background border-foreground shadow-none"
                      : "text-muted-foreground border-transparent hover:border-border hover:bg-muted hover:text-foreground",
                  )}
                >
                  <tab.icon
                    className={cn(
                      "w-4 h-4 mr-3",
                      activeTab === tab.id ? "text-primary" : "opacity-70",
                    )}
                  />
                  {tab.label}
                </button>
              ))}
            </nav>
          </AdminCard>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <AdminCard
            title={tabs.find((t) => t.id === activeTab)?.label}
            subtitle="Secure update protocol"
            headerActions={
              <Button
                size="sm"
                className="font-heading font-bold uppercase text-[10px] tracking-widest h-9 px-4 shadow-none rounded-sm"
              >
                <Save className="w-3.5 h-3.5 mr-1.5" /> Save State
              </Button>
            }
          >
            {activeTab === "profile" && (
              <div className="space-y-10">
                {/* Avatar */}
                <div className="flex flex-col sm:flex-row items-center gap-8 p-6 bg-muted/20 border border-border border-dashed rounded-sm">
                  <div className="relative shrink-0">
                    <img
                      src={profileData.avatar}
                      alt="Profile"
                      className="w-28 h-28 rounded-sm object-cover border border-background shadow-none"
                    />
                    <button className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2.5 rounded-sm hover:scale-110 transition-transform shadow-none border border-background">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-center sm:text-left flex-1">
                    <h4 className="font-heading font-bold text-foreground uppercase tracking-wider mb-1">
                      Identity Image
                    </h4>
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-4">
                      Maximum size: 2MB • Format: JPG, PNG
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-heading font-bold uppercase text-[10px] tracking-widest h-9 px-4 border border-border hover:bg-muted shadow-none rounded-sm"
                    >
                      <Upload className="w-3.5 h-3.5 mr-1.5" /> Patch Image
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      Full Identity
                    </label>
                    <Input
                      value={profileData.fullName}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          fullName: e.target.value,
                        })
                      }
                      className="h-12 bg-muted/10 font-bold uppercase tracking-wider shadow-none border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      Protocol Role
                    </label>
                    <Input
                      value={profileData.position}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          position: e.target.value,
                        })
                      }
                      className="h-12 bg-muted/10 font-bold uppercase tracking-wider shadow-none border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      Secure Email
                    </label>
                    <Input
                      value={profileData.email}
                      type="email"
                      className="h-12 bg-muted/10 font-mono font-bold lowercase shadow-none border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      Comm Link
                    </label>
                    <Input
                      value={profileData.phone}
                      type="tel"
                      className="h-12 bg-muted/10 font-mono font-bold shadow-none border-border"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "company" && (
              <div className="space-y-8">
                <div className="relative group">
                  <img
                    src={companyData.coverImage}
                    alt="Cover"
                    className="w-full h-40 rounded-sm object-cover border border-border"
                  />
                  <div className="absolute inset-0 african-pattern opacity-10 pointer-events-none" />
                  <button className="absolute top-4 right-4 bg-background/90 text-foreground p-2 rounded-sm hover:bg-primary hover:text-primary-foreground transition-all shadow-none border border-border">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      Corporate Name
                    </label>
                    <Input
                      value={companyData.companyName}
                      className="h-12 font-bold uppercase tracking-wider shadow-none border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      Industry Stream
                    </label>
                    <Input
                      value={companyData.industry}
                      className="h-12 font-bold uppercase tracking-wider shadow-none border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                    Stream Description
                  </label>
                  <Textarea
                    value={companyData.description}
                    rows={4}
                    className="bg-muted/5 font-medium uppercase tracking-wide shadow-none border border-border"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      Registry ID (TIN)
                    </label>
                    <Input
                      value={companyData.registrationId}
                      className="h-12 font-mono font-bold shadow-none border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      Network Node (URL)
                    </label>
                    <Input
                      value={companyData.website}
                      className="h-12 font-mono font-bold shadow-none border-border"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-8">
                <div className="bg-warning/10 border border-warning/20 rounded-sm p-6 flex items-start gap-4">
                  <Shield className="w-6 h-6 text-warning shrink-0" />
                  <div>
                    <p className="text-sm font-heading font-bold text-warning uppercase tracking-widest">
                      Security Protocol
                    </p>
                    <p className="text-[10px] text-warning/80 mt-1 uppercase font-bold tracking-wider leading-relaxed">
                      System requires a minimum of 12 characters including
                      industrial markers (#,$,@) for fortified access.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      Current Key
                    </label>
                    <div className="relative">
                      <Input
                        type={showCurrentPassword ? "text" : "password"}
                        className="h-12 pr-12 shadow-none border-border"
                        placeholder="••••••••••••"
                      />
                      <button
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                        New Key
                      </label>
                      <div className="relative">
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          className="h-12 pr-12 shadow-none border-border"
                        />
                        <button
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                        Verify Key
                      </label>
                      <Input
                        type="password"
                        className="h-12 shadow-none border-border"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-muted/20 border border-border border-dashed rounded-sm">
                  <div className="space-y-1">
                    <h4 className="font-heading font-bold text-foreground uppercase text-sm">
                      Two-Factor Authentication
                    </h4>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                      Fortified identity verification via mobile
                    </p>
                  </div>
                  <Switch
                    checked={securityData.twoFactorEnabled}
                    onCheckedChange={(c) =>
                      setSecurityData({ ...securityData, twoFactorEnabled: c })
                    }
                  />
                </div>
              </div>
            )}

            {activeTab === "preferences" && (
              <div className="space-y-10">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6 border-b border-primary/10 pb-2">
                    Transmission Matrix
                  </h4>
                  <div className="grid gap-4">
                    {[
                      {
                        key: "emailNotifications",
                        label: "Email Node",
                        sub: "Primary data stream",
                      },
                      {
                        key: "smsNotifications",
                        label: "SMS Node",
                        sub: "Secondary cellular stream",
                      },
                      {
                        key: "inquiryAlerts",
                        label: "Lead Alerts",
                        sub: "Priority trade signals",
                      },
                    ].map((s) => (
                      <div
                        key={s.key}
                        className="flex items-center justify-between p-4 bg-muted/10 border border-border rounded-sm hover:border-primary/20 transition-colors"
                      >
                        <div className="space-y-0.5">
                          <Label
                            className="font-heading font-bold text-foreground uppercase text-xs cursor-pointer"
                            htmlFor={s.key}
                          >
                            {s.label}
                          </Label>
                          <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">
                            {s.sub}
                          </p>
                        </div>
                        <Switch
                          id={s.key}
                          checked={
                            preferencesData[
                              s.key as keyof typeof preferencesData
                            ] as boolean
                          }
                          onCheckedChange={(c) =>
                            setPreferencesData({
                              ...preferencesData,
                              [s.key]: c,
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6 border-b border-primary/10 pb-2">
                    Localization Parameters
                  </h4>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                        Lexicon (Language)
                      </label>
                      <select className="w-full px-4 py-3 border border-border rounded-sm bg-background font-bold uppercase text-[10px] h-11 tracking-widest focus:ring-1 focus:ring-primary focus:border-primary outline-none">
                        <option value="en">ENGLISH [EN]</option>
                        <option value="fr">FRENCH [FR]</option>
                        <option value="sw">SWAHILI [SW]</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                        Temporal Marker (TZ)
                      </label>
                      <select className="w-full px-4 py-3 border border-border rounded-sm bg-background font-bold uppercase text-[10px] h-11 tracking-widest focus:ring-1 focus:ring-primary focus:border-primary outline-none">
                        <option value="CAT">AFRICA/KIGALI [CAT]</option>
                        <option value="GMT">UTC/LONDON [GMT]</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                        Valuation Unit (Currency)
                      </label>
                      <select className="w-full px-4 py-3 border border-border rounded-sm bg-background font-bold uppercase text-[10px] h-11 tracking-widest focus:ring-1 focus:ring-primary focus:border-primary outline-none">
                        <option value="RWF">RWANDAN FRANC [RWF]</option>
                        <option value="USD">US DOLLAR [USD]</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </AdminCard>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
