import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Save,
  X,
} from "lucide-react";

export default function AdminProfileSettingsPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "Admin User",
    email: "admin@afrimarket.com",
    phone: "+234-123-456-7890",
    location: "Lagos, Nigeria",
    bio: "Platform administrator managing AfriMarket operations and customer relationships.",
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Information Card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-24"></div>

        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row gap-6 -mt-16 mb-6">
            <div className="relative">
              <img
                src={formData.avatar}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <button className="absolute bottom-2 right-2 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors shadow-lg">
                <User size={18} />
              </button>
            </div>

            <div className="flex flex-col justify-end flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {formData.fullName}
              </h2>
              <p className="text-gray-600 mb-4">Platform Administrator</p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                  Admin Access
                </span>
                <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full">
                  Active
                </span>
              </div>
            </div>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="h-fit px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <User size={20} className="text-orange-600" />
            Personal Information
          </h3>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  <Save size={18} />
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  <X size={18} />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Full Name</p>
                <p className="text-gray-900 font-medium">{formData.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                  <Mail size={14} /> Email Address
                </p>
                <p className="text-gray-900 font-medium">{formData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                  <Phone size={14} /> Phone Number
                </p>
                <p className="text-gray-900 font-medium">{formData.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                  <MapPin size={14} /> Location
                </p>
                <p className="text-gray-900 font-medium">{formData.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Bio</p>
                <p className="text-gray-900 font-medium">{formData.bio}</p>
              </div>
            </div>
          )}
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Lock size={20} className="text-orange-600" />
            Change Password
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-10"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-10"
                />
                <button
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <button className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium">
              Update Password
            </button>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Bell size={20} className="text-orange-600" />
          Notification Preferences
        </h3>

        <div className="space-y-4">
          {[
            {
              key: "emailNotifications",
              label: "Email Notifications",
              description: "Receive email updates about platform activities",
            },
            {
              key: "orderAlerts",
              label: "Order Alerts",
              description: "Get notified about new orders and updates",
            },
            {
              key: "customerMessages",
              label: "Customer Messages",
              description: "Receive notifications for customer inquiries",
            },
            {
              key: "systemUpdates",
              label: "System Updates",
              description:
                "Stay informed about platform maintenance and updates",
            },
          ].map(({ key, label, description }) => (
            <div
              key={key}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{label}</p>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
              <button
                onClick={() =>
                  handleNotificationToggle(key as keyof typeof notifications)
                }
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  notifications[key as keyof typeof notifications]
                    ? "bg-orange-500"
                    : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    notifications[key as keyof typeof notifications]
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Shield size={20} className="text-orange-600" />
          Security Settings
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">
                Two-Factor Authentication
              </p>
              <p className="text-sm text-gray-600">
                Add an extra layer of security to your account
              </p>
            </div>
            <button
              onClick={() => handleSecurityToggle("twoFactorAuth")}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                securitySettings.twoFactorAuth ? "bg-orange-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  securitySettings.twoFactorAuth
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Login Alerts</p>
              <p className="text-sm text-gray-600">
                Receive alerts when someone logs into your account
              </p>
            </div>
            <button
              onClick={() => handleSecurityToggle("loginAlerts")}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                securitySettings.loginAlerts ? "bg-orange-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  securitySettings.loginAlerts
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Session Timeout</p>
              <p className="text-sm text-gray-600">
                Auto logout after inactivity
              </p>
            </div>
            <select
              value={securitySettings.sessionTimeout}
              onChange={(e) =>
                setSecuritySettings((prev) => ({
                  ...prev,
                  sessionTimeout: parseInt(e.target.value),
                }))
              }
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
              <option value={480}>8 hours</option>
            </select>
          </div>
        </div>
      </div>

      {/* Account Activity */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Recent Account Activity
        </h3>

        <div className="space-y-3">
          {[
            {
              action: "Login",
              device: "Chrome on Windows",
              time: "2 hours ago",
            },
            {
              action: "Password Changed",
              device: "Mobile Safari",
              time: "1 day ago",
            },
            { action: "Login", device: "Firefox on Mac", time: "3 days ago" },
            {
              action: "Settings Updated",
              device: "Chrome on Windows",
              time: "5 days ago",
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border border-gray-100 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.device}</p>
              </div>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
