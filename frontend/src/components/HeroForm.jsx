import React from 'react';
import { Map, Banknote, User, Calendar, Sparkles } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

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
        throw new Error('Network response was not ok');
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
      alert('Failed to generate trip. Please try again.');
      setViewState('input');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] p-10 md:p-14">
      {/* Header Text */}
      <div className="text-center mb-10">
        <h1 className="text-[2.5rem] leading-tight font-bold text-brand-dark mb-4 tracking-tight">
          Tell us your budget.<br/>
          We'll <span className="italic font-medium">engineer</span> the perfect trip.
        </h1>
        <p className="text-slate-500 text-lg max-w-md mx-auto leading-relaxed">
          Our AI concierge designs bespoke travel packages based on your financial DNA and adventure style.
        </p>
      </div>

      <form onSubmit={handleGenerate} className="space-y-6">
        {/* Destination */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 tracking-wider uppercase">Destination</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Map className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 bg-brand-gray rounded-xl text-brand-dark placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-dark transition-all text-lg"
              placeholder="Where do you want to go?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Row: Budget and Travelers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 tracking-wider uppercase">Total Budget ($)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Banknote className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="number"
                className="block w-full pl-12 pr-4 py-4 bg-brand-gray rounded-xl text-brand-dark placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-dark transition-all text-lg"
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
                <User className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="number"
                className="block w-full pl-12 pr-4 py-4 bg-brand-gray rounded-xl text-brand-dark placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-dark transition-all text-lg"
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
              <Calendar className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="number"
              className="block w-full pl-12 pr-4 py-4 bg-brand-gray rounded-xl text-brand-dark placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-dark transition-all text-lg"
              placeholder="7"
              value={days || ''}
              onChange={(e) => setDays(Number(e.target.value))}
              min="1"
            />
          </div>
        </div>

        {/* Travel Vibe Slider */}
        <div className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-500 tracking-wider uppercase">Travel Vibe</label>
            <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase tracking-wider">
              AI Optimized
            </span>
          </div>
          
          <div className="relative pt-2 pb-6">
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={vibe}
              onChange={(e) => setVibe(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-3 absolute w-full px-1">
              <span>Backpacker</span>
              <span>Mid-Range</span>
              <span>Luxury</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-brand-primary hover:bg-brand-dark text-white font-medium py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2 text-lg shadow-md"
          >
            <span>Generate My Packages</span>
            <Sparkles className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
