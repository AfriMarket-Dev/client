import { useCallback, useState } from "react";

export function useAdminProfile() {
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

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const { name, value } = e.target;
			setFormData((prev) => ({ ...prev, [name]: value }));
		},
		[],
	);

	const handlePasswordChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target;
			setPasswordData((prev) => ({ ...prev, [name]: value }));
		},
		[],
	);

	const handleNotificationToggle = useCallback((key: string) => {
		setNotifications((prev: any) => ({ ...prev, [key]: !prev[key] }));
	}, []);

	const handleSecurityToggle = useCallback((key: string) => {
		setSecuritySettings((prev: any) => ({ ...prev, [key]: !prev[key] }));
	}, []);

	const handleSessionTimeoutChange = useCallback((value: number) => {
		setSecuritySettings((prev) => ({ ...prev, sessionTimeout: value }));
	}, []);

	const handleSaveProfile = useCallback(() => {
		setIsEditing(false);
		// Logic to save profile...
	}, []);

	return {
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
	};
}
