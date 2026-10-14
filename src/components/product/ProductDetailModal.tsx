import React, { useState } from 'react';
import { 
  X, Star, Heart, ShoppingCart, Truck, ShieldCheck, 
  RotateCcw, Store, Check, Plus, Minus, Share2, ArrowRight 
} from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';
import { REVIEWS } from '../../data/mockData';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    toggleWishlist, 
    isWishlisted,
    setIsCheckoutOpen,
    vendors,
    showNotification
  } = useEcommerce();

  if (!selectedProduct) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(selectedProduct.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState<string>(selectedProduct.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');

  const images = selectedProduct.galleryImages && selectedProduct.galleryImages.length > 0
    ? selectedProduct.galleryImages
    : [selectedProduct.image];

  const vendor = vendors.find((v) => v.id === selectedProduct.vendorId) || vendors[0];
  const wishlisted = isWishlisted(selectedProduct.id);

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity, selectedColor, selectedSize);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, selectedColor, selectedSize);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 md:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-4 md:p-8">
          {/* Main Product Section: Gallery (Left) & Buy Box (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={images[activeImageIndex] || selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                {selectedProduct.discountPercentage > 0 && (
                  <div className="absolute top-3 left-3 bg-[#F57224] text-white text-xs font-black px-2.5 py-1 rounded shadow-md">
                    -{selectedProduct.discountPercentage}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnail Selector */}
              {images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        idx === activeImageIndex
                          ? 'border-[#F57224] ring-2 ring-orange-200'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
                <div className="flex flex-col items-center p-2 rounded-lg bg-slate-50 text-[11px] text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1" />
                  <span className="font-semibold text-slate-800">100% Authentic</span>
                  <span className="text-[10px] text-slate-400">Verified Brand</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-lg bg-slate-50 text-[11px] text-slate-600">
                  <RotateCcw className="w-4 h-4 text-blue-600 mb-1" />
                  <span className="font-semibold text-slate-800">7 Days Return</span>
                  <span className="text-[10px] text-slate-400">Hassle Free</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-lg bg-slate-50 text-[11px] text-slate-600">
                  <Truck className="w-4 h-4 text-[#F57224] mb-1" />
                  <span className="font-semibold text-slate-800">Fast Shipping</span>
                  <span className="text-[10px] text-slate-400">Dhaka & Countrywide</span>
                </div>
              </div>
            </div>

            {/* Right: Product Details & Purchase Form */}
            <div className="flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                {/* Brand & Category */}
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-bold text-slate-700">{selectedProduct.brand}</span>
                  <span>·</span>
                  <span>{selectedProduct.category}</span>
                </div>

                {/* Title */}
                <h1 className="text-lg md:text-xl font-bold text-slate-900 leading-snug">
                  {selectedProduct.name}
                </h1>

                {/* Rating & Reviews Bar */}
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded text-amber-700 font-bold border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                    <span>{selectedProduct.rating}</span>
                  </div>
                  <span className="text-slate-500">{selectedProduct.reviewCount} Ratings</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-500">
                    SKU: <code className="text-slate-700 font-mono text-[11px]">{selectedProduct.id}</code>
                  </span>
                </div>

                {/* Pricing Box */}
                <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100 flex items-baseline gap-3">
                  <span className="text-2xl md:text-3xl font-black text-[#F57224] tabular-nums">
                    ৳{selectedProduct.price.toLocaleString()}
                  </span>
                  {selectedProduct.originalPrice > selectedProduct.price && (
                    <span className="text-sm text-slate-400 line-through tabular-nums">
                      ৳{selectedProduct.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {selectedProduct.discountPercentage > 0 && (
                    <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">
                      -{selectedProduct.discountPercentage}%
                    </span>
                  )}
                </div>

                {/* Variants: Colors */}
                {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Color Family: <span className="text-[#F57224] font-medium">{selectedColor}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.colors.map((c) => (
                        <button
                          key={c}
                          onClick={() => setSelectedColor(c)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                            selectedColor === c
                              ? 'border-[#F57224] bg-[#F57224] text-white shadow-xs'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Variants: Sizes */}
                {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Size: <span className="text-[#F57224] font-medium">{selectedSize}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                            selectedSize === s
                              ? 'border-[#F57224] bg-[#F57224] text-white shadow-xs'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity & Stock */}
                <div className="flex items-center gap-4 pt-1">
                  <span className="text-xs font-bold text-slate-700">Quantity</span>
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-1.5 hover:bg-slate-100 text-slate-600 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-slate-800 tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(selectedProduct.stock, q + 1))}
                      className="p-1.5 hover:bg-slate-100 text-slate-600 transition-colors"
                      disabled={quantity >= selectedProduct.stock}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-xs text-slate-500">
                    Only <span className="font-bold text-orange-600">{selectedProduct.stock} items</span> left in stock
                  </span>
                </div>

                {/* Seller Profile Card */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between mt-2">
                  <div className="flex items-center gap-3">
                    <img 
                      src={vendor.logo} 
                      alt={vendor.name} 
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Store className="w-3.5 h-3.5 text-[#F57224]" />
                        <h4 className="text-xs font-bold text-slate-800">{vendor.name}</h4>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                        <span>{vendor.positiveRatingPercent}% Positive Ratings</span>
                        <span>·</span>
                        <span>{vendor.shipOnTimePercent}% On-Time Ship</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => showNotification(`Visiting store of ${vendor.name}`)}
                    className="text-xs font-bold text-[#F57224] hover:underline"
                  >
                    Visit Store
                  </button>
                </div>
              </div>

              {/* Action Buttons: Add to Cart, Buy Now, Wishlist */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-3 bg-orange-100 hover:bg-orange-200 text-[#F57224] font-bold text-xs md:text-sm rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3 bg-[#F57224] hover:bg-[#e06117] text-white font-bold text-xs md:text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                  >
                    <span>Buy Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className="flex items-center gap-1.5 text-slate-600 hover:text-red-500 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${wishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                    <span>{wishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      showNotification('Product link copied to clipboard!');
                    }}
                    className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share Deal</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Tabs: Description, Specs, Reviews */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex items-center gap-6 border-b border-slate-200 pb-2">
              <button
                onClick={() => setActiveTab('description')}
                className={`text-xs font-bold uppercase tracking-wider transition-colors pb-2 -mb-2 border-b-2 ${
                  activeTab === 'description'
                    ? 'border-[#F57224] text-[#F57224]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Product Details
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`text-xs font-bold uppercase tracking-wider transition-colors pb-2 -mb-2 border-b-2 ${
                  activeTab === 'specifications'
                    ? 'border-[#F57224] text-[#F57224]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Key Features
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`text-xs font-bold uppercase tracking-wider transition-colors pb-2 -mb-2 border-b-2 ${
                  activeTab === 'reviews'
                    ? 'border-[#F57224] text-[#F57224]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Verified Reviews ({REVIEWS.length})
              </button>
            </div>

            <div className="pt-4 text-xs text-slate-700 leading-relaxed">
              {activeTab === 'description' && (
                <div className="space-y-3">
                  <p className="text-slate-700">{selectedProduct.description}</p>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                    <p className="font-bold text-slate-900">Warranty & Guarantee:</p>
                    <p className="text-slate-600">{selectedProduct.warranty}</p>
                  </div>
                </div>
              )}

              {activeTab === 'specifications' && (
                <ul className="space-y-2">
                  {selectedProduct.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {REVIEWS.map((rev) => (
                    <div key={rev.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{rev.userName}</span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400">{rev.date}</span>
                      </div>
                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="text-slate-600">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
