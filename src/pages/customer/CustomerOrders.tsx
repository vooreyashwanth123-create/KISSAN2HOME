import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { Order } from '../../types';
import { OrderTrackingModal } from './OrderTrackingModal';
import { InAppChatModal } from '../../components/chat/InAppChatModal';
import { ShoppingBag, MapPin, Truck, MessageSquare, Clock, ArrowRight } from 'lucide-react';

export const CustomerOrders: React.FC = () => {
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  const { orders } = useData();

  const customerOrders = orders.filter(o => o.customerId === currentUser?.id || o.customerName.includes(currentUser?.name.split(' ')[0] || 'Ananya'));

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeChat, setActiveChat] = useState<{ isOpen: boolean; receiverId: string; receiverName: string; orderId: string } | null>(null);

  return (
    <div className="space-y-6">
      
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">{t('orders')}</h2>
          <p className="text-xs text-slate-500 mt-1">
            Track your farm-direct produce deliveries in real-time.
          </p>
        </div>
        <span className="bg-agri-100 text-agri-900 font-extrabold text-xs px-3 py-1.5 rounded-full self-start">
          {customerOrders.length} Direct Farm Orders
        </span>
      </div>

      {customerOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center text-slate-400 space-y-2 border border-gray-100">
          <ShoppingBag className="w-12 h-12 mx-auto text-slate-300" />
          <p className="font-bold text-sm text-slate-800">No orders placed yet</p>
          <p className="text-xs">Browse the marketplace and place your first order directly from local farmers.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {customerOrders.map(order => (
            <div key={order.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4 hover:border-agri-200 transition-all">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 text-sm">{order.id}</span>
                    <span className="text-xs text-slate-400">• {new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-600 mt-0.5">
                    Farmer: <span className="font-extrabold text-slate-800">{order.farmerName}</span> ({order.farmerLocation})
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveChat({ isOpen: true, receiverId: order.farmerId, receiverName: order.farmerName, orderId: order.id })}
                    className="bg-agri-50 hover:bg-agri-100 text-agri-800 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 border border-agri-200"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Chat Farmer
                  </button>

                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                    order.status === 'delivered'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-agri-100 text-agri-800'
                  }`}>
                    {order.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-50">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between text-xs">
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

              {/* Footer */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between bg-slate-50 p-4 rounded-2xl">
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Total Paid (Inc. Logistics & Platform Fee)</span>
                  <span className="text-lg font-black text-slate-900">₹{order.totalPrice}</span>
                </div>

                <button
                  onClick={() => setSelectedOrder(order)}
                  className="bg-agri-700 hover:bg-agri-800 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow"
                >
                  <Truck className="w-4 h-4" /> Track Live Order <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Tracking Modal */}
      {selectedOrder && (
        <OrderTrackingModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
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
