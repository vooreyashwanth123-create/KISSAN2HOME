import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart3, Filter } from 'lucide-react';

export const AdminSupplyDemand: React.FC = () => {
  const { products, orders } = useData();
  const [selectedCrop, setSelectedCrop] = useState<string>('All');

  const supplyVsDemandData = [
    { crop: 'Tomatoes', supply: 1650, demand: 2100 },
    { crop: 'Onions', supply: 2200, demand: 1800 },
    { crop: 'Basmati Rice', supply: 1200, demand: 1950 },
    { crop: 'Turmeric', supply: 450, demand: 720 },
    { crop: 'Grapes', supply: 850, demand: 980 }
  ];

  return (
    <div className="space-y-6">
      
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">Regional Supply vs Demand Analytics</h2>
          <p className="text-xs text-slate-500 mt-1">
            Aggregated crop supply from farmer listings compared against active buyer order velocity.
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base">Crop Supply (Kg) vs Buyer Demand (Kg)</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={supplyVsDemandData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="crop" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip formatter={(val: number) => [`${val} kg`, 'Quantity']} contentStyle={{ borderRadius: '12px', border: 'none' }} />
              <Legend />
              <Bar dataKey="supply" name="Listed Supply (Kg)" fill="#16a34a" radius={[6, 6, 0, 0]} />
              <Bar dataKey="demand" name="Buyer Demand (Kg)" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
