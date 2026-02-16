import { useState, useMemo } from "react";
import { Search, Plus } from "lucide-react";
import { categories as mockCategories } from "@/data/mockData";
import { ActionModal } from "@/components/common/ActionModal";
import { AdminPageHeader, AdminCard } from "@/components/admin";
import { Button } from "@/components/ui/Button";
import { CategoryCard } from "@/components/admin/categories/CategoryCard";
import { CategoryForm } from "@/components/forms/CategoryForm";

export default function AdminCategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const categories = useMemo(() => {
    return mockCategories.map((category) => ({
      ...category,
      status: "active" as const,
    }));
  }, []);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()),
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

  const handleConfirmDelete = () => {
    alert(`Category "${selectedCategory.name}" has been deleted.`);
    setShowDeleteModal(false);
    setSelectedCategory(null);
    setDeleteConfirmation("");
  };

  const onAddSubmit = (values: any) => {
    alert(`Category "${values.name}" created.`);
    setShowAddModal(false);
  };

  const onEditSubmit = (values: any) => {
    alert(`Category "${values.name}" updated.`);
    setShowEditModal(false);
    setSelectedCategory(null);
  };

  return (
    <div className="space-y-6 pb-12">
      <AdminPageHeader
        title="Categories"
        subtitle="Manage product categories and subcategories"
        actions={
          <Button
            onClick={() => setShowAddModal(true)}
            className="rounded-sm h-11 px-6 font-heading font-bold uppercase text-sm tracking-wider shadow-none"
          >
            <Plus size={18} className="mr-2" />
            Add Category
          </Button>
        }
      />

      <AdminCard noPadding>
        <div className="p-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-3 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              placeholder="SEARCH CATEGORIES..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary uppercase text-sm tracking-wider placeholder:text-muted-foreground/60 h-11 bg-background"
            />
          </div>
        </div>
      </AdminCard>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Add Category Modal */}
      <ActionModal
        isOpen={showAddModal}
        type="info"
        title="Add New Category"
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

      {/* Edit Category Modal */}
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
              name: selectedCategory.name,
              description: selectedCategory.description || "",
            }}
            onSubmit={onEditSubmit}
            onCancel={() => setShowEditModal(false)}
          />
        )}
      </ActionModal>

      {/* Delete Category Modal */}
      <ActionModal
        isOpen={showDeleteModal}
        type="delete"
        title="Delete Category"
        description={`Are you sure you want to delete "${selectedCategory?.name}"?`}
        message={`This action will also affect all subcategories linked to this entity. Please type the category name to confirm.`}
        inputLabel="Purge Verification"
        inputPlaceholder={selectedCategory?.name}
        inputValue={deleteConfirmation}
        onInputChange={setDeleteConfirmation}
        onCancel={() => {
          setShowDeleteModal(false);
          setDeleteConfirmation("");
          setSelectedCategory(null);
        }}
        onConfirm={handleConfirmDelete}
        confirmText="Confirm Purge"
        cancelText="Cancel"
        isDisabled={
          deleteConfirmation.toLowerCase() !==
          selectedCategory?.name?.toLowerCase()
        }
      />
    </div>
  );
}
