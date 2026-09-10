import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  TrendingUp,
  Calendar,
  MessageSquare,
  UserCheck,
  MapPin,
  HelpCircle,
  Sparkles,
  BarChart3,
  Truck,
  DollarSign,
  Store
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { currentUser } = useAuth();
  const { t } = useLanguage();

  const role = currentUser?.role || 'FARMER';

  const farmerNav = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'products', label: t('myProducts'), icon: Package },
    { id: 'orders', label: t('orders'), icon: ShoppingBag },
    { id: 'earnings', label: t('earnings'), icon: DollarSign },
    { id: 'ai_demand', label: t('aiDemand'), icon: Sparkles },
    { id: 'harvest', label: t('harvestCalendar'), icon: Calendar },
    { id: 'messages', label: t('messages'), icon: MessageSquare },
    { id: 'profile', label: t('profile'), icon: UserCheck }
  ];

  const customerNav = [
    { id: 'marketplace', label: t('marketplace'), icon: Store },
    { id: 'orders', label: t('orders'), icon: ShoppingBag },
    { id: 'messages', label: t('messages'), icon: MessageSquare },
    { id: 'profile', label: t('profile'), icon: UserCheck }
  ];

  const deliveryNav = [
    { id: 'deliveries', label: 'Assigned Deliveries', icon: Truck },
    { id: 'route_map', label: 'Live Route Map', icon: MapPin },
    { id: 'earnings', label: t('earnings'), icon: DollarSign }
  ];

  const adminNav = [
    { id: 'dashboard', label: t('adminPanel'), icon: LayoutDashboard },
    { id: 'verification', label: 'Farmer Verification', icon: UserCheck },
    { id: 'supply_demand', label: 'Supply vs Demand', icon: BarChart3 },
    { id: 'orders', label: 'Platform Orders', icon: ShoppingBag },
    { id: 'complaints', label: 'Support & Complaints', icon: HelpCircle }
  ];

  const navItems =
    role === 'FARMER'
      ? farmerNav
      : role === 'CUSTOMER'
      ? customerNav
      : role === 'DELIVERY'
      ? deliveryNav
      : adminNav;

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between hidden md:flex shrink-0">
      <div className="space-y-6">
        
        {/* User Role Badge */}
        <div className="bg-slate-800/80 rounded-2xl p-3.5 border border-slate-700/60 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-agri-600/20 text-agri-400 flex items-center justify-center font-bold text-lg border border-agri-500/30">
            {role === 'FARMER' ? '🌾' : role === 'CUSTOMER' ? '🛒' : role === 'DELIVERY' ? '🚚' : '⚡'}
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Logged in as</p>
            <p className="text-sm font-extrabold text-white tracking-wide">{role} PORTAL</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-agri-600 text-white shadow-lg shadow-agri-600/30 font-bold translate-x-1'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

      </div>

      {/* Footer info card inside sidebar */}
      <div className="bg-gradient-to-br from-agri-950 to-slate-900 rounded-2xl p-4 border border-agri-800/40 text-xs text-slate-300 space-y-2">
        <div className="flex items-center gap-1.5 text-agri-400 font-bold">
          <Sparkles className="w-4 h-4" /> AI Marketplace v1.0
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Zero middleman fees. Direct farm supply with automated route logistics.
        </p>
      </div>
    </aside>
  );
};
