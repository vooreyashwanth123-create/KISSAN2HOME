import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { LongPressReader } from '../../components/accessibility/LongPressReader';
import { Calendar, Plus, Sprout, CheckCircle2, Clock } from 'lucide-react';

export const HarvestCalendar: React.FC = () => {
  const { currentUser } = useAuth();
  const { harvests, addHarvest } = useData();

  const farmerHarvests = harvests.filter(h => h.farmerId === currentUser?.id || true);

  const [showAdd, setShowAdd] = useState(false);
  const [cropName, setCropName] = useState('');
  const [expectedDate, setExpectedDate] = useState('');
  const [expectedQuantity, setExpectedQuantity] = useState(500);
  const [unit, setUnit] = useState('kg');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cropName || !expectedDate) return;

    addHarvest({
      farmerId: currentUser?.id || 'farmer_1',
      cropName,
      expectedDate,
      expectedQuantity: Number(expectedQuantity),
      unit,
      status: 'Growing'
    });

    setCropName('');
    setExpectedDate('');
    setShowAdd(false);
  };

  return (
    <div className="space-y-6">
      
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">Harvest Calendar & Planning</h2>
          <p className="text-xs text-slate-500 mt-1">
            Track upcoming crop harvests to automatically optimize platform demand matching & pre-orders.
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-agri-700 hover:bg-agri-800 text-white font-extrabold px-5 py-3 rounded-2xl flex items-center gap-2 text-xs sm:text-sm shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Upcoming Harvest
        </button>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {farmerHarvests.map(h => (
          <LongPressReader key={h.id} textToRead={`Upcoming Harvest ${h.cropName}. Expected date ${h.expectedDate}. Estimated quantity ${h.expectedQuantity} ${h.unit}.`}>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-2xl bg-agri-50 text-agri-700 flex items-center justify-center font-bold text-lg">
                  🌾
                </span>
                <span className="bg-agri-100 text-agri-800 font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase">
                  {h.status}
                </span>
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">{h.cropName}</h3>
                <p className="text-xs text-slate-500 mt-1">📅 Harvest Date: <span className="font-bold text-slate-800">{h.expectedDate}</span></p>
                <p className="text-xs text-slate-500 mt-0.5">📦 Yield Estimate: <span className="font-bold text-agri-800">{h.expectedQuantity} {h.unit}</span></p>
              </div>
            </div>
          </LongPressReader>
        ))}
      </div>

      {/* Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-slate-900">Add Crop Harvest Plan</h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Crop Name</label>
                <input
                  type="text"
                  required
                  value={cropName}
                  onChange={e => setCropName(e.target.value)}
                  placeholder="e.g. Organic Red Tomatoes"
                  className="w-full p-2.5 rounded-xl border border-gray-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Expected Date</label>
                  <input
                    type="date"
                    required
                    value={expectedDate}
                    onChange={e => setExpectedDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Expected Yield</label>
                  <input
                    type="number"
                    required
                    value={expectedQuantity}
                    onChange={e => setExpectedQuantity(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-gray-200"
                  />
                </div>
              </div>
              <div className="pt-3 flex gap-2">
                <button type="button" onClick={() => setShowAdd(false)} className="flex-1 bg-slate-100 py-2.5 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="flex-1 bg-agri-700 text-white py-2.5 rounded-xl font-bold">Save Plan</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
