import React from 'react';
import { Hotel, Utensils, MapPin, Shield, Sparkles, RefreshCcw, Share2 } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const TIER_META = {
  'Shoestring': { tier: 'TIER 01', subtitle: 'Maximized savings', order: 0 },
  'Sweet Spot': { tier: 'TIER 02', subtitle: 'Balanced & authentic', order: 1 },
  'Splurge': { tier: 'TIER 03', subtitle: 'Unreasonable comfort', order: 2 },
};

function PackageCard({ pkg, isRecommended, budget, onSelect }) {
  const name = pkg.name || Object.keys(TIER_META).find(k => pkg[k]) || 'Package';
  const meta = TIER_META[name] || TIER_META['Sweet Spot'];
  const hotel = pkg.hotel || 0;
  const food = pkg.food || 0;
  const transit = pkg.transit || 0;
  const total = pkg.total || (hotel + food + transit);
  const emergencyBuffer = Math.floor(budget * 0.10);

  return (
    <div className={`relative flex flex-col bg-white rounded-2xl transition-all duration-300 ${
      isRecommended 
        ? 'shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] md:scale-105 z-10 border-2 border-brand-dark' 
        : 'shadow-[0_8px_30px_-10px_rgba(0,0,0,0.06)] border border-slate-100 hover:shadow-lg'
    }`}>
      {/* RECOMMENDED Badge */}
      {isRecommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <span className="bg-brand-dark text-white text-[10px] font-bold tracking-[0.15em] uppercase px-5 py-1.5 rounded-full shadow-md whitespace-nowrap">
            Recommended
          </span>
        </div>
      )}

      <div className={`p-7 md:p-8 flex flex-col flex-grow ${isRecommended ? 'pt-10' : ''}`}>
        {/* Tier Label */}
        <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase mb-1">{meta.tier}</span>
        <h3 className={`font-bold mb-1 ${isRecommended ? 'text-2xl' : 'text-xl'} text-brand-dark`}>The {name}</h3>
        <p className="text-xs text-slate-400 mb-6">{meta.subtitle}</p>

        {/* Line Items */}
        <div className="space-y-4 flex-grow">
          <div className={`flex items-center justify-between ${isRecommended ? 'bg-brand-gray rounded-xl p-3.5' : 'py-1'}`}>
            <div className="flex items-center gap-3">
              <Hotel className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-600">Hotel</span>
            </div>
            <span className={`font-bold ${isRecommended ? 'text-lg' : 'text-base'} text-brand-dark`}>${hotel}</span>
          </div>
          <div className={`flex items-center justify-between ${isRecommended ? 'py-1 px-3.5' : 'py-1'}`}>
            <div className="flex items-center gap-3">
              <Utensils className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-600">Food</span>
            </div>
            <span className={`font-bold ${isRecommended ? 'text-lg' : 'text-base'} text-brand-dark`}>${food}</span>
          </div>
          <div className={`flex items-center justify-between ${isRecommended ? 'py-1 px-3.5' : 'py-1'}`}>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-600">Transit</span>
            </div>
            <span className={`font-bold ${isRecommended ? 'text-lg' : 'text-base'} text-brand-dark`}>${transit}</span>
          </div>

          {/* Emergency Buffer */}
          <div className={`flex items-center justify-between rounded-xl mt-2 ${
            isRecommended 
              ? 'bg-emerald-50 border border-emerald-100 p-3.5' 
              : 'bg-slate-100 border border-slate-100 p-3'
          }`}>
            <div className="flex items-center gap-2">
              <Shield className={`w-4 h-4 ${isRecommended ? 'text-emerald-500' : 'text-slate-400'}`} />
              <span className={`text-[10px] font-bold tracking-[0.12em] uppercase ${isRecommended ? 'text-emerald-600' : 'text-slate-500'}`}>
                Emergency Buffer
              </span>
            </div>
            <span className={`font-bold ${isRecommended ? 'text-emerald-600' : 'text-slate-600'}`}>${emergencyBuffer}</span>
          </div>
        </div>

        {/* Daily Total */}
        <div className="mt-8 mb-4">
          <span className={`font-bold text-brand-dark ${isRecommended ? 'text-4xl' : 'text-3xl'}`}>${total}</span>
          <span className="text-sm text-slate-400 ml-1.5 font-medium">/ day total</span>
        </div>

        {/* Select Button */}
        <button
          onClick={() => onSelect({ ...pkg, name, total, hotel, food, transit })}
          className={`w-full py-4 rounded-xl font-bold text-sm tracking-[0.08em] uppercase transition-all duration-200 shadow-sm hover:shadow-md ${
            isRecommended
              ? 'bg-brand-dark text-white hover:bg-black'
              : 'bg-white text-brand-dark border border-slate-200 hover:border-brand-dark hover:bg-slate-50'
          }`}
        >
          Select this Package
        </button>
      </div>
    </div>
  );
}

export default function ComparisonView() {
  const { packages, budget, destination, setSelectedPackage, setViewState, resetStore, currentTripId } = useAppStore();

  const handleSelect = (pkg) => {
    setSelectedPackage(pkg);
    setViewState('itinerary');
  };

  const handleShare = () => {
    if (currentTripId) {
      const shareUrl = `${window.location.origin}/?trip=${currentTripId}`;
      navigator.clipboard.writeText(shareUrl);
      alert("Shareable link copied to clipboard!");
    } else {
      alert("Please wait for trip to be fully saved.");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-0 animate-fade-in-up">
      {/* Top Bar with Return/Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark leading-tight mb-2 tracking-tight">
            Your curated journeys to <span className="italic font-medium text-brand-primary">{destination || 'paradise'}</span>.
          </h1>
          <p className="text-sm text-slate-400 tracking-[0.1em] uppercase font-bold">
            Three precision-balanced packages based on your ${budget} budget.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={resetStore}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-dark transition-colors uppercase tracking-widest px-4 py-2 border border-slate-200 rounded-full bg-white shadow-sm"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            Plan New Trip
          </button>
          
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 text-xs font-bold text-brand-dark transition-colors uppercase tracking-widest px-4 py-2 border border-slate-200 rounded-full bg-white shadow-sm hover:bg-slate-50"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share Trip
          </button>
        </div>
      </div>

      {/* 3-Column Package Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-stretch mb-16 pt-4">
        {packages.map((pkg, i) => (
          <PackageCard
            key={i}
            pkg={pkg}
            isRecommended={pkg.name === 'Sweet Spot' || i === 1}
            budget={budget}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {/* Destination Highlight Widget */}
      <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden mb-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_400px]">
          {/* Text Side */}
          <div className="p-8 md:p-14 flex flex-col justify-center">
            <span className="text-[10px] font-bold text-brand-primary tracking-[0.3em] uppercase mb-4">
              Orchestration Insight
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6 leading-tight">
              The {destination} Experience Engine
            </h3>
            <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              Our algorithms analyzed thousands of local data points to recommend <strong className="text-brand-dark">The Sweet Spot</strong>. 
              This package optimizes for morning visits before the crowds arrive, coupled with authentic culinary 
              experiences and curated local gems.
            </p>
            <div className="flex items-center gap-4 py-4 px-6 bg-slate-50 rounded-2xl self-start">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white border-4 border-white font-bold text-xs">J</div>
                <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center text-white border-4 border-white font-bold text-xs">M</div>
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white border-4 border-white font-bold text-xs">+12k</div>
              </div>
              <span className="text-xs text-slate-500 font-medium">WanderStackers selected this stack this month.</span>
            </div>
          </div>
          {/* Image Side - Responsive handling */}
          <div className="bg-slate-200 min-h-[300px] flex items-center justify-center relative bg-gradient-to-br from-brand-dark to-brand-primary">
            <Sparkles className="w-16 h-16 text-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
