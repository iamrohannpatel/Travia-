import React, { useState } from 'react';
import { 
  LayoutDashboard, Clock, MapIcon, FileText, 
  ChevronRight, Shield, Share2, Lightbulb,
  Plane, ChevronLeft, RefreshCcw
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Overview' },
  { icon: Clock, label: 'Timeline' },
  { icon: MapIcon, label: 'Map' },
  { icon: FileText, label: 'Documents' },
];

// Cycling color palette for event thumbnails
const EVENT_THEMES = [
  { gradient: 'from-amber-400 to-orange-500',   emoji: '🌅', bg: 'bg-amber-50'  },
  { gradient: 'from-sky-400 to-blue-500',        emoji: '🏛️', bg: 'bg-sky-50'   },
  { gradient: 'from-emerald-400 to-teal-500',    emoji: '🍜', bg: 'bg-emerald-50'},
  { gradient: 'from-violet-400 to-purple-500',   emoji: '🌿', bg: 'bg-violet-50' },
  { gradient: 'from-rose-400 to-pink-500',       emoji: '🏖️', bg: 'bg-rose-50'  },
  { gradient: 'from-indigo-400 to-blue-600',     emoji: '🎭', bg: 'bg-indigo-50' },
  { gradient: 'from-yellow-400 to-amber-500',    emoji: '🛍️', bg: 'bg-yellow-50' },
  { gradient: 'from-cyan-400 to-sky-500',        emoji: '🧭', bg: 'bg-cyan-50'  },
  { gradient: 'from-fuchsia-400 to-pink-600',    emoji: '🎵', bg: 'bg-fuchsia-50'},
  { gradient: 'from-lime-400 to-green-500',      emoji: '🌄', bg: 'bg-lime-50'  },
];

export default function ItineraryView() {
  const { 
    destination, days, budget, selectedPackage, 
    itineraryEvents, setViewState, resetStore,
    currentTripId 
  } = useAppStore();
  
  const [activeNav, setActiveNav] = useState('Timeline');
  const [activeDay, setActiveDay] = useState(1);

  const emergencyBuffer = Math.floor(budget * 0.10);
  const dailyTotal = selectedPackage?.total || 0;
  const totalInvestment = (dailyTotal * days) + emergencyBuffer;

  const handleShare = () => {
    if (currentTripId) {
      const shareUrl = `${window.location.origin}/?trip=${currentTripId}`;
      navigator.clipboard.writeText(shareUrl);
      alert("Shareable link copied to clipboard!");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-0 animate-fade-in-up">

      {/* Top Navigation Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-block mb-3">
            <span className="bg-gradient-to-r from-brand-primary to-amber-400 text-white text-[9px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full shadow-md shadow-orange-200">
              {selectedPackage?.name ? `${selectedPackage.name} Package` : 'Exclusive Package'}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-brand-dark leading-tight mb-2">
            Your {days}-Day {destination} Odyssey
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            The {selectedPackage?.name || 'Sweet Spot'}: A balanced & authentic journey
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setViewState('comparison')}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-dark transition-colors uppercase tracking-widest px-4 py-2.5 border border-slate-200 rounded-full bg-white shadow-sm hover:shadow-md"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Switch Package
          </button>

          <button
            onClick={resetStore}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-rose-500 transition-colors uppercase tracking-widest px-4 py-2.5 border border-slate-200 rounded-full bg-white shadow-sm hover:shadow-md hover:border-rose-200"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            Plan New Trip
          </button>
        </div>
      </div>

      {/* ── 3-Column Layout (left sidebar hidden on < lg, right sidebar shows on md+) ── */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] lg:grid-cols-[240px_1fr_300px] gap-6 lg:gap-8">

        {/* ===== LEFT SIDEBAR (lg+ only) ===== */}
        <div className="hidden lg:flex flex-col gap-5">
          {/* Trip ID card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                <Plane className="w-4 h-4 text-brand-primary" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-brand-dark truncate leading-none">Trip to {destination}</p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider truncate">
                  ID: {currentTripId?.slice(0, 8) || 'Draft'}
                </p>
              </div>
            </div>
          </div>

          {/* Nav items */}
          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map(({ icon: Icon, label }) => (
              <button
                key={label}
                onClick={() => setActiveNav(label)}
                className={`flex items-center justify-between px-5 py-3.5 rounded-2xl text-sm font-bold tracking-tight transition-all duration-200 ${
                  activeNav === label
                    ? 'bg-gradient-to-r from-brand-dark to-brand-blue text-white shadow-lg shadow-brand-dark/20 translate-x-1.5'
                    : 'bg-white text-slate-400 hover:text-brand-dark hover:bg-slate-50 border border-slate-100 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  {label}
                </div>
                {activeNav === label && <ChevronRight className="w-4 h-4 text-white/50" />}
              </button>
            ))}
          </nav>

          {/* Book Now Flight CTA */}
          <button className="bg-gradient-to-r from-brand-primary to-amber-500 text-white text-[11px] font-bold tracking-[0.15em] uppercase py-4 px-6 rounded-2xl shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 mt-4">
            <Plane className="w-4 h-4" />
            Book Now Flight
          </button>
        </div>

        {/* ===== CENTER: JOURNEY TIMELINE ===== */}
        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] border border-slate-100 p-8 md:p-10">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-brand-dark tracking-tight">The Journey Flow</h2>
            <div className="flex items-center gap-2.5 py-2 px-4 bg-orange-50 border border-orange-100 rounded-full">
              <span className="text-xs text-brand-primary font-bold uppercase tracking-widest">
                Day 1—{activeDay} of {days}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
            </div>
          </div>

          <div className="space-y-10">
            {itineraryEvents.map((event, i) => {
              const theme = EVENT_THEMES[i % EVENT_THEMES.length];
              return (
                <div key={i} className="relative flex gap-6 group">
                  {/* Vertical connector */}
                  {i < itineraryEvents.length - 1 && (
                    <div className="absolute top-20 left-[27px] w-[2px] h-[calc(100%+0.5rem)] bg-gradient-to-b from-slate-200 to-transparent" />
                  )}

                  {/* Day circle */}
                  <div className="shrink-0 flex flex-col items-center">
                    <span className="text-[9px] font-bold text-slate-300 tracking-[0.2em] uppercase mb-1.5">Day</span>
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl relative z-10 transition-all duration-300 cursor-pointer ${
                        activeDay === event.day
                          ? `bg-gradient-to-br ${theme.gradient} text-white shadow-xl scale-110`
                          : 'bg-brand-gray text-brand-dark hover:bg-slate-200'
                      }`}
                      onClick={() => setActiveDay(event.day)}
                    >
                      {String(event.day).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Event card */}
                  <div
                    className={`flex-grow rounded-[1.5rem] p-6 md:p-7 border transition-all duration-300 cursor-pointer overflow-hidden relative ${
                      activeDay === event.day
                        ? 'bg-white shadow-lg ring-1 ring-brand-primary/10 border-orange-100'
                        : 'bg-slate-50/80 border-slate-100 hover:bg-white hover:shadow-md hover:border-slate-200'
                    }`}
                    onClick={() => setActiveDay(event.day)}
                  >
                    {/* Accent bar when active */}
                    {activeDay === event.day && (
                      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-[1.5rem] bg-gradient-to-b ${theme.gradient}`} />
                    )}
                    
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
                      <div className="flex-grow">
                        <h3 className={`text-lg md:text-xl font-bold mb-3 transition-colors ${
                          activeDay === event.day ? 'text-brand-primary' : 'text-brand-dark group-hover:text-brand-dark'
                        }`}>
                          {event.title}
                        </h3>
                        <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-5 max-w-2xl">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {event.tags?.map((tag, j) => (
                            <span key={j} className={`text-[10px] font-bold px-3.5 py-1.5 rounded-full border tracking-wide flex items-center gap-1.5 ${
                              activeDay === event.day
                                ? `${theme.bg} ${theme.gradient.includes('amber') ? 'text-amber-700 border-amber-200' : 'text-slate-600 border-slate-200'}`
                                : 'bg-white text-slate-500 border-slate-200'
                            }`}>
                              <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${theme.gradient}`} />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Event thumbnail — colorful gradient with emoji */}
                      <div className={`w-full md:w-44 h-28 md:h-[4.5rem] rounded-xl shrink-0 flex items-center justify-center bg-gradient-to-br ${theme.gradient} shadow-sm`}>
                        <span className="text-4xl select-none">{theme.emoji}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===== RIGHT SIDEBAR: BOOKING SUMMARY ===== */}
        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-[1.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] border border-slate-100 p-7">
            <h3 className="text-xs font-bold text-brand-dark mb-7 tracking-widest uppercase flex items-center gap-2">
              <span className="w-5 h-5 rounded-lg bg-orange-50 flex items-center justify-center text-brand-primary text-base">📋</span>
              Booking Summary
            </h3>

            <div className="space-y-5 mb-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-brand-dark mb-0.5">Custom Flight Support</p>
                  <p className="text-[10px] text-slate-400 font-medium">Concierge optimized</p>
                </div>
                <span className="font-bold text-brand-dark text-sm">$---</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-brand-dark mb-0.5">Luxury Stay Breakdown</p>
                  <p className="text-[10px] text-slate-400 font-medium">${selectedPackage?.hotel || 0} × {days} nights</p>
                </div>
                <span className="font-bold text-brand-dark text-sm">${(selectedPackage?.hotel || 0) * days}</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-brand-dark mb-0.5">Daily Liquidity</p>
                  <p className="text-[10px] text-slate-400 font-medium">${dailyTotal - (selectedPackage?.hotel || 0)} × {days} (Food/Transit)</p>
                </div>
                <span className="font-bold text-brand-dark text-sm">${(dailyTotal - (selectedPackage?.hotel || 0)) * days}</span>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              <div className="flex items-center justify-between bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-emerald-800 leading-none mb-0.5">Peace of Mind Buffer</p>
                    <p className="text-[9px] text-emerald-600/70 font-bold tracking-wide uppercase">Locked & Secure</p>
                  </div>
                </div>
                <span className="font-bold text-emerald-600">${emergencyBuffer}</span>
              </div>
            </div>

            {/* Total */}
            <div className="border-t-2 border-brand-dark pt-5 mb-7">
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Total Investment</span>
                <span className="text-3xl font-bold text-brand-dark tracking-tight">${totalInvestment.toLocaleString()}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-brand-dark to-brand-blue text-white font-bold text-xs tracking-widest uppercase py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
                Book Now
              </button>
              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 text-[11px] text-brand-primary font-bold uppercase tracking-widest py-3 hover:text-orange-600 transition-colors bg-orange-50 hover:bg-orange-100 rounded-xl border border-orange-100"
              >
                <Share2 className="w-4 h-4" />
                Share Trip Link
              </button>
            </div>

            <p className="text-[9px] text-slate-300 text-center mt-5 leading-relaxed font-medium uppercase tracking-widest">
              Price valid for 24h · Includes all taxes & concierge access.
            </p>
          </div>

          {/* Concierge Tip */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-[1.5rem] p-6 border border-orange-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <Lightbulb className="w-4.5 h-4.5 text-brand-primary" />
              </div>
              <span className="text-xs font-bold text-brand-dark uppercase tracking-widest">Concierge Tip</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed italic">
              "Save mornings for the best photography light. Insider advice: ask your host about local festivals — some of the best experiences aren't in guidebooks."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
