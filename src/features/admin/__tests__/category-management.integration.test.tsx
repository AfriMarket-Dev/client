import { fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
	installFetchMock,
	jsonResponse,
} from "@/services/api/__tests__/test-utils";
import { renderWithProviders } from "@/test/test-utils";
import { AdminCategoriesPage } from "../components/categories-page";

describe("Admin Category Management Integration", () => {
	const mockCategories = [
		{ id: "cat-1", name: "Construction", slug: "construction" },
		{ id: "cat-2", name: "Manufacturing", slug: "manufacturing" },
	];

	it("renders categories and allows searching", async () => {
		installFetchMock(async (req) => {
			if (req.url.includes("/product-categories") && req.method === "GET") {
				return jsonResponse({
					data: mockCategories,
					meta: { total: 2, page: 1, limit: 100, totalPages: 1 },
				});
			}
			return jsonResponse({}, { status: 404 });
		});

		renderWithProviders(<AdminCategoriesPage />);

		await waitFor(() => {
			expect(screen.getByText("Construction")).toBeTruthy();
			expect(screen.getByText("Manufacturing")).toBeTruthy();
		});

		// Search functionality
		const searchInput = screen.getByPlaceholderText(/Search categories.../i);
		fireEvent.change(searchInput, { target: { value: "Const" } });

		expect(screen.getByText("Construction")).toBeTruthy();
		expect(screen.queryByText("Manufacturing")).toBeNull();
	});

	it("allows adding a new category", async () => {
		const { fetchMock } = installFetchMock(async (req) => {
			if (req.url.includes("/product-categories") && req.method === "GET") {
				return jsonResponse({
					data: mockCategories,
					meta: { total: 2, page: 1, limit: 100, totalPages: 1 },
				});
			}
			if (req.url.includes("/product-categories") && req.method === "POST") {
				return jsonResponse({
					data: { id: "cat-3", name: "New Category", slug: "new-category" },
				});
			}
			return jsonResponse({}, { status: 404 });
		});

		renderWithProviders(<AdminCategoriesPage />);

		// Open modal
		const addButton = screen.getByRole("button", { name: /Add Category/i });
		fireEvent.click(addButton);

		// Fill form
		const nameInput = screen.getByPlaceholderText(/ENTER NAME.../i);
		fireEvent.change(nameInput, { target: { value: "New Category" } });

		const descInput = screen.getByPlaceholderText(/ENTER DESCRIPTION.../i);
		fireEvent.change(descInput, { target: { value: "Category description" } });

		// Submit
		const submitButton = screen.getByRole("button", { name: /Create Category/i });
		fireEvent.click(submitButton);

		await waitFor(() => {
			const postCall = fetchMock.mock.calls.find(c => {
				const url = typeof c[0] === 'string' ? c[0] : (c[0] as any).url || String(c[0]);
				const method = typeof c[0] === 'string' ? (c[1] as any)?.method : (c[0] as any).method || (c[1] as any)?.method;
				return url.includes("/product-categories") && method === "POST";
			});
			expect(postCall).toBeTruthy();
		});
	});

	it("allows deleting a category", async () => {
		const { fetchMock } = installFetchMock(async (req) => {
			if (req.url.includes("/product-categories") && req.method === "GET") {
				return jsonResponse({
					data: mockCategories,
					meta: { total: 2, page: 1, limit: 100, totalPages: 1 },
				});
			}
			if (req.url.includes("/product-categories/cat-1") && req.method === "DELETE") {
				return jsonResponse({ success: true });
			}
			return jsonResponse({}, { status: 404 });
		});

		renderWithProviders(<AdminCategoriesPage />);

		await waitFor(() => {
			expect(screen.getByText("Construction")).toBeTruthy();
		});

		// Click delete on the first card using data-testid
		const deleteButtons = screen.getAllByTestId("delete-category-button");
		fireEvent.click(deleteButtons[0]);

		// Confirm deletion in modal
		const confirmButton = screen.getByTestId("confirm-button");
		fireEvent.click(confirmButton);

		await waitFor(() => {
			const deleteCall = fetchMock.mock.calls.find(c => {
				const url = typeof c[0] === 'string' ? c[0] : (c[0] as any).url || String(c[0]);
				const method = typeof c[0] === 'string' ? (c[1] as any)?.method : (c[0] as any).method || (c[1] as any)?.method;
				return url.includes("/product-categories/cat-1") && method === "DELETE";
			});
			expect(deleteCall).toBeTruthy();
		});
	});
});
