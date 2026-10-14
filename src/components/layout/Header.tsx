import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, ShoppingCart, Heart, User, ChevronDown, 
  Smartphone, ShieldCheck, HelpCircle, Store, 
  Settings, FileCode2, Menu, X, ArrowRight, Check
} from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';
import { Logo } from '../common/Logo';
import { CATEGORIES } from '../../data/mockData';

export const Header: React.FC = () => {
  const { 
    userRole, 
    setUserRole, 
    cartItemCount, 
    cartTotal,
    wishlist, 
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    setIsDocsOpen,
    setIsCustomerDashboardOpen,
    products,
    setSelectedProduct
  } = useEcommerce();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products for live autocomplete
  const searchSuggestions = searchQuery.trim().length > 0
    ? products
        .filter((p) => 
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs">
      {/* 1. Top Announcement Bar */}
      <div className="bg-[#0F136D] text-slate-200 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer">
              <Smartphone className="w-3.5 h-3.5 text-[#F57224]" />
              <span>Save more on IMX App</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Authentic Guaranteed</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer">
              <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
              <span>24/7 Customer Care: 16999</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Download Project ZIP */}
            <a
              href="/imx-fire-jon-marketplace.zip"
              download="imx-fire-jon-marketplace.zip"
              className="flex items-center gap-1.5 bg-[#F57224] hover:bg-[#e06117] text-white px-2.5 py-0.5 rounded text-[11px] font-bold shadow-xs transition-colors"
              title="Download full project source code as a ZIP archive"
            >
              <span>Download Code (.ZIP)</span>
            </a>

            {/* Quick Architecture Docs trigger */}
            <button
              onClick={() => setIsDocsOpen(true)}
              className="flex items-center gap-1 text-amber-300 hover:text-amber-200 font-medium transition-colors"
              title="View Architecture, API & Schema Documentation"
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>System Docs & APIs</span>
            </button>

            {/* Language / Currency */}
            <div className="flex items-center gap-2 border-l border-slate-700 pl-4 text-slate-300">
              <span className="font-semibold text-white">BDT (৳)</span>
              <span>·</span>
              <span>English</span>
            </div>

            {/* Role Switcher tabs for easy previewing */}
            <div className="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-md border border-slate-700">
              <button
                onClick={() => setUserRole('customer')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  userRole === 'customer'
                    ? 'bg-[#F57224] text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Customer
              </button>
              <button
                onClick={() => setUserRole('seller')}
                className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  userRole === 'seller'
                    ? 'bg-[#F57224] text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Store className="w-3 h-3" />
                <span>Seller Hub</span>
              </button>
              <button
                onClick={() => setUserRole('admin')}
                className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  userRole === 'admin'
                    ? 'bg-[#F57224] text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Settings className="w-3 h-3" />
                <span>Admin</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Mobile menu toggle & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-700 hover:bg-slate-100 rounded-md"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <div onClick={() => { setSelectedCategory(null); setSearchQuery(''); }}>
            <Logo size="md" showTagline={true} />
          </div>
        </div>

        {/* Search Bar with live autocomplete */}
        <div ref={searchContainerRef} className="relative flex-1 max-w-2xl hidden md:block">
          <div className="flex items-center border-2 border-[#F57224] rounded-lg overflow-hidden bg-white shadow-xs focus-within:ring-2 focus-within:ring-[#F57224]/30">
            {/* Category selection trigger inside search bar */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 border-r border-slate-200 transition-colors shrink-0"
              >
                <span className="truncate max-w-[120px]">
                  {selectedCategory || 'All Categories'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {/* Category dropdown menu */}
              {isCategoryDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 w-56 bg-white rounded-lg shadow-xl border border-slate-200 py-1.5 z-50">
                  <button
                    onClick={() => { setSelectedCategory(null); setIsCategoryDropdownOpen(false); }}
                    className={`w-full text-left px-3.5 py-1.5 text-xs font-medium flex items-center justify-between ${
                      selectedCategory === null ? 'bg-orange-50 text-[#F57224]' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>All Categories</span>
                    {selectedCategory === null && <Check className="w-3.5 h-3.5" />}
                  </button>
                  <div className="my-1 border-t border-slate-100" />
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { setSelectedCategory(cat.name); setIsCategoryDropdownOpen(false); }}
                      className={`w-full text-left px-3.5 py-1.5 text-xs flex items-center justify-between ${
                        selectedCategory === cat.name ? 'bg-orange-50 text-[#F57224] font-semibold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      {selectedCategory === cat.name && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search in IMX ZONE (e.g. Wireless Headphones, Smartwatch, iPhone...)"
              className="w-full px-3.5 py-2 text-sm text-slate-800 focus:outline-hidden placeholder:text-slate-400"
            />

            {/* Clear button if text exists */}
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="px-2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Search submit icon */}
            <button
              type="button"
              className="bg-[#F57224] hover:bg-[#e06117] text-white px-5 py-2.5 transition-colors flex items-center justify-center shrink-0"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Autocomplete Suggestions Box */}
          {isSearchFocused && searchSuggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-xl border border-slate-200 z-50 overflow-hidden">
              <div className="p-2 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Products Matching "{searchQuery}"
              </div>
              <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                {searchSuggestions.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      setSelectedProduct(prod);
                      setIsSearchFocused(false);
                    }}
                    className="flex items-center gap-3 p-2.5 hover:bg-orange-50/60 cursor-pointer transition-colors"
                  >
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="w-10 h-10 object-cover rounded-md border border-slate-200 shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-800 truncate">{prod.name}</p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                        <span className="text-[#F57224] font-bold">৳{prod.price.toLocaleString()}</span>
                        <span>·</span>
                        <span>{prod.category}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action icons: Wishlist, Cart, Profile */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Wishlist */}
          <button
            onClick={() => setIsCustomerDashboardOpen(true)}
            className="relative p-2 text-slate-700 hover:text-[#F57224] transition-colors rounded-full hover:bg-slate-50"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#F57224] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Icon & Live Amount */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 p-1.5 md:px-3 md:py-1.5 text-slate-700 hover:text-[#F57224] transition-colors rounded-lg hover:bg-slate-50 border border-transparent md:border-slate-200"
            title="Shopping Cart"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-slate-800" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#F57224] text-white text-[11px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartItemCount}
                </span>
              )}
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-[10px] text-slate-400 font-medium leading-none">Total</span>
              <span className="text-xs font-bold text-slate-800 leading-tight">৳{cartTotal.toLocaleString()}</span>
            </div>
          </button>

          {/* User Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-1.5 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                {userRole === 'admin' ? 'AD' : userRole === 'seller' ? 'VN' : 'MJ'}
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden md:block" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-800">Mohammad Jon</p>
                  <p className="text-[11px] text-slate-500 capitalize">Role: {userRole}</p>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => { setIsCustomerDashboardOpen(true); setIsUserMenuOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>My Account & Orders</span>
                  </button>

                  <button
                    onClick={() => { setUserRole('seller'); setIsUserMenuOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Store className="w-4 h-4 text-[#F57224]" />
                    <span>Seller Dashboard</span>
                  </button>

                  <button
                    onClick={() => { setUserRole('admin'); setIsUserMenuOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4 text-blue-600" />
                    <span>Admin Control Panel</span>
                  </button>

                  <button
                    onClick={() => { setIsDocsOpen(true); setIsUserMenuOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <FileCode2 className="w-4 h-4 text-emerald-600" />
                    <span>Technical Architecture</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Mobile Search Bar & Menu Drawer */}
      <div className="md:hidden px-4 pb-2.5">
        <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50 focus-within:bg-white focus-within:border-[#F57224]">
          <Search className="w-4 h-4 text-slate-400 ml-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full px-3 py-2 text-xs focus:outline-hidden bg-transparent"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="p-2 text-slate-400">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase">Switch Persona</span>
            <div className="flex gap-1">
              <button 
                onClick={() => { setUserRole('customer'); setIsMobileMenuOpen(false); }}
                className={`px-2 py-1 text-xs rounded font-medium ${userRole === 'customer' ? 'bg-[#F57224] text-white' : 'bg-slate-100'}`}
              >
                Buyer
              </button>
              <button 
                onClick={() => { setUserRole('seller'); setIsMobileMenuOpen(false); }}
                className={`px-2 py-1 text-xs rounded font-medium ${userRole === 'seller' ? 'bg-[#F57224] text-white' : 'bg-slate-100'}`}
              >
                Seller
              </button>
              <button 
                onClick={() => { setUserRole('admin'); setIsMobileMenuOpen(false); }}
                className={`px-2 py-1 text-xs rounded font-medium ${userRole === 'admin' ? 'bg-[#F57224] text-white' : 'bg-slate-100'}`}
              >
                Admin
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Browse Categories</p>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.name); setIsMobileMenuOpen(false); }}
                className="w-full text-left py-1.5 text-xs text-slate-700 hover:text-[#F57224] flex items-center justify-between"
              >
                <span>{cat.name}</span>
                <span className="text-slate-400 text-[10px]">{cat.itemCount} items</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => { setIsDocsOpen(true); setIsMobileMenuOpen(false); }}
            className="w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
          >
            <FileCode2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Architecture & API Docs</span>
          </button>
        </div>
      )}
    </header>
  );
};
