import React, { useEffect } from 'react';
import Header from './components/Header';
import HeroForm from './components/HeroForm';
import LoadingView from './components/LoadingView';
import ComparisonView from './components/ComparisonView';
import ItineraryView from './components/ItineraryView';
import { useAppStore } from './store/useAppStore';
import { supabase } from './lib/supabase';

function App() {
  const { viewState, setViewState, setTripData } = useAppStore();

  useEffect(() => {
    const handleUrlTrip = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const tripId = urlParams.get('trip');

      if (tripId) {
        setViewState('loading');
        try {
          const { data, error } = await supabase
            .from('trips')
            .select('*')
            .eq('id', tripId)
            .single();

          if (error) throw error;

          if (data) {
            // Load and transform
            setTripData({
              destination: data.destination,
              budget: data.budget,
              days: data.days,
              vibe: data.vibe,
              packages: data.packages,
              itineraryEvents: data.itinerary,
              currentTripId: data.id,
              viewState: 'comparison'
            });
          }
        } catch (err) {
          console.error("Error fetching shared trip:", err);
          alert("We couldn't find that specific trip. Starting fresh!");
          setViewState('input');
          // Clear trip ID from URL
          const url = new URL(window.location);
          url.searchParams.delete('trip');
          window.history.pushState({}, '', url);
        }
      }
    };

    handleUrlTrip();
  }, []); // Only run once on mount

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      
      <main className={`flex-grow flex items-center justify-center p-6 md:p-12 ${
        viewState === 'comparison' || viewState === 'itinerary' ? 'items-start pt-8' : 'mb-12'
      }`}>
        {viewState === 'input' && <HeroForm />}
        {viewState === 'loading' && <LoadingView />}
        {viewState === 'comparison' && <ComparisonView />}
        {viewState === 'itinerary' && <ItineraryView />}
      </main>
    </div>
  );
}

export default App;
