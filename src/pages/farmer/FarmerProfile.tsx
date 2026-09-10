import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LongPressReader } from '../../components/accessibility/LongPressReader';
import { ShieldCheck, MapPin, Award, FileText, CheckCircle2, Clock } from 'lucide-react';

export const FarmerProfile: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-6">
      
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <img
          src={currentUser?.avatar}
          alt={currentUser?.name}
          className="w-24 h-24 rounded-3xl object-cover ring-4 ring-agri-100 shadow-md"
        />
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h2 className="text-2xl font-black text-slate-900">{currentUser?.name}</h2>
            {currentUser?.verificationStatus === 'verified' && (
              <span className="bg-agri-100 text-agri-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-agri-600" /> Verified Farmer
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 font-semibold">📍 {currentUser?.location}</p>
          <p className="text-xs text-agri-700 font-bold">⭐ {currentUser?.rating || 4.9} Rating • 100% Direct Farmer</p>
        </div>
      </div>

      <LongPressReader textToRead={`Farm Information for ${currentUser?.farmDetails?.farmName}. Size ${currentUser?.farmDetails?.sizeAcres} acres. Soil type ${currentUser?.farmDetails?.soilType}.`}>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            🏡 Farm Details & KYC Status
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-slate-400 block font-semibold">Farm Name</span>
              <span className="font-extrabold text-slate-800 text-sm">{currentUser?.farmDetails?.farmName || 'Patel Organic Farms'}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-slate-400 block font-semibold">Land Size</span>
              <span className="font-extrabold text-slate-800 text-sm">{currentUser?.farmDetails?.sizeAcres || 12} Acres</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-slate-400 block font-semibold">Soil Type</span>
              <span className="font-extrabold text-slate-800 text-sm">{currentUser?.farmDetails?.soilType || 'Black Cotton Soil'}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-slate-400 block font-semibold">Verification Badge Status</span>
              <span className="font-extrabold text-emerald-700 text-sm flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Approved by KISSAN2HOME Admin
              </span>
            </div>
          </div>
        </div>
      </LongPressReader>

    </div>
  );
};
