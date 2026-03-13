import { fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
	installFetchMock,
	jsonResponse,
} from "@/services/api/__tests__/test-utils";
import { renderWithProviders } from "@/test/test-utils";
import { CompanySetupForm } from "../components/company-setup-form";

describe("CompanySetupForm Integration", () => {
	it("validates slug uniqueness", async () => {
		const onSubmit = vi.fn();
		const onSkip = vi.fn();
		const categories = [
			{ id: "cat-1", name: "Construction" },
			{ id: "cat-2", name: "Manufacturing" },
		];

		installFetchMock(async (req) => {
			if (req.url.includes("/companies/check-slug")) {
				const url = new URL(req.url);
				const slug = url.searchParams.get("slug");
				if (slug === "taken-slug") {
					return jsonResponse({ data: { available: false } });
				}
				return jsonResponse({ data: { available: true } });
			}
			return jsonResponse({}, { status: 404 });
		});

		renderWithProviders(
			<CompanySetupForm
				onSubmit={onSubmit}
				onSkip={onSkip}
				categories={categories}
			/>,
		);

		const slugInput = screen.getByLabelText(/Store URL Slug/i);
		
		// Test slug validation (taken)
		fireEvent.change(slugInput, { target: { value: "taken-slug" } });
		fireEvent.blur(slugInput);

		await waitFor(
			() => {
				expect(screen.getByText(/already taken/i)).toBeTruthy();
			},
			{ timeout: 5000 },
		);
	});

	it("calls onSkip when skip button is clicked", () => {
		const onSubmit = vi.fn();
		const onSkip = vi.fn();

		renderWithProviders(
			<CompanySetupForm onSubmit={onSubmit} onSkip={onSkip} />,
		);

		const skipButton = screen.getByRole("button", { name: /Skip for now/i });
		fireEvent.click(skipButton);

		expect(onSkip).toHaveBeenCalled();
	});
});
