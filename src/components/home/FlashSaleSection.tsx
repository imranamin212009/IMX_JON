import React, { useState, useEffect } from 'react';
import { Zap, Flame, ChevronRight, ShoppingCart } from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';

export const FlashSaleSection: React.FC = () => {
  const { products, addToCart, setSelectedProduct, setSelectedCategory } = useEcommerce();

  // Live countdown timer state (hours, minutes, seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashSaleProducts = products.filter((p) => p.isFlashSale);

  return (
    <section id="flash-sale-section" className="max-w-7xl mx-auto px-4 py-4">
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-4 md:p-6">
        {/* Flash Sale Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-[#F57224] to-red-600 text-white px-3 py-1.5 rounded-lg font-extrabold text-sm shadow-xs">
              <Flame className="w-4 h-4 fill-amber-300 text-amber-300 animate-pulse" />
              <span>FLASH SALE</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <span className="hidden md:inline text-slate-500 font-medium">Ends in:</span>
              <div className="flex items-center gap-1 font-mono tabular-nums text-xs font-bold text-white">
                <span className="bg-slate-900 px-2 py-1 rounded">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-slate-900">:</span>
                <span className="bg-slate-900 px-2 py-1 rounded">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-slate-900">:</span>
                <span className="bg-[#F57224] px-2 py-1 rounded">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSelectedCategory('Electronic Accessories')}
            className="flex items-center gap-1 text-xs font-bold text-[#F57224] hover:text-[#d45d16] transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>SHOP ALL FLASH DEALS</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Flash Sale Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 pt-4">
          {flashSaleProducts.map((prod) => {
            const claimed = prod.flashSaleClaimedPercent || 75;

            return (
              <div
                key={prod.id}
                className="group flex flex-col justify-between bg-white rounded-xl border border-slate-100 hover:border-orange-200 hover:shadow-lg transition-all duration-200 overflow-hidden"
              >
                {/* Product Image & Discount Badge */}
                <div 
                  className="relative aspect-square overflow-hidden bg-slate-50 cursor-pointer"
                  onClick={() => setSelectedProduct(prod)}
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-2 left-2 bg-[#F57224] text-white text-[11px] font-black px-1.5 py-0.5 rounded shadow-xs">
                    -{prod.discountPercentage}%
                  </div>

                  {/* Stock left badge */}
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                    {prod.stock} left
                  </div>
                </div>

                {/* Details */}
                <div className="p-3 flex flex-col flex-1 justify-between space-y-2">
                  <div 
                    className="cursor-pointer"
                    onClick={() => setSelectedProduct(prod)}
                  >
                    <h3 className="text-xs font-semibold text-slate-800 line-clamp-2 leading-snug group-hover:text-[#F57224] transition-colors">
                      {prod.name}
                    </h3>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    {/* Prices */}
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-extrabold text-[#F57224] tabular-nums">
                        ৳{prod.price.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-slate-400 line-through tabular-nums">
                        ৳{prod.originalPrice.toLocaleString()}
                      </span>
                    </div>

                    {/* Claimed progress bar */}
                    <div className="space-y-1">
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-[#F57224] rounded-full transition-all"
                          style={{ width: `${claimed}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                        <span>{claimed}% Sold</span>
                        <span className="text-orange-600 font-bold">Fast selling</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => addToCart(prod, 1)}
                      className="w-full mt-2 bg-orange-50 hover:bg-[#F57224] text-[#F57224] hover:text-white font-bold text-xs py-1.5 px-2 rounded-lg border border-orange-200 hover:border-transparent transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
