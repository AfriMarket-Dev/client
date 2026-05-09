import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { apiSlice } from "@/services/api/api-entry";
import { useGetSessionQuery } from "@/services/api/auth";
import { logout, setUser } from "@/store/slices/auth-slice";

export function AuthBootstrap({ children }: PropsWithChildren) {
	const dispatch = useAppDispatch();
	const { isAuthenticated, token, user } = useAppSelector(
		(state) => state.auth,
	);
	const [isBootstrapped, setIsBootstrapped] = useState(false);

	const hasLocalAuthState = isAuthenticated || Boolean(token) || Boolean(user);
	const hasUsableCredentials = Boolean(token && user);

	const {
		data: sessionUser,
		isSuccess,
		isError,
	} = useGetSessionQuery(undefined, {
		skip: !hasLocalAuthState || !hasUsableCredentials,
		refetchOnMountOrArgChange: true,
	});

	useEffect(() => {
		if (isBootstrapped) {
			return;
		}

		if (!hasLocalAuthState) {
			setIsBootstrapped(true);
			return;
		}

		if (!hasUsableCredentials) {
			dispatch(apiSlice.util.resetApiState());
			dispatch(logout());
			setIsBootstrapped(true);
			return;
		}

		if (isSuccess) {
			if (sessionUser) {
				dispatch(setUser(sessionUser));
			} else {
				dispatch(apiSlice.util.resetApiState());
				dispatch(logout());
			}
			setIsBootstrapped(true);
			return;
		}

		if (isError) {
			dispatch(apiSlice.util.resetApiState());
			dispatch(logout());
			setIsBootstrapped(true);
		}
	}, [
		dispatch,
		hasLocalAuthState,
		hasUsableCredentials,
		isBootstrapped,
		isError,
		isSuccess,
		sessionUser,
	]);

	if (!isBootstrapped) {
		return null;
	}

	return children;
}
