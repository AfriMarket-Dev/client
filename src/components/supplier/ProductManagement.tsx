import React, { useState } from 'react';
import { Plus, Edit, Eye, Trash2, Search, Filter, Grid, List, Package, Image, DollarSign, BarChart3, AlertCircle, Check, X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: { min: number; max: number };
  stock: number;
  status: 'active' | 'inactive' | 'out-of-stock';
  images: string[];
  moq: number;
  views: number;
  inquiries: number;
}

const ProductManagement: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Samsung Galaxy A54 5G (Bulk Pack)',
      category: 'Electronics',
      price: { min: 280, max: 320 },
      stock: 150,
      status: 'active',
      images: ['https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=300'],
      moq: 10,
      views: 234,
      inquiries: 12
    },
    {
      id: '2',
      name: 'Premium Cotton Ankara Fabric Rolls',
      category: 'Fashion & Textiles',
      price: { min: 8, max: 15 },
      stock: 0,
      status: 'out-of-stock',
      images: ['https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=300'],
      moq: 50,
      views: 189,
      inquiries: 8
    },
    {
      id: '3',
      name: 'Wireless Bluetooth Earbuds (Bulk)',
      category: 'Electronics',
      price: { min: 25, max: 45 },
      stock: 300,
      status: 'active',
      images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300'],
      moq: 50,
      views: 456,
      inquiries: 23
    }
  ]);

  const categories = ['all', 'Electronics', 'Fashion & Textiles', 'Home & Garden', 'Beauty & Health'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const ProductForm = ({ product, onClose, onSave }: { product?: Product; onClose: () => void; onSave: (product: any) => void }) => {
    const [formData, setFormData] = useState({
      name: product?.name || '',
      category: product?.category || '',
      description: '',
      minPrice: product?.price.min || 0,
      maxPrice: product?.price.max || 0,
      stock: product?.stock || 0,
      moq: product?.moq || 1,
      status: product?.status || 'active',
      images: product?.images || ['']
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {product ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select category</option>
                  {categories.filter(cat => cat !== 'all').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Describe your product in detail..."
              />
            </div>

            {/* Pricing */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Price (USD) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.minPrice}
                  onChange={(e) => setFormData({...formData, minPrice: parseFloat(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Price (USD) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.maxPrice}
                  onChange={(e) => setFormData({...formData, maxPrice: parseFloat(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Inventory & MOQ */}
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Order Qty *</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.moq}
                  onChange={(e) => setFormData({...formData, moq: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
              <div className="space-y-3">
                {formData.images.map((image, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => {
                        const newImages = [...formData.images];
                        newImages[index] = e.target.value;
                        setFormData({...formData, images: newImages});
                      }}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter image URL"
                    />
                    {formData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = formData.images.filter((_, i) => i !== index);
                          setFormData({...formData, images: newImages});
                        }}
                        className="px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setFormData({...formData, images: [...formData.images, '']})}
                  className="flex items-center px-4 py-3 text-primary hover:bg-primary/5 rounded-xl transition-colors"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Another Image
                </button>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-primary to-primary/90 text-white py-3 rounded-xl font-semibold hover:from-primary/90 hover:to-primary transition-colors"
              >
                {product ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
          <p className="text-gray-600">Manage your product listings and inventory</p>
        </div>
        <button
          onClick={() => setShowAddProduct(true)}
          className="bg-gradient-to-r from-primary to-primary/90 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary/90 hover:to-primary transition-colors flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
          <div className="flex items-center bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-white text-primary shadow-sm' : 'text-gray-600'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-white text-primary shadow-sm' : 'text-gray-600'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  product.status === 'active' ? 'bg-green-100 text-green-700' :
                  product.status === 'inactive' ? 'bg-gray-100 text-gray-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {product.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
            </div>

            <div className="p-4">
              <div className="mb-2">
                <span className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-500">Price Range:</span>
                  <div className="font-semibold text-primary">${product.price.min} - ${product.price.max}</div>
                </div>
                <div>
                  <span className="text-gray-500">Stock:</span>
                  <div className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock} units
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-center">
                <div>
                  <div className="font-semibold text-gray-900">{product.views}</div>
                  <div className="text-gray-500">Views</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{product.inquiries}</div>
                  <div className="text-gray-500">Inquiries</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{product.moq}</div>
                  <div className="text-gray-500">MOQ</div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setEditingProduct(product)}
                  className="flex-1 bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button className="px-3 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="px-3 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
          <button
            onClick={() => setShowAddProduct(true)}
            className="bg-gradient-to-r from-primary to-primary/90 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary/90 hover:to-primary transition-colors"
          >
            Add Your First Product
          </button>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {showAddProduct && (
        <ProductForm
          onClose={() => setShowAddProduct(false)}
          onSave={(product) => console.log('Adding product:', product)}
        />
      )}

      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={(product) => console.log('Updating product:', product)}
        />
      )}
    </div>
  );
};

export default ProductManagement;