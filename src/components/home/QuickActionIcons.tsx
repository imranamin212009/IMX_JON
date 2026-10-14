import React from 'react';
import { Zap, ShoppingBasket, Truck, Coins, Award, Globe } from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';

export const QuickActionIcons: React.FC = () => {
  const { setSelectedCategory, showNotification } = useEcommerce();

  const actions = [
    {
      id: 'flash',
      title: 'Flash Sale',
      desc: 'Up to 70% Off',
      icon: Zap,
      color: 'bg-orange-500 text-white',
      onClick: () => {
        const el = document.getElementById('flash-sale-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'mart',
      title: 'Fire Mart',
      desc: 'Daily Essentials',
      icon: ShoppingBasket,
      color: 'bg-emerald-600 text-white',
      onClick: () => setSelectedCategory('Home & Living')
    },
    {
      id: 'free-ship',
      title: 'Free Shipping',
      desc: 'Orders over ৳5000',
      icon: Truck,
      color: 'bg-blue-600 text-white',
      onClick: () => showNotification('Free delivery applied on eligible tech & orders over ৳5,000!')
    },
    {
      id: 'coins',
      title: 'Coins & Rewards',
      desc: 'Daily Check-in',
      icon: Coins,
      color: 'bg-amber-500 text-white',
      onClick: () => showNotification('You received 50 Fire Coins! Use code FIRE20 for 20% off.')
    },
    {
      id: 'mall',
      title: 'IMX Official Mall',
      desc: '100% Authentic',
      icon: Award,
      color: 'bg-purple-600 text-white',
      onClick: () => setSelectedCategory('Electronic Devices')
    },
    {
      id: 'global',
      title: 'Global Collection',
      desc: 'Direct Imports',
      icon: Globe,
      color: 'bg-indigo-600 text-white',
      onClick: () => setSelectedCategory('Electronic Accessories')
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={act.onClick}
              className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/80 hover:border-[#F57224]/50 hover:shadow-md transition-all text-left group cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${act.color} shadow-xs group-hover:scale-105 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 group-hover:text-[#F57224] transition-colors truncate">
                  {act.title}
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  {act.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
