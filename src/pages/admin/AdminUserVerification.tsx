import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, XCircle, CheckCircle, FileText, MapPin } from 'lucide-react';

export const AdminUserVerification: React.FC = () => {
  const { users, updateUserVerification } = useAuth();

  const farmers = users.filter(u => u.role === 'FARMER');

  return (
    <div className="space-y-6">
      
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">Farmer Verification & KYC</h2>
          <p className="text-xs text-slate-500 mt-1">
            Review land ownership documents & farm credentials to approve Verified Farmer badges.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {farmers.map(farmer => (
          <div key={farmer.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="flex items-center gap-4">
              <img src={farmer.avatar} alt={farmer.name} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-gray-100" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-base">{farmer.name}</h3>
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                    farmer.verificationStatus === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {farmer.verificationStatus || 'pending'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">{farmer.farmDetails?.farmName || 'Patel Organic Farms'} • {farmer.location}</p>
                <p className="text-xs text-slate-400 mt-1">Land Size: <span className="font-bold text-slate-700">{farmer.farmDetails?.sizeAcres || 12} Acres</span> • Soil: {farmer.farmDetails?.soilType || 'Black Cotton'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => updateUserVerification(farmer.id, 'rejected')}
                className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-xl text-xs flex items-center gap-1"
              >
                <XCircle className="w-4 h-4" /> Reject
              </button>
              <button
                onClick={() => updateUserVerification(farmer.id, 'verified')}
                className="px-4 py-2 bg-agri-700 hover:bg-agri-800 text-white font-extrabold rounded-xl text-xs flex items-center gap-1 shadow"
              >
                <CheckCircle className="w-4 h-4" /> Approve Verified Badge
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
