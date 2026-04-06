import React, { useState, useEffect } from 'react';
import { ShieldCheck, Banknote, Route } from 'lucide-react';

const LOADING_MESSAGES = [
  "Scouting the best local neighborhoods...",
  "Calculating your safety buffers...",
  "Comparing hotel tiers in real-time...",
  "Optimizing your daily itinerary flow...",
  "Sourcing authentic culinary experiences...",
  "Adding concierge finishing touches...",
];

export default function LoadingView() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setMsgIndex(i => (i + 1) % LOADING_MESSAGES.length);
        setFade(true);
      }, 300);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center space-y-10">
      
      {/* Main Loading Card */}
      <div className="w-full max-w-xl bg-white rounded-[2rem] shadow-[0_24px_64px_-12px_rgba(249,115,22,0.14),0_8px_32px_-8px_rgba(0,0,0,0.05)] p-12 md:p-16 flex flex-col items-center text-center border border-orange-50">
        
        {/* Plane / Globe animation */}
        <div className="relative mb-10">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full bg-orange-200/40 animate-ping scale-[2.2]" />
          {/* Mid ring */}
          <div className="absolute inset-0 rounded-full bg-orange-100/60 scale-[1.5]" />
          {/* Icon */}
          <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-brand-primary via-orange-500 to-amber-400 flex items-center justify-center shadow-xl shadow-orange-200">
            <span className="text-4xl select-none">✈️</span>
          </div>
        </div>

        {/* Route progress bar */}
        <div className="relative w-full max-w-xs mx-auto mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-bold text-slate-300">🏠</span>
            <div className="flex-grow h-1.5 bg-orange-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-brand-primary to-amber-400 rounded-full animate-progress-sweep" />
            </div>
            <span className="text-sm font-bold text-brand-primary">📍</span>
          </div>
        </div>

        {/* Cycling animated message */}
        <div className="min-h-[2rem] flex items-center justify-center mb-2">
          <h2
            className="text-lg md:text-xl font-bold text-brand-dark text-center transition-all duration-300"
            style={{ opacity: fade ? 1 : 0, transform: fade ? 'translateY(0)' : 'translateY(-6px)' }}
          >
            {LOADING_MESSAGES[msgIndex]}
          </h2>
        </div>

        <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed mt-3">
          Crafting three precision-balanced packages from real-time pricing data and traveler insights.
        </p>

        {/* Skeleton package cards */}
        <div className="flex gap-4 mt-10 w-full justify-center">
          <div className="flex-1 max-w-[90px] h-24 rounded-2xl bg-gradient-to-b from-sky-50 to-blue-50 border border-sky-100 animate-pulse" />
          <div className="flex-1 max-w-[90px] h-24 rounded-2xl bg-gradient-to-b from-orange-50 to-amber-50 border border-orange-100 animate-pulse [animation-delay:0.2s]" />
          <div className="flex-1 max-w-[90px] h-24 rounded-2xl bg-gradient-to-b from-violet-50 to-purple-50 border border-violet-100 animate-pulse [animation-delay:0.4s]" />
        </div>
      </div>

      {/* Feature Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full animate-fade-in-up">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 flex items-start space-x-4 border border-orange-50 shadow-sm">
          <div className="bg-orange-50 p-2.5 rounded-xl shrink-0">
            <ShieldCheck className="w-5 h-5 text-brand-primary" />
          </div>
          <div>
            <h4 className="font-bold text-brand-dark text-sm mb-1">Smart Safety Buffer</h4>
            <p className="text-xs text-slate-500 leading-relaxed">A 10% emergency fund is auto-calculated into every package.</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 flex items-start space-x-4 border border-sky-50 shadow-sm">
          <div className="bg-sky-50 p-2.5 rounded-xl shrink-0">
            <Banknote className="w-5 h-5 text-sky-500" />
          </div>
          <div>
            <h4 className="font-bold text-brand-dark text-sm mb-1">Real-time Pricing</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Live hotel & transit rates from 140+ global travel sources.</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 flex items-start space-x-4 border border-emerald-50 shadow-sm">
          <div className="bg-emerald-50 p-2.5 rounded-xl shrink-0">
            <Route className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <h4 className="font-bold text-brand-dark text-sm mb-1">Route Optimization</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Logical day-flow engineered to minimize transit downtime.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
