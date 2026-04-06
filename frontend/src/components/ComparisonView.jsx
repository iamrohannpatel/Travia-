import React from 'react';
import { Hotel, Utensils, MapPin, Shield, Sparkles, RefreshCcw, Share2 } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const TIER_META = {
  'Shoestring': { tier: 'TIER 01', subtitle: 'Maximized savings', order: 0 },
  'Sweet Spot': { tier: 'TIER 02', subtitle: 'Balanced & authentic', order: 1 },
  'Splurge':    { tier: 'TIER 03', subtitle: 'Unreasonable comfort', order: 2 },
};

// Tier-specific visual themes
const TIER_THEME = {
  'Shoestring': {
    gradient: 'from-sky-400 via-blue-500 to-indigo-500',
    softBg:   'bg-sky-50',
    border:   'border-sky-100',
    text:     'text-sky-600',
    emoji:    '🎒',
  },
  'Sweet Spot': {
    gradient: 'from-amber-400 via-orange-400 to-rose-400',
    softBg:   'bg-amber-50',
    border:   'border-amber-100',
    text:     'text-amber-600',
    emoji:    '⚖️',
  },
  'Splurge': {
    gradient: 'from-violet-500 via-purple-500 to-indigo-600',
    softBg:   'bg-violet-50',
    border:   'border-violet-100',
    text:     'text-violet-600',
    emoji:    '✨',
  },
};

function PackageCard({ pkg, isRecommended, budget, onSelect }) {
  const name = pkg.name || Object.keys(TIER_META).find(k => pkg[k]) || 'Package';
  const meta   = TIER_META[name]  || TIER_META['Sweet Spot'];
  const theme  = TIER_THEME[name] || TIER_THEME['Sweet Spot'];
  const hotel  = pkg.hotel  || 0;
  const food   = pkg.food   || 0;
  const transit = pkg.transit || 0;
  const total  = pkg.total  || (hotel + food + transit);
  const emergencyBuffer = Math.floor(budget * 0.10);

  return (
    <div className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ${
      isRecommended
        ? 'shadow-[0_28px_64px_-15px_rgba(249,115,22,0.22)] md:scale-105 z-10 border-2 border-brand-primary'
        : 'shadow-[0_8px_32px_-10px_rgba(0,0,0,0.08)] border border-slate-100 hover:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.12)] bg-white'
    }`}>

      {/* Colored gradient header strip */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${theme.gradient}`} />

      {/* White card body */}
      <div className="bg-white flex flex-col flex-grow">

        {/* RECOMMENDED Badge */}
        {isRecommended && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
            <span className="bg-gradient-to-r from-brand-primary to-amber-400 text-white text-[10px] font-bold tracking-[0.15em] uppercase px-5 py-1.5 rounded-full shadow-lg shadow-orange-200 whitespace-nowrap">
              ★ Recommended
            </span>
          </div>
        )}

        <div className={`p-7 md:p-8 flex flex-col flex-grow ${isRecommended ? 'pt-10' : ''}`}>

          {/* Tier Label + Emoji */}
          <div className="flex items-center justify-between mb-1">
            <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${theme.text}`}>{meta.tier}</span>
            <span className="text-lg">{theme.emoji}</span>
          </div>
          <h3 className={`font-bold mb-1 ${isRecommended ? 'text-2xl' : 'text-xl'} text-brand-dark`}>The {name}</h3>
          <p className="text-xs text-slate-400 mb-6">{meta.subtitle}</p>

          {/* Line Items */}
          <div className="space-y-3 flex-grow">
            <div className={`flex items-center justify-between rounded-xl p-3 ${isRecommended ? `${theme.softBg} ${theme.border} border` : 'py-1.5'}`}>
              <div className="flex items-center gap-3">
                <Hotel className={`w-4 h-4 ${isRecommended ? theme.text : 'text-slate-400'}`} />
                <span className="text-sm text-slate-600">Hotel</span>
              </div>
              <span className={`font-bold ${isRecommended ? `text-lg ${theme.text}` : 'text-base text-brand-dark'}`}>${hotel}</span>
            </div>

            <div className={`flex items-center justify-between rounded-xl p-3 ${isRecommended ? 'py-2 px-3' : 'py-1.5'}`}>
              <div className="flex items-center gap-3">
                <Utensils className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600">Food</span>
              </div>
              <span className={`font-bold ${isRecommended ? 'text-lg text-brand-dark' : 'text-base text-brand-dark'}`}>${food}</span>
            </div>

            <div className={`flex items-center justify-between rounded-xl p-3 ${isRecommended ? 'py-2 px-3' : 'py-1.5'}`}>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600">Transit</span>
              </div>
              <span className={`font-bold ${isRecommended ? 'text-lg text-brand-dark' : 'text-base text-brand-dark'}`}>${transit}</span>
            </div>

            {/* Emergency Buffer */}
            <div className={`flex items-center justify-between rounded-xl mt-2 ${
              isRecommended
                ? 'bg-emerald-50 border border-emerald-100 p-3.5'
                : 'bg-slate-50 border border-slate-100 p-3'
            }`}>
              <div className="flex items-center gap-2">
                <Shield className={`w-4 h-4 ${isRecommended ? 'text-emerald-500' : 'text-slate-400'}`} />
                <span className={`text-[10px] font-bold tracking-[0.12em] uppercase ${isRecommended ? 'text-emerald-600' : 'text-slate-500'}`}>
                  Emergency Buffer
                </span>
              </div>
              <span className={`font-bold text-sm ${isRecommended ? 'text-emerald-600' : 'text-slate-600'}`}>${emergencyBuffer}</span>
            </div>
          </div>

          {/* Daily Total */}
          <div className="mt-8 mb-5">
            <span className={`font-bold text-brand-dark ${isRecommended ? 'text-4xl' : 'text-3xl'}`}>${total}</span>
            <span className="text-sm text-slate-400 ml-2 font-medium">/ day total</span>
          </div>

          {/* Select Button */}
          <button
            onClick={() => onSelect({ ...pkg, name, total, hotel, food, transit })}
            className={`w-full py-4 rounded-xl font-bold text-sm tracking-[0.08em] uppercase transition-all duration-200 ${
              isRecommended
                ? 'bg-gradient-to-r from-brand-primary to-amber-500 text-white shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300 hover:-translate-y-0.5'
                : `${theme.softBg} ${theme.text} border ${theme.border} hover:shadow-md hover:-translate-y-0.5`
            }`}
          >
            Select this Package
          </button>
        </div>
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

      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-brand-primary text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Curated Packages
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark leading-tight mb-2 tracking-tight">
            Your curated journeys to{' '}
            <span className="italic font-medium text-brand-primary">{destination || 'paradise'}</span>.
          </h1>
          <p className="text-sm text-slate-400 tracking-[0.08em] uppercase font-bold">
            Three precision-balanced packages · ${budget} budget
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={resetStore}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-dark transition-colors uppercase tracking-widest px-4 py-2.5 border border-slate-200 rounded-full bg-white shadow-sm hover:shadow-md"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            Plan New Trip
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-xs font-bold text-brand-primary hover:text-orange-600 transition-colors uppercase tracking-widest px-4 py-2.5 border border-orange-200 rounded-full bg-orange-50 hover:bg-orange-100 shadow-sm hover:shadow-md"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share Trip
          </button>
        </div>
      </div>

      {/* 3-Column Package Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-stretch mb-16 pt-6">
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
      <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden mb-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_380px]">

          {/* Text Side */}
          <div className="p-8 md:p-14 flex flex-col justify-center">
            <span className="text-[10px] font-bold text-brand-primary tracking-[0.3em] uppercase mb-4">
              Orchestration Insight
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-brand-dark mb-5 leading-tight">
              The {destination} Experience Engine
            </h3>
            <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              Our algorithms analyzed thousands of local data points to recommend{' '}
              <strong className="text-brand-dark">The Sweet Spot</strong>.{' '}
              This package optimizes for morning visits before the crowds arrive, coupled with authentic culinary
              experiences and curated local gems.
            </p>
            <div className="flex items-center gap-4 py-4 px-6 bg-orange-50 border border-orange-100 rounded-2xl self-start">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white border-4 border-white font-bold text-xs">J</div>
                <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center text-white border-4 border-white font-bold text-xs">M</div>
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white border-4 border-white font-bold text-xs text-[9px]">+12k</div>
              </div>
              <span className="text-xs text-slate-500 font-medium">WanderStackers picked this package this month.</span>
            </div>
          </div>

          {/* Destination Visual Side */}
          <div className="relative min-h-[280px] overflow-hidden bg-gradient-to-br from-brand-dark via-brand-blue to-[#0f2d4a] flex items-center justify-center">
            {/* Dot grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)', backgroundSize: '28px 28px' }}
            />
            {/* Glow blobs */}
            <div className="absolute top-6 right-6 w-32 h-32 rounded-full bg-brand-primary/20 blur-2xl" />
            <div className="absolute bottom-6 left-6 w-24 h-24 rounded-full bg-sky-400/15 blur-2xl" />

            {/* Content */}
            <div className="relative z-10 text-center px-10">
              <div className="text-7xl mb-5 animate-float">🗺️</div>
              <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Your next adventure awaits</p>
              <p className="text-white font-bold text-2xl tracking-tight">{destination || 'Somewhere beautiful'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
