import React, { useState } from 'react';
import { 
  Store, Plus, DollarSign, Package, TrendingUp, 
  CreditCard, CheckCircle2, Clock, AlertCircle, Edit, ArrowUpRight, X 
} from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';
import { Product } from '../../types';

export const SellerDashboard: React.FC = () => {
  const {
    vendors,
    activeSellerId,
    setActiveSellerId,
    products,
    addProduct,
    updateProductStock,
    orders,
    updateOrderStatus,
    showNotification
  } = useEcommerce();

  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'payouts' | 'store'>('inventory');
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  // New product form state
  const [newProd, setNewProd] = useState({
    name: '',
    category: 'Electronic Accessories',
    brand: 'IMX FIRE',
    price: 1990,
    originalPrice: 2990,
    discountPercentage: 33,
    stock: 50,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
    description: 'High-quality certified merchandise with 1-year brand warranty.',
    features: ['1 Year Brand Warranty', 'Fast Type-C Charging', 'Smart Bluetooth Connectivity'],
    colors: ['Black', 'Silver'],
    warranty: '1 Year Warranty',
    shippingFee: 60,
    isFlashSale: false
  });

  const currentVendor = vendors.find((v) => v.id === activeSellerId) || vendors[0];
  const vendorProducts = products.filter((p) => p.vendorId === currentVendor.id);
  
  // Calculate seller orders
  const vendorOrders = orders.filter((o) =>
    o.items.some((item) => item.product.vendorId === currentVendor.id)
  );

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name) return;

    addProduct({
      ...newProd,
      slug: newProd.name.toLowerCase().replace(/\s+/g, '-'),
      vendorId: currentVendor.id,
      vendorName: currentVendor.name,
      galleryImages: [newProd.image]
    });

    setShowAddProductModal(false);
  };

  const handleRequestPayout = () => {
    showNotification(`Withdrawal request of ৳${currentVendor.balance.toLocaleString()} submitted to ${currentVendor.bankInfo.bankName}!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Top Banner & Vendor Selector */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={currentVendor.logo}
            alt={currentVendor.name}
            className="w-16 h-16 rounded-xl object-cover border border-slate-200 shadow-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-orange-100 text-[#F57224] px-2 py-0.5 rounded">
                VERIFIED SELLER PORTAL
              </span>
              <span className="text-xs text-slate-400">· Rating: {currentVendor.rating} ★</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
              {currentVendor.name}
            </h1>
            <p className="text-xs text-slate-500">
              {currentVendor.positiveRatingPercent}% Positive Customer Feedback · Joined {currentVendor.joinedDate}
            </p>
          </div>
        </div>

        {/* Store Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500 hidden sm:inline">Active Shop:</span>
          <select
            value={activeSellerId}
            onChange={(e) => setActiveSellerId(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold text-slate-800"
          >
            {vendors.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowAddProductModal(true)}
            className="bg-[#F57224] hover:bg-[#e06117] text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            Gross Sales (YTD)
          </span>
          <p className="text-xl font-black text-slate-900 tabular-nums">
            ৳{currentVendor.totalSales.toLocaleString()}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold">+18.4% vs last month</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
            <Package className="w-3.5 h-3.5 text-blue-600" />
            Active Products
          </span>
          <p className="text-xl font-black text-slate-900 tabular-nums">
            {vendorProducts.length} Listings
          </p>
          <span className="text-[11px] text-slate-500">In 4 marketplace categories</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
            <CreditCard className="w-3.5 h-3.5 text-[#F57224]" />
            Net Payout Balance
          </span>
          <p className="text-xl font-black text-[#F57224] tabular-nums">
            ৳{currentVendor.balance.toLocaleString()}
          </p>
          <span className="text-[11px] text-slate-500">Commission rate: {(currentVendor.commissionRate * 100).toFixed(0)}%</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-purple-600" />
            Orders Fulfilled
          </span>
          <p className="text-xl font-black text-slate-900 tabular-nums">
            {vendorOrders.length} Orders
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold">{currentVendor.shipOnTimePercent}% On-Time dispatch</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden">
        <div className="flex border-b border-slate-200 px-6 gap-6">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
              activeTab === 'inventory'
                ? 'border-[#F57224] text-[#F57224]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Product Catalog & Stock ({vendorProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
              activeTab === 'orders'
                ? 'border-[#F57224] text-[#F57224]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Order Fulfillment ({vendorOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('payouts')}
            className={`py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
              activeTab === 'payouts'
                ? 'border-[#F57224] text-[#F57224]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Payouts & Bank Account
          </button>
        </div>

        {/* Tab 1: Product Catalog */}
        {activeTab === 'inventory' && (
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                    <th className="pb-3">Product</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3">Inventory Stock</th>
                    <th className="pb-3">Flash Sale</th>
                    <th className="pb-3 text-right">Quick Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {vendorProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-3">
                          <img src={prod.image} alt={prod.name} className="w-10 h-10 rounded-md object-cover border" />
                          <div className="max-w-xs">
                            <p className="font-semibold text-slate-800 truncate">{prod.name}</p>
                            <span className="text-[10px] text-slate-400 font-mono">ID: {prod.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-slate-600">{prod.category}</td>
                      <td className="py-3 font-bold text-slate-900 tabular-nums">৳{prod.price.toLocaleString()}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            defaultValue={prod.stock}
                            onBlur={(e) => updateProductStock(prod.id, Number(e.target.value) || 0)}
                            className="w-16 px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold"
                          />
                          <span className="text-slate-400 text-[11px]">units</span>
                        </div>
                      </td>
                      <td className="py-3">
                        {prod.isFlashSale ? (
                          <span className="bg-orange-100 text-[#F57224] px-2 py-0.5 rounded font-extrabold text-[10px]">
                            ACTIVE
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[10px]">Standard</span>
                        )}
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => updateProductStock(prod.id, prod.stock + 10)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded text-[11px]"
                        >
                          +10 Stock
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Orders Fulfillment */}
        {activeTab === 'orders' && (
          <div className="p-6 space-y-4">
            {vendorOrders.length === 0 ? (
              <p className="text-center py-8 text-xs text-slate-500">No active orders assigned to this seller yet.</p>
            ) : (
              vendorOrders.map((ord) => (
                <div key={ord.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{ord.id}</span>
                      <span className="text-slate-500">· Customer: {ord.customerName}</span>
                    </div>
                    <p className="text-slate-600 mt-0.5">Destination: {ord.shippingAddress.detailedAddress}, {ord.shippingAddress.division}</p>
                    <p className="text-slate-400 text-[11px] font-mono mt-0.5">Tracking: {ord.trackingNumber}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full font-bold uppercase text-[10px]">
                      {ord.orderStatus.replace('_', ' ')}
                    </span>

                    {ord.orderStatus === 'placed' && (
                      <button
                        onClick={() => updateOrderStatus(ord.id, 'packed', 3)}
                        className="px-3 py-1.5 bg-[#F57224] text-white font-bold rounded-lg hover:bg-[#e06117]"
                      >
                        Mark as Packed
                      </button>
                    )}

                    {ord.orderStatus === 'packed' && (
                      <button
                        onClick={() => updateOrderStatus(ord.id, 'in_transit', 4)}
                        className="px-3 py-1.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
                      >
                        Dispatch to Logistics Hub
                      </button>
                    )}

                    {ord.orderStatus === 'in_transit' && (
                      <button
                        onClick={() => updateOrderStatus(ord.id, 'delivered', 6)}
                        className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700"
                      >
                        Confirm Delivery
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Payouts */}
        {activeTab === 'payouts' && (
          <div className="p-6 space-y-6">
            <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-300 font-semibold uppercase tracking-wider">Available For Withdrawal</span>
                <p className="text-3xl font-black text-[#F57224] mt-1 tabular-nums">
                  ৳{currentVendor.balance.toLocaleString()}
                </p>
                <p className="text-xs text-slate-400 mt-1">Automatic weekly settlement cycle every Monday</p>
              </div>
              <button
                onClick={handleRequestPayout}
                className="px-6 py-3 bg-[#F57224] hover:bg-[#e06117] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                Request Immediate Payout
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <h4 className="font-bold text-slate-800">Designated Bank Information:</h4>
              <p><span className="text-slate-500">Bank Name:</span> <strong>{currentVendor.bankInfo.bankName}</strong></p>
              <p><span className="text-slate-500">Account Title:</span> <strong>{currentVendor.bankInfo.accountName}</strong></p>
              <p><span className="text-slate-500">Account Number:</span> <code className="font-mono">{currentVendor.bankInfo.accountNumber}</code></p>
              <p><span className="text-slate-500">Routing Number:</span> <code className="font-mono">{currentVendor.bankInfo.routingNumber}</code></p>
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-slate-800">Add Product to {currentVendor.name}</h3>
              <button onClick={() => setShowAddProductModal(false)}>
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  placeholder="e.g. Wireless Gaming Mouse 16000 DPI"
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg"
                  >
                    <option value="Electronic Devices">Electronic Devices</option>
                    <option value="Electronic Accessories">Electronic Accessories</option>
                    <option value="TV & Home Appliances">TV & Home Appliances</option>
                    <option value="Health & Beauty">Health & Beauty</option>
                    <option value="Men's Fashion">Men's Fashion</option>
                    <option value="Sports & Outdoor">Sports & Outdoor</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={newProd.brand}
                    onChange={(e) => setNewProd({ ...newProd, brand: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Price (৳)</label>
                  <input
                    type="number"
                    required
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) || 0 })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Original (৳)</label>
                  <input
                    type="number"
                    value={newProd.originalPrice}
                    onChange={(e) => setNewProd({ ...newProd, originalPrice: Number(e.target.value) || 0 })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Stock Qty</label>
                  <input
                    type="number"
                    value={newProd.stock}
                    onChange={(e) => setNewProd({ ...newProd, stock: Number(e.target.value) || 0 })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Image URL</label>
                <input
                  type="text"
                  value={newProd.image}
                  onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="flashSaleCheck"
                  checked={newProd.isFlashSale}
                  onChange={(e) => setNewProd({ ...newProd, isFlashSale: e.target.checked })}
                  className="rounded text-[#F57224]"
                />
                <label htmlFor="flashSaleCheck" className="text-slate-700 font-semibold cursor-pointer">
                  Feature in Flash Sales with countdown badge
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#F57224] text-white font-bold rounded-xl hover:bg-[#e06117] transition-colors mt-2"
              >
                Publish Product to Marketplace
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
