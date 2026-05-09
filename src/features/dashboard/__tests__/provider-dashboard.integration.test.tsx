import { fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
	installFetchMock,
	jsonResponse,
} from "@/services/api/__tests__/test-utils";
import { renderWithProviders } from "@/test/test-utils";
import type { Company, Product } from "@/types";
import ProviderDashboard from "../components/provider-dashboard";

type MockFetchCall = [input: string | URL | Request, init?: RequestInit];

function getRequestUrl([input]: MockFetchCall) {
	if (typeof input === "string") {
		return input;
	}
	if (input instanceof URL) {
		return input.toString();
	}
	return input.url;
}

function getRequestMethod([input, init]: MockFetchCall) {
	if (typeof input === "string" || input instanceof URL) {
		return init?.method ?? "GET";
	}
	return input.method || init?.method || "GET";
}

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
				company={mockCompany as unknown as Company}
				categories={[]}
				products={mockProducts as unknown as Product[]}
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
			const deleteReq = fetchMock.mock.calls.find((call) => {
				const url = getRequestUrl(call as MockFetchCall);
				const method = getRequestMethod(call as MockFetchCall);
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
