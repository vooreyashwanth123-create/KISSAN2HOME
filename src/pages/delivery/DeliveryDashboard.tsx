import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { InteractiveDeliveryMap } from '../../components/map/InteractiveDeliveryMap';
import { Truck, MapPin, CheckCircle, Navigation, Phone, ShieldCheck } from 'lucide-react';

export const DeliveryDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { orders, updateOrderStatus } = useData();

  const assignedOrders = orders.filter(o => o.deliveryPartnerId === currentUser?.id || o.deliveryPartnerName?.includes('Suresh') || true);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-agri-500"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black">{currentUser?.name}</h2>
              <span className="bg-agri-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                Active Courier
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              🚚 Vehicle: {currentUser?.deliveryDetails?.vehicleType || 'Refrigerated EV Mini Van'} ({currentUser?.deliveryDetails?.licenseNumber || 'MH-15-AB-9821'})
            </p>
          </div>
        </div>

        <div className="bg-slate-800 p-3 rounded-2xl border border-slate-700 text-center text-xs">
          <span className="text-slate-400 block text-[10px]">Today's Completed Trips</span>
          <span className="font-black text-emerald-400 text-lg">14 Deliveries</span>
        </div>
      </div>

      {/* Map Overview */}
      <InteractiveDeliveryMap orders={assignedOrders} height="h-72" />

      {/* Assigned Pickups & Drops */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <Truck className="w-5 h-5 text-agri-600" />
          Assigned Deliveries & Consolidation Stops
        </h3>

        <div className="space-y-4">
          {assignedOrders.map(order => (
            <div key={order.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                <div>
                  <span className="font-black text-slate-900 text-sm">Order #{order.id}</span>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Farmer Pickup: <span className="font-extrabold text-slate-800">{order.farmerName}</span> ({order.farmerLocation})
                  </p>
                </div>
                <span className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                  order.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-agri-100 text-agri-800'
                }`}>
                  {order.status.replace(/_/g, ' ')}
                </span>
              </div>

              {/* Waypoints info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                
                <div className="bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-200/60 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                    <MapPin className="w-4 h-4 text-emerald-600" /> 1. Pickup Station (Farmer)
                  </div>
                  <p className="font-extrabold text-slate-900">{order.farmerName}</p>
                  <p className="text-[11px] text-slate-600">{order.farmerLocation} • Cell: +91 98765 43210</p>
                </div>

                <div className="bg-blue-50/60 p-3.5 rounded-2xl border border-blue-200/60 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-blue-900">
                    <MapPin className="w-4 h-4 text-blue-600" /> 2. Delivery Doorstep (Customer)
                  </div>
                  <p className="font-extrabold text-slate-900">{order.customerName}</p>
                  <p className="text-[11px] text-slate-600">{order.customerAddress}</p>
                  <p className="text-[11px] text-blue-700 font-bold">Cell: {order.customerPhone}</p>
                </div>

              </div>

              {/* Status Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl">
                <span className="text-xs font-extrabold text-slate-800">
                  Driver Action Status Update:
                </span>

                <div className="flex items-center gap-2">
                  {order.status === 'ready_for_pickup' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'picked_up')}
                      className="bg-agri-700 hover:bg-agri-800 text-white font-extrabold px-4 py-2 rounded-xl text-xs shadow"
                    >
                      📦 Confirm Picked Up from Farm
                    </button>
                  )}

                  {order.status === 'picked_up' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'out_for_delivery')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-4 py-2 rounded-xl text-xs shadow"
                    >
                      🚚 Mark Out for Delivery
                    </button>
                  )}

                  {order.status === 'out_for_delivery' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'delivered')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-4 py-2 rounded-xl text-xs shadow flex items-center gap-1"
                    >
                      <CheckCircle className="w-4 h-4" /> Mark Delivered (Proof OTP)
                    </button>
                  )}

                  {order.status === 'delivered' && (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-emerald-600" /> Delivery Completed
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
