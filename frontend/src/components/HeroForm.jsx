import React from 'react';
import { Map, Banknote, User, Calendar, Sparkles } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const VIBE_LABELS = ['Backpacker', 'Budget', 'Balanced', 'Comfort', 'Luxury'];
const VIBE_EMOJIS = ['🎒', '💰', '⚖️', '🛋️', '✨'];

export default function HeroForm() {
  const { 
    destination, setDestination, 
    budget, setBudget, 
    travelers, setTravelers, 
    days, setDays, 
    vibe, setVibe, 
    setViewState,
    setTripData 
  } = useAppStore();

  const handleGenerate = async (e) => {
    e.preventDefault();
    setViewState('loading');

    try {
      const response = await fetch('http://localhost:8000/api/generate-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          budget,
          travelers,
          days,
          vibe
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const status = response.status;
        if (status === 429) {
          throw new Error('quota_exceeded');
        }
        throw new Error(errorData.detail || 'Network response was not ok');
      }

      const responseData = await response.json();
      
      // Save data to store
      setTripData({
        currentTripId: responseData.trip_id,
        packages: responseData.data.packages,
        itineraryEvents: responseData.data.itinerary,
        viewState: 'comparison'
      });
      
    } catch (error) {
      console.error('Error generating trip:', error);
      if (error.message === 'quota_exceeded') {
        alert('⚠️ Gemini API quota exceeded.\n\nThe free tier daily limit has been reached. Please:\n1. Wait a few minutes and try again\n2. Or replace the GEMINI_API_KEY in backend/.env with a new key from https://aistudio.google.com/');
      } else {
        alert('Failed to generate trip. Please try again.');
      }
      setViewState('input');
    }
  };

  const currentVibeLabel = VIBE_LABELS[vibe - 1];
  const currentVibeEmoji = VIBE_EMOJIS[vibe - 1];

  return (
    <div className="relative w-full flex items-center justify-center py-4">
      {/* Decorative ambient blobs */}
      <div className="pointer-events-none absolute -top-20 -left-32 w-96 h-96 bg-gradient-to-br from-orange-100 to-amber-50 rounded-full blur-3xl opacity-70" />
      <div className="pointer-events-none absolute -bottom-20 -right-32 w-80 h-80 bg-gradient-to-br from-sky-100 to-blue-50 rounded-full blur-3xl opacity-60" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-orange-50/40 via-transparent to-sky-50/40 rounded-full blur-2xl" />

      {/* Floating travel icons */}
      <div className="pointer-events-none hidden xl:block absolute left-8 top-8 text-3xl animate-float opacity-70" style={{ animationDelay: '0s' }}>✈️</div>
      <div className="pointer-events-none hidden xl:block absolute right-12 top-4 text-2xl animate-float opacity-60" style={{ animationDelay: '1.5s' }}>🗺️</div>
      <div className="pointer-events-none hidden xl:block absolute left-4 bottom-4 text-2xl animate-float opacity-50" style={{ animationDelay: '3s' }}>🌍</div>
      <div className="pointer-events-none hidden xl:block absolute right-6 bottom-8 text-3xl animate-float opacity-60" style={{ animationDelay: '0.8s' }}>🏝️</div>

      {/* Form Card */}
      <div className="relative z-10 w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-[2rem] shadow-[0_24px_64px_-12px_rgba(249,115,22,0.12),0_8px_32px_-8px_rgba(0,0,0,0.06)] p-10 md:p-14 border border-orange-50">
        
        {/* Header Text */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-brand-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Concierge
          </div>
          <h1 className="text-[2.4rem] leading-tight font-bold text-brand-dark mb-4 tracking-tight">
            Tell us your budget.<br/>
            We'll <span className="italic text-brand-primary">engineer</span> the trip.
          </h1>
          <p className="text-slate-500 text-base max-w-md mx-auto leading-relaxed">
            Our AI designs bespoke travel packages tailored to your budget and adventure style.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-5">
          {/* Destination */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 tracking-wider uppercase">Destination</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Map className="h-5 w-5 text-brand-primary/60" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-4 bg-brand-gray rounded-xl text-brand-dark placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:bg-white transition-all text-base font-medium border border-transparent focus:border-orange-100"
                placeholder="Where do you want to go?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Row: Budget and Travelers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 tracking-wider uppercase">Total Budget ($)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Banknote className="h-5 w-5 text-brand-primary/60" />
                </div>
                <input
                  type="number"
                  className="block w-full pl-12 pr-4 py-4 bg-brand-gray rounded-xl text-brand-dark placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:bg-white transition-all text-base font-medium border border-transparent focus:border-orange-100"
                  placeholder="5000"
                  value={budget || ''}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  min="0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 tracking-wider uppercase">Travelers</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-brand-primary/60" />
                </div>
                <input
                  type="number"
                  className="block w-full pl-12 pr-4 py-4 bg-brand-gray rounded-xl text-brand-dark placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:bg-white transition-all text-base font-medium border border-transparent focus:border-orange-100"
                  placeholder="2"
                  value={travelers || ''}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  min="1"
                />
              </div>
            </div>
          </div>

          {/* Trip Duration */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 tracking-wider uppercase">Trip Duration (Days)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-brand-primary/60" />
              </div>
              <input
                type="number"
                className="block w-full pl-12 pr-4 py-4 bg-brand-gray rounded-xl text-brand-dark placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:bg-white transition-all text-base font-medium border border-transparent focus:border-orange-100"
                placeholder="7"
                value={days || ''}
                onChange={(e) => setDays(Number(e.target.value))}
                min="1"
              />
            </div>
          </div>

          {/* Travel Vibe Slider */}
          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-500 tracking-wider uppercase">Travel Vibe</label>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-orange-50 border border-orange-100 text-brand-primary px-3 py-1.5 rounded-full">
                {currentVibeEmoji} {currentVibeLabel}
              </span>
            </div>
            
            <div className="relative pt-2 pb-8">
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={vibe}
                onChange={(e) => setVibe(Number(e.target.value))}
                className="w-full"
              />
              {/* 5-step labels */}
              <div className="flex justify-between text-[9.5px] font-bold text-slate-400 uppercase tracking-widest mt-3 absolute w-full px-0.5">
                <span>Backpacker</span>
                <span>Budget</span>
                <span>Balanced</span>
                <span>Comfort</span>
                <span>Luxury</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-brand-primary to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2.5 text-base shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Generate My Packages</span>
              <Sparkles className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
