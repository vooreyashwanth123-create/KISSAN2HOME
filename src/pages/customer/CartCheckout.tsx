import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { TransparentPriceBadge } from '../../components/common/TransparentPriceBadge';
import { ShoppingCart, X, Plus, Minus, Trash2, ShieldCheck, ArrowRight, CreditCard } from 'lucide-react';

interface CartCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (orderId: string) => void;
}

export const CartCheckout: React.FC<CartCheckoutProps> = ({ isOpen, onClose, onOrderSuccess }) => {
  const { currentUser } = useAuth();
  const { cart, updateCartQuantity, removeFromCart, checkoutCart } = useData();

  const [address, setAddress] = useState('Flat 402, Green Glen Layout, Koregaon Park, Pune - 411001');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 99887 76655');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'COD' | 'NetBanking'>('UPI');

  if (!isOpen) return null;

  const farmerSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newOrderId = checkoutCart(
      currentUser?.id || 'customer_1',
      currentUser?.name || 'Ananya Sharma',
      phone,
      address,
      paymentMethod
    );

    onOrderSuccess(newOrderId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-gray-100 relative animate-in zoom-in-95 duration-200 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-agri-100 text-agri-700 flex items-center justify-center font-bold">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Direct Farm Shopping Cart</h3>
              <p className="text-xs text-slate-500">{cart.length} produce items in cart</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-8 text-slate-400 space-y-2">
            <ShoppingCart className="w-12 h-12 mx-auto text-slate-300" />
            <p className="font-bold text-sm text-slate-700">Your cart is empty</p>
            <p className="text-xs">Browse fresh produce in the marketplace to add to your order.</p>
          </div>
        ) : (
          <form onSubmit={handleCheckout} className="space-y-6 text-xs">
            
            {/* Cart Items List */}
            <div className="divide-y divide-gray-100 max-h-48 overflow-y-auto pr-1 space-y-2">
              {cart.map(item => (
                <div key={item.product.id} className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{item.product.name}</h4>
                      <p className="text-[11px] text-slate-500">🌾 {item.product.farmerName} • ₹{item.product.price}/{item.product.unit}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Quantity Selector */}
                    <div className="flex items-center bg-gray-100 rounded-xl p-1 border border-gray-200">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-slate-600 hover:text-slate-900"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-black text-slate-900">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-slate-600 hover:text-slate-900"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-black text-slate-900 text-sm">₹{item.product.price * item.quantity}</span>
                    
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-slate-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 100% Transparent Price Breakdown */}
            <TransparentPriceBadge farmerSubtotal={farmerSubtotal} distanceKm={12.5} />

            {/* Delivery Address Form */}
            <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-200">
              <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Delivery Details</h4>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Delivery Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-medium"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Phone Number for OTP Delivery</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-medium"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Select Payment Method</h4>
              <div className="grid grid-cols-2 gap-2">
                {(['UPI', 'Card', 'COD', 'NetBanking'] as const).map(method => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-between transition-all ${
                      paymentMethod === method
                        ? 'bg-agri-50 border-agri-600 text-agri-900 ring-2 ring-agri-500/20'
                        : 'bg-white border-gray-200 text-slate-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{method === 'UPI' ? '⚡ Instant UPI (GPay/PhonePe)' : method === 'Card' ? '💳 Credit/Debit Card' : method === 'COD' ? '💵 Cash on Delivery' : '🏦 NetBanking'}</span>
                    {paymentMethod === method && <ShieldCheck className="w-4 h-4 text-agri-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Submit */}
            <button
              type="submit"
              className="w-full bg-agri-700 hover:bg-agri-800 text-white font-extrabold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-agri-700/30 transition-all"
            >
              Place Direct Farm Order <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
