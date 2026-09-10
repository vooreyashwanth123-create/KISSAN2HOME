import React from 'react';
import { LogisticsService } from '../../services/logisticsService';
import { Info, ShieldCheck, ArrowRight } from 'lucide-react';

interface TransparentPriceBadgeProps {
  farmerSubtotal: number;
  distanceKm?: number;
}

export const TransparentPriceBadge: React.FC<TransparentPriceBadgeProps> = ({
  farmerSubtotal,
  distanceKm = 12
}) => {
  const breakdown = LogisticsService.calculateTransparentPrice(farmerSubtotal, distanceKm);

  return (
    <div className="bg-gradient-to-br from-agri-50 to-emerald-50/50 rounded-2xl p-4 border border-agri-200/80 shadow-xs space-y-3">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-agri-800 font-extrabold text-xs uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-agri-600" />
          100% Transparent Price Breakdown
        </div>
        <span className="bg-agri-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
          Zero Middleman
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center pt-1">
        
        <div className="bg-white p-2.5 rounded-xl border border-agri-100 shadow-xs">
          <p className="text-[10px] text-slate-500 font-medium">Farmer Earnings</p>
          <p className="text-sm font-extrabold text-agri-700 mt-0.5">₹{breakdown.farmerSubtotal}</p>
          <span className="text-[9px] text-slate-400">Direct to farmer</span>
        </div>

        <div className="bg-white p-2.5 rounded-xl border border-agri-100 shadow-xs">
          <p className="text-[10px] text-slate-500 font-medium">Logistics Charge</p>
          <p className="text-sm font-extrabold text-blue-700 mt-0.5">₹{breakdown.logisticsFee}</p>
          <span className="text-[9px] text-slate-400">Fuel & Driver</span>
        </div>

        <div className="bg-white p-2.5 rounded-xl border border-agri-100 shadow-xs">
          <p className="text-[10px] text-slate-500 font-medium">Platform Fee</p>
          <p className="text-sm font-extrabold text-slate-700 mt-0.5">₹{breakdown.platformFee}</p>
          <span className="text-[9px] text-slate-400">Tech & Support</span>
        </div>

      </div>

      <div className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-xl border border-agri-200">
        <span className="text-xs font-extrabold text-slate-900">Total Customer Payable</span>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-black text-slate-900">₹{breakdown.totalPrice}</span>
          <span className="text-[11px] text-emerald-600 font-bold bg-emerald-100 px-2 py-0.5 rounded-md">
            Save ~₹{breakdown.savingsVsIntermediary} vs Mandi Middlemen
          </span>
        </div>
      </div>

    </div>
  );
};
