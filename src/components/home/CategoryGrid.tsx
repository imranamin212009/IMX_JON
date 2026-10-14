import React from 'react';
import { CATEGORIES } from '../../data/mockData';
import { useEcommerce } from '../../context/EcommerceContext';
import { ChevronRight } from 'lucide-react';

const CATEGORY_IMAGES: Record<string, string> = {
  'Electronic Devices': 'https://images.unsplash.com/photo-1511707171634-5f897ff025a0?w=300&auto=format&fit=crop&q=80',
  'Electronic Accessories': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80',
  'TV & Home Appliances': 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&auto=format&fit=crop&q=80',
  'Health & Beauty': 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&auto=format&fit=crop&q=80',
  "Men's Fashion": 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&auto=format&fit=crop&q=80',
  "Women's Fashion": 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&auto=format&fit=crop&q=80',
  'Home & Living': 'https://images.unsplash.com/photo-1580481077195-c3f995a6ec8c?w=300&auto=format&fit=crop&q=80',
  'Sports & Outdoor': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80'
};

export const CategoryGrid: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useEcommerce();

  return (
    <section className="max-w-7xl mx-auto px-4 py-4">
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-4 md:p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base md:text-lg font-bold text-slate-800">
              Categories
            </h2>
            <p className="text-xs text-slate-500">Explore authentic products from certified vendors</p>
          </div>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-xs font-bold text-[#F57224] hover:underline"
            >
              Clear filter ({selectedCategory})
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 pt-4">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            const img = CATEGORY_IMAGES[cat.name] || CATEGORY_IMAGES['Electronic Devices'];

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(isSelected ? null : cat.name);
                  const el = document.getElementById('just-for-you-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group flex flex-col items-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#F57224] bg-orange-50/50 shadow-xs ring-1 ring-[#F57224]'
                    : 'border-slate-100 hover:border-orange-200 hover:shadow-md bg-white'
                }`}
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden mb-2 bg-slate-100 border border-slate-200 group-hover:scale-105 transition-transform">
                  <img
                    src={img}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <span className="text-xs font-semibold text-slate-800 group-hover:text-[#F57224] line-clamp-1">
                  {cat.name}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  {cat.itemCount.toLocaleString()} items
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
