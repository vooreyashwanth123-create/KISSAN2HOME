import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { Product, ProductCategory } from '../../types';
import { InAppChatModal } from '../../components/chat/InAppChatModal';
import {
  Search,
  Filter,
  ShoppingCart,
  ShieldCheck,
  Star,
  Sprout,
  Heart,
  MessageSquare,
  CheckCircle,
  Sparkles
} from 'lucide-react';

interface CustomerMarketplaceProps {
  onOpenCart: () => void;
}

export const CustomerMarketplace: React.FC<CustomerMarketplaceProps> = ({ onOpenCart }) => {
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  const { products, addToCart, cart } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeChat, setActiveChat] = useState<{ isOpen: boolean; receiverId: string; receiverName: string } | null>(null);

  const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Pulses', 'Dairy', 'Spices'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory && p.isAvailable;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-agri-800 via-agri-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <span className="bg-agri-600/80 text-agri-100 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            🌱 100% Direct Farm Marketplace
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Fresh Produce Direct From Verified Farmers
          </h1>
          <p className="text-agri-100 text-xs sm:text-sm max-w-xl">
            No middlemen. Fair prices for farmers, harvest freshness for your home.
          </p>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border border-gray-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-agri-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-agri-700 text-white shadow-sm'
                  : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center text-slate-400 space-y-2 border border-gray-100">
          <Search className="w-12 h-12 mx-auto text-slate-300" />
          <p className="font-bold text-sm text-slate-800">No matching produce found</p>
          <p className="text-xs">Try searching for tomatoes, Basmati rice, turmeric, or red onions.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => {
            const inCart = cart.find(c => c.product.id === product.id);
            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Image */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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

                {/* Body */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-agri-700 uppercase tracking-wider bg-agri-50 px-2 py-0.5 rounded-md text-[10px]">
                        {product.category}
                      </span>
                      <button
                        onClick={() => setActiveChat({ isOpen: true, receiverId: product.farmerId, receiverName: product.farmerName })}
                        className="text-slate-500 hover:text-agri-700 font-semibold text-[11px] flex items-center gap-1"
                        title="Chat with farmer"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-agri-600" /> Chat Farmer
                      </button>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-base mt-2 leading-tight">
                      {product.name}
                    </h3>

                    {/* Farmer badge */}
                    <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-600 font-medium">
                      <span>🌾 {product.farmerName}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500">{product.farmerLocation}</span>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Buy Button */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">Direct Farmer Price</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-slate-900">₹{product.price}</span>
                        <span className="text-xs text-slate-500 font-bold">/{product.unit}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-sm ${
                        inCart
                          ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                          : 'bg-agri-700 hover:bg-agri-800 text-white shadow-agri-700/30'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {inCart ? `In Cart (${inCart.quantity})` : 'Add to Cart'}
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Chat Modal */}
      {activeChat && (
        <InAppChatModal
          isOpen={activeChat.isOpen}
          onClose={() => setActiveChat(null)}
          receiverId={activeChat.receiverId}
          receiverName={activeChat.receiverName}
        />
      )}

    </div>
  );
};
