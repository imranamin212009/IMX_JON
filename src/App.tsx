import React from 'react';
import { EcommerceProvider, useEcommerce } from './context/EcommerceContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroBanner } from './components/home/HeroBanner';
import { QuickActionIcons } from './components/home/QuickActionIcons';
import { FlashSaleSection } from './components/home/FlashSaleSection';
import { CategoryGrid } from './components/home/CategoryGrid';
import { ProductGrid } from './components/home/ProductGrid';
import { ProductDetailModal } from './components/product/ProductDetailModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { OrderTrackingModal } from './components/customer/OrderTrackingModal';
import { CustomerDashboard } from './components/customer/CustomerDashboard';
import { SellerDashboard } from './components/vendor/SellerDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ArchitectureDocsModal } from './components/docs/ArchitectureDocsModal';
import { Bell, CheckCircle2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { userRole, notification } = useEcommerce();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-[#F57224] shrink-0" />
          <span className="text-xs font-semibold">{notification}</span>
        </div>
      )}

      {/* Main Header */}
      <Header />

      {/* Main Views based on Active Persona / Role */}
      <main className="flex-1">
        {userRole === 'customer' && (
          <div className="space-y-2">
            <HeroBanner />
            <QuickActionIcons />
            <FlashSaleSection />
            <CategoryGrid />
            <ProductGrid />
          </div>
        )}

        {userRole === 'seller' && (
          <div>
            <SellerDashboard />
          </div>
        )}

        {userRole === 'admin' && (
          <div>
            <AdminDashboard />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackingModal />
      <CustomerDashboard />
      <ArchitectureDocsModal />
    </div>
  );
};

export default function App() {
  return (
    <EcommerceProvider>
      <MainContent />
    </EcommerceProvider>
  );
}
