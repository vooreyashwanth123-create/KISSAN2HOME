import React, { useState, useEffect } from 'react';
import { Order } from '../../types';
import { Truck, MapPin, CheckCircle, Navigation, Clock } from 'lucide-react';

interface InteractiveDeliveryMapProps {
  order?: Order;
  orders?: Order[];
  height?: string;
}

export const InteractiveDeliveryMap: React.FC<InteractiveDeliveryMapProps> = ({
  order,
  orders = [],
  height = 'h-80'
}) => {
  const activeOrders = order ? [order] : orders;
  const [progressPct, setProgressPct] = useState<number>(65);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressPct(prev => (prev >= 95 ? 20 : prev + 2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-full ${height} bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-800 flex flex-col justify-between p-4 text-white`}>
      
      {/* SVG Canvas Map Display */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#16a34a_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Top Overlay Header Bar */}
      <div className="relative z-10 flex items-center justify-between bg-slate-800/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-700 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-agri-600 flex items-center justify-center font-bold">
            <Truck className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">Live Route Optimizer</p>
            <p className="text-[10px] text-slate-400">Refrigerated EV Transit • 2 Pickup Stops</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 bg-agri-500/20 text-agri-300 font-bold px-2.5 py-1 rounded-lg border border-agri-500/30">
            <Clock className="w-3.5 h-3.5" /> ETA: 25 mins
          </span>
        </div>
      </div>

      {/* Simulated Map Route Lines & Pins */}
      <div className="relative z-10 flex-1 my-4 flex items-center justify-between px-6">
        
        {/* Farmer Pickup Pin */}
        <div className="flex flex-col items-center space-y-1 text-center">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-slate-900 font-extrabold flex items-center justify-center shadow-lg ring-4 ring-emerald-500/20">
            🌾
          </div>
          <span className="text-xs font-bold text-emerald-300">Nashik Farm Hub</span>
          <span className="text-[10px] text-slate-400">Pickup Complete</span>
        </div>

        {/* Dynamic Route Polyline */}
        <div className="flex-1 mx-4 relative h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
          <div
            className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-emerald-500 via-agri-400 to-blue-500 transition-all duration-500 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
          {/* Animated Truck Icon on Line */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-500"
            style={{ left: `${progressPct}%` }}
          >
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg ring-2 ring-white animate-bounce">
              <Truck className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Customer Drop-off Pin */}
        <div className="flex flex-col items-center space-y-1 text-center">
          <div className="w-10 h-10 rounded-2xl bg-blue-500 text-white font-extrabold flex items-center justify-center shadow-lg ring-4 ring-blue-500/20">
            🏠
          </div>
          <span className="text-xs font-bold text-blue-300">Customer Doorstep</span>
          <span className="text-[10px] text-slate-400">Pune Metro</span>
        </div>

      </div>

      {/* Bottom Info Bar */}
      <div className="relative z-10 bg-slate-800/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-700 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-slate-400 block text-[10px]">Total Route</span>
            <span className="font-bold text-white">18.4 km</span>
          </div>
          <div className="border-l border-slate-700 pl-4">
            <span className="text-slate-400 block text-[10px]">Consolidation Savings</span>
            <span className="font-bold text-emerald-400">35% Fuel Saved</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-agri-600 hover:bg-agri-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition-all">
          <Navigation className="w-3.5 h-3.5" /> Navigate
        </div>
      </div>

    </div>
  );
};
