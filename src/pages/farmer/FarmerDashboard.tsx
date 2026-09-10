import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { LongPressReader } from '../../components/accessibility/LongPressReader';
import {
  PlusCircle,
  Package,
  ShoppingBag,
  TrendingUp,
  Sparkles,
  Volume2,
  Calendar,
  DollarSign,
  ArrowUpRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

interface FarmerDashboardProps {
  setActiveTab: (tab: string) => void;
  onOpenAddProduct: () => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({ setActiveTab, onOpenAddProduct }) => {
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  const { products, orders, aiInsights, nearbyDemand } = useData();

  const farmerProducts = products.filter(p => p.farmerId === currentUser?.id || p.farmerName.includes(currentUser?.name.split(' ')[0] || 'Patel'));
  const farmerOrders = orders.filter(o => o.farmerId === currentUser?.id || o.farmerName.includes(currentUser?.name.split(' ')[0] || 'Patel'));

  const activeOrdersCount = farmerOrders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length;
  const totalEarned = farmerOrders.reduce((sum, o) => sum + o.farmerSubtotal, 0);
  const pendingPayout = farmerOrders.filter(o => o.paymentStatus === 'Pending').reduce((sum, o) => sum + o.farmerSubtotal, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Accessibility Long-Press Banner */}
      <div className="bg-agri-100/80 border border-agri-300 rounded-2xl p-3 flex items-center justify-between text-xs text-agri-900 shadow-xs">
        <div className="flex items-center gap-2 font-bold">
          <Volume2 className="w-4 h-4 text-agri-700 animate-bounce" />
          <span>{t('longPressTip')}</span>
        </div>
        <span className="bg-agri-700 text-white font-bold text-[10px] px-2 py-0.5 rounded-full">
          Voice Enabled
        </span>
      </div>

      {/* Welcome Card */}
      <div className="bg-gradient-to-br from-agri-800 via-agri-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-agri-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-agri-700/80 text-agri-200 text-xs font-bold px-3 py-1 rounded-full border border-agri-500/30">
                🌾 Direct Farmer Portal
              </span>
              {currentUser?.verificationStatus === 'verified' && (
                <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-500/40">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Farmer
                </span>
              )}
            </div>

            <LongPressReader textToRead={`Welcome back ${currentUser?.name}. You have ${activeOrdersCount} active customer orders waiting.`}>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Namaste, {currentUser?.name}! 🙏
              </h1>
              <p className="text-agri-100 text-xs sm:text-sm max-w-xl font-medium mt-1">
                {currentUser?.farmDetails?.farmName} • {currentUser?.location}
              </p>
            </LongPressReader>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAddProduct}
              className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold px-5 py-3 rounded-2xl flex items-center gap-2 text-xs sm:text-sm transition-all shadow-lg shadow-emerald-400/20"
            >
              <PlusCircle className="w-4 h-4" />
              {t('addProduct')}
            </button>
          </div>
        </div>
      </div>

      {/* Today's Overview Stat Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <LongPressReader textToRead={`Active Orders: ${activeOrdersCount} orders waiting for harvest or pickup.`}>
          <div
            onClick={() => setActiveTab('orders')}
            className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">{t('activeOrders')}</span>
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">{activeOrdersCount}</p>
            <p className="text-[11px] text-amber-600 font-semibold mt-1">Direct from buyers</p>
          </div>
        </LongPressReader>

        <LongPressReader textToRead={`Products Listed: ${farmerProducts.length} crop items currently on the market.`}>
          <div
            onClick={() => setActiveTab('products')}
            className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">{t('myProducts')}</span>
              <div className="w-10 h-10 rounded-2xl bg-agri-50 text-agri-700 flex items-center justify-center font-bold">
                <Package className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">{farmerProducts.length}</p>
            <p className="text-[11px] text-agri-700 font-semibold mt-1">Live in marketplace</p>
          </div>
        </LongPressReader>

        <LongPressReader textToRead={`Total Earnings: Rupee ${totalEarned}. Direct digital payout.`}>
          <div
            onClick={() => setActiveTab('earnings')}
            className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">{t('totalEarnings')}</span>
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">₹{totalEarned}</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">+18% vs traditional mandi</p>
          </div>
        </LongPressReader>

        <LongPressReader textToRead={`Pending Payments: Rupee ${pendingPayout}. Settlement in progress.`}>
          <div
            onClick={() => setActiveTab('earnings')}
            className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">{t('pendingPayments')}</span>
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">₹{pendingPayout}</p>
            <p className="text-[11px] text-blue-600 font-semibold mt-1">Escrow held securely</p>
          </div>
        </LongPressReader>

      </div>

      {/* AI Demand & Nearby Demand Teaser */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* AI Forecast Card */}
        <LongPressReader textToRead={`AI Demand Forecast: High demand surge expected for Tomatoes. Recommended price Rupee 45 per kg.`}>
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-agri-100 text-agri-700 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">{t('aiDemandInsights')}</h3>
              </div>
              <button
                onClick={() => setActiveTab('ai_demand')}
                className="text-xs text-agri-700 font-bold hover:underline flex items-center gap-1"
              >
                View Details <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {aiInsights.slice(0, 2).map(insight => (
              <div key={insight.id} className="bg-agri-50/60 p-4 rounded-2xl border border-agri-200/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">{insight.title}</span>
                  <span className="bg-agri-700 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    {insight.confidence}% AI Confidence
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{insight.description}</p>
                <div className="pt-1 flex items-center justify-between text-xs">
                  <span className="font-extrabold text-agri-800">Recommendation:</span>
                  <span className="text-slate-700 font-medium">{insight.recommendedAction}</span>
                </div>
              </div>
            ))}
          </div>
        </LongPressReader>

        {/* Nearby Demand Opportunity Card */}
        <LongPressReader textToRead={`Nearby Demand Opportunity: Tomatoes required 180 kg near Pune. Supply deficit gap 70 kg.`}>
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  📍
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">{t('nearbyDemand')}</h3>
              </div>
              <button
                onClick={() => setActiveTab('ai_demand')}
                className="text-xs text-blue-700 font-bold hover:underline flex items-center gap-1"
              >
                Explore <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {nearbyDemand.slice(0, 2).map(opp => (
              <div key={opp.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-black text-slate-900 text-sm">{opp.cropName}</h4>
                    <span className="text-[11px] text-slate-500 font-medium">{opp.location} • {opp.distanceKm} km away</span>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full">
                    ₹{opp.suggestedPrice}/kg
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-white p-2 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">Required</span>
                    <span className="font-extrabold text-slate-800">{opp.requiredQty} kg</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">Nearby Supply</span>
                    <span className="font-extrabold text-slate-800">{opp.nearbySupplyQty} kg</span>
                  </div>
                  <div className="bg-emerald-50 p-2 rounded-xl border border-emerald-200 text-emerald-900">
                    <span className="text-[10px] text-emerald-600 font-semibold block">Supply Deficit</span>
                    <span className="font-black">{opp.opportunityQty} kg</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </LongPressReader>

      </div>

    </div>
  );
};
