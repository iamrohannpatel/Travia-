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
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="inline-block mb-3">
            <span className="bg-brand-dark text-white text-[9px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full">
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

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setViewState('comparison')}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-dark transition-colors uppercase tracking-widest px-4 py-2 border border-slate-200 rounded-full bg-white shadow-sm"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Switch Package
          </button>
          
          <button 
            onClick={resetStore}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors uppercase tracking-widest px-4 py-2 border border-slate-200 rounded-full bg-white shadow-sm"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            Plan New Trip
          </button>
        </div>
      </div>

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[240px_1fr_320px] gap-8">

        {/* ===== LEFT SIDEBAR (Hide on small screens) ===== */}
        <div className="hidden lg:flex flex-col gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-brand-gray flex items-center justify-center">
                <Plane className="w-4 h-4 text-brand-dark" />
              </div>
              <div>
                <p className="text-xs font-bold text-brand-dark truncate leading-none">Trip to {destination}</p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">Confirmed ID: {currentTripId?.slice(0, 8) || 'Draft'}</p>
              </div>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map(({ icon: Icon, label }) => (
              <button
                key={label}
                onClick={() => setActiveNav(label)}
                className={`flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-bold tracking-tight transition-all duration-200 ${
                  activeNav === label
                    ? 'bg-brand-dark text-white shadow-lg shadow-brand-dark/20 translate-x-2'
                    : 'bg-white text-slate-400 hover:text-brand-dark hover:bg-slate-50 border border-slate-100 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4.5 h-4.5" />
                  {label}
                </div>
                {activeNav === label && <ChevronRight className="w-4 h-4 text-white/50" />}
              </button>
            ))}
          </nav>

          <button className="mt-auto bg-brand-primary text-white text-[11px] font-bold tracking-[0.15em] uppercase py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl hover:bg-brand-dark transition-all flex items-center justify-center gap-3 mt-12">
            <Plane className="w-4.5 h-4.5" />
            Book Now Flight
          </button>
        </div>

        {/* ===== CENTER: JOURNEY TIMELINE ===== */}
        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-slate-100 p-8 md:p-12">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-bold text-brand-dark tracking-tight">The Journey Flow</h2>
            <div className="flex items-center gap-3 py-2 px-5 bg-slate-50 rounded-full border border-slate-100">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Day 1—{activeDay} of {days}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></div>
            </div>
          </div>

          <div className="space-y-12">
            {itineraryEvents.map((event, i) => (
              <div key={i} className="relative flex gap-8 group">
                {/* Vertical Line Connector */}
                {i < itineraryEvents.length - 1 && (
                  <div className="absolute top-20 left-[31px] w-[2px] h-[calc(100%+1rem)] bg-slate-100"></div>
                )}

                <div className="shrink-0 flex flex-col items-center">
                  <span className="text-[10px] font-bold text-slate-300 tracking-[0.2em] uppercase mb-2">Day</span>
                  <div 
                    className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl relative z-10 transition-all duration-300 cursor-pointer ${
                      activeDay === event.day
                        ? 'bg-brand-dark text-white shadow-xl shadow-brand-dark/20 scale-110'
                        : 'bg-brand-gray text-brand-dark hover:bg-slate-200'
                    }`}
                    onClick={() => setActiveDay(event.day)}
                  >
                    {String(event.day).padStart(2, '0')}
                  </div>
                </div>

                <div 
                  className={`flex-grow bg-slate-50 rounded-[1.5rem] p-8 border border-slate-100 transition-all duration-300 cursor-pointer overflow-hidden relative ${
                    activeDay === event.day ? 'bg-white shadow-lg ring-1 ring-brand-dark/5' : 'hover:bg-slate-100'
                  }`}
                  onClick={() => setActiveDay(event.day)}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex-grow">
                      <h3 className="text-xl md:text-2xl font-bold text-brand-dark mb-4 group-hover:text-brand-primary transition-colors">{event.title}</h3>
                      <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6 max-w-2xl">{event.description}</p>
                      
                      <div className="flex flex-wrap gap-2.5">
                        {event.tags?.map((tag, j) => (
                          <span key={j} className="text-[10px] font-bold bg-white text-slate-500 px-4 py-1.5 rounded-full border border-slate-200 tracking-wide shadow-sm flex items-center gap-2">
                             <div className="w-1 h-1 rounded-full bg-brand-primary"></div>
                             {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="w-full md:w-48 h-32 md:h-24 bg-slate-200 rounded-xl flex items-center justify-center shrink-0">
                      <MapIcon className="w-8 h-8 text-slate-300" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== RIGHT SIDEBAR: BOOKING SUMMARY ===== */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-[1.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-slate-100 p-8">
            <h3 className="text-sm font-bold text-brand-dark mb-8 tracking-widest uppercase">Booking Summary</h3>

            <div className="space-y-6 mb-8">
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

              <div className="h-px bg-slate-100"></div>

              <div className="flex items-center justify-between bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-emerald-800 leading-none mb-1">Peace of Mind Buffer</p>
                    <p className="text-[10px] text-emerald-600/70 font-medium tracking-wide">LOCKED & SECURE</p>
                  </div>
                </div>
                <span className="font-bold text-emerald-600">${emergencyBuffer}</span>
              </div>
            </div>

            <div className="border-t-2 border-brand-dark pt-6 mb-8">
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Total Investment</span>
                <span className="text-3xl font-bold text-brand-dark tracking-tight">${totalInvestment.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-brand-dark text-white font-bold text-xs tracking-widest uppercase py-4.5 rounded-2xl shadow-lg hover:shadow-xl hover:bg-black transition-all duration-200">
                Book Now
              </button>

              <button 
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 text-[11px] text-slate-400 font-bold uppercase tracking-widest py-3 hover:text-brand-dark transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share Trip Link
              </button>
            </div>

            <p className="text-[9px] text-slate-300 text-center mt-6 leading-relaxed font-medium uppercase tracking-widest">
              Price valid for 24h. Includes all taxes, fees, and digital concierge access.
            </p>
          </div>

          <div className="bg-brand-gray rounded-[1.5rem] p-6 border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <Lightbulb className="w-5 h-5 text-brand-primary" />
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
