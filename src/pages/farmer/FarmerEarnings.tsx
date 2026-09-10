import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { LongPressReader } from '../../components/accessibility/LongPressReader';
import { DollarSign, TrendingUp, CheckCircle2, Clock, Download, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const FarmerEarnings: React.FC = () => {
  const { currentUser } = useAuth();
  const { orders } = useData();

  const farmerOrders = orders.filter(o => o.farmerId === currentUser?.id || o.farmerName.includes(currentUser?.name.split(' ')[0] || 'Patel'));

  const totalEarnings = farmerOrders.reduce((sum, o) => sum + o.farmerSubtotal, 0);
  const completedPayouts = farmerOrders.filter(o => o.status === 'delivered').reduce((sum, o) => sum + o.farmerSubtotal, 0);
  const pendingPayouts = totalEarnings - completedPayouts;

  const chartData = [
    { month: 'Apr', sales: 12400 },
    { month: 'May', sales: 18900 },
    { month: 'Jun', sales: 24500 },
    { month: 'Jul', sales: 31000 },
    { month: 'Aug', sales: 28400 },
    { month: 'Sep', sales: totalEarnings > 0 ? totalEarnings : 36500 }
  ];

  return (
    <div className="space-y-6">
      
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">Farmer Financial Earnings</h2>
          <p className="text-xs text-slate-500 mt-1">
            Transparent digital settlements directly into your verified bank account. Zero middleman cuts.
          </p>
        </div>
        <button
          onClick={() => alert('Earnings statement downloaded!')}
          className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shrink-0"
        >
          <Download className="w-4 h-4" /> Export CSV Statement
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <LongPressReader textToRead={`Total Farm Sales: Rupee ${totalEarnings}`}>
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-2">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">Total Sales Revenue</span>
            <p className="text-3xl font-black text-slate-900">₹{totalEarnings}</p>
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +24% vs last month
            </span>
          </div>
        </LongPressReader>

        <LongPressReader textToRead={`Settled Bank Payouts: Rupee ${completedPayouts}`}>
          <div className="bg-emerald-50/60 p-6 rounded-3xl border border-emerald-200/60 space-y-2">
            <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider block">Settled Bank Account</span>
            <p className="text-3xl font-black text-emerald-950">₹{completedPayouts}</p>
            <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Direct NEFT / UPI Transfer
            </span>
          </div>
        </LongPressReader>

        <LongPressReader textToRead={`Pending Escrow Payouts: Rupee ${pendingPayouts}`}>
          <div className="bg-amber-50/60 p-6 rounded-3xl border border-amber-200/60 space-y-2">
            <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider block">Pending Escrow Payout</span>
            <p className="text-3xl font-black text-amber-950">₹{pendingPayouts}</p>
            <span className="text-xs text-amber-700 font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" /> Releases upon delivery OTP
            </span>
          </div>
        </LongPressReader>

      </div>

      {/* Analytics Chart */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base">Monthly Farm Revenue Growth (INR)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip formatter={(val: number) => [`₹${val}`, 'Revenue']} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="sales" fill="#16a34a" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
