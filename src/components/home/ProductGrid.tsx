import React, { useState, useMemo } from 'react';
import { 
  Star, Heart, ShoppingCart, SlidersHorizontal, 
  RotateCcw, Sparkles, Check, ChevronDown, Eye 
} from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';
import { Product } from '../../types';

export const ProductGrid: React.FC = () => {
  const {
    products,
    searchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    sortBy,
    setSortBy,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setSelectedProduct
  } = useEcommerce();

  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  // Extract unique brands for brand filter
  const allBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    products.forEach((p) => {
      if (p.brand) brandsSet.add(p.brand);
    });
    return Array.from(brandsSet);
  }, [products]);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = prod.name.toLowerCase().includes(query);
        const matchesBrand = prod.brand.toLowerCase().includes(query);
        const matchesCat = prod.category.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesCat) return false;
      }

      // Category filter
      if (selectedCategory && prod.category !== selectedCategory) {
        return false;
      }

      // Brand filter
      if (selectedBrand && prod.brand !== selectedBrand) {
        return false;
      }

      // Price range
      if (prod.price < priceRange[0] || prod.price > priceRange[1]) {
        return false;
      }

      // Rating filter
      if (minRating > 0 && prod.rating < minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      return 0; // relevance
    });
  }, [products, searchQuery, selectedCategory, selectedBrand, priceRange, minRating, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const resetAllFilters = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
    setPriceRange([0, 200000]);
    setMinRating(0);
    setSortBy('relevance');
  };

  const hasActiveFilters = Boolean(
    selectedCategory || selectedBrand || minRating > 0 || priceRange[0] > 0 || priceRange[1] < 200000
  );

  return (
    <section id="just-for-you-section" className="max-w-7xl mx-auto px-4 py-4">
      {/* Title & Filter Header */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-4 md:p-6 mb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F57224]" />
              <h2 className="text-base md:text-xl font-bold text-slate-900">
                {selectedCategory ? `${selectedCategory}` : searchQuery ? `Search Results for "${searchQuery}"` : 'Just For You'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing {displayedProducts.length} of {filteredProducts.length} products curated for your preferences
            </p>
          </div>

          {/* Sort & Toggle Filter buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                showFilters || hasActiveFilters
                  ? 'bg-orange-50 text-[#F57224] border-orange-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {hasActiveFilters ? '(Active)' : ''}</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className="hidden sm:inline text-slate-400">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-[#F57224]"
              >
                <option value="relevance">Best Match</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Customer Rating</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Expandable Multi-Facet Filter Panel */}
        {showFilters && (
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50/70 p-4 rounded-xl border border-slate-200/80 mt-3">
            {/* Brand Filter */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">Brand</label>
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                <button
                  onClick={() => setSelectedBrand(null)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                    selectedBrand === null
                      ? 'bg-[#F57224] text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  All Brands
                </button>
                {allBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                      selectedBrand === brand
                        ? 'bg-[#F57224] text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">
                Price Range (৳)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0] || ''}
                  onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
                  className="w-24 px-2 py-1 text-xs bg-white border border-slate-200 rounded-md"
                />
                <span className="text-slate-400 text-xs">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1] === 200000 ? '' : priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 200000])}
                  className="w-24 px-2 py-1 text-xs bg-white border border-slate-200 rounded-md"
                />
              </div>
              <div className="flex gap-1.5 mt-2">
                <button
                  onClick={() => setPriceRange([0, 2000])}
                  className="text-[11px] px-2 py-0.5 bg-white border border-slate-200 rounded hover:bg-slate-100"
                >
                  Under ৳2k
                </button>
                <button
                  onClick={() => setPriceRange([2000, 10000])}
                  className="text-[11px] px-2 py-0.5 bg-white border border-slate-200 rounded hover:bg-slate-100"
                >
                  ৳2k - ৳10k
                </button>
                <button
                  onClick={() => setPriceRange([10000, 200000])}
                  className="text-[11px] px-2 py-0.5 bg-white border border-slate-200 rounded hover:bg-slate-100"
                >
                  ৳10k+
                </button>
              </div>
            </div>

            {/* Customer Rating Filter */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">Rating</label>
              <div className="flex flex-col gap-1.5 text-xs">
                {[0, 4.5, 4.0, 3.5].map((val) => (
                  <button
                    key={val}
                    onClick={() => setMinRating(val)}
                    className={`flex items-center gap-1.5 py-1 px-2 rounded-md text-left transition-colors ${
                      minRating === val
                        ? 'bg-[#F57224]/10 text-[#F57224] font-semibold'
                        : 'text-slate-600 hover:bg-white'
                    }`}
                  >
                    {val === 0 ? (
                      <span>All Ratings</span>
                    ) : (
                      <>
                        <div className="flex items-center text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-current" />
                        </div>
                        <span>{val} Stars and above</span>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset / Summary */}
            <div className="flex flex-col justify-end">
              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  className="w-full py-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Product Cards Grid */}
      {displayedProducts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80 space-y-3">
          <p className="text-base font-bold text-slate-800">No products match your search or filter</p>
          <p className="text-xs text-slate-500">Try adjusting your price range, selected brand, or keywords.</p>
          <button
            onClick={resetAllFilters}
            className="px-4 py-2 bg-[#F57224] text-white text-xs font-bold rounded-lg hover:bg-[#e06117]"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {displayedProducts.map((prod) => {
            const wishlisted = isWishlisted(prod.id);

            return (
              <div
                key={prod.id}
                className="group flex flex-col justify-between bg-white rounded-xl border border-slate-200/80 hover:border-orange-300 hover:shadow-xl transition-all duration-200 overflow-hidden relative"
              >
                {/* Wishlist Button floating */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(prod.id);
                  }}
                  className={`absolute top-2.5 right-2.5 z-20 p-2 rounded-full transition-transform active:scale-90 ${
                    wishlisted
                      ? 'bg-red-50 text-red-500 shadow-xs'
                      : 'bg-white/80 backdrop-blur-xs text-slate-400 hover:text-red-500 hover:bg-white shadow-xs'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
                </button>

                {/* Product Image */}
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

                  {/* Discount Badge */}
                  {prod.discountPercentage > 0 && (
                    <div className="absolute bottom-2 left-2 bg-[#F57224] text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-xs">
                      -{prod.discountPercentage}%
                    </div>
                  )}

                  {/* Free Shipping Tag */}
                  {prod.shippingFee === 0 && (
                    <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                      Free Shipping
                    </div>
                  )}

                  {/* Quick View Overlay on Desktop */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="bg-white/90 backdrop-blur-xs text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3.5 flex flex-col flex-1 justify-between space-y-2">
                  <div 
                    className="cursor-pointer"
                    onClick={() => setSelectedProduct(prod)}
                  >
                    {/* Brand & Category micro-line */}
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
                      <span className="font-semibold text-slate-600">{prod.brand}</span>
                      <span>·</span>
                      <span className="truncate">{prod.vendorName}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xs font-semibold text-slate-800 line-clamp-2 leading-relaxed group-hover:text-[#F57224] transition-colors">
                      {prod.name}
                    </h3>
                  </div>

                  <div className="space-y-2 pt-1">
                    {/* Price and Original */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-extrabold text-[#F57224] tabular-nums">
                        ৳{prod.price.toLocaleString()}
                      </span>
                      {prod.originalPrice > prod.price && (
                        <span className="text-xs text-slate-400 line-through tabular-nums">
                          ৳{prod.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Rating & Sold count */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <div className="flex items-center text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <span className="font-bold text-slate-700">{prod.rating}</span>
                      <span>({prod.reviewCount})</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-[11px] text-slate-400">{prod.stock} in stock</span>
                    </div>

                    {/* Action buttons: Quick view & Add to Cart */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => setSelectedProduct(prod)}
                        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2 rounded-lg transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => addToCart(prod, 1)}
                        className="w-full bg-[#F57224] hover:bg-[#e06117] text-white text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-xs active:scale-95 cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Load More Button */}
      {visibleCount < filteredProducts.length && (
        <div className="text-center pt-8 pb-4">
          <button
            onClick={() => setVisibleCount((prev) => prev + 8)}
            className="px-8 py-3 bg-white border-2 border-[#F57224] text-[#F57224] hover:bg-[#F57224] hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xs hover:shadow-md cursor-pointer"
          >
            Load More Products ({filteredProducts.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </section>
  );
};
