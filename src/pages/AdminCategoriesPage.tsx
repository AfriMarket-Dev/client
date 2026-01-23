import { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Settings,
  Smartphone,
  Shirt,
  Home,
  Heart,
  Car,
  type LucideIcon,
} from "lucide-react";
import { categories as mockCategories } from "@/data/mockData";
import ActionModal from "@/components/ActionModal";

export default function AdminCategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
  });
  const [addFormData, setAddFormData] = useState({
    name: "",
    description: "",
    icon: "",
  });

  // Map icon names to lucide-react icons
  const iconMap: { [key: string]: LucideIcon } = {
    Smartphone,
    Shirt,
    Home,
    Heart,
    Car,
    Settings,
  };

  // Add status field to categories from mockData
  const categoriesWithStatus = mockCategories.map((category) => ({
    ...category,
    status: "active" as const,
  }));

  const filteredCategories = categoriesWithStatus.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Edit handler
  const handleEditCategory = (category: any) => {
    setSelectedCategory(category);
    setEditFormData({
      name: category.name,
      description: category.description || "",
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    alert(`Category "${editFormData.name}" has been updated successfully.`);
    setShowEditModal(false);
    setEditFormData({ name: "", description: "" });
    setSelectedCategory(null);
  };

  // Delete handler
  const handleDeleteCategory = (category: any) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (
      deleteConfirmation.toLowerCase() === selectedCategory.name.toLowerCase()
    ) {
      alert(
        `Category "${selectedCategory.name}" has been deleted successfully.`,
      );
      setShowDeleteModal(false);
      setDeleteConfirmation("");
      setSelectedCategory(null);
    } else {
      alert("Category name does not match. Please try again.");
    }
  };

  // Add Category handler
  const handleAddCategory = () => {
    if (!addFormData.name.trim()) {
      alert("Please enter a category name.");
      return;
    }
    alert(`Category "${addFormData.name}" has been added successfully.`);
    setShowModal(false);
    setAddFormData({ name: "", description: "", icon: "" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Categories Management
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Manage product categories and subcategories
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-4 py-2 rounded-lg transition-all"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => {
          const IconComponent = iconMap[category.icon];
          return (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-all overflow-hidden border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {IconComponent && (
                      <div className="p-3 bg-orange-100 rounded-lg">
                        <IconComponent size={24} className="text-orange-600" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {category.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      category.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {category.status}
                  </span>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {category.productCount}
                  </p>
                  <p className="text-xs text-gray-600">Products</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {category.subcategories?.length || 0}
                  </p>
                  <p className="text-xs text-gray-600">Sub-Categories</p>
                </div>
              </div>

              <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  {category.productCount > 0 ? "Active" : "Inactive"}
                </p>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-orange-100 rounded-lg transition-all text-orange-600">
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="p-2 hover:bg-blue-100 rounded-lg transition-all text-blue-600"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-all text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Category Modal */}
      <ActionModal
        isOpen={showModal}
        type="info"
        title="Add New Category"
        description="Create a new product category"
        onCancel={() => {
          setShowModal(false);
          setAddFormData({ name: "", description: "", icon: "" });
        }}
        onConfirm={handleAddCategory}
        confirmText="Create Category"
        cancelText="Cancel"
        isDisabled={!addFormData.name.trim()}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={addFormData.name}
              onChange={(e) =>
                setAddFormData({ ...addFormData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={addFormData.description}
              onChange={(e) =>
                setAddFormData({
                  ...addFormData,
                  description: e.target.value,
                })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Icon (Emoji or Icon Name)
            </label>
            <input
              type="text"
              value={addFormData.icon}
              onChange={(e) =>
                setAddFormData({ ...addFormData, icon: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 📱 or Smartphone"
            />
          </div>
        </div>
      </ActionModal>

      {/* Edit Category Modal */}
      <ActionModal
        isOpen={showEditModal}
        type="info"
        title="Edit Category"
        description="Update category details"
        onCancel={() => {
          setShowEditModal(false);
          setEditFormData({ name: "", description: "" });
          setSelectedCategory(null);
        }}
        onConfirm={handleSaveEdit}
        confirmText="Save Changes"
        cancelText="Cancel"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={editFormData.name}
              onChange={(e) =>
                setEditFormData({ ...editFormData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={editFormData.description}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  description: e.target.value,
                })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category description"
            />
          </div>
        </div>
      </ActionModal>

      {/* Delete Category Modal */}
      <ActionModal
        isOpen={showDeleteModal}
        type="delete"
        title="Delete Category"
        description={`Are you sure you want to delete "${selectedCategory?.name}"?`}
        message={`This action cannot be undone. Please type the category name to confirm deletion.`}
        inputLabel="Category Name"
        inputPlaceholder={selectedCategory?.name}
        inputValue={deleteConfirmation}
        onInputChange={setDeleteConfirmation}
        onCancel={() => {
          setShowDeleteModal(false);
          setDeleteConfirmation("");
          setSelectedCategory(null);
        }}
        onConfirm={handleConfirmDelete}
        confirmText="Delete Category"
        cancelText="Cancel"
        isDisabled={
          deleteConfirmation.toLowerCase() !==
          selectedCategory?.name?.toLowerCase()
        }
      />
    </div>
  );
}
