"use no memo";

import { Navigate, Outlet, useRouterState } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";

export const ProtectedRoute = () => {
	const { isAuthenticated } = useSelector((state: RootState) => state.auth);
	const routerState = useRouterState();

	if (!isAuthenticated) {
		return (
			<Navigate
				to="/auth/signin"
				search={{ from: routerState.location.href }}
				replace
			/>
		);
	}

	return <Outlet />;
};
