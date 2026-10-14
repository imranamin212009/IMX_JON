import React, { useState } from 'react';
import { 
  ShieldCheck, Users, Store, DollarSign, Package, 
  Settings, CheckCircle2, AlertTriangle, Sliders, FileCode2 
} from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';

export const AdminDashboard: React.FC = () => {
  const { 
    vendors, 
    updateVendorCommission, 
    orders, 
    updateOrderStatus,
    products, 
    setIsDocsOpen,
    showNotification 
  } = useEcommerce();

  const [activeTab, setActiveTab] = useState<'vendors' | 'orders' | 'settings'>('vendors');

  // Calculate platform totals
  const totalGMV = vendors.reduce((sum, v) => sum + v.totalSales, 0);
  const totalCommissionEarned = vendors.reduce((sum, v) => sum + (v.totalSales * v.commissionRate), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Admin Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              IMX ZONE · SUPER ADMIN CONSOLE
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black mt-1">
            Marketplace Command Center
          </h1>
          <p className="text-xs text-slate-400">
            Global management of multi-vendor operations, commissions, and order fulfillment.
          </p>
        </div>

        <button
          onClick={() => setIsDocsOpen(true)}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors self-start md:self-auto cursor-pointer"
        >
          <FileCode2 className="w-4 h-4" />
          <span>Architecture & Database Docs</span>
        </button>
      </div>

      {/* Global Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-medium text-slate-500">Gross Marketplace GMV</span>
          <p className="text-xl font-black text-slate-900 tabular-nums">৳{totalGMV.toLocaleString()}</p>
          <span className="text-[11px] text-emerald-600 font-semibold">+24.8% Year-over-Year</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-medium text-slate-500">Platform Commission Earned</span>
          <p className="text-xl font-black text-[#F57224] tabular-nums">৳{Math.round(totalCommissionEarned).toLocaleString()}</p>
          <span className="text-[11px] text-slate-400">Net platform revenue</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-medium text-slate-500">Active Certified Vendors</span>
          <p className="text-xl font-black text-slate-900 tabular-nums">{vendors.length} Shops</p>
          <span className="text-[11px] text-emerald-600 font-semibold">100% KYC Approved</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-medium text-slate-500">Catalog Volume</span>
          <p className="text-xl font-black text-slate-900 tabular-nums">{products.length} Products</p>
          <span className="text-[11px] text-slate-400">8 High-demand categories</span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden">
        <div className="flex border-b border-slate-200 px-6 gap-6">
          <button
            onClick={() => setActiveTab('vendors')}
            className={`py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
              activeTab === 'vendors'
                ? 'border-[#F57224] text-[#F57224]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Vendor Management & Commission Rates ({vendors.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
              activeTab === 'orders'
                ? 'border-[#F57224] text-[#F57224]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Global Orders Oversight ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
              activeTab === 'settings'
                ? 'border-[#F57224] text-[#F57224]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            System & Policies
          </button>
        </div>

        {/* Tab 1: Vendor Management */}
        {activeTab === 'vendors' && (
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                    <th className="pb-3">Vendor / Shop</th>
                    <th className="pb-3">Sales Volume</th>
                    <th className="pb-3">Commission Rate</th>
                    <th className="pb-3">Payout Due</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Commission Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {vendors.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-3">
                          <img src={v.logo} alt={v.name} className="w-9 h-9 rounded-lg object-cover border" />
                          <div>
                            <p className="font-bold text-slate-900">{v.name}</p>
                            <p className="text-[11px] text-slate-400">{v.bankInfo.bankName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 font-semibold text-slate-800 tabular-nums">
                        ৳{v.totalSales.toLocaleString()}
                      </td>
                      <td className="py-3 font-bold text-[#F57224]">
                        {(v.commissionRate * 100).toFixed(1)}%
                      </td>
                      <td className="py-3 font-semibold text-slate-800 tabular-nums">
                        ৳{v.balance.toLocaleString()}
                      </td>
                      <td className="py-3">
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">
                          {v.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => updateVendorCommission(v.id, 0.08)}
                            className={`px-2 py-1 rounded text-[10px] font-bold ${v.commissionRate === 0.08 ? 'bg-[#F57224] text-white' : 'bg-slate-100 text-slate-600'}`}
                          >
                            8% (Standard)
                          </button>
                          <button
                            onClick={() => updateVendorCommission(v.id, 0.10)}
                            className={`px-2 py-1 rounded text-[10px] font-bold ${v.commissionRate === 0.10 ? 'bg-[#F57224] text-white' : 'bg-slate-100 text-slate-600'}`}
                          >
                            10%
                          </button>
                          <button
                            onClick={() => updateVendorCommission(v.id, 0.12)}
                            className={`px-2 py-1 rounded text-[10px] font-bold ${v.commissionRate === 0.12 ? 'bg-[#F57224] text-white' : 'bg-slate-100 text-slate-600'}`}
                          >
                            12% (Premium)
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Orders Oversight */}
        {activeTab === 'orders' && (
          <div className="p-6 space-y-3">
            {orders.map((ord) => (
              <div key={ord.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{ord.id}</span>
                    <span className="text-slate-500">· Customer: {ord.customerName} ({ord.customerPhone})</span>
                  </div>
                  <p className="text-slate-600 mt-0.5">
                    Items: {ord.items.length} · Total: <strong>৳{ord.total.toLocaleString()}</strong> ({ord.paymentMethod.toUpperCase()})
                  </p>
                  <p className="text-slate-400 text-[11px]">Placed at: {ord.createdAt}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-slate-200 text-slate-800 rounded font-bold uppercase text-[10px]">
                    Status: {ord.orderStatus.replace('_', ' ')}
                  </span>

                  <button
                    onClick={() => updateOrderStatus(ord.id, 'delivered', 6)}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded"
                  >
                    Force Deliver
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: System & Policies */}
        {activeTab === 'settings' && (
          <div className="p-6 text-xs space-y-4 text-slate-700">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Marketplace Base Settings</h4>
              <p>Default Customer Currency: <strong>BDT (৳)</strong></p>
              <p>Inside Dhaka Standard Shipping: <strong>৳60</strong></p>
              <p>Outside Dhaka National Shipping: <strong>৳120</strong></p>
              <p>Free Shipping Minimum Cart Subtotal: <strong>৳5,000</strong></p>
              <p>Supported MFS Gateways: <strong>bKash, Nagad, Rocket, Credit/Debit Cards, Cash on Delivery</strong></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
