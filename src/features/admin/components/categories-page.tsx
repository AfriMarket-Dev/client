import { RiAddLine, RiLoader2Line, RiSearchLine } from "@remixicon/react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { CategoryForm } from "@/features/forms/components/category-form";
import {
	useCreateProductCategoryMutation,
	useDeleteProductCategoryMutation,
	useGetProductCategoriesQuery,
	useUpdateProductCategoryMutation,
} from "@/services/api/product-categories";
import { ActionModal } from "@/shared/components/action-modal";
import type { ProductCategory } from "@/types";
import { Card } from "./card";
import { CategoryCard } from "./categories/category-card";
import { PageHeader } from "./page-header";

interface CategoryCardModel extends ProductCategory {
	status: string;
	icon: string;
	productCount: number;
	subcategories: any[];
}

export function AdminCategoriesPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [showAddModal, setShowAddModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [selectedCategory, setSelectedCategory] =
		useState<CategoryCardModel | null>(null);
	const [deleteConfirmation, setDeleteConfirmation] = useState("");
	const [page, setPage] = useState(1);

	const { data: categoriesResult, isLoading } = useGetProductCategoriesQuery({
		page,
		limit: 12,
	});
	const [createCategory, { isLoading: creating }] =
		useCreateProductCategoryMutation();
	const [updateCategory, { isLoading: updating }] =
		useUpdateProductCategoryMutation();
	const [deleteCategory, { isLoading: deleting }] =
		useDeleteProductCategoryMutation();

	const categories = useMemo<CategoryCardModel[]>(() => {
		return (categoriesResult?.data || [])
			.filter(
				(category): category is ProductCategory =>
					category !== null && category !== undefined,
			)
			.map((category) => ({
				id: category.id,
				name: category.name,
				description: category.description,
				createdAt: category.createdAt,
				updatedAt: category.updatedAt,
				status: "active" as const,
				icon: "Settings",
				productCount: 0,
				subcategories: [],
			}));
	}, [categoriesResult]);

	const filteredCategories = useMemo(() => {
		return categories.filter((category) =>
			(category.name || "").toLowerCase().includes(searchTerm.toLowerCase()),
		);
	}, [categories, searchTerm]);

	const handleEdit = (category: any) => {
		setSelectedCategory(category);
		setShowEditModal(true);
	};

	const handleDelete = (category: any) => {
		setSelectedCategory(category);
		setShowDeleteModal(true);
	};

	const handleConfirmDelete = async () => {
		if (!selectedCategory) return;
		try {
			await deleteCategory(selectedCategory.id).unwrap();
			setShowDeleteModal(false);
			setSelectedCategory(null);
			setDeleteConfirmation("");
		} catch (error) {
			console.error(error);
		}
	};

	const onAddSubmit = async (values: { name: string; description: string }) => {
		try {
			await createCategory({
				name: values.name,
				description: values.description,
			}).unwrap();
			setShowAddModal(false);
		} catch (error) {
			console.error(error);
		}
	};

	const onEditSubmit = async (values: {
		name: string;
		description: string;
	}) => {
		if (!selectedCategory) return;
		try {
			await updateCategory({
				id: selectedCategory.id,
				data: {
					name: values.name,
					description: values.description,
				},
			}).unwrap();
			setShowEditModal(false);
			setSelectedCategory(null);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="space-y-5 pb-10">
			<PageHeader
				title="Categories"
				subtitle="Manage product categories"
				actions={
					<Button
						onClick={() => setShowAddModal(true)}
						className="h-11 rounded-sm px-6 font-heading font-bold uppercase text-xs tracking-wider"
					>
						<RiAddLine size={18} className="mr-2" />
						Add Category
					</Button>
				}
			/>

			<Card noPadding>
				<div className="p-3">
					<div className="relative">
						<RiSearchLine
							className="absolute left-3 top-3 text-muted-foreground"
							size={18}
						/>
						<input
							type="text"
							placeholder="Search categories..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="h-11 w-full rounded-sm border border-border bg-background py-2 pr-4 pl-10 text-sm"
						/>
					</div>
				</div>
			</Card>

			<div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
				{isLoading ? (
					<div className="col-span-full flex justify-center p-12">
						<RiLoader2Line className="h-8 w-8 animate-spin text-muted-foreground" />
					</div>
				) : filteredCategories.length === 0 ? (
					<div className="col-span-full rounded-sm border border-dashed border-border py-12 text-center text-muted-foreground">
						No categories found.
					</div>
				) : (
					filteredCategories.map((category) => (
						<CategoryCard
							key={category.id}
							category={category}
							onEdit={handleEdit}
							onDelete={handleDelete}
						/>
					))
				)}
			</div>

			{categoriesResult?.meta && categoriesResult.meta.totalPages > 1 && (
				<div className="flex justify-center gap-2 mt-8 pt-6 border-t border-border">
					<Button
						variant="outline"
						size="sm"
						disabled={page <= 1}
						onClick={() => setPage((p) => p - 1)}
						className="rounded-sm h-10 px-6 font-bold uppercase text-[10px] tracking-widest"
					>
						Previous
					</Button>
					<span className="flex items-center px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
						Page {page} of {categoriesResult.meta.totalPages}
					</span>
					<Button
						variant="outline"
						size="sm"
						disabled={page >= categoriesResult.meta.totalPages}
						onClick={() => setPage((p) => p + 1)}
						className="rounded-sm h-10 px-6 font-bold uppercase text-[10px] tracking-widest"
					>
						Next
					</Button>
				</div>
			)}

			<ActionModal
				isOpen={showAddModal}
				type="info"
				title="Add Category"
				description="Create a new product category"
				onCancel={() => setShowAddModal(false)}
				showFooter={false}
			>
				<CategoryForm
					mode="add"
					onSubmit={onAddSubmit}
					onCancel={() => setShowAddModal(false)}
				/>
			</ActionModal>

			<ActionModal
				isOpen={showEditModal}
				type="info"
				title="Edit Category"
				description="Update category details"
				onCancel={() => setShowEditModal(false)}
				showFooter={false}
			>
				{selectedCategory && (
					<CategoryForm
						mode="edit"
						initialValues={{
							name: selectedCategory.name ?? "",
							description: selectedCategory.description || "",
						}}
						onSubmit={onEditSubmit}
						onCancel={() => setShowEditModal(false)}
					/>
				)}
			</ActionModal>

			<ActionModal
				isOpen={showDeleteModal}
				type="delete"
				title="Delete Category"
				description={`Delete "${selectedCategory?.name ?? ""}"?`}
				message="Type the category name to confirm."
				inputLabel="Confirmation"
				inputPlaceholder={selectedCategory?.name}
				inputValue={deleteConfirmation}
				onInputChange={setDeleteConfirmation}
				onCancel={() => {
					setShowDeleteModal(false);
					setDeleteConfirmation("");
					setSelectedCategory(null);
				}}
				onConfirm={handleConfirmDelete}
				confirmText={deleting ? "Deleting..." : "Delete"}
				cancelText="Cancel"
				isDisabled={
					deleting ||
					deleteConfirmation.toLowerCase() !==
						(selectedCategory?.name ?? "").toLowerCase()
				}
			/>

			{(creating || updating) && (
				<div className="text-sm text-muted-foreground">Saving changes...</div>
			)}
		</div>
	);
}
