import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { UserRole } from '../types';
import { Sprout, ArrowRight, ShieldCheck, Sparkles, Truck, HeartHandshake, CheckCircle2, Globe } from 'lucide-react';

interface LandingPageProps {
  onStart: (role?: UserRole) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-agri-500 selection:text-white">
      
      {/* Hero Header Nav */}
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-agri-600 flex items-center justify-center font-bold text-white shadow-lg shadow-agri-600/30">
            <Sprout className="w-6 h-6" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight">
            KISSAN<span className="text-agri-500">2HOME</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onStart()}
            className="bg-agri-600 hover:bg-agri-500 text-white font-extrabold px-5 py-2.5 rounded-2xl text-xs sm:text-sm transition-all shadow-lg shadow-agri-600/30"
          >
            Launch Platform
          </button>
        </div>
      </nav>

      {/* Hero Banner Section */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-agri-950 border border-agri-800/80 text-agri-400 font-extrabold text-xs px-4 py-2 rounded-full shadow-inner">
            <Sparkles className="w-4 h-4" /> AI-Powered Direct Farm Marketplace
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1]">
            From Farmer to Home <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-agri-400 via-emerald-400 to-teal-300">
              Direct. Smart. Fair.
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
            Connecting hardworking Indian farmers directly with consumers and bulk buyers. Eliminating middleman markups with AI demand forecasting, 22 Indian language accessibility, and transparent supply logistics.
          </p>

          {/* Role Quick Launch Buttons */}
          <div className="pt-4 space-y-3">
            <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              Explore Demo by Role:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => onStart('FARMER')}
                className="bg-agri-600 hover:bg-agri-500 text-white p-3.5 rounded-2xl font-bold text-xs text-center border border-agri-400/30 shadow-lg shadow-agri-600/20 transition-all hover:scale-105"
              >
                🌾 Farmer Portal
              </button>
              <button
                onClick={() => onStart('CUSTOMER')}
                className="bg-blue-600 hover:bg-blue-500 text-white p-3.5 rounded-2xl font-bold text-xs text-center border border-blue-400/30 shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
              >
                🛒 Buyer Portal
              </button>
              <button
                onClick={() => onStart('DELIVERY')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-2xl font-bold text-xs text-center border border-emerald-400/30 shadow-lg shadow-emerald-600/20 transition-all hover:scale-105"
              >
                🚚 Courier Portal
              </button>
              <button
                onClick={() => onStart('ADMIN')}
                className="bg-purple-600 hover:bg-purple-500 text-white p-3.5 rounded-2xl font-bold text-xs text-center border border-purple-400/30 shadow-lg shadow-purple-600/20 transition-all hover:scale-105"
              >
                ⚡ Admin Panel
              </button>
            </div>
          </div>

        </div>

        {/* Hero Visual Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border border-slate-700 shadow-2xl relative space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-agri-400">100% Direct Value Flow</span>
            <span className="bg-agri-500/20 text-agri-300 text-[10px] font-extrabold px-2.5 py-1 rounded-full">
              Zero Intermediary
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
              <span className="text-slate-400">Farmer Receives:</span>
              <span className="font-bold text-agri-400 text-sm">88% - 92% of Final Sale Value</span>
            </div>
            <div className="flex items-center justify-between bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
              <span className="text-slate-400">Customer Saves:</span>
              <span className="font-bold text-emerald-400 text-sm">30% - 45% vs Traditional Mandi</span>
            </div>
            <div className="flex items-center justify-between bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
              <span className="text-slate-400">Language Voice Support:</span>
              <span className="font-bold text-blue-400 text-sm">22 Scheduled Indian Languages</span>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
};
