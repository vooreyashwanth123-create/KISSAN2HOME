import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { LongPressReader } from '../../components/accessibility/LongPressReader';
import { Sparkles, MapPin, TrendingUp, AlertTriangle, ArrowRight, CheckCircle } from 'lucide-react';

export const FarmerAIDemand: React.FC = () => {
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  const { aiInsights, nearbyDemand, products } = useData();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-agri-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <span className="bg-agri-600/80 text-agri-100 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            🤖 AI Intelligence Engine
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">{t('aiDemand')}</h2>
          <p className="text-agri-100 text-xs sm:text-sm max-w-xl">
            Real-time demand forecasting and nearby opportunity matching powered by historical buyer order velocity & seasonal crop dynamics.
          </p>
        </div>
      </div>

      {/* AI Demand Forecasting Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-agri-600" />
          Predicted Crop Demand Surges
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiInsights.map(insight => (
            <LongPressReader key={insight.id} textToRead={`AI Insight: ${insight.title}. ${insight.description}. Recommendation: ${insight.recommendedAction}`}>
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3 hover:border-agri-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="bg-agri-100 text-agri-800 text-xs font-extrabold px-3 py-1 rounded-full">
                      {insight.cropName}
                    </span>
                    <span className="text-xs font-bold text-slate-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                      {insight.confidence}% AI Confidence
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-base mt-2">{insight.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{insight.description}</p>
                </div>

                <div className="pt-3 border-t border-gray-100 bg-agri-50/50 p-3 rounded-2xl">
                  <span className="text-[10px] text-agri-800 font-extrabold block uppercase tracking-wider">Recommended Farmer Action</span>
                  <p className="text-xs font-bold text-slate-900 mt-0.5">{insight.recommendedAction}</p>
                </div>
              </div>
            </LongPressReader>
          ))}
        </div>
      </div>

      {/* Nearby Demand Opportunities */}
      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          📍 Nearby High Demand Opportunities (Nearby Demand Engine)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {nearbyDemand.map(opp => (
            <LongPressReader key={opp.id} textToRead={`Nearby Demand for ${opp.cropName}. Required ${opp.requiredQty} kg, nearby supply ${opp.nearbySupplyQty} kg. Opportunity ${opp.opportunityQty} kg.`}>
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-slate-900 text-base">{opp.cropName}</h4>
                  <span className="bg-blue-100 text-blue-800 text-xs font-extrabold px-2.5 py-1 rounded-full">
                    {opp.distanceKm} km away
                  </span>
                </div>

                <p className="text-xs text-slate-500 font-medium">📍 {opp.location}</p>

                <div className="space-y-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Required Demand:</span>
                    <span className="font-bold text-slate-900">{opp.requiredQty} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Nearby Supply:</span>
                    <span className="font-bold text-slate-900">{opp.nearbySupplyQty} kg</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-200 text-emerald-700 font-extrabold">
                    <span>Supply Deficit Gap:</span>
                    <span>+{opp.opportunityQty} kg</span>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Targeting supply opportunity for ${opp.cropName}!`)}
                  className="w-full bg-agri-700 hover:bg-agri-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1 transition-all"
                >
                  Supply This Demand <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </LongPressReader>
          ))}
        </div>
      </div>

    </div>
  );
};
