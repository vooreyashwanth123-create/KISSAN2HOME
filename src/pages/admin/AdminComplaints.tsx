import React from 'react';
import { useData } from '../../context/DataContext';
import { HelpCircle, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export const AdminComplaints: React.FC = () => {
  const { complaints, updateComplaintStatus } = useData();

  return (
    <div className="space-y-6">
      
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">Complaints & Support Tickets</h2>
          <p className="text-xs text-slate-500 mt-1">
            Resolve buyer inquiries, delivery delays, and farmer settlement support cases.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {complaints.map(cmp => (
          <div key={cmp.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-sm">{cmp.id}</span>
                <span className="text-xs font-semibold bg-gray-100 text-slate-700 px-2.5 py-0.5 rounded-full">
                  {cmp.userRole}
                </span>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                cmp.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {cmp.status}
              </span>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm">{cmp.issueCategory}</h4>
              <p className="text-xs text-slate-600 mt-1">{cmp.description}</p>
              <p className="text-[11px] text-slate-400 mt-1">Raised by: <span className="font-bold text-slate-700">{cmp.userName}</span> • {new Date(cmp.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="pt-2 flex items-center gap-2">
              {cmp.status !== 'Resolved' && (
                <button
                  onClick={() => updateComplaintStatus(cmp.id, 'Resolved', 'Resolved by admin officer.')}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-1 shadow"
                >
                  <CheckCircle className="w-3.5 h-3.5" /> Mark Resolved
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
