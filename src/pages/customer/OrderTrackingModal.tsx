import React from 'react';
import { Order } from '../../types';
import { InteractiveDeliveryMap } from '../../components/map/InteractiveDeliveryMap';
import { X, CheckCircle, Clock, Truck, ShieldCheck, MapPin } from 'lucide-react';

interface OrderTrackingModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-gray-100 relative space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-slate-900 text-lg">Order Tracking #{order.id}</h3>
              <span className="bg-agri-100 text-agri-800 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase">
                {order.status.replace(/_/g, ' ')}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Direct Farmer: <span className="font-extrabold text-slate-800">{order.farmerName}</span> ({order.farmerLocation})
            </p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Delivery Route Map Overlay */}
        <InteractiveDeliveryMap order={order} height="h-64" />

        {/* 7 Stage Visual Order Timeline */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
            Order Fulfillment Progress Timeline
          </h4>

          <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
            {order.trackingSteps.map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-3 text-xs">
                <div
                  className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ring-4 ring-white ${
                    step.completed
                      ? 'bg-agri-600 text-white shadow'
                      : 'bg-gray-200 text-slate-400'
                  }`}
                >
                  {step.completed ? '✓' : idx + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`font-extrabold ${step.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                      {step.label}
                    </span>
                    {step.timestamp && (
                      <span className="text-[10px] text-agri-700 font-bold bg-agri-50 px-2 py-0.5 rounded-full">
                        {step.timestamp}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Details & Delivery Partner info */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
          <div>
            <span className="text-slate-400 block text-[10px] font-semibold">Assigned Refrigerated EV Courier</span>
            <span className="font-black text-slate-900 text-sm">🚚 {order.deliveryPartnerName}</span>
            <span className="text-slate-500 block">Phone: {order.deliveryPartnerPhone}</span>
          </div>
          <div className="text-right">
            <span className="text-slate-400 block text-[10px] font-semibold">Estimated Doorstep Arrival</span>
            <span className="font-extrabold text-agri-800 text-sm">⏰ {order.estimatedDeliveryTime}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
