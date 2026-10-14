import React, { useState } from 'react';
import { 
  X, Package, Heart, MapPin, User, Star, 
  Trash2, ShoppingCart, Truck, CheckCircle2, Clock 
} from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';

export const CustomerDashboard: React.FC = () => {
  const {
    isCustomerDashboardOpen,
    setIsCustomerDashboardOpen,
    orders,
    wishlist,
    products,
    addresses,
    addToCart,
    toggleWishlist,
    setSelectedOrderForTracking,
    setIsOrderTrackingOpen,
    setSelectedProduct
  } = useEcommerce();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'profile'>('orders');

  if (!isCustomerDashboardOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 md:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
              MJ
            </div>
            <div>
              <h2 className="text-base md:text-lg font-bold text-slate-900">
                Mohammad Jon's Account
              </h2>
              <p className="text-xs text-slate-500">
                Verified Customer · Member since 2024
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCustomerDashboardOpen(false)}
            className="p-1.5 rounded-md hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-4 md:px-6 bg-white gap-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'orders'
                ? 'border-[#F57224] text-[#F57224]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`py-3 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'wishlist'
                ? 'border-[#F57224] text-[#F57224]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Wishlist ({wishlist.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`py-3 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'addresses'
                ? 'border-[#F57224] text-[#F57224]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Addresses ({addresses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'profile'
                ? 'border-[#F57224] text-[#F57224]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Security</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 md:p-6 flex-1 overflow-y-auto">
          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="font-semibold text-slate-700">No orders found</p>
                  <p className="text-xs">Your shopping activity will show up here.</p>
                </div>
              ) : (
                orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">{ord.id}</span>
                          <span className="text-[11px] text-slate-400">· {ord.createdAt}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Paid via <strong className="uppercase">{ord.paymentMethod}</strong> · Tracking: {ord.trackingNumber}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase ${
                          ord.orderStatus === 'delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ord.orderStatus === 'in_transit' || ord.orderStatus === 'out_for_delivery'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {ord.orderStatus.replace('_', ' ')}
                        </span>

                        <button
                          onClick={() => {
                            setSelectedOrderForTracking(ord);
                            setIsOrderTrackingOpen(true);
                          }}
                          className="px-3 py-1.5 bg-[#F57224] text-white text-xs font-bold rounded-lg hover:bg-[#e06117] flex items-center gap-1.5 transition-colors"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>Track Live</span>
                        </button>
                      </div>
                    </div>

                    {/* Order items preview */}
                    <div className="space-y-2">
                      {ord.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 min-w-0">
                            <img src={item.product.image} alt={item.product.name} className="w-9 h-9 rounded object-cover border" />
                            <div className="truncate">
                              <p className="font-semibold text-slate-800 truncate">{item.product.name}</p>
                              <p className="text-[11px] text-slate-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="font-bold text-slate-800 tabular-nums">
                            ৳{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
                      <span className="text-slate-500">
                        Delivery to: {ord.shippingAddress.city}, {ord.shippingAddress.division}
                      </span>
                      <div className="text-right">
                        <span className="text-slate-500">Total: </span>
                        <span className="font-bold text-sm text-[#F57224]">৳{ord.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div>
              {wishlistedProducts.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Heart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="font-semibold text-slate-700">Your wishlist is empty</p>
                  <p className="text-xs">Click the heart icon on any product to save it for later.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {wishlistedProducts.map((p) => (
                    <div key={p.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex gap-3 items-center">
                      <img src={p.image} alt={p.name} className="w-16 h-16 rounded-lg object-cover shrink-0 border" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-800 truncate">{p.name}</h4>
                        <p className="text-xs font-bold text-[#F57224] mt-0.5">৳{p.price.toLocaleString()}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => addToCart(p, 1)}
                            className="px-2.5 py-1 bg-[#F57224] text-white text-[11px] font-bold rounded hover:bg-[#e06117]"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => toggleWishlist(p.id)}
                            className="p-1 text-slate-400 hover:text-red-500"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-3">
              {addresses.map((addr) => (
                <div key={addr.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{addr.fullName}</span>
                    <span className="px-2 py-0.5 bg-slate-200 rounded font-semibold text-slate-700 text-[10px]">
                      {addr.label} {addr.isDefault && '· Default'}
                    </span>
                  </div>
                  <p className="text-slate-600">{addr.phoneNumber}</p>
                  <p className="text-slate-700">{addr.detailedAddress}</p>
                  <p className="text-slate-500">{addr.area}, {addr.city}, {addr.division}</p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: PROFILE */}
          {activeTab === 'profile' && (
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">Full Name</label>
                  <p className="font-bold text-slate-800 text-sm">Mohammad Jon</p>
                </div>
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">Phone Number</label>
                  <p className="font-mono font-bold text-slate-800 text-sm">+880 1712 345678</p>
                </div>
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">Email Address</label>
                  <p className="font-bold text-slate-800">m.jon.shopper@imxfirejon.com</p>
                </div>
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">Account Tier</label>
                  <span className="font-bold text-[#F57224]">Gold Fire VIP Buyer (15% Extra Points)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
