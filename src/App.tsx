import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { DataProvider } from './context/DataContext';

import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { VoiceModal } from './components/common/VoiceModal';

import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';

// Farmer Pages
import { FarmerDashboard } from './pages/farmer/FarmerDashboard';
import { FarmerProducts } from './pages/farmer/FarmerProducts';
import { FarmerOrders } from './pages/farmer/FarmerOrders';
import { FarmerEarnings } from './pages/farmer/FarmerEarnings';
import { FarmerAIDemand } from './pages/farmer/FarmerAIDemand';
import { HarvestCalendar } from './pages/farmer/HarvestCalendar';
import { FarmerProfile } from './pages/farmer/FarmerProfile';

// Customer Pages
import { CustomerMarketplace } from './pages/customer/CustomerMarketplace';
import { CustomerOrders } from './pages/customer/CustomerOrders';
import { CartCheckout } from './pages/customer/CartCheckout';

// Delivery Pages
import { DeliveryDashboard } from './pages/delivery/DeliveryDashboard';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUserVerification } from './pages/admin/AdminUserVerification';
import { AdminSupplyDemand } from './pages/admin/AdminSupplyDemand';
import { AdminComplaints } from './pages/admin/AdminComplaints';

import { UserRole } from './types';

const MainAppContent: React.FC = () => {
  const { currentUser, switchRole } = useAuth();
  
  const [viewState, setViewState] = useState<'LANDING' | 'AUTH' | 'PORTAL'>('LANDING');
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const handleStartFromLanding = (role?: UserRole) => {
    if (role) {
      switchRole(role);
      setViewState('PORTAL');
    } else {
      setViewState('AUTH');
    }
  };

  // Auto route tab reset when role changes
  const role = currentUser?.role || 'FARMER';
  const defaultTabForRole = role === 'FARMER' ? 'dashboard' : role === 'CUSTOMER' ? 'marketplace' : role === 'DELIVERY' ? 'deliveries' : 'dashboard';

  if (viewState === 'LANDING') {
    return <LandingPage onStart={handleStartFromLanding} />;
  }

  if (viewState === 'AUTH' && !currentUser) {
    return <AuthPage onSuccess={() => setViewState('PORTAL')} />;
  }

  const currentTab = activeTab || defaultTabForRole;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* Header */}
      <Header
        onOpenVoice={() => setIsVoiceOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <div className="flex-1 flex">
        
        {/* Sidebar Navigation */}
        <Sidebar activeTab={currentTab} setActiveTab={setActiveTab} />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          
          {/* FARMER VIEWS */}
          {role === 'FARMER' && (
            <>
              {currentTab === 'dashboard' && (
                <FarmerDashboard
                  setActiveTab={setActiveTab}
                  onOpenAddProduct={() => {
                    setActiveTab('products');
                    setIsAddProductOpen(true);
                  }}
                />
              )}
              {currentTab === 'products' && (
                <FarmerProducts
                  isAddModalOpen={isAddProductOpen}
                  setIsAddModalOpen={setIsAddProductOpen}
                />
              )}
              {currentTab === 'orders' && <FarmerOrders />}
              {currentTab === 'earnings' && <FarmerEarnings />}
              {currentTab === 'ai_demand' && <FarmerAIDemand />}
              {currentTab === 'harvest' && <HarvestCalendar />}
              {currentTab === 'profile' && <FarmerProfile />}
              {currentTab === 'messages' && <FarmerOrders />}
            </>
          )}

          {/* CUSTOMER VIEWS */}
          {role === 'CUSTOMER' && (
            <>
              {(currentTab === 'marketplace' || currentTab === 'dashboard') && (
                <CustomerMarketplace onOpenCart={() => setIsCartOpen(true)} />
              )}
              {currentTab === 'orders' && <CustomerOrders />}
              {currentTab === 'profile' && <FarmerProfile />}
              {currentTab === 'messages' && <CustomerOrders />}
            </>
          )}

          {/* DELIVERY VIEWS */}
          {role === 'DELIVERY' && (
            <>
              {(currentTab === 'deliveries' || currentTab === 'route_map' || currentTab === 'earnings') && (
                <DeliveryDashboard />
              )}
            </>
          )}

          {/* ADMIN VIEWS */}
          {role === 'ADMIN' && (
            <>
              {currentTab === 'dashboard' && <AdminDashboard setActiveTab={setActiveTab} />}
              {currentTab === 'verification' && <AdminUserVerification />}
              {currentTab === 'supply_demand' && <AdminSupplyDemand />}
              {currentTab === 'orders' && <FarmerOrders />}
              {currentTab === 'complaints' && <AdminComplaints />}
            </>
          )}

        </main>

      </div>

      {/* Voice Assistant Modal */}
      <VoiceModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
      />

      {/* Shopping Cart Drawer / Modal for Customer */}
      <CartCheckout
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOrderSuccess={(orderId) => {
          setActiveTab('orders');
        }}
      />

    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <DataProvider>
          <MainAppContent />
        </DataProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
