import React from 'react';
import { ShieldCheck, Banknote, Route } from 'lucide-react';

export default function LoadingView() {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center space-y-12">
      
      {/* Main Loading Card */}
      <div className="w-full max-w-2xl bg-white rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] p-12 md:p-16 flex flex-col items-center text-center">
        
        {/* 'W' Logo Node */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-brand-primary/20 rounded-full animate-ping scale-150"></div>
          <div className="w-16 h-16 bg-brand-dark rounded-full flex items-center justify-center relative z-10 shadow-lg">
            <span className="text-white font-bold text-2xl">W</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-brand-dark mb-8">Calculating safety buffers...</h2>

        {/* Skeleton Row */}
        <div className="flex space-x-4 mb-10 w-full justify-center">
          <div className="w-24 h-24 bg-slate-100 rounded-2xl animate-pulse"></div>
          <div className="w-24 h-24 bg-slate-100 rounded-2xl animate-pulse delay-75"></div>
          <div className="w-24 h-24 bg-slate-100 rounded-2xl animate-pulse delay-150"></div>
        </div>

        {/* Loading Bars */}
        <div className="space-y-3 w-full max-w-xs mx-auto mb-10">
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-slate-300 w-1/2 rounded-full animate-pulse mx-auto"></div>
          </div>
          <div className="h-1.5 w-3/4 bg-slate-100 rounded-full mx-auto overflow-hidden">
             <div className="h-full bg-slate-200 w-1/3 rounded-full animate-pulse mx-auto delay-100"></div>
          </div>
        </div>

        <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
          Tailoring your itinerary based on current currency fluctuations and verified traveler feedback.
        </p>
      </div>

      {/* Feature Row (Below main card) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full opacity-80 animate-fade-in-up">
        {/* Feature 1 */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 flex items-start space-x-4">
          <div className="bg-white p-2 rounded-full shadow-sm text-brand-dark shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-brand-dark text-sm mb-1">Secure Sourcing</h4>
            <p className="text-xs text-slate-500">Directly connected to 140+ global transit hubs.</p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 flex items-start space-x-4">
          <div className="bg-white p-2 rounded-full shadow-sm text-brand-dark shrink-0">
            <Banknote className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-brand-dark text-sm mb-1">Real-time Rates</h4>
            <p className="text-xs text-slate-500">Live exchange rate calculations for 16 currencies.</p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 flex items-start space-x-4">
          <div className="bg-white p-2 rounded-full shadow-sm text-brand-dark shrink-0">
            <Route className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-brand-dark text-sm mb-1">Route Optimization</h4>
            <p className="text-xs text-slate-500">Finding the most logical flow for your transit days.</p>
          </div>
        </div>
      </div>
      
    </div>
  );
}
