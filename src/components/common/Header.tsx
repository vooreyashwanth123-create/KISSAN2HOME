import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { UserRole, IndianLanguageCode } from '../../types';
import {
  Sprout,
  Globe,
  Mic,
  ShoppingCart,
  Bell,
  User as UserIcon,
  LogOut,
  ChevronDown,
  CheckCircle,
  ShieldAlert
} from 'lucide-react';

interface HeaderProps {
  onOpenVoice: () => void;
  onOpenCart?: () => void;
  onOpenChat?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenVoice, onOpenCart }) => {
  const { currentUser, logout, switchRole } = useAuth();
  const { currentLanguage, setLanguage, languages, t } = useLanguage();
  const { cart, notifications, markNotificationRead } = useData();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const unreadNotifs = notifications.filter(n => !n.read && (n.userId === currentUser?.id || currentUser?.role === 'ADMIN'));

  const currentLangObj = languages.find(l => l.code === currentLanguage) || languages[0];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-agri-600 to-agri-800 flex items-center justify-center text-white shadow-md shadow-agri-600/20">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                KISSAN<span className="text-agri-600">2HOME</span>
              </span>
              <span className="bg-agri-100 text-agri-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-agri-200 uppercase tracking-wide">
                Direct
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden md:block font-medium">
              {t('tagline')}
            </p>
          </div>
        </div>

        {/* Quick Role Switcher Bar (Demo evaluation mode) */}
        <div className="hidden lg:flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200 gap-1">
          <span className="text-xs font-semibold text-slate-500 px-2">Role:</span>
          {(['FARMER', 'CUSTOMER', 'DELIVERY', 'ADMIN'] as UserRole[]).map(role => (
            <button
              key={role}
              onClick={() => switchRole(role)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                currentUser?.role === role
                  ? 'bg-agri-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-gray-200'
              }`}
            >
              {role === 'FARMER' ? '🌾 Farmer' : role === 'CUSTOMER' ? '🛒 Customer' : role === 'DELIVERY' ? '🚚 Delivery' : '⚡ Admin'}
            </button>
          ))}
        </div>

        {/* Controls Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Voice Assistant Button */}
          <button
            onClick={onOpenVoice}
            className="flex items-center gap-1.5 bg-agri-50 hover:bg-agri-100 text-agri-800 font-semibold px-3 py-1.5 rounded-xl border border-agri-200 text-xs sm:text-sm transition-all shadow-xs"
            title={t('voiceAssistant')}
          >
            <Mic className="w-4 h-4 text-agri-600 animate-pulse" />
            <span className="hidden sm:inline">{t('voiceAssistant')}</span>
          </button>

          {/* 22 Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-slate-700 px-2.5 py-1.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium transition-all"
            >
              <Globe className="w-4 h-4 text-agri-600" />
              <span className="font-semibold text-slate-900">{currentLangObj.nativeName}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 max-h-80 overflow-y-auto">
                <div className="px-3 py-1.5 border-b border-gray-100 font-bold text-xs text-slate-400 uppercase tracking-wider">
                  22 Indian Languages
                </div>
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as IndianLanguageCode);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-agri-50 transition-colors ${
                      currentLanguage === lang.code ? 'bg-agri-50 text-agri-700 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <span>{lang.name}</span>
                    <span className="font-semibold text-slate-500">{lang.nativeName}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cart Icon (Customer portal) */}
          {currentUser?.role === 'CUSTOMER' && onOpenCart && (
            <button
              onClick={onOpenCart}
              className="relative p-2 text-slate-600 hover:text-agri-700 hover:bg-agri-50 rounded-xl transition-all"
              title={t('cart')}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {cartItemCount}
                </span>
              )}
            </button>
          )}

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-600 hover:text-agri-700 hover:bg-agri-50 rounded-xl transition-all"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifs.length > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-agri-600 rounded-full ring-2 ring-white animate-ping" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-800">Notifications</span>
                  <span className="text-xs bg-agri-100 text-agri-800 font-bold px-2 py-0.5 rounded-full">
                    {unreadNotifs.length} new
                  </span>
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-gray-50">
                  {unreadNotifs.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-400">No unread notifications</div>
                  ) : (
                    unreadNotifs.map(n => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className="p-3 hover:bg-gray-50 cursor-pointer text-xs transition-colors"
                      >
                        <p className="font-semibold text-slate-800">{n.title}</p>
                        <p className="text-slate-600 mt-0.5">{n.message}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{n.timestamp}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100 transition-all border border-gray-200"
            >
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="w-8 h-8 rounded-lg object-cover ring-1 ring-agri-500"
              />
              <div className="hidden sm:block text-left pr-1">
                <p className="text-xs font-bold text-slate-800 leading-none">{currentUser?.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[10px] text-slate-500 font-semibold uppercase">{currentUser?.role}</span>
                  {currentUser?.verificationStatus === 'verified' ? (
                    <CheckCircle className="w-3 h-3 text-agri-600" />
                  ) : currentUser?.role === 'FARMER' ? (
                    <ShieldAlert className="w-3 h-3 text-amber-500" />
                  ) : null}
                </div>
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="font-bold text-xs text-slate-900">{currentUser?.name}</p>
                  <p className="text-[11px] text-slate-500">{currentUser?.email}</p>
                  <p className="text-[11px] text-agri-700 font-semibold mt-1">📍 {currentUser?.location}</p>
                </div>
                <div className="py-1">
                  <div className="px-3 py-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                    Switch Role View
                  </div>
                  {(['FARMER', 'CUSTOMER', 'DELIVERY', 'ADMIN'] as UserRole[]).map(role => (
                    <button
                      key={role}
                      onClick={() => {
                        switchRole(role);
                        setShowProfileMenu(false);
                      }}
                      className={`w-full text-left px-4 py-1.5 text-xs flex items-center justify-between ${
                        currentUser?.role === role ? 'bg-agri-50 text-agri-800 font-bold' : 'text-slate-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{role}</span>
                      {currentUser?.role === role && <CheckCircle className="w-3.5 h-3.5 text-agri-600" />}
                    </button>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-1">
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-xs text-red-600 font-semibold flex items-center gap-2 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
