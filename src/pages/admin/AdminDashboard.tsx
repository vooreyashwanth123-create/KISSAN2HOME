import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  Users,
  ShoppingBag,
  Package,
  TrendingUp,
  ShieldCheck,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AdminDashboardProps {
  setActiveTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ setActiveTab }) => {
  const { users } = useAuth();
  const { products, orders, complaints } = useData();

  const farmersCount = users.filter(u => u.role === 'FARMER').length;
  const customersCount = users.filter(u => u.role === 'CUSTOMER').length;
  const deliveryCount = users.filter(u => u.role === 'DELIVERY').length;
  const pendingVerifications = users.filter(u => u.role === 'FARMER' && u.verificationStatus === 'pending').length;

  const totalGMV = orders.reduce((sum, o) => sum + o.totalPrice, 0);

  const chartData = [
    { day: 'Mon', gmv: 42000, orders: 48 },
    { day: 'Tue', gmv: 58000, orders: 62 },
    { day: 'Wed', gmv: 64000, orders: 71 },
    { day: 'Thu', gmv: 79000, orders: 85 },
    { day: 'Fri', gmv: 91000, orders: 104 },
    { day: 'Sat', gmv: 115000, orders: 138 },
    { day: 'Sun', gmv: 142000, orders: 165 }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="bg-agri-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
            ⚡ Admin Command Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-2">KISSAN2HOME Operations Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Real-time telemetry across farmer verification, direct order processing, route logistics, and AI demand forecasting.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('verification')}
            className="bg-agri-600 hover:bg-agri-700 text-white font-extrabold px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2 shadow"
          >
            <ShieldCheck className="w-4 h-4" /> Verify Farmers ({pendingVerifications})
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Total Platform GMV</span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">₹{totalGMV > 0 ? totalGMV : 591000}</p>
          <span className="text-[11px] text-emerald-600 font-semibold">100% direct transaction flow</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Registered Farmers</span>
            <div className="w-9 h-9 rounded-2xl bg-agri-50 text-agri-700 flex items-center justify-center font-bold">
              🌾
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{farmersCount}</p>
          <span className="text-[11px] text-agri-700 font-semibold">{pendingVerifications} Pending Verification</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Active Customers</span>
            <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              🛒
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{customersCount}</p>
          <span className="text-[11px] text-blue-600 font-semibold">Verified households</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Active Deliveries</span>
            <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{orders.length}</p>
          <span className="text-[11px] text-amber-600 font-semibold">Live order tracking</span>
        </div>

      </div>

      {/* Chart & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base">Weekly Platform Order Volume & GMV</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip formatter={(val: number) => [`₹${val}`, 'Gross Value']} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                <Area type="monotone" dataKey="gmv" stroke="#16a34a" fill="#dcfce7" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Activity Log */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base">Platform Activity Log</h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-agri-50 rounded-2xl border border-agri-200">
              <p className="font-bold text-slate-900">Farmer Verification Request</p>
              <p className="text-slate-600 mt-0.5">Patel Organic Farms submitted land registry document.</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200">
              <p className="font-bold text-slate-900">AI Route Optimization Triggered</p>
              <p className="text-slate-600 mt-0.5">Consolidated 4 order stops for EV Van MH-15-AB-9821.</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
              <p className="font-bold text-slate-900">Direct Farmer Settlement Release</p>
              <p className="text-slate-600 mt-0.5">Released ₹1,100 to Gurpreet Singh upon OTP delivery.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
