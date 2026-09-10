import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { Product, ProductCategory } from '../../types';
import { LongPressReader } from '../../components/accessibility/LongPressReader';
import {
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Check,
  X,
  Upload,
  AlertCircle,
  Sparkles,
  Tag,
  Calendar,
  Layers
} from 'lucide-react';

interface FarmerProductsProps {
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
}

export const FarmerProducts: React.FC<FarmerProductsProps> = ({ isAddModalOpen, setIsAddModalOpen }) => {
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  const { products, addProduct, updateProduct, deleteProduct } = useData();

  const farmerProducts = products.filter(p => p.farmerId === currentUser?.id || p.farmerName.includes(currentUser?.name.split(' ')[0] || 'Patel'));

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: 'Vegetables' as ProductCategory,
    price: 45,
    unit: 'kg' as 'kg' | 'quintal' | 'dozen' | 'litre' | 'bunch',
    quantity: 100,
    qualityGrade: 'A+' as 'A+' | 'A' | 'B',
    harvestDate: new Date().toISOString().split('T')[0],
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
    description: '',
    organic: true
  });

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      category: 'Vegetables',
      price: 45,
      unit: 'kg',
      quantity: 100,
      qualityGrade: 'A+',
      harvestDate: new Date().toISOString().split('T')[0],
      isAvailable: true,
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
      description: '',
      organic: true
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      category: p.category,
      price: p.price,
      unit: p.unit,
      quantity: p.quantity,
      qualityGrade: p.qualityGrade,
      harvestDate: p.harvestDate,
      isAvailable: p.isAvailable,
      image: p.image,
      description: p.description,
      organic: p.organic
    });
  };

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity)
      });
      setEditingProduct(null);
    } else {
      addProduct({
        farmerId: currentUser?.id || 'farmer_1',
        farmerName: currentUser?.name || 'Ramesh Patel',
        farmerLocation: currentUser?.location || 'Nashik, MH',
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        farmSource: currentUser?.farmDetails?.farmName || 'Patel Organic Farms'
      });
      setIsAddModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">{t('myProducts')}</h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage your crop listings, prices, and quantities. Updates reflect dynamically across the Customer marketplace.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-agri-700 hover:bg-agri-800 text-white font-extrabold px-5 py-3 rounded-2xl flex items-center gap-2 text-xs sm:text-sm transition-all shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          {t('addProduct')}
        </button>
      </div>

      {/* Product List Grid */}
      {farmerProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-gray-100">
          <div className="w-16 h-16 rounded-full bg-agri-100 text-agri-700 flex items-center justify-center mx-auto text-2xl font-bold">
            🌾
          </div>
          <h3 className="text-lg font-bold text-slate-800">No products listed yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Add your fresh harvest to the direct marketplace so buyers across India can purchase directly from your farm.
          </p>
          <button
            onClick={handleOpenAdd}
            className="bg-agri-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs"
          >
            + Add First Crop
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmerProducts.map(product => (
            <LongPressReader key={product.id} textToRead={`Product ${product.name}, price Rupee ${product.price} per ${product.unit}. Available stock ${product.quantity} ${product.unit}.`}>
              <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                
                {/* Image */}
                <div className="relative h-48 bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-agri-900/90 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full backdrop-blur-xs">
                    Grade {product.qualityGrade}
                  </span>
                  {product.organic && (
                    <span className="absolute top-3 right-3 bg-emerald-500 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full shadow">
                      Organic 🌱
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-agri-700 uppercase tracking-wider bg-agri-50 px-2 py-0.5 rounded-md">
                        {product.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        product.isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.isAvailable ? 'Available' : 'Out of Stock'}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-base mt-2 leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Stock info */}
                  <div className="pt-3 border-t border-gray-100 space-y-2">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold">Live Marketplace Price</span>
                        <span className="text-xl font-black text-slate-900">₹{product.price}</span>
                        <span className="text-xs text-slate-500 font-medium">/{product.unit}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block font-semibold">Available Stock</span>
                        <span className="text-sm font-extrabold text-agri-800">{product.quantity} {product.unit}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => handleOpenEdit(product)}
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> Edit Price/Stock
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        title="Delete listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </div>

              </div>
            </LongPressReader>
          ))}
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {(isAddModalOpen || editingProduct) && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-gray-100 relative animate-in zoom-in-95 duration-200">
            
            <button
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingProduct(null);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-agri-600" />
              {editingProduct ? 'Edit Crop Listing' : 'Add New Produce Listing'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div>
                <label className="block font-extrabold text-slate-700 mb-1">Crop Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Farm Fresh Organic Tomatoes"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-agri-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-extrabold text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as ProductCategory })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-agri-500 font-medium bg-white"
                  >
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Grains">Grains</option>
                    <option value="Pulses">Pulses</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Spices">Spices</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-extrabold text-slate-700 mb-1">Quality Grade</label>
                  <select
                    value={formData.qualityGrade}
                    onChange={e => setFormData({ ...formData, qualityGrade: e.target.value as 'A+' | 'A' | 'B' })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-agri-500 font-medium bg-white"
                  >
                    <option value="A+">Grade A+ (Export Premium)</option>
                    <option value="A">Grade A (Standard Market)</option>
                    <option value="B">Grade B (Processing Quality)</option>
                  </select>
                </div>
              </div>

              {/* Price & Unit & Quantity */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-extrabold text-slate-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 font-black text-sm text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-extrabold text-slate-700 mb-1">Unit</label>
                  <select
                    value={formData.unit}
                    onChange={e => setFormData({ ...formData, unit: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 font-medium bg-white"
                  >
                    <option value="kg">per kg</option>
                    <option value="quintal">per quintal</option>
                    <option value="dozen">per dozen</option>
                    <option value="litre">per litre</option>
                    <option value="bunch">per bunch</option>
                  </select>
                </div>

                <div>
                  <label className="block font-extrabold text-slate-700 mb-1">Quantity Stock</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.quantity}
                    onChange={e => setFormData({ ...formData, quantity: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 font-bold text-slate-900"
                  />
                </div>
              </div>

              {/* Product Image URL or File Upload */}
              <div>
                <label className="block font-extrabold text-slate-700 mb-1">Produce Image</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Image URL or upload file"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 font-medium"
                  />
                  <label className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-2.5 rounded-xl cursor-pointer flex items-center gap-1 shrink-0">
                    <Upload className="w-4 h-4" /> Upload
                    <input type="file" accept="image/*" onChange={handleImageFile} className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-extrabold text-slate-700 mb-1">Harvest Date</label>
                <input
                  type="date"
                  value={formData.harvestDate}
                  onChange={e => setFormData({ ...formData, harvestDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-medium"
                />
              </div>

              <div>
                <label className="block font-extrabold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe crop freshness, soil details, harvesting method..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-medium"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.organic}
                    onChange={e => setFormData({ ...formData, organic: e.target.checked })}
                    className="w-4 h-4 text-agri-600 rounded"
                  />
                  Certified Organic Produce 🌱
                </label>

                <label className="flex items-center gap-2 font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isAvailable}
                    onChange={e => setFormData({ ...formData, isAvailable: e.target.checked })}
                    className="w-4 h-4 text-agri-600 rounded"
                  />
                  Available for Sale
                </label>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="flex-1 bg-slate-100 text-slate-700 font-bold py-3 rounded-2xl hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-agri-700 text-white font-extrabold py-3 rounded-2xl hover:bg-agri-800 shadow-md"
                >
                  {editingProduct ? 'Save Price & Details' : 'Publish Produce'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
