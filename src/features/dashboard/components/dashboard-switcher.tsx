import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import ProviderDashboard from "./provider-dashboard";
import UserDashboard from "./user-dashboard";

export function DashboardSwitcher() {
	const { user } = useSelector((state: RootState) => state.auth);
	const isProvider = user?.role === "provider";

	if (isProvider) {
		return <ProviderDashboard />;
	}

	return <UserDashboard />;
}
