import React from 'react';
import { 
  X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, 
  Tag, ShieldCheck 
} from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartShippingFee,
    cartDiscount,
    cartTotal,
    cartItemCount,
    setIsCheckoutOpen,
    appliedPromo,
    removePromo,
    setSelectedProduct
  } = useEcommerce();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#F57224]" />
            <h2 className="text-base font-bold text-slate-800">
              Shopping Cart ({cartItemCount})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-md hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto text-[#F57224]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <p className="text-base font-bold text-slate-800">Your cart is empty</p>
                <p className="text-xs text-slate-500 mt-1">
                  Discover trending deals on flash sales and certified brand stores.
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 bg-[#F57224] text-white text-xs font-bold rounded-lg hover:bg-[#e06117] transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item, index) => (
                <div
                  key={`${item.productId}-${item.selectedColor}-${item.selectedSize}-${index}`}
                  className="flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80 hover:border-orange-200 transition-colors"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg border border-slate-200 shrink-0 cursor-pointer"
                    onClick={() => {
                      setSelectedProduct(item.product);
                      setIsCartOpen(false);
                    }}
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 
                          className="text-xs font-semibold text-slate-800 line-clamp-1 cursor-pointer hover:text-[#F57224]"
                          onClick={() => {
                            setSelectedProduct(item.product);
                            setIsCartOpen(false);
                          }}
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.productId, item.selectedColor, item.selectedSize)}
                          className="text-slate-400 hover:text-red-500 p-0.5 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant line */}
                      {(item.selectedColor || item.selectedSize) && (
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {item.selectedColor ? `Color: ${item.selectedColor}` : ''}
                          {item.selectedColor && item.selectedSize ? ' · ' : ''}
                          {item.selectedSize ? `Size: ${item.selectedSize}` : ''}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-bold text-[#F57224] tabular-nums">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </span>

                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-slate-200 bg-white rounded-md overflow-hidden">
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.quantity - 1, item.selectedColor, item.selectedSize)}
                          className="p-1 hover:bg-slate-100 text-slate-600 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-slate-800 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.quantity + 1, item.selectedColor, item.selectedSize)}
                          className="p-1 hover:bg-slate-100 text-slate-600 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer Summary */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
            {/* Promo banner indicator */}
            {appliedPromo && (
              <div className="flex items-center justify-between p-2 bg-emerald-50 text-emerald-800 rounded-lg text-xs border border-emerald-200">
                <div className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Voucher applied: <strong>{appliedPromo.code}</strong></span>
                </div>
                <button
                  onClick={removePromo}
                  className="text-emerald-700 hover:text-emerald-900 font-bold"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800 tabular-nums">৳{cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-slate-800 tabular-nums">
                  {cartShippingFee === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    `৳${cartShippingFee.toLocaleString()}`
                  )}
                </span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Voucher Discount</span>
                  <span className="tabular-nums">-৳{cartDiscount.toLocaleString()}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-sm font-bold text-slate-900">
                <span>Total Amount</span>
                <span className="text-base text-[#F57224] font-black tabular-nums">
                  ৳{cartTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full py-3 bg-[#F57224] hover:bg-[#e06117] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
