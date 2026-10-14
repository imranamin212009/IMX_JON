import React, { useState } from 'react';
import { 
  X, MapPin, CreditCard, ShieldCheck, Tag, Check, 
  ArrowRight, Plus, Truck, Smartphone, Banknote, AlertCircle, Loader2 
} from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';
import { PaymentMethod, ShippingAddress } from '../../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    addresses,
    selectedAddress,
    setSelectedAddressId,
    addAddress,
    cartSubtotal,
    cartShippingFee,
    cartDiscount,
    cartTotal,
    appliedPromo,
    applyPromo,
    removePromo,
    placeOrder
  } = useEcommerce();

  if (!isCheckoutOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bkash');
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; error?: boolean } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  // MFS simulation fields
  const [mfsPhone, setMfsPhone] = useState('01712345678');
  const [mfsOtp, setMfsOtp] = useState('');
  const [mfsPin, setMfsPin] = useState('');
  const [mfsStep, setMfsStep] = useState<'phone' | 'otp' | 'pin'>('phone');

  // Card fields
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('123');

  // New Address form
  const [newAddr, setNewAddr] = useState({
    fullName: '',
    phoneNumber: '',
    division: 'Dhaka',
    city: '',
    area: '',
    detailedAddress: '',
    isDefault: false,
    label: 'Home' as const
  });

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    setPromoMessage({ text: res.message, error: !res.success });
    if (res.success) setPromoInput('');
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.fullName || !newAddr.phoneNumber || !newAddr.detailedAddress) {
      alert('Please fill in name, phone, and detailed street address.');
      return;
    }
    addAddress(newAddr);
    setShowNewAddressForm(false);
  };

  const handleConfirmOrder = () => {
    setIsProcessing(true);
    // Simulate real gateway verification latency
    setTimeout(() => {
      setIsProcessing(false);
      placeOrder(paymentMethod);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 md:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Checkout Header */}
        <div className="p-4 md:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-slate-800">
              Checkout & Payment
            </h2>
            <p className="text-xs text-slate-500">
              Safe & Encrypted 256-Bit SSL Checkout Powered by IMX ZONE
            </p>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-md hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Delivery Address & Payment Method */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Delivery Address Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#F57224]" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    1. Delivery Address
                  </h3>
                </div>
                <button
                  onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                  className="text-xs font-bold text-[#F57224] hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{showNewAddressForm ? 'Cancel' : 'Add New Address'}</span>
                </button>
              </div>

              {/* Add New Address Form Modal/Collapse */}
              {showNewAddressForm ? (
                <form onSubmit={handleCreateAddress} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={newAddr.fullName}
                        onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                        placeholder="Recipient Name"
                        className="w-full p-2 bg-white border border-slate-200 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Phone Number</label>
                      <input
                        type="text"
                        required
                        value={newAddr.phoneNumber}
                        onChange={(e) => setNewAddr({ ...newAddr, phoneNumber: e.target.value })}
                        placeholder="+880 1700 000000"
                        className="w-full p-2 bg-white border border-slate-200 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Division</label>
                      <select
                        value={newAddr.division}
                        onChange={(e) => setNewAddr({ ...newAddr, division: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-200 rounded-md"
                      >
                        <option value="Dhaka">Dhaka (৳60 delivery)</option>
                        <option value="Chittagong">Chittagong (৳120 delivery)</option>
                        <option value="Sylhet">Sylhet (৳120 delivery)</option>
                        <option value="Rajshahi">Rajshahi (৳120 delivery)</option>
                        <option value="Khulna">Khulna (৳120 delivery)</option>
                        <option value="Barisal">Barisal (৳120 delivery)</option>
                        <option value="Rangpur">Rangpur (৳120 delivery)</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">City / Zone</label>
                      <input
                        type="text"
                        required
                        value={newAddr.city}
                        onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                        placeholder="e.g. Uttara / Dhanmondi"
                        className="w-full p-2 bg-white border border-slate-200 rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Street / House Address</label>
                    <input
                      type="text"
                      required
                      value={newAddr.detailedAddress}
                      onChange={(e) => setNewAddr({ ...newAddr, detailedAddress: e.target.value })}
                      placeholder="House No, Road No, Area"
                      className="w-full p-2 bg-white border border-slate-200 rounded-md"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-[#F57224] text-white font-bold rounded-lg hover:bg-[#e06117]"
                  >
                    Save Address & Deliver Here
                  </button>
                </form>
              ) : (
                /* Saved Address Cards */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {addresses.map((addr) => {
                    const isSelected = selectedAddress.id === addr.id;
                    return (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedAddressId(addr.id)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#F57224] bg-orange-50/50 shadow-xs ring-1 ring-[#F57224]'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-800">{addr.fullName}</span>
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-semibold">
                            {addr.label}
                          </span>
                        </div>
                        <p className="text-slate-500 font-mono text-[11px]">{addr.phoneNumber}</p>
                        <p className="text-slate-600 mt-1 line-clamp-1">{addr.detailedAddress}</p>
                        <p className="text-slate-500 text-[11px]">{addr.city}, {addr.division}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 2. Payment Gateway Section */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#F57224]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  2. Select Payment Method
                </h3>
              </div>

              {/* Gateway Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {/* bKash */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bkash')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    paymentMethod === 'bkash'
                      ? 'border-[#E2136E] bg-pink-50 text-[#E2136E] ring-2 ring-[#E2136E]/30 shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-black text-sm tracking-tight text-[#E2136E]">bKash</span>
                  <span className="text-[10px] font-normal text-slate-500">MFS Wallet</span>
                </button>

                {/* Nagad */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('nagad')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    paymentMethod === 'nagad'
                      ? 'border-[#F7941D] bg-orange-50 text-[#F7941D] ring-2 ring-[#F7941D]/30 shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-black text-sm tracking-tight text-[#F7941D]">Nagad</span>
                  <span className="text-[10px] font-normal text-slate-500">Instant</span>
                </button>

                {/* Rocket */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('rocket')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    paymentMethod === 'rocket'
                      ? 'border-[#8C3494] bg-purple-50 text-[#8C3494] ring-2 ring-[#8C3494]/30 shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-black text-sm tracking-tight text-[#8C3494]">Rocket</span>
                  <span className="text-[10px] font-normal text-slate-500">DBBL</span>
                </button>

                {/* Cards */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-600/30 shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span className="text-[10px] font-normal text-slate-500">Cards</span>
                </button>

                {/* COD */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer col-span-2 sm:col-span-1 ${
                    paymentMethod === 'cod'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-600/30 shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Banknote className="w-4 h-4 text-emerald-600" />
                  <span className="text-[10px] font-normal text-slate-500">Cash (COD)</span>
                </button>
              </div>

              {/* Dynamic Payment Details Input Area */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-3">
                {paymentMethod === 'bkash' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="font-bold text-[#E2136E] text-sm">bKash Payment Gateway</span>
                      <span className="text-slate-500 font-mono">1.5% Instant Cashback</span>
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Your bKash Account Number
                      </label>
                      <input
                        type="text"
                        value={mfsPhone}
                        onChange={(e) => setMfsPhone(e.target.value)}
                        placeholder="01XXXXXXXXX"
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-lg font-mono text-sm"
                      />
                    </div>
                    <p className="text-[11px] text-slate-500">
                      By clicking "Confirm Order", you will be redirected to the secure bKash tokenized portal to input your OTP & PIN.
                    </p>
                  </div>
                )}

                {paymentMethod === 'nagad' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="font-bold text-[#F7941D] text-sm">Nagad Payment Gateway</span>
                      <span className="text-slate-500 font-mono">Post Office Digital</span>
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Nagad Wallet Number
                      </label>
                      <input
                        type="text"
                        value={mfsPhone}
                        onChange={(e) => setMfsPhone(e.target.value)}
                        placeholder="01XXXXXXXXX"
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-lg font-mono text-sm"
                      />
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Safe & secured through Bangladesh Post Office Digital Financial Service.
                    </p>
                  </div>
                )}

                {paymentMethod === 'rocket' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="font-bold text-[#8C3494] text-sm">Rocket (DBBL) Gateway</span>
                      <span className="text-slate-500 font-mono">Dutch-Bangla Bank</span>
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Rocket 12-Digit Account (with check digit)
                      </label>
                      <input
                        type="text"
                        value={mfsPhone}
                        onChange={(e) => setMfsPhone(e.target.value)}
                        placeholder="01XXXXXXXXXX"
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-lg font-mono text-sm"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="font-bold text-slate-800">Visa / Mastercard / Amex</span>
                      <span className="text-slate-500 text-[11px]">3D Secure Verified</span>
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-lg font-mono text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Expiry Date</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full p-2 bg-white border border-slate-200 rounded-md font-mono text-xs"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">CVV / CVC</label>
                        <input
                          type="password"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full p-2 bg-white border border-slate-200 rounded-md font-mono text-xs"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-emerald-700 font-bold">
                      <Check className="w-4 h-4" />
                      <span>Cash on Delivery is Available</span>
                    </div>
                    <p className="text-slate-600 text-xs">
                      You will pay <strong>৳{cartTotal.toLocaleString()}</strong> in cash to the delivery rider upon unboxing & verifying the parcel.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Voucher */}
          <div className="lg:col-span-5 space-y-4">
            {/* Promo Code Box */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Store Voucher / Promo Code
              </label>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Try: FIRE20, IMX ZONE10, FREESHIP"
                  className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-lg hover:bg-black transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoMessage && (
                <p className={`text-[11px] ${promoMessage.error ? 'text-red-500' : 'text-emerald-600 font-semibold'}`}>
                  {promoMessage.text}
                </p>
              )}

              {appliedPromo && (
                <div className="flex items-center justify-between pt-1 text-xs text-emerald-700 font-medium">
                  <span>Active code: <strong>{appliedPromo.code}</strong></span>
                  <button onClick={removePromo} className="text-red-600 hover:underline">
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Order Items Preview */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Order Items ({cart.length})
              </h4>
              <div className="max-h-48 overflow-y-auto space-y-2 pr-1 divide-y divide-slate-100">
                {cart.map((item, idx) => (
                  <div key={idx} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <img src={item.product.image} alt={item.product.name} className="w-8 h-8 rounded object-cover shrink-0" />
                      <div className="truncate">
                        <p className="font-medium text-slate-800 truncate">{item.product.name}</p>
                        <p className="text-[10px] text-slate-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-800 shrink-0 ml-2 tabular-nums">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal</span>
                <span className="font-semibold text-slate-800 tabular-nums">৳{cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>
                  Delivery to <strong className="text-slate-800">{selectedAddress.division}</strong>
                </span>
                <span className="font-semibold text-slate-800 tabular-nums">
                  {cartShippingFee === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    `৳${cartShippingFee}`
                  )}
                </span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount Applied</span>
                  <span className="tabular-nums">-৳{cartDiscount.toLocaleString()}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                <span className="font-bold text-slate-900 text-sm">Total To Pay</span>
                <span className="text-xl font-black text-[#F57224] tabular-nums">
                  ৳{cartTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Confirm & Place Order CTA */}
            <button
              onClick={handleConfirmOrder}
              disabled={isProcessing || cart.length === 0}
              className="w-full py-3.5 bg-[#F57224] hover:bg-[#e06117] text-white font-extrabold text-sm uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-95"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <span>Confirm Order (৳{cartTotal.toLocaleString()})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
