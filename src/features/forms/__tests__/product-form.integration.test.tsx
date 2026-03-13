import { fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
	installFetchMock,
	jsonResponse,
} from "@/services/api/__tests__/test-utils";
import { renderWithProviders } from "@/test/test-utils";
import { ProductForm } from "../components/product-form";

describe("ProductForm Integration", () => {
	it("renders categories and allows submitting a new product", async () => {
		const onSubmit = vi.fn();
		const onCancel = vi.fn();

		const { fetchMock } = installFetchMock(async (req) => {
			if (req.url.endsWith("/product-categories?limit=100")) {
				return jsonResponse({
					data: [
						{ id: "cat-1", name: "Machinery" },
						{ id: "cat-2", name: "Tools" },
					],
				});
			}
			return jsonResponse({}, { status: 404 });
		});

		renderWithProviders(
			<ProductForm onSubmit={onSubmit} onCancel={onCancel} showPricing={true} />,
		);

		// Wait for categories to load
		await waitFor(() => {
			expect(fetchMock).toHaveBeenCalled();
		});

		// Fill out the form
		const nameInput = screen.getByLabelText(/Product Name/i);
		fireEvent.change(nameInput, { target: { value: "New Tractor" } });

		// Select category
		const categoryTrigger = screen.getByLabelText(/Category/i);
		fireEvent.click(categoryTrigger);

		const categoryOption = await screen.findByText("Machinery");
		fireEvent.click(categoryOption);

		const priceInput = screen.getByLabelText(/Price/i);
		fireEvent.change(priceInput, { target: { value: "500000" } });

		const stockInput = screen.getByLabelText(/Stock Quantity/i);
		fireEvent.change(stockInput, { target: { value: "10" } });

		const unitInput = screen.getByLabelText(/Unit/i);
		fireEvent.change(unitInput, { target: { value: "unit" } });

		const submitButton = screen.getByRole("button", {
			name: /Create Product/i,
		});

		// Form should be valid now
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(onSubmit).toHaveBeenCalledWith(
				expect.objectContaining({
					name: "New Tractor",
					categoryId: "cat-1",
					price: "500000",
					stock: "10",
					unit: "unit",
					images: [],
					specifications: {},
				}),
			);
		});
	});

	it("calls onCancel when cancel button is clicked", () => {
		const onSubmit = vi.fn();
		const onCancel = vi.fn();

		installFetchMock(async () => jsonResponse({ data: [] }));

		renderWithProviders(
			<ProductForm onSubmit={onSubmit} onCancel={onCancel} />,
		);

		const cancelButton = screen.getByRole("button", { name: /Cancel/i });
		fireEvent.click(cancelButton);

		expect(onCancel).toHaveBeenCalled();
	});
});
