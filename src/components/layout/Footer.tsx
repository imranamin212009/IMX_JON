import React from 'react';
import { 
  ShieldCheck, Truck, RotateCcw, Headphones, 
  Smartphone, Apple, Play, Store, FileCode2 
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { useEcommerce } from '../../context/EcommerceContext';

export const Footer: React.FC = () => {
  const { setUserRole, setIsDocsOpen, setSelectedCategory } = useEcommerce();

  return (
    <footer className="bg-slate-900 text-slate-300 text-xs border-t border-slate-800 mt-12">
      {/* 1. Value Proposition Banner */}
      <div className="border-b border-slate-800 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-[#F57224] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">Fast Express Delivery</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Across all 64 districts in Bangladesh</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">100% Authentic Guarantee</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Genuine brand flagship stores only</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">7 Days Easy Return</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Hassle-free doorstep collection</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">24/7 Dedicated Support</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Dial 16999 or chat with support</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 inline-block">
            <Logo size="md" showTagline={true} />
          </div>
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            IMX JON is Bangladesh's premier multi-vendor e-commerce destination inspired by IMX JON. Empowering thousands of verified vendors and delivering over a million authentic products nationwide.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => setUserRole('seller')}
              className="bg-[#F57224] hover:bg-[#e06117] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Become an IMX Seller</span>
            </button>
            <button
              onClick={() => setIsDocsOpen(true)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <FileCode2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Tech Specs</span>
            </button>
          </div>
        </div>

        {/* Customer Care */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">Customer Care</h4>
          <ul className="space-y-2 text-slate-400 text-xs">
            <li className="hover:text-[#F57224] cursor-pointer">Help Center & FAQ</li>
            <li className="hover:text-[#F57224] cursor-pointer">How to Place an Order</li>
            <li className="hover:text-[#F57224] cursor-pointer">Returns & Refunds Policy</li>
            <li className="hover:text-[#F57224] cursor-pointer">Contact Us Hotline: 16999</li>
            <li className="hover:text-[#F57224] cursor-pointer">Purchase Protection</li>
          </ul>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">Popular Categories</h4>
          <ul className="space-y-2 text-slate-400 text-xs">
            <li onClick={() => setSelectedCategory('Electronic Devices')} className="hover:text-[#F57224] cursor-pointer">Electronic Devices</li>
            <li onClick={() => setSelectedCategory('Electronic Accessories')} className="hover:text-[#F57224] cursor-pointer">Electronic Accessories</li>
            <li onClick={() => setSelectedCategory('TV & Home Appliances')} className="hover:text-[#F57224] cursor-pointer">TV & Home Appliances</li>
            <li onClick={() => setSelectedCategory('Health & Beauty')} className="hover:text-[#F57224] cursor-pointer">Health & Beauty</li>
            <li onClick={() => setSelectedCategory("Men's Fashion")} className="hover:text-[#F57224] cursor-pointer">Men's Fashion</li>
          </ul>
        </div>

        {/* Mobile Apps & Payment Badges */}
        <div className="space-y-4">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">Payment Partners</h4>
          {/* Payment Badges */}
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-1 rounded bg-[#E2136E] text-white font-black text-[10px] tracking-tight">bKash</span>
            <span className="px-2 py-1 rounded bg-[#F7941D] text-white font-black text-[10px] tracking-tight">Nagad</span>
            <span className="px-2 py-1 rounded bg-[#8C3494] text-white font-black text-[10px] tracking-tight">Rocket</span>
            <span className="px-2 py-1 rounded bg-blue-600 text-white font-black text-[10px] tracking-tight">VISA</span>
            <span className="px-2 py-1 rounded bg-red-600 text-white font-black text-[10px] tracking-tight">Mastercard</span>
            <span className="px-2 py-1 rounded bg-emerald-700 text-white font-bold text-[10px]">COD</span>
          </div>

          <div className="pt-2">
            <h5 className="font-bold text-white text-[11px] mb-2 uppercase tracking-wider">Download Mobile App</h5>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer transition-colors border border-slate-700">
                <Apple className="w-5 h-5 text-white shrink-0" />
                <div>
                  <p className="text-[9px] text-slate-400 uppercase leading-none">Download on the</p>
                  <p className="text-xs font-bold text-white leading-tight">App Store</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer transition-colors border border-slate-700">
                <Play className="w-5 h-5 text-white shrink-0" />
                <div>
                  <p className="text-[9px] text-slate-400 uppercase leading-none">Get it on</p>
                  <p className="text-xs font-bold text-white leading-tight">Google Play</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Copyright bottom bar */}
      <div className="border-t border-slate-800 py-4 px-4 text-center text-slate-500 text-[11px]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 IMX JON BD Ltd. All Rights Reserved. Certified Multi-Vendor Platform.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy Notice</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">Seller Agreement</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
