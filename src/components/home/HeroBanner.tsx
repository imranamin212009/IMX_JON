import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, ArrowRight, Zap, ShieldCheck, 
  Truck, Tag, ChevronLeft
} from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';
import { CATEGORIES } from '../../data/mockData';

const SLIDES = [
  {
    id: 1,
    title: 'IMX FIRE FEST 2026',
    subtitle: 'Up to 70% OFF on Flagship Audio, Wearables & Tech',
    badge: 'MEGA FLASH EVENT',
    cta: 'Shop Deals Now',
    bgColor: 'from-orange-600 via-amber-600 to-red-600',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80',
    tag: 'Official Warranty Included'
  },
  {
    id: 2,
    title: 'Next-Gen Smartphones & Laptops',
    subtitle: 'Zero % EMI Available · Instant Delivery in Dhaka & Chittagong',
    badge: 'AUTHENTIC BRANDS',
    cta: 'Explore Flagships',
    bgColor: 'from-blue-900 via-indigo-900 to-slate-900',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1000&auto=format&fit=crop&q=80',
    tag: '100% Genuine Guarantee'
  },
  {
    id: 3,
    title: 'bKash & Nagad Special Cashback',
    subtitle: 'Get Extra 15% Instant Savings with Code FIRE20',
    badge: 'MFS PAYMENT SAVINGS',
    cta: 'Claim Voucher',
    bgColor: 'from-pink-800 via-rose-700 to-orange-700',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&auto=format&fit=crop&q=80',
    tag: 'Limited Period Offer'
  }
];

export const HeroBanner: React.FC = () => {
  const { setSelectedCategory, setIsCartOpen } = useEcommerce();
  const [activeCategoryHover, setActiveCategoryHover] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto rotate carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const activeCategoryData = CATEGORIES.find((c) => c.name === activeCategoryHover);

  return (
    <div className="relative max-w-7xl mx-auto px-4 pt-4 pb-2">
      <div className="flex gap-4 items-stretch relative">
        {/* 1. Left Mega Menu Sidebar (IMX ZONE Signature) */}
        <div 
          className="w-64 shrink-0 bg-white rounded-xl shadow-xs border border-slate-200/80 hidden lg:block relative z-30"
          onMouseLeave={() => setActiveCategoryHover(null)}
        >
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#F57224]" />
              <span>Categories</span>
            </span>
          </div>

          <div className="py-1">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onMouseEnter={() => setActiveCategoryHover(cat.name)}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center justify-between px-4 py-2.5 text-xs cursor-pointer transition-colors ${
                  activeCategoryHover === cat.name
                    ? 'bg-orange-50/80 text-[#F57224] font-semibold'
                    : 'text-slate-700 hover:text-[#F57224] hover:bg-slate-50'
                }`}
              >
                <span className="truncate">{cat.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>
            ))}
          </div>

          {/* Mega-menu Flyout Popover */}
          {activeCategoryHover && activeCategoryData && (
            <div 
              className="absolute left-full top-0 w-[550px] min-h-full bg-white rounded-r-xl shadow-2xl border border-slate-200 p-6 z-40 grid grid-cols-2 gap-6"
              onMouseEnter={() => setActiveCategoryHover(activeCategoryHover)}
            >
              {activeCategoryData.subcategories.map((sub) => (
                <div key={sub.id} className="space-y-2">
                  <h4 
                    onClick={() => setSelectedCategory(activeCategoryData.name)}
                    className="text-xs font-bold text-slate-900 hover:text-[#F57224] cursor-pointer flex items-center gap-1"
                  >
                    <span>{sub.name}</span>
                    <ArrowRight className="w-3 h-3 text-[#F57224]" />
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {sub.items.map((item, idx) => (
                      <li 
                        key={idx}
                        onClick={() => setSelectedCategory(activeCategoryData.name)}
                        className="hover:text-[#F57224] cursor-pointer transition-colors"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="col-span-2 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Total {activeCategoryData.itemCount} verified products</span>
                <button
                  onClick={() => setSelectedCategory(activeCategoryData.name)}
                  className="text-[#F57224] font-bold hover:underline flex items-center gap-1"
                >
                  <span>View All {activeCategoryData.name}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 2. Hero Promotional Slider Banner */}
        <div className="flex-1 rounded-xl overflow-hidden relative shadow-sm border border-slate-200/80 min-h-[340px] md:min-h-[380px] flex items-center bg-slate-900 group">
          {SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center ${
                idx === currentSlide ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background gradient & high-res image */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-90`} />
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute right-0 top-0 w-full md:w-3/5 h-full object-cover object-center mix-blend-overlay md:mix-blend-normal opacity-40 md:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent md:w-2/3" />

              {/* Slide Content */}
              <div className="relative z-20 p-6 md:p-10 max-w-xl text-white space-y-4">
                <div className="flex items-center gap-2">
                  <span className="bg-[#F57224] text-white text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded shadow-xs">
                    {slide.badge}
                  </span>
                  <span className="text-xs text-orange-200 font-medium">
                    · {slide.tag}
                  </span>
                </div>

                <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight text-white drop-shadow-sm">
                  {slide.title}
                </h2>

                <p className="text-sm md:text-base text-slate-200 max-w-md font-normal leading-relaxed">
                  {slide.subtitle}
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => {
                      const flashSection = document.getElementById('flash-sale-section');
                      if (flashSection) {
                        flashSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="bg-[#F57224] hover:bg-[#e06117] text-white text-xs md:text-sm font-bold px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2 active:scale-95 cursor-pointer"
                  >
                    <span>{slide.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-xs text-white border border-white/20 text-xs md:text-sm font-semibold px-4 py-3 rounded-lg transition-colors cursor-pointer"
                  >
                    View Cart
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Slider Controls */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
            className="absolute left-3 z-30 p-2 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-xs transition-opacity opacity-0 group-hover:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
            className="absolute right-3 z-30 p-2 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-xs transition-opacity opacity-0 group-hover:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Indicator dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlide ? 'w-6 bg-[#F57224]' : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
