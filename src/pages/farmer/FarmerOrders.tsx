import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { OrderStatus } from '../../types';
import { LongPressReader } from '../../components/accessibility/LongPressReader';
import { InAppChatModal } from '../../components/chat/InAppChatModal';
import { ShoppingBag, CheckCircle, Clock, Truck, MessageSquare, ShieldCheck, MapPin } from 'lucide-react';

export const FarmerOrders: React.FC = () => {
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  const { orders, updateOrderStatus } = useData();

  const farmerOrders = orders.filter(o => o.farmerId === currentUser?.id || o.farmerName.includes(currentUser?.name.split(' ')[0] || 'Patel'));

  const [activeChat, setActiveChat] = useState<{ isOpen: boolean; receiverId: string; receiverName: string; orderId: string } | null>(null);

  return (
    <div className="space-y-6">
      
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">{t('orders')}</h2>
          <p className="text-xs text-slate-500 mt-1">
            Direct buyer orders requiring harvest preparation & dispatch handoff.
          </p>
        </div>
        <span className="bg-agri-100 text-agri-900 font-extrabold text-xs px-3 py-1.5 rounded-full self-start">
          {farmerOrders.length} Total Direct Orders
        </span>
      </div>

      {farmerOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center text-slate-400 space-y-2 border border-gray-100">
          <ShoppingBag className="w-12 h-12 mx-auto text-slate-300" />
          <p className="font-bold text-sm text-slate-700">No active customer orders right now</p>
          <p className="text-xs">When buyers place orders for your produce, they will show up here instantly.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {farmerOrders.map(order => (
            <LongPressReader key={order.id} textToRead={`Order ${order.id} from customer ${order.customerName}. Status ${order.status}. Total Rupee ${order.farmerSubtotal}.`}>
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4 hover:border-agri-200 transition-all">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-900 text-sm">{order.id}</span>
                      <span className="text-xs text-slate-400">• {new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-600 mt-0.5">
                      Buyer: <span className="font-extrabold text-slate-800">{order.customerName}</span> ({order.customerPhone})
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveChat({ isOpen: true, receiverId: order.customerId, receiverName: order.customerName, orderId: order.id })}
                      className="bg-agri-50 hover:bg-agri-100 text-agri-800 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 border border-agri-200"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> Direct Chat
                    </button>

                    <span className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                      order.status === 'delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : order.status === 'placed'
                        ? 'bg-amber-100 text-amber-800 animate-pulse'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y divide-gray-50">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.productName} className="w-10 h-10 rounded-xl object-cover" />
                        <div>
                          <p className="font-bold text-slate-900">{item.productName}</p>
                          <span className="text-slate-500">{item.quantity} {item.unit} @ ₹{item.unitPrice}/{item.unit}</span>
                        </div>
                      </div>
                      <span className="font-extrabold text-slate-900">₹{item.quantity * item.unitPrice}</span>
                    </div>
                  ))}
                </div>

                {/* Footer Controls & State Progression */}
                <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Farmer Earnings Subtotal</span>
                    <span className="text-lg font-black text-agri-800">₹{order.farmerSubtotal}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {order.status === 'placed' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'confirmed')}
                        className="bg-agri-700 hover:bg-agri-800 text-white font-extrabold px-4 py-2 rounded-xl text-xs shadow"
                      >
                        ✓ Accept & Confirm Order
                      </button>
                    )}
                    {order.status === 'confirmed' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'preparing')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-4 py-2 rounded-xl text-xs shadow"
                      >
                        📦 Harvest & Pack Produce
                      </button>
                    )}
                    {order.status === 'preparing' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'ready_for_pickup')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-4 py-2 rounded-xl text-xs shadow"
                      >
                        🚚 Ready for Delivery Pickup
                      </button>
                    )}
                    {order.status === 'ready_for_pickup' && (
                      <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Ready for EV Driver Pickup
                      </span>
                    )}
                  </div>
                </div>

              </div>
            </LongPressReader>
          ))}
        </div>
      )}

      {/* Chat Modal */}
      {activeChat && (
        <InAppChatModal
          isOpen={activeChat.isOpen}
          onClose={() => setActiveChat(null)}
          receiverId={activeChat.receiverId}
          receiverName={activeChat.receiverName}
          orderId={activeChat.orderId}
        />
      )}

    </div>
  );
};
