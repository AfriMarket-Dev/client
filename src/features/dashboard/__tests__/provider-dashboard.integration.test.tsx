import { fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
	installFetchMock,
	jsonResponse,
} from "@/services/api/__tests__/test-utils";
import { renderWithProviders } from "@/test/test-utils";
import ProviderDashboard from "../components/provider-dashboard";

describe("ProviderDashboard Integration", () => {
	it("allows a provider to delete a product listing", async () => {
		const mockCompany = {
			id: "comp-1",
			name: "Test Corp",
			slug: "test-corp",
			type: "SUPPLIER_RETAILER",
		};

		const mockProducts = [
			{
				id: "prod-1",
				name: "Existing Product",
				price: 100,
				stock: 10,
				createdAt: new Date().toISOString(),
			},
		];

		const { fetchMock } = installFetchMock(async (req) => {
			if (req.url.includes("/products/prod-1") && req.method === "DELETE") {
				return jsonResponse({ success: true });
			}
			return jsonResponse({}, { status: 404 });
		});

		renderWithProviders(
			<ProviderDashboard
				company={mockCompany as any}
				categories={[]}
				products={mockProducts as any}
				services={[]}
			/>,
		);

		// Wait for data to load
		await waitFor(() => {
			expect(screen.getAllByText("Existing Product").length).toBeGreaterThan(0);
		});

		// Find the delete button in the table row
		const deleteButtons = screen.getAllByTestId("delete-listing-button");
		fireEvent.click(deleteButtons[0]);

		// Confirm deletion in modal
		const confirmButton = screen.getByRole("button", { name: /^Delete$/ });
		fireEvent.click(confirmButton);

		// Verify that the delete API was called
		await waitFor(() => {
			const deleteReq = fetchMock.mock.calls.find(c => {
				const url = typeof c[0] === 'string' ? c[0] : (c[0] as any).url || String(c[0]);
				const method = typeof c[0] === 'string' ? (c[1] as any)?.method : (c[0] as any).method || (c[1] as any)?.method;
				return url.includes("/products/prod-1") && method === "DELETE";
			});
			expect(deleteReq).toBeTruthy();
		});

		// Verify modal is closed by checking for the message
		await waitFor(() => {
			expect(screen.queryByText(/This action cannot be undone/i)).toBeNull();
		});
	});
});
