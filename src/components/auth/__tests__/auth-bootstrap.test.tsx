import { screen, waitFor } from "@testing-library/react";
import { useSelector } from "react-redux";
import { describe, expect, it } from "vitest";
import { AuthBootstrap } from "@/components/auth/auth-bootstrap";
import {
	installFetchMock,
	jsonResponse,
} from "@/services/api/__tests__/test-utils";
import type { RootState } from "@/store";
import { renderWithProviders } from "@/test/test-utils";

function AuthStateProbe() {
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated,
	);

	return isAuthenticated ? (
		<div>protected-shell</div>
	) : (
		<div>signed-out-shell</div>
	);
}

describe("AuthBootstrap", () => {
	it("logs out rehydrated auth before protected UI is released when session is invalid", async () => {
		const { requests } = installFetchMock(() =>
			jsonResponse({ message: "Unauthorized" }, { status: 401 }),
		);

		const { store } = renderWithProviders(
			<AuthBootstrap>
				<AuthStateProbe />
			</AuthBootstrap>,
			{
				preloadedState: {
					auth: {
						isAuthenticated: true,
						token: "stale-token",
						user: {
							id: "u1",
							email: "stale@example.com",
							name: "Stale User",
							role: "user",
							needsOnboarding: false,
						},
						loading: false,
						error: null,
					},
				},
			},
		);

		expect(screen.queryByText("protected-shell")).toBeNull();
		expect(screen.queryByText("signed-out-shell")).toBeNull();

		await waitFor(() => {
			const state = store.getState();
			expect(state.auth.isAuthenticated).toBe(false);
			expect(state.auth.token).toBeNull();
			expect(state.auth.user).toBeNull();
		});

		await waitFor(() => {
			expect(screen.getByText("signed-out-shell")).toBeTruthy();
		});

		expect(screen.queryByText("protected-shell")).toBeNull();
		expect(requests[0]?.path).toBe("/api/auth/get-session");
	});
});
